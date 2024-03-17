"use client";
import { Button } from "@/components/ui/button";

export default function DeleteButton({
	invoiceId,
	deleteInvoice,
}: { invoiceId: number; deleteInvoice: (id: number) => void }) {
	return (
		<Button
			variant="destructive"
			onClick={() => {
				deleteInvoice(invoiceId);
			}}
			className="hover:bg-destructive/80 hover:text-primary-foreground"
		>
			Delete
		</Button>
	);
}
