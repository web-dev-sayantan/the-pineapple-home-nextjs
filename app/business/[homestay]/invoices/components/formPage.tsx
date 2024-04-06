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
import { MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import {
	Controller,
	UseFieldArrayReturn,
	UseFormReturn,
} from "react-hook-form";
import { useState } from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
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
	autoCompleteItems,
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
	autoCompleteItems: { name: string; rate: number }[];
}) {
	const [showSuggestions, setShowSuggestions] = useState(false);
	return (
		<div className="flex flex-col gap-6">
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
							{/* Autocomplete */}

							<FormField
								control={form.control}
								name={`${type}.${index}.name`}
								render={({ field }) => (
									<FormItem className="flex flex-col w-full">
										<FormLabel>Item Name:</FormLabel>
										{type !== "accomodation" ? (
											<Popover
												open={showSuggestions}
												onOpenChange={setShowSuggestions}
											>
												<PopoverTrigger asChild>
													<Input
														type="text"
														{...field}
														{...form.register(`${type}.${index}.name`, {
															onChange: (e) => {
																console.log("Changed Item name");
																// if (
																// 	!showSuggestions &&
																// 	autoCompleteItems.length
																// ) {
																// 	setShowSuggestions(true);
																// }
															},
															// onBlur: (e) => {
															// 	console.log(
															// 		"Blurred Item name",
															// 		showSuggestions,
															// 	);
															// 	// setShowSuggestions(false);
															// },
														})}
														// onFocus={() => {
														// 	console.log("Focused Item name");
														// 	// setShowSuggestions(true);
														// }}
													/>
												</PopoverTrigger>
												<PopoverContent>
													{autoCompleteItems
														.filter((item) =>
															item.name
																.toLowerCase()
																.includes(
																	form
																		.getValues(`${type}.${index}.name`)
																		.toLowerCase(),
																),
														)
														.map((item) => (
															<div
																key={item.name}
																className="w-full p-2 rounded-md cursor-pointer hover:bg-accent hover:text-primary-foreground focus:border-red-100"
																onClick={() => {
																	form.setValue(
																		`${type}.${index}.name`,
																		item.name,
																	);
																	form.setValue(
																		`${type}.${index}.rate`,
																		item.rate,
																	);
																	setShowSuggestions(false);
																}}
																onKeyDown={(e) => {
																	if (e.key === "Enter") {
																		form.setValue(
																			`${type}.${index}.name`,
																			item.name,
																		);
																		form.setValue(
																			`${type}.${index}.rate`,
																			item.rate,
																		);
																		setShowSuggestions(false);
																	}
																}}
															>
																{item.name}
															</div>
														))}
												</PopoverContent>
											</Popover>
										) : (
											<Input
												type="text"
												{...field}
												{...form.register(`${type}.${index}.name`)}
											/>
										)}
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
											Rate per{" "}
											{type === "accomodation"
												? "night"
												: type === "amenities"
												  ? "unit"
												  : "plate"}
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
							<FormField
								control={form.control}
								name={`${type}.${index}.quantity`}
								render={({ field }) => (
									<FormItem className="flex flex-col w-full">
										<FormLabel>
											{type === "accomodation" ? "No. of Nights" : "Quantity"}:
										</FormLabel>
										<div className="flex">
											<Button
												type="button"
												variant={"outline"}
												className="p-2"
												onClick={() =>
													field.value > 1 && field.onChange(field.value - 1)
												}
											>
												<MinusIcon />
											</Button>
											<Input
												type="number"
												{...field}
												{...form.register(`${type}.${index}.quantity`)}
											/>
											<Button
												type="button"
												variant={"outline"}
												className="p-2"
												onClick={() =>
													field.value < 20 && field.onChange(field.value + 1)
												}
											>
												<PlusIcon />
											</Button>
										</div>
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

			<Button
				variant={"outline"}
				className="mb-2 font-bold text-primary hover:bg-primary/90 hover:text-primary-foreground"
				onClick={(e) => {
					e.preventDefault();
					onAppend();
				}}
			>
				Add Item
			</Button>
		</div>
	);
}
