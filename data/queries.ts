// "use server";
// import {
//   getFoodPlansAction,
//   getHomestayWithRoomDataAction,
// } from "@/actions/homestay-actions";
// import { TZ_IN } from "@/app/constants";
// import { getAvailableRoomsByDate } from "@/data/rooms-dto";
// import { queryOptions } from "@tanstack/react-query";
// import { addDays, getUnixTime, startOfDay } from "date-fns";
// import { toZonedTime } from "date-fns-tz";
// import { DateRange } from "react-day-picker";

// export const homestayOptions = async (id: string) =>
//   queryOptions({
//     queryKey: ["homestay", id],
//     queryFn: async () => getHomestayWithRoomDataAction(id),
//   });
// export const foodPlanOptions = async (homestayId: string) =>
//   queryOptions({
//     queryKey: ["foodPlan", homestayId],
//     queryFn: async () => {
//       try {
//         const data = await getFoodPlansAction(homestayId);
//         return data;
//       } catch (error) {
//         throw new Error("Error fetching food plans");
//       }
//     },
//   });

// export const availableRoomOptions = async (
//   homestayId: string,
//   dateRange: DateRange
// ) =>
//   queryOptions({
//     queryKey: [
//       "rooms",
//       homestayId,
//       getUnixTime(startOfDay(toZonedTime(dateRange.from || new Date(), TZ_IN))),
//       getUnixTime(
//         startOfDay(toZonedTime(dateRange.to || addDays(new Date(), 2), TZ_IN))
//       ),
//     ],
//     queryFn: async () => {
//       try {
//         const data = await getAvailableRoomsByDate(homestayId, dateRange);
//         if (dateRange.from)
//           console.log("Available rooms on ", getUnixTime(dateRange.from), data);
//         return data;
//       } catch (error) {
//         console.log("Available rooms on ", error);
//         throw new Error(`${error}`);
//       }
//     },
//   });
