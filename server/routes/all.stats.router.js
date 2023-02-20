const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */

router.get("/stats", (req, res) => {
  // GET route code here
  // const { userID } = req.user;
  const text = `
  SELECT
	"user"."id",
	"user"."username",
	round(sum(("session"."cash_out" - "session"."buy_in")),2) AS "total_net",
	sum("session"."hours_played") AS "total_hours",
	round(sum(("session"."cash_out" - "session"."buy_in")) /sum("session"."hours_played") , 1) AS "hourly_total",
	count("session") AS "total_sessions",
	round(avg("cash_out" - "buy_in"), 2) AS "avg_session_net"
FROM
	"user"
	JOIN "venue" ON "venue"."user_id" = "user"."id"
	JOIN "session" ON "session"."venue_id" = "venue"."id"
	WHERE "user"."id" = $1
GROUP BY
	"user"."id";
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

module.exports = router;
