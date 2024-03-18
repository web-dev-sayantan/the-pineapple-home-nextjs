import DeleteButton from "@/app/business/[homestay]/invoices/components/DeleteButton";
import { deleteInvoiceAction } from "@/app/business/[homestay]/invoices/server-actions/server-actions";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { deleteInvoice } from "@/data/admin/invoice-dto";
import Link from "next/link";

export type InvoiceCardProps = {
	id: number;
	homestayId: string;
	guestName: string;
	invoiceDate: Date;
	checkinDate: Date;
	checkoutDate: Date;
	isDeleted: boolean;
};

export default async function InvoiceCard({
	invoice,
}: { invoice: InvoiceCardProps }) {
	return (
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
					<span className="">{invoice.invoiceDate.toDateString()}</span>
				</div>
			</CardContent>
			<CardFooter className="flex flex-col items-center justify-end w-full gap-2">
				<div className="flex items-center justify-between w-full gap-2">
					<Link href={`invoices/${invoice.id}/edit`} className="w-full">
						<Button
							variant="accent"
							className="w-full hover:text-primary-foreground"
						>
							Edit
						</Button>
					</Link>
					{invoice.id && (
						<DeleteButton
							invoiceId={invoice.id}
							deleteInvoice={deleteInvoiceAction}
						/>
					)}
				</div>
				<Link href={`invoices/${invoice.id}`} className="w-full">
					<Button
						variant="default"
						className="w-full hover:bg-primary/80 hover:text-primary-foreground"
					>
						View Invoice
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}
