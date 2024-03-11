const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

router.get("/", rejectUnauthenticated, (req, res) => {
  console.log(req.user);
  res.send(req.user);
});

router.post("/register", (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const email = req.body.email;
  const nickname = req.body.nickname;

  const queryText = `INSERT INTO "users" (username, email, nickname, password)
    VALUES ($1, $2, $3, $4) RETURNING id`;
  pool
    .query(queryText, [username, email, nickname, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.sendStatus(500);
    });
});

router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

router.post("/logout", (req, res) => {
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
