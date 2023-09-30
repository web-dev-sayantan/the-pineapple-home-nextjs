import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

if (!process.env.RAILWAY_DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

const client = postgres(process.env.RAILWAY_DATABASE_URL);
export const db = drizzle(client, { schema });
