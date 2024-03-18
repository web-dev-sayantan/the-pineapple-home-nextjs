import NavBar from "../components/navBar";
import { getAllHomestays } from "@/data/homestay-dto";
import HomestayCard from "@/app/places/[place]/components/homestayCard";

export default async function HomestaysB2B() {
	const homestays = await getAllHomestays();
	return (
		<div className="relative flex flex-col items-center justify-center">
			<NavBar>
				<span className="text-primary">B2B Rates</span>
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
