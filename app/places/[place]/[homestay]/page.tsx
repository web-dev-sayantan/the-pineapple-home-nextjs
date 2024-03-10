import Image from "next/image";
import NavBar from "../../../components/navBar";
import RoomCard from "./components/roomCard";
import BookingButton from "./components/bookingButton";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { eq } from "drizzle-orm";
import { db } from "@/drizzle";
import { homestay } from "@/drizzle/schema";

function getHomestayById(id: string) {
	if (typeof id !== "string" || id.trim() === "") {
		throw new Error("Invalid id parameter");
	}
	const homestayData = db.query.homestay.findFirst({
		where: eq(homestay.id, id),
		columns: {
			name: true,
		},
		with: {
			location: {
				columns: {
					name: true,
					state: true,
					lat: true,
					long: true,
				},
			},
			rooms: {
				with: {
					categories: {
						columns: {
							id: true,
							name: true,
							description: true,
						},
					},
					rates: {
						columns: {
							id: true,
							tariff: true,
							headCount: true,
						},
					},
				},
			},
			homestayGallery: {
				columns: {
					url: true,
					category: true,
				},
			},
		},
	});
	if (!homestayData) {
		throw new Error(`Homestay with id ${id} not found`);
	}

	return homestayData;
}

export default async function Homestay({
	params,
}: {
	params: { place: string; homestay: string };
}) {
	const homestayData = await getHomestayById(params.homestay);
	const homestayCoverImages = homestayData?.homestayGallery.filter(
		(image) => image.category === "cover",
	);
	const mapLink = `http://www.google.com/maps/place/${homestayData?.location.lat},${homestayData?.location.long}`;
	if (homestay) {
		return (
			<div className="relative flex flex-col items-center justify-center">
				<NavBar>
					<span className="text-primary">{homestayData?.name}</span>
				</NavBar>
				{homestayData ? (
					<>
						<div className="w-full">
							<div className="relative w-full cover">
								{homestay && homestayCoverImages ? (
									<>
										<Carousel
											opts={{
												align: "start",
											}}
											className="w-full"
										>
											<CarouselContent className="basis-1">
												{homestayCoverImages.map((image) => (
													<CarouselItem key={image.url} className="">
														<div className="p-1">
															<Card>
																<CardContent className="flex items-center justify-center p-6 aspect-square">
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
											<CarouselPrevious />
											<CarouselNext variant={"ghost"} />
										</Carousel>
									</>
								) : null}
								<div className="absolute top-0 flex-wrap p-4 text-4xl tracking-wide text-purple-200 capitalize">
									{homestayData.name}
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
							<div className="rooms">
								{homestayData.rooms.map((room) => (
									<RoomCard room={room} key={room.id} />
								))}
							</div>
						</div>
						<BookingButton />
					</>
				) : null}
			</div>
		);
	}
}
