import NavBar from "@/app/components/navBar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { getAllInvoices } from "@/data/admin/invoice-dto";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function Invoice({
	params,
}: { params: { homestay: string } }) {
	const invoices = await getAllInvoices(params.homestay);
	return (
		<>
			<NavBar>Invoices</NavBar>
			{invoices?.length ? (
				<div className="grid w-full grid-cols-1 gap-4 p-8 md:grid-cols-3">
					<>
						<Card className="flex flex-col justify-between">
							<Link href="invoice/generate" className="w-full h-full font-bold">
								<CardContent className="flex flex-col items-center justify-center h-full gap-1 pt-6">
									<div className="flex items-center justify-center w-full gap-1 px-4 py-2 text-accent-foreground/70">
										<PlusIcon width={20} height={20} className="font-bold " />{" "}
										New Invoice
									</div>
								</CardContent>
							</Link>
						</Card>
						{invoices.map((invoice) => (
							<Card className="flex flex-col justify-between" key={invoice.id}>
								<CardHeader className="w-full text-center">
									<h2 className="font-bold text-md">Invoice {invoice.id}</h2>
								</CardHeader>
								<CardContent className="flex flex-col gap-1">
									<div className="flex items-center gap-2 text-md">
										<span className="font-bold">Guest Name: </span>
										<span>{invoice.guestName}</span>
									</div>
									<div className="flex items-center gap-2 text-md">
										<span className="font-bold">Date: </span>
										<span className="">
											{invoice.invoiceDate.toDateString()}
										</span>
									</div>
								</CardContent>
								<CardFooter className="flex items-center justify-end w-full">
									<Link href={`invoice/${invoice.id}`} className="w-full">
										<Button
											variant="default"
											className="w-full hover:bg-primary/80 hover:text-primary-foreground"
										>
											View Invoice
										</Button>
									</Link>
								</CardFooter>
							</Card>
						))}
					</>
				</div>
			) : (
				<div className="flex md:items-center justify-center w-full h-[calc(100%-6rem)] p-4">
					<div className="flex flex-col items-center w-full gap-2 text-secondary-foreground">
						<Card className="flex flex-col justify-between w-full md:w-auto md:basis-1/3">
							<Link href="invoice/generate" className="w-full h-full font-bold">
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
