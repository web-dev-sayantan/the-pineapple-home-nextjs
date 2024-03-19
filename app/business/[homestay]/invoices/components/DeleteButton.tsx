"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";

export default function DeleteButton({
	invoiceId,
	deleteInvoice,
}: {
	invoiceId: number;
	deleteInvoice: (id: number) => Promise<number | null>;
}) {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="destructive"
					className="hover:bg-destructive/80 hover:text-primary-foreground"
				>
					Delete
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete this
						invoice.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="justify-end">
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Cancel
						</Button>
					</DialogClose>
					<Button
						variant="destructive"
						onClick={async () => {
							await deleteInvoice(invoiceId);
							setOpen(false);
						}}
						className="hover:bg-destructive/80 hover:text-primary-foreground"
					>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
