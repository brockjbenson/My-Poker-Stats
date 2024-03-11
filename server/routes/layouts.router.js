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
  SELECT * FROM "venue" WHERE "user_id" = $1 ORDER BY "id" ASC;`;
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

router.get("/specific/:id", (req, res) => {
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
	round(sum(("cash_out" - "buy_in"))/sum("session"."hours_played"),2) AS "venue_hourly",
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
      .query(text, [req.params.id, req.user.id])
      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log("Error making SELECT for items:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

router.get("/venue-sessions/:id", (req, res) => {
  // GET route code here
  // const { userID } = req.user;
  const text = `
	SELECT
	"session"."id",
	"venue"."name" AS "venue",
	"venue"."user_id",
	"buy_in",
	"cash_out",
	round(("cash_out" - "buy_in"),2) AS "net_profit",
	"session_date",
	"hours_played",
	round((("cash_out" - "buy_in") / "hours_played"), 2) AS "hourly",
	"stakes"
FROM
	"session"
	JOIN "venue" ON "session"."venue_id" = "venue"."id"
WHERE "session"."venue_id" = $1 AND "venue"."user_id" = $2
ORDER BY
	"session_date" ASC;`;
  if (req.isAuthenticated()) {
    pool
      .query(text, [req.params.id, req.user.id])
      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log("Error making SELECT for items:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

router.get("/specific-venue/:id", (req, res) => {
  // GET route code here
  // const { userID } = req.user;
  const text = `
  SELECT "venue"."id" AS "ven_id", "user_id", "name" FROM "venue"
WHERE "venue"."id" = $1 AND "user_id" = $2;
  `;
  if (req.isAuthenticated()) {
    pool
      .query(text, [req.params.id, req.user.id])
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
	round(sum(("cash_out" - "buy_in"))/sum("session"."hours_played"),2) AS "venue_hourly",
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

router.delete("/:id", (req, res) => {
  // POST route code here
  const { id } = req.params;
  const text = `
  DELETE FROM "venue" WHERE "id" = $1 AND "user_id" = $2;
  `;
  if (req.isAuthenticated()) {
    pool
      .query(text, [id, req.user.id])
      .then((results) => res.sendStatus(204))
      .catch((error) => {
        console.log("Error making INSERT for items:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

router.put("/:id", (req, res) => {
  // POST route code here
  const { id } = req.params;
  const { name } = req.body;
  const text = `
  UPDATE
	"venue"
  SET
    "name" = $1
  WHERE
    "id" = $2 AND "user_id" = $3;
  `;
  if (req.isAuthenticated()) {
    pool
      .query(text, [name, id, req.user.id])
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
