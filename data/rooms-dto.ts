import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/drizzle";
import { room } from "@/drizzle/schema";

export async function getRoomsByHomestayId(homestayId: string) {
	return await db.query.room.findMany({
		where: eq(room.homestayId, homestayId),
		columns: {
			id: true,
			name: true,
			occupancy: true,
			description: true,
		},
		with: {
			rates: {
				columns: {
					id: true,
					tariff: true,
					headCount: true,
				},
			},
			roomGallery: {
				columns: {
					url: true,
					category: true,
				},
			},
		},
	});
}
