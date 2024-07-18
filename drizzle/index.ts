import { drizzle } from "drizzle-orm/libsql";
import { createClient, Client } from "@libsql/client";

import * as schema from "./schema";

let client: Client;

if (process.env.NODE_ENV === "production" && process.env.TURSO_DATABASE_URL) {
  client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
} else {
  //@ts-ignore
  if (!global.client && process.env.TURSO_DATABASE_URL) {
    //@ts-ignore
    global.client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  //@ts-ignore
  client = global.client;
}
export const db = drizzle(client, {
  schema,
  logger: process.env.NODE_ENV !== "production",
});
