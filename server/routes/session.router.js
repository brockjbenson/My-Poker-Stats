const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
/**
 * GET route template
 */
router.get("/", (req, res) => {
  // GET route code here
  const text = `
  SELECT * FROM "session" WHERE "user_id" = $1;
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

router.get("/stats", (req, res) => {
  // GET route code here
  // const { userID } = req.user;
  const text = `SELECT
"session"."id",
"venue"."name" AS "venue",
"venue"."user_id",
"buy_in",
"cash_out",
round(("cash_out" - "buy_in"),2) AS "net_profit",
"session_date",
"hours_played",
round((("cash_out" - "buy_in") / "hours_played"), 1) AS "hourly",
"stakes"
FROM
"session"
JOIN "venue" ON "session"."venue_id" = "venue"."id"
WHERE "session"."user_id" = $1
ORDER BY
"session_date" ASC;`;
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
  const {
    buy_in,
    cash_out,
    hours_played,
    session_date,
    stakes,
    notes,
    venue_id,
  } = req.body;
  const text = `INSERT INTO "session" ("buy_in", "cash_out", "hours_played", "session_date", "stakes", "notes", "venue_id", "user_id")
	VALUES (1000, 1375, 4.2, '12/21/2023', '2/5', 'notes', 4, 1);`;

  if (req.isAuthenticated()) {
    pool
      .query(text, [
        buy_in,
        cash_out,
        hours_played,
        session_date,
        stakes,
        notes,
        venue_id,
        req.user.id,
      ])
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
