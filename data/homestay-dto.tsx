import { db } from "@/drizzle";
import { eq } from "drizzle-orm";
import { homestay } from "../drizzle/schema";

export async function getHomestayById(homestayId: string) {
	return await db
		.select({
			id: homestay.id,
			name: homestay.name,
		})
		.from(homestay)
		.where(eq(homestay.id, homestayId));
}
