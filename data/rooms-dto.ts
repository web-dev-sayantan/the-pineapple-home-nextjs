import "server-only";
import { and, asc, eq, gt, gte, inArray, lt } from "drizzle-orm";
import { db } from "@/drizzle";
import { availability, homestay, rate, room } from "@/drizzle/schema";

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

export async function getAvailableRatesByDate(
	homestayId: string,
	dataRange: { from: Date | undefined; to?: Date | undefined },
) {
	if (!dataRange.from || !dataRange.to) {
		return [];
	}
	return await db.query.availability.findMany({
		where: and(
			inArray(
				availability.rateId,
				db
					.select({ id: rate.id })
					.from(rate)
					.where(
						inArray(
							rate.roomId,
							db
								.select({ id: room.id })
								.from(room)
								.where(eq(room.homestayId, homestayId)),
						),
					),
			),
			gte(availability.stayDate, dataRange.from),
			lt(availability.stayDate, dataRange.to),
			gt(availability.avlCount, 0),
		),
		columns: {
			rateId: true,
			stayDate: true,
			avlCount: true,
			rate: true,
		},
		orderBy: [asc(availability.rateId), asc(availability.stayDate)],
		with: {
			rateData: {
				columns: {
					id: true,
					roomId: true,
					refundable: true,
					headCount: true,
					name: true,
				},
				with: {
					room: {
						columns: {
							name: true,
							occupancy: true,
							isDorm: true,
							categoryId: true,
							roomCount: true,
							toiletAttached: true,
							description: true,
							houseRecommendation: true,
						},
						with: {
							roomGallery: {
								columns: {
									url: true,
									category: true,
								},
							},
						},
					},
				},
			},
		},
	});
}
