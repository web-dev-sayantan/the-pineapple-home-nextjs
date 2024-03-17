import React from "react";
import { getRoomsByHomestayId } from "../../../data/rooms-dto";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "../../../components/ui/carousel";
import { Card, CardContent } from "../../../components/ui/card";
import Image from "next/image";
import NavBar from "../../components/navBar";
import { getHomestayById } from "../../../data/homestay-dto";
import PersonsIcon from "../../../components/ui/personsIcon";

export default async function RoomsB2B({
	params,
}: { params: { homestay: string } }) {
	const rooms = await getRoomsByHomestayId(params.homestay);
	const homestay = await getHomestayById(params.homestay);
	return (
		<div className="flex flex-col items-center gap-8">
			<NavBar>{homestay?.name}</NavBar>
			<div className="flex flex-col w-full gap-8 px-4">
				{rooms?.map((room) => (
					<RoomCard
						key={room.id}
						name={room.name}
						occupancy={room.occupancy}
						gallery={room.roomGallery}
						price={room.rates[0] ? room.rates[0].tariff : 1400}
					/>
				))}
			</div>
		</div>
	);
}

const RoomCard = ({
	name,
	occupancy,
	price,
	gallery,
}: {
	name: string;
	occupancy: number;
	price: number;
	gallery: { url: string; category: string }[];
}) => {
	return (
		<div className="w-full rounded-lg shadow-md md:w-1/2 bg-background">
			<Card>
				<CardContent className="flex flex-col items-center justify-center p-6 aspect-square">
					{gallery.length > 0 && (
						<Carousel
							opts={{
								align: "start",
							}}
							className="w-full"
						>
							<CarouselContent className="basis-1">
								{gallery.map((image) => (
									<CarouselItem key={image.url} className="">
										<Image
											src={image.url}
											alt={name}
											width={800}
											height={200}
											priority
											className="w-full h-full border-2 rounded-lg"
										/>
									</CarouselItem>
								))}
							</CarouselContent>
						</Carousel>
					)}
					<div className="text-2xl description">{name}</div>
					<div className="flex text-primary">
						{occupancy && <PersonsIcon headCount={occupancy} />}
					</div>
					<div className="text-3xl font-bold price text-accent">
						Rs. {price} /-
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

// clk00g5c100011dsvn4hfpdjm - 102
// clk00g5c000001dsvt20qlqwe - 101
// clk00g5c100051dsv0xa7c04r - 201
// clk00g5c100041dsv669t9jhe - 202
// clk00g5c100031dsv8gj29a1f - 203
