import { db } from "@/drizzle";
import { eq } from "drizzle-orm";
import { homestay } from "../drizzle/schema";

export async function getHomestayById(homestayId: string) {
  return await db.query.homestay.findFirst({
    where: eq(homestay.id, homestayId),
  });
}
