import { addDays, startOfDay } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import NavBar from "@/app/components/navBar";
import { TZ_IN } from "@/app/constants";
import BookingButton from "@/app/places/[place]/[homestay]/components/bookingButton";
import RoomCard from "@/app/places/[place]/[homestay]/components/roomCard";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "@/components/ui/carousel";
import { DatePickerWithRange } from "@/components/ui/dateRangePicker";
import { getHomestayWithRoomDataById } from "@/data/homestay-dto";
import { getAvailableRatesByDate } from "@/data/rooms-dto";
import Image from "next/image";
import { AvailableRoomRate } from "@/types/available-room-rates";

export default async function Homestay({
	params,
}: {
	params: { place: string; homestay: string };
}) {
	const homestayData = await getHomestayWithRoomDataById(params.homestay);
	const availableRates = await getAvailableRatesByDate(params.homestay, {
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
	const homestayCoverImages = homestayData?.homestayGallery.filter(
		(image: { category: string }) => image.category === "cover",
	);

	const mapLink = `http://www.google.com/maps/place/${homestayData?.location.lat},${homestayData?.location.long}`;
	const recommendedRoom = Object.values(rooms).find(
		(room) => room.houseRecommendation,
	);

	return (
		<main className="relative flex flex-col items-center justify-center">
			<NavBar>
				<span className="text-primary">{homestayData?.name}</span>
			</NavBar>
			{homestayData ? (
				<>
					<div className="w-full">
						<div className="relative w-full cover">
							{homestayData && homestayCoverImages?.length ? (
								<>
									<Carousel
										opts={{
											align: "center",
											containScroll: false,
											loop: true,
											duration: 40,
										}}
										className="w-full"
									>
										<CarouselContent className="basis-1">
											{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
											{homestayCoverImages.map((image: any) => (
												<CarouselItem key={image.url} className="p-0">
													<div className="p-0">
														<Card>
															<CardContent className="flex items-center justify-center p-0 aspect-video">
																<Image
																	src={image.url}
																	alt={homestayData.name}
																	width={800}
																	height={200}
																	priority
																	className="w-full h-full"
																/>
															</CardContent>
														</Card>
													</div>
												</CarouselItem>
											))}
										</CarouselContent>
										<CarouselPrevious variant={"ghost"} />
										<CarouselNext variant={"ghost"} />
									</Carousel>
								</>
							) : null}
							<div className="absolute flex flex-col items-center justify-center w-full gap-2 px-4 -translate-x-1/2 -translate-y-1/2 md:flex-row top-1/2 left-1/2">
								<DatePickerWithRange />
							</div>
						</div>
						<h1 className="flex items-center justify-between w-full p-4 font-semibold text-primary/70">
							<span>
								{homestayData.location.name}, {homestayData.location.state}
							</span>
							<a title="Open Map Location" href={mapLink}>
								<i className="material-symbol-outlined text-primary">
									location_on
								</i>
							</a>
						</h1>
						<div className="grid grid-flow-row-dense gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:px-4 md:items-start md:justify-start md:flex-row md:flex-wrap">
							{recommendedRoom && (
								<RoomCard
									room={recommendedRoom}
									key={recommendedRoom.roomId}
									homestayId={params.homestay}
								/>
							)}
							{Object.values(rooms)
								.filter((room) => !room.houseRecommendation)
								.map((room) => (
									<RoomCard
										room={room}
										key={room.roomId}
										homestayId={params.homestay}
									/>
								))}
						</div>
					</div>
					<BookingButton />
				</>
			) : null}
		</main>
	);
}
