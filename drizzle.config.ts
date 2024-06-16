import type { Config } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";
import { cwd } from "node:process";

loadEnvConfig(cwd());

if (!process.env.TURSO_DATABASE_URL) {
  throw new Error("TURSO_DATABASE_URL is missing");
}

export default {
  dialect: "sqlite",
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL,
  },
  strict: true,
} satisfies Config;
