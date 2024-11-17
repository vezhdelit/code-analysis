import { serverEnv } from "@/env/server";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./src/server/db/migrations",
	schema: "./src/server/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: serverEnv.POSTGRES_URL,
	},
});
