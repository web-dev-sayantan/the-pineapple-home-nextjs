import { Card } from "@/components/ui/card";
import InvoiceForm from "../components/invoiceForm";

export default function CreateInvoice() {
	return (
		<div className="container flex flex-col items-center">
			<div className="flex flex-col items-center w-full md:w-[30rem] gap-4 py-8 md:px-8">
				<h1 className="w-full p-4 mb-4 text-2xl font-bold text-center rounded-sm text-primary">
					Generate Invoice
				</h1>
				<Card className="w-full p-4 md:p-8 bg-white/40">
					<InvoiceForm />
				</Card>
			</div>
		</div>
	);
}
