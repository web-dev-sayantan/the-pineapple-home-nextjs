import React from "react";
import { getRoomsByHomestayId } from "../../../data/rooms-dto";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "../../../components/ui/carousel";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import Image from "next/image";
import NavBar from "../../components/navBar";
import { getHomestayById } from "../../../data/homestay-dto";
import PersonsIcon from "../../../components/ui/personsIcon";
import Link from "next/link";

export default async function RoomsB2B({
	params,
}: { params: { homestay: string } }) {
	const rooms = await getRoomsByHomestayId(params.homestay);
	const homestay = await getHomestayById(params.homestay);
	return (
		<div className="flex flex-col items-center gap-8">
			<NavBar>{homestay?.name}</NavBar>
			<div className="flex flex-col w-full gap-4 px-4">
				<Card>
					<CardHeader className="w-full text-lg font-bold text-center uppercase">
						Your Actions
					</CardHeader>
					<CardContent className="flex flex-col justify-center gap-4 p-6">
						<Link
							href={`/business/${params.homestay}/b2b`}
							className="font-bold underline text-primary underline-offset-2"
						>
							B2B Rates
						</Link>
						<Link
							href={`/business/${params.homestay}/invoices`}
							className="font-bold underline text-primary underline-offset-2"
						>
							Invoices
						</Link>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
