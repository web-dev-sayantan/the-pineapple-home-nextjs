import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

if (!process.env.RAILWAY_DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

const client = postgres(process.env.RAILWAY_DATABASE_URL);
export const db = drizzle(client, { schema, logger: true });

await db.delete(schema.invoiceAccomodation);
await db.delete(schema.invoiceFood);
await db.delete(schema.invoiceAmenities);
db.delete(schema.invoice);
