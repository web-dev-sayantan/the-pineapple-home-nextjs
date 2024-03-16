import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

if (!process.env.RAILWAY_DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

// biome-ignore lint/complexity/noBannedTypes: <explanation>
let client: postgres.Sql<{}>;

if (process.env.NODE_ENV === "production") {
  client = postgres(process.env.RAILWAY_DATABASE_URL);
} else {
  //@ts-ignore
  if (!global.client) {
    //@ts-ignore
    global.client = postgres(process.env.RAILWAY_DATABASE_URL);
  }
  //@ts-ignore
  client = global.client;
}
const clients = postgres(process.env.RAILWAY_DATABASE_URL);
export const db = drizzle(client, { schema, logger: true });
