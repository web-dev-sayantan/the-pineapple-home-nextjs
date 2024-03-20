import { Card } from "@/components/ui/card";
import InvoiceForm from "../components/invoiceForm";
import NavBar from "@/app/components/navBar";

export default function CreateInvoice({
	params,
}: { params: { homestay: string } }) {
	return (
		<>
			<NavBar>Generate Invoice</NavBar>
			<div className="container flex flex-col items-center">
				<div className="flex flex-col items-center w-full md:w-[30rem] gap-4 py-8 md:px-8">
					<InvoiceForm homestayId={params.homestay} />
				</div>
			</div>
		</>
	);
}
