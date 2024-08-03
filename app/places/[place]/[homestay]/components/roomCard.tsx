import { cn } from "@/lib/utils";
import RatesTabContainer from "./ratesTabContainer";
import RoomCarousel from "./roomCarousel";
import { getFoodPlansAction } from "@/actions/homestay-actions";
import { AvailableRoomRate } from "@/types/available-room-rates";

export default async function RoomCard({
	room,
	homestayId,
}: { room: AvailableRoomRate; homestayId: string }) {
	const foodPlans = await getFoodPlansAction(homestayId);
	return (
		<div
			className={cn(
				"flex flex-col py-4 gap-4 md:rounded-lg bg-secondary",
				`row-span-${room.rates.length} ${
					room.houseRecommendation ? "ring-inset ring-2 ring-teal-400" : ""
				}`,
			)}
		>
			<div className="flex flex-col px-4 flex-grow-1">
				<div className="flex items-center justify-between gap-2">
					<h1 className="text-lg font-semibold capitalize text-primary">
						{room.name}
					</h1>
					<div className="flex items-center gap-2">
						<button type="button">
							<i className="material-symbol-outlined text-primary">
								gallery_thumbnail
							</i>
						</button>
					</div>
				</div>
				<h2 className="flex items-center gap-2 py-2">
					<span className="w-20 py-1 text-xs text-center capitalize rounded-md text-primary bg-primary/10">
						{room.categoryId}
					</span>
					{room.houseRecommendation && (
						<div className="px-2 py-1 text-xs text-center text-teal-100 bg-teal-700 rounded-md">
							Recommended
						</div>
					)}
					<span
						className={cn(
							"text-xs",
							room.avlCount > 2 ? "text-green-500" : "text-red-500",
						)}
					>
						{room.avlCount > 2 ? "" : "Only"} {room.avlCount}{" "}
						{room.isDorm ? "bed" : "room"}
						{room.avlCount > 1 ? "s" : ""} available!
					</span>
				</h2>
			</div>
			{/* Carousel */}
			<RoomCarousel images={room.roomGallery} />
			{/* Rates */}
			<div className="px-4">
				<RatesTabContainer
					rates={room.rates}
					roomId={room.roomId}
					homestayId={homestayId}
					foodPlans={foodPlans}
				/>
			</div>
		</div>
	);
}
