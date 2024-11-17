import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const serverEnv = createEnv({
	server: {
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),

		POSTGRES_URL: z.string(),
	},
	experimental__runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});

export type ServerEnv = typeof serverEnv;