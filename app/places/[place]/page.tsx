import { eq } from "drizzle-orm";
import { db } from "../../../drizzle";
import { homestay } from "../../../drizzle/schema";
import NavBar from "../../components/navBar";
import HomestayCard from "./components/homestayCard";
import { getAllHomestaysByLocation } from "@/data/homestay-dto";

export default async function Place({
	params,
	searchParams,
}: {
	params: { place: string };
	searchParams: { id: string };
}) {
	const homestays = await getAllHomestaysByLocation(params.place);
	return (
		<div className="flex flex-col items-center justify-center w-full">
			<NavBar>
				<span>
					Homestays in&nbsp;
					<span className="font-bold text-fuchsia-400">{params.place}</span>
				</span>
			</NavBar>
			<div className="flex flex-col items-center justify-center w-full gap-8 p-8">
				{homestays?.length ? (
					homestays.map((homestay) => (
						<HomestayCard key={homestay.id} homestay={homestay} />
					))
				) : (
					<h2 className="flex items-center justify-center p-4 text-sm">
						We are trying hard to make one&nbsp;
						<span className="text-fuchsia-400">soon</span>!
					</h2>
				)}
			</div>
		</div>
	);
}
