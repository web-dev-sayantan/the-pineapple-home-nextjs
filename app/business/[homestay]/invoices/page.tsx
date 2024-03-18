import NavBar from "@/app/components/navBar";
import { Card, CardContent } from "@/components/ui/card";
import { getAllInvoices } from "@/data/admin/invoice-dto";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import InvoiceCard from "@/app/business/[homestay]/invoices/components/InvoiceCard";

export default async function Invoice({
	params,
}: { params: { homestay: string } }) {
	const invoices = await getAllInvoices(params.homestay);
	return (
		<>
			<NavBar>Invoices</NavBar>
			{invoices?.length ? (
				<div className="grid w-full grid-cols-1 gap-4 p-8 md:grid-cols-3">
					<Card className="flex flex-col justify-between">
						<Link href="invoices/generate" className="w-full h-full font-bold">
							<CardContent className="flex flex-col items-center justify-center h-full gap-1 pt-6">
								<div className="flex items-center justify-center w-full gap-1 px-4 py-2 text-accent-foreground/70">
									<PlusIcon width={20} height={20} className="font-bold " /> New
									Invoice
								</div>
							</CardContent>
						</Link>
					</Card>
					{invoices.map((invoice) => (
						<InvoiceCard key={invoice.id} invoice={invoice} />
					))}
				</div>
			) : (
				<div className="flex md:items-center justify-center w-full h-[calc(100%-6rem)] p-4">
					<div className="flex flex-col items-center w-full gap-2 text-secondary-foreground">
						<Card className="flex flex-col justify-between w-full md:w-auto md:basis-1/3">
							<Link
								href="invoices/generate"
								className="w-full h-full font-bold"
							>
								<CardContent className="flex flex-col items-center justify-center h-full gap-1 pt-6">
									<div className="flex items-center justify-center w-full gap-1 px-4 py-2 text-accent-foreground/70">
										<PlusIcon width={20} height={20} className="font-bold " />{" "}
										New Invoice
									</div>
								</CardContent>
							</Link>
						</Card>
						<div className="py-4">No invoices created yet.</div>
					</div>
				</div>
			)}
		</>
	);
}
