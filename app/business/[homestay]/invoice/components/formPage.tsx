"use client";
import {
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Invoice } from "../shared/shared-code";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrashIcon } from "@radix-ui/react-icons";
import { Field, UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
type FieldArray =
	| UseFieldArrayReturn<Invoice, "accomodation", "id">
	| UseFieldArrayReturn<Invoice, "food.breakfast", "id">
	| UseFieldArrayReturn<Invoice, "food.lunch", "id">
	| UseFieldArrayReturn<Invoice, "food.dinner", "id">
	| UseFieldArrayReturn<Invoice, "food.snacks", "id">
	| UseFieldArrayReturn<Invoice, "amenities", "id">;
export default function FormPage({
	type,
	label,
	items,
	form,
	onAppend,
}: {
	type:
		| "accomodation"
		| "food.breakfast"
		| "food.lunch"
		| "food.dinner"
		| "food.snacks"
		| "amenities";
	label: string;
	items: FieldArray;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	form: UseFormReturn<Invoice, any, undefined>;
	onAppend: () => void;
}) {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between gap-2">
				<h1 className="text-2xl font-semibold capitalize">{label}</h1>
				<Button
					variant={"outline"}
					className="font-bold text-primary hover:bg-primary/80 hover:text-primary-foreground"
					title="Add new Item"
					onClick={(e) => {
						e.preventDefault();
						onAppend();
					}}
				>
					Add Item
				</Button>
			</div>
			{items.fields.length > 0 ? (
				items.fields.map((_, index) => (
					<div
						className="flex flex-col gap-2"
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
					>
						<hr className="border-2" />
						<div className="flex items-center justify-between">
							<h1 className="text-lg font-semibold">Item {index + 1} : </h1>
							<Button
								variant={"outline"}
								className="bg-destructive hover:bg-destructive/80"
								title="Delete"
								onClick={() => items.remove(index)}
							>
								<TrashIcon className="text-primary-foreground" />
							</Button>
						</div>
						<hr className="border-2" />
						<div className="flex flex-col gap-4 p-2">
							<FormField
								control={form.control}
								name={`${type}.${index}.name`}
								render={({ field }) => (
									<FormItem className="flex flex-col w-full">
										<FormLabel>Item Name:</FormLabel>
										<Input
											type="text"
											{...field}
											{...form.register(`${type}.${index}.name`)}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`${type}.${index}.quantity`}
								render={({ field }) => (
									<FormItem className="flex flex-col w-full">
										<FormLabel>
											{type === "accomodation" ? "No. of Nights" : "Quantity"}:
										</FormLabel>
										<Input
											type="number"
											{...field}
											{...form.register(`${type}.${index}.quantity`)}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`${type}.${index}.rate`}
								render={({ field }) => (
									<FormItem className="flex flex-col w-full">
										<FormLabel>
											Rate per {type === "accomodation" ? "night" : "plate"}
											(INR):
										</FormLabel>
										<Input
											type="number"
											{...field}
											{...form.register(`${type}.${index}.rate`)}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				))
			) : (
				<p className="text-sm text-center text-primary">No item added yet</p>
			)}
			{items.fields.length > 0 && (
				<Button
					variant={"outline"}
					className="mb-2 font-bold text-primary hover:bg-primary/90 hover:text-primary-foreground"
					onClick={(e) => {
						e.preventDefault();
						items.append({
							name: "Room 101",
							quantity: 2,
							rate: 1500,
						});
					}}
				>
					Add Item
				</Button>
			)}
		</div>
	);
}
