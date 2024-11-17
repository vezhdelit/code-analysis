CREATE TABLE IF NOT EXISTS "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"done" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp
);
