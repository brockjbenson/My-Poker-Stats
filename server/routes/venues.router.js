const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */

router.get("/", (req, res) => {
  // GET route code here
  // const { userID } = req.user;
  const text = `
  SELECT * FROM "venue" WHERE "user_id" = $1;`;
  if (req.isAuthenticated()) {
    pool
      .query(text, [req.user.id])
      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log("Error making SELECT for items:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

router.get("/specific", (req, res) => {
  // GET route code here
  // const { userID } = req.user;
  const text = `
  SELECT
	"user"."id" AS "user_id",
	"user"."username",
	"venue"."id" AS "venue_id",
	"venue"."name" AS "venue_name",
	round(sum(("cash_out" - "buy_in")),2) AS "venue_net",
	sum("session"."hours_played") AS "total_hours",
	round(sum(("cash_out" - "buy_in"))/sum("session"."hours_played"),1) AS "venue_hourly",
	count("session") AS "sessions_played",
	round(avg("cash_out" - "buy_in"), 2) AS "avg_session_net"
FROM 
	"venue"
	JOIN "session" ON "session"."venue_id" = "venue"."id"
	JOIN "user" ON "user"."id" = "venue"."user_id"
	WHERE "venue"."id" = $1 AND "user"."id" = $2
GROUP BY
	"user"."id", "venue"."id";`;
  if (req.isAuthenticated()) {
    pool
      .query(text, [req.body.id, req.user.id])
      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log("Error making SELECT for items:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

router.get("/stats", (req, res) => {
  // GET route code here
  // const { userID } = req.user;
  const text = `
  SELECT
	"user"."id" AS "user_id",
	"user"."username",
	"venue"."id" AS "venue_id",
	"venue"."name" AS "venue_name",
	round(sum(("cash_out" - "buy_in")),2) AS "venue_net",
	sum("session"."hours_played") AS "total_hours",
	round(sum(("cash_out" - "buy_in"))/sum("session"."hours_played"),1) AS "venue_hourly",
	count("session") AS "sessions_played",
	round(avg("cash_out" - "buy_in"), 2) AS "avg_session_net"
FROM 
	"venue"
	JOIN "session" ON "session"."venue_id" = "venue"."id"
	JOIN "user" ON "user"."id" = "venue"."user_id"
  WHERE "user"."id" = $1
GROUP BY
	"user"."id", "venue"."id";
  `;
  if (req.isAuthenticated()) {
    pool
      .query(text, [req.user.id])
      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log("Error making SELECT for items:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
  const { name } = req.body;
  const text = `
  INSERT INTO "venue" ("name", "user_id")
VALUES ( $1, $2 );
  `;
  if (req.isAuthenticated()) {
    pool
      .query(text, [name, req.user.id])
      .then((results) => res.sendStatus(201))
      .catch((error) => {
        console.log("Error making INSERT for items:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
