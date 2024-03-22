import {
	getAmenities,
	getBreakfastItems,
	getDinnerItems,
	getLunchItems,
	getSnacksItems,
} from "@/data/admin/invoice-dto";
import InvoiceForm from "../components/invoiceForm";
import NavBar from "@/app/components/navBar";

export default async function CreateInvoice({
	params,
}: { params: { homestay: string } }) {
	const [breakfast, lunch, dinner, snacks, amenities] = await Promise.all([
		getBreakfastItems(),
		getLunchItems(),
		getDinnerItems(),
		getSnacksItems(),
		getAmenities(),
	]);
	return (
		<>
			<NavBar>Generate Invoice</NavBar>
			<div className="container flex flex-col items-center">
				<div className="flex flex-col items-center w-full md:w-[30rem] gap-4 py-8 md:px-8">
					<InvoiceForm
						homestayId={params.homestay}
						autocompleteItems={{
							breakfast,
							lunch,
							dinner,
							snacks,
							amenities,
						}}
					/>
				</div>
			</div>
		</>
	);
}
