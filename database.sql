

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE venue (
	"id" serial PRIMARY KEY,
	"name" varchar(255) NOT NULL,
	"user_id" int REFERENCES users (id) NOT NULL
);

CREATE TABLE sessions (
    "id" serial primary key,
    "buy_in" DECIMAL(10,2) NOT NULL,
    "cash_out" DECIMAL(10,2) NOT NULL,
    "hours_played" DECIMAL(3,1) NOT NULL,
    "session_date" DATE NOT NULL,
    "stakes" VARCHAR(255),
    "notes" VARCHAR(255),
    "venue_id" INT REFERENCES venues(id) NOT NULL,
    "user_id" INT REFERENCES users(id) NOT NULL
);