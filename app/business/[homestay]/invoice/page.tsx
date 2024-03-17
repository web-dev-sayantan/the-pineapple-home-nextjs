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

export default async function Invoice() {
	const invoices = await getAllInvoices();
	return (
		<>
			<NavBar>Invoices</NavBar>
			<div className="grid w-full grid-cols-1 gap-4 p-8 md:grid-cols-3">
				{invoices?.length ? (
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
									<Button
										variant="default"
										className="w-full md:w-auto hover:bg-primary/80 hover:text-primary-foreground"
									>
										<Link href={`invoice/${invoice.id}`}>View</Link>
									</Button>
								</CardFooter>
							</Card>
						))}
					</>
				) : (
					<div className="flex items-center justify-center w-full p-4">
						<div className="flex items-center gap-2 text-secondary-foreground">
							<span>No invoices found</span>
							<Link
								href="invoice/generate"
								className="font-bold underline text-accent"
							>
								Generate Invoice
							</Link>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
