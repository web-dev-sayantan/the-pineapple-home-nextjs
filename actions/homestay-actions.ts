"use server";
import { getFoodPlans } from "@/data/foodplan-dto";
import { getHomestayWithRoomDataById } from "@/data/homestay-dto";
import { getAvailableRatesByDate } from "@/data/rooms-dto";
import { DateRange } from "react-day-picker";

export async function getHomestayWithRoomDataAction(id: string) {
	return await getHomestayWithRoomDataById(id);
}

export async function getFoodPlansAction(homestayId: string) {
	return await getFoodPlans(homestayId);
}

export async function getAvailableRoomsByDateAction(
	homestayId: string,
	dateRange: DateRange,
) {
	return await getAvailableRatesByDate(homestayId, dateRange);
}
