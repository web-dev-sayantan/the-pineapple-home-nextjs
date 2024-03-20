import InvoiceForm from "@/app/business/[homestay]/invoices/components/invoiceForm";
import { Invoice } from "@/app/business/[homestay]/invoices/shared/shared-code";
import NavBar from "@/app/components/navBar";
import { Card } from "@/components/ui/card";
import { getInvoiceById } from "@/data/admin/invoice-dto";
import { FoodTypesEnum } from "@/drizzle/schema";

export default async function EditPage({
	params,
}: { params: { invoiceId: string; homestay: string } }) {
	const invoiceData = await getInvoiceById(+params.invoiceId, params.homestay);
	let invoice: Invoice | null = null;
	if (invoiceData) {
		invoice = {
			id: invoiceData.id,
			guestName: invoiceData.guestName,
			invoiceDate: invoiceData.invoiceDate,
			checkinDate: invoiceData.checkinDate,
			checkoutDate: invoiceData.checkoutDate,
			accomodation: invoiceData.accomodation,
			food: {
				breakfast: [],
				lunch: [],
				dinner: [],
				snacks: [],
			},
			amenities: invoiceData.amenities,
		};
		if (invoiceData.food?.length) {
			for (const food of invoiceData.food) {
				if (food.type === FoodTypesEnum.enumValues[0])
					invoice.food.breakfast.push(food);
				if (food.type === FoodTypesEnum.enumValues[1])
					invoice.food.lunch.push(food);
				if (food.type === FoodTypesEnum.enumValues[2])
					invoice.food.dinner.push(food);
				if (food.type === FoodTypesEnum.enumValues[3])
					invoice.food.snacks.push(food);
			}
		}
	}
	return (
		<>
			<NavBar>Edit Invoice {params.invoiceId}</NavBar>
			{invoice ? (
				<div className="container flex flex-col items-center">
					<div className="flex flex-col items-center w-full md:w-[30rem] gap-4 py-8 md:px-8">
						<InvoiceForm homestayId={params.homestay} invoice={invoice} />
					</div>
				</div>
			) : null}
		</>
	);
}
