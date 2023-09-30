import type { Config } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";
import { cwd } from "node:process";

loadEnvConfig(cwd());

if (!process.env.RAILWAY_DATABASE_URL) {
  throw new Error("RAILWAY_DATABASE_URL is missing");
}

export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.RAILWAY_DATABASE_URL,
  },
  strict: true,
} satisfies Config;
