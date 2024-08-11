import "server-only";
import { and, asc, eq, gt, gte, inArray, lt } from "drizzle-orm";
import { db } from "@/drizzle";
import { availability, homestay, rate, room } from "@/drizzle/schema";
import { toZonedTime } from "date-fns-tz";
import { addDays, startOfDay } from "date-fns";
import { TZ_IN } from "@/app/constants";
import { AvailableRoomRate } from "@/types/available-room-rates";

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

export async function getAvailableRoomsByDate(
	homestayId: string,
	toDate?: Date,
	fromDate?: Date,
) {
	const availableRates = await getAvailableRatesByDate(homestayId, {
		from: toZonedTime(startOfDay(addDays(new Date(), 3)), TZ_IN),
		to: toZonedTime(startOfDay(addDays(new Date(), 5)), TZ_IN),
	});
	const rooms: {
		[key: string]: AvailableRoomRate;
	} = {};
	for (const rate of availableRates) {
		if (!rooms[rate.rateData.roomId]) {
			rooms[rate.rateData.roomId] = {
				roomId: rate.rateData.roomId,
				name: rate.rateData.room.name,
				description: rate.rateData.room.description,
				isDorm: rate.rateData.room.isDorm,
				houseRecommendation: rate.rateData.room.houseRecommendation,
				categoryId: rate.rateData.room.categoryId,
				roomGallery: rate.rateData.room.roomGallery,
				rates: [
					{
						rateId: rate.rateId,
						rate: rate.rate,
						headCount: rate.rateData.headCount,
						refundable: rate.rateData.refundable,
						name: rate.rateData.name,
					},
				],
				avlCount: rate.avlCount,
				stayDate: rate.stayDate,
			};
		} else {
			if (
				!rooms[rate.rateData.roomId].rates.find((r) => r.rateId === rate.rateId)
			) {
				rooms[rate.rateData.roomId].rates.push({
					rateId: rate.rateId,
					name: rate.rateData.name,
					refundable: rate.rateData.refundable,
					rate: rate.rate,
					headCount: rate.rateData.headCount,
				});
			} else {
				// update rate since multiple rates with same id is found
				rooms[rate.rateData.roomId].rates = rooms[
					rate.rateData.roomId
				].rates.map((r) => ({
					...r,
					rate: r.rate + (r.rateId === rate.rateId ? rate.rate : 0),
				}));
			}
			rooms[rate.rateData.roomId].avlCount =
				rooms[rate.rateData.roomId].avlCount < rate.avlCount
					? rooms[rate.rateData.roomId].avlCount
					: rate.avlCount;
		}
	}
	return Object.values(rooms);
}
