"use client";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { differenceInCalendarDays, subDays } from "date-fns";
import { z } from "zod";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Invoice, invoiceSchema } from "../shared/shared-code";
import { DateFieldsType, DatePicker, DateRangePicker } from "./datePicker";
import FormPage from "./formPage";
import { generateInvoice } from "../server-actions/server-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

const defaultValues = {
	guestName: "",
	invoiceDate: new Date(),
	stayDuration: {
		from: subDays(new Date(), 2),
		to: new Date(),
	},
	accomodation: [
		{
			name: "Room 101",
			quantity: 2,
			rate: 1500,
		},
	],
	food: {
		breakfast: [],
		lunch: [],
		dinner: [],
		snacks: [],
	},
	amenities: [],
};

export type AutocompleteItemsType = {
	breakfast: { name: string; rate: number }[];
	lunch: { name: string; rate: number }[];
	dinner: { name: string; rate: number }[];
	snacks: { name: string; rate: number }[];
	amenities: { name: string; rate: number }[];
};

export default function InvoiceForm({
	homestayId,
	invoice,
	autocompleteItems,
}: {
	homestayId: string;
	invoice?: Invoice;
	autocompleteItems: AutocompleteItemsType;
}) {
	const [state, formAction] = useFormState(
		generateInvoice.bind(null, invoice ? "update" : "create"),
		{
			success: false,
		},
	);
	const form = useForm<z.infer<typeof invoiceSchema>>({
		resolver: zodResolver(invoiceSchema),
		defaultValues: {
			...(invoice ? invoice : defaultValues),
			...(state?.fields ?? {}),
		},
	});
	const accomodationList = useFieldArray({
		control: form.control,
		name: "accomodation",
	});
	const breakfastList = useFieldArray({
		control: form.control,
		name: "food.breakfast",
	});
	const lunchList = useFieldArray({
		control: form.control,
		name: "food.lunch",
	});
	const dinnerList = useFieldArray({
		control: form.control,
		name: "food.dinner",
	});
	const snacksList = useFieldArray({
		control: form.control,
		name: "food.snacks",
	});
	const amenitiesList = useFieldArray({
		control: form.control,
		name: "amenities",
	});
	const [pageNo, setPageNo] = useState(1);

	const labels = [
		"Basic Details",
		"Accomodation",
		"Breakfast",
		"Lunch",
		"Dinner",
		"Snacks",
		"Amenities",
	];
	const handleFormAction = (data: FormData) => {
		const formData = new FormData();
		if (invoice?.id) {
			formData.append("id", `${invoice.id}`);
		}
		formData.append("guestName", form.getValues("guestName"));
		formData.append("invoiceDate", form.getValues("invoiceDate").toString());
		formData.append(
			"checkinDate",
			form.getValues("stayDuration.from").toString(),
		);
		formData.append(
			"checkoutDate",
			form.getValues("stayDuration.to").toString(),
		);
		formData.append("homestayId", homestayId);
		formData.append(
			"accomodation",
			JSON.stringify(form.getValues("accomodation")),
		);
		formData.append(
			"food",
			JSON.stringify({
				breakfast: form.getValues("food.breakfast"),
				lunch: form.getValues("food.lunch"),
				dinner: form.getValues("food.dinner"),
				snacks: form.getValues("food.snacks"),
			}),
		);
		formData.append("amenities", JSON.stringify(form.getValues("amenities")));
		formAction(formData);
	};
	return (
		<Card className="w-full p-4 md:p-8 bg-secondary">
			<Form {...form}>
				<form action={handleFormAction} className="flex flex-col w-full gap-8">
					{/* Basic Details */}
					<div className="flex items-center w-full gap-2 my-2">
						<button
							type="button"
							className={cn(
								"px-4 py-1 text-lg font-semibold rounded-md basis-1/6 bg-destructive text-primary-foreground",
								{
									"opacity-60 cursor-not-allowed": pageNo === 1,
								},
							)}
							aria-disabled={pageNo === 1}
							onClick={() => {
								pageNo > 1 && setPageNo((prev) => prev - 1);
							}}
						>
							<div className="flex items-center justify-center py-2">
								<ArrowLeftIcon />
							</div>
						</button>
						<h1 className="text-2xl font-semibold text-center capitalize basis-2/3">
							{labels[pageNo - 1]}
						</h1>
						<button
							type="button"
							className={cn(
								"px-4 py-1 text-lg font-semibold rounded-md basis-1/6 bg-accent text-primary-foreground",
								{
									"opacity-60 cursor-not-allowed": pageNo === 7,
								},
							)}
							onClick={() => {
								pageNo < 7 && setPageNo((next) => next + 1);
							}}
						>
							<div className="flex items-center justify-center py-2">
								<ArrowRightIcon />
							</div>
						</button>
					</div>
					{pageNo === 1 && (
						<>
							<div className="flex flex-col gap-2">
								<FormField
									control={form.control}
									name="guestName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Guest name:</FormLabel>
											<FormControl>
												<Input
													{...form.register("guestName")}
													placeholder="Full name of guest"
													className="bg-background"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<FormField
									control={form.control}
									name={"stayDuration"}
									render={({ field }) => (
										<DateRangePicker
											label="Checkin & Checkout dates:"
											field={field}
											onSelected={(dates) => {
												if (dates.from && dates.to) {
													form
														.getValues("accomodation")
														.forEach((item, index) => {
															form.setValue(
																`accomodation.${index}.quantity`,
																differenceInCalendarDays(
																	dates.to as Date,
																	dates.from as Date,
																),
															);
														});
												}
											}}
										/>
									)}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<FormField
									control={form.control}
									name={"invoiceDate"}
									render={({ field }) => (
										<DatePicker label="Invoice date:" field={field} />
									)}
								/>
							</div>
						</>
					)}
					{/* Accomodation */}
					{pageNo === 2 && (
						<FormPage
							type="accomodation"
							label="Accomodation"
							items={accomodationList}
							autoCompleteItems={[]}
							form={form}
							onAppend={() =>
								accomodationList.append({
									name: "Room 101",
									quantity: differenceInCalendarDays(
										form.getValues("stayDuration.to"),
										form.getValues("stayDuration.from"),
									),
									rate: 1500,
								})
							}
						/>
					)}
					{/* Breakfast */}
					{pageNo === 3 && (
						<FormPage
							type="food.breakfast"
							label="Breakfast"
							items={breakfastList}
							autoCompleteItems={autocompleteItems.breakfast || []}
							form={form}
							onAppend={() =>
								breakfastList.append({
									name: "Veg Maggie",
									quantity: 2,
									rate: 50,
								})
							}
						/>
					)}
					{/* Lunch */}
					{pageNo === 4 && (
						<FormPage
							type="food.lunch"
							label="Lunch"
							items={lunchList}
							autoCompleteItems={autocompleteItems.lunch || []}
							form={form}
							onAppend={() =>
								lunchList.append({
									name: "Egg Thali",
									quantity: 2,
									rate: 150,
								})
							}
						/>
					)}
					{/* Dinner */}
					{pageNo === 5 && (
						<FormPage
							type="food.dinner"
							label="Dinner"
							items={dinnerList}
							autoCompleteItems={autocompleteItems.dinner || []}
							form={form}
							onAppend={() =>
								dinnerList.append({
									name: "Chicken Thali",
									quantity: 2,
									rate: 250,
								})
							}
						/>
					)}
					{/* Snacks */}
					{pageNo === 6 && (
						<FormPage
							type="food.snacks"
							label="Snacks"
							items={snacksList}
							autoCompleteItems={autocompleteItems.snacks || []}
							form={form}
							onAppend={() =>
								snacksList.append({
									name: "Chicken Pakora",
									quantity: 2,
									rate: 250,
								})
							}
						/>
					)}
					{/* Amenties */}
					{pageNo === 7 && (
						<FormPage
							type="amenities"
							label="Amenities"
							items={amenitiesList}
							autoCompleteItems={autocompleteItems.amenities || []}
							form={form}
							onAppend={() =>
								amenitiesList.append({
									name: "Room Heater",
									quantity: 1 * 2,
									rate: 300,
								})
							}
						/>
					)}
					{/* Submit */}
					<div className="flex flex-col gap-4">
						<SubmitButton action={invoice ? "update" : "create"} />
					</div>
				</form>
				{state.success && (
					<div className="flex flex-col items-center w-full py-4 text-sm">
						<span>
							{state.message}.&nbsp;
							<Link
								href={
									invoice
										? `/business/${homestayId}/invoices/${invoice.id}`
										: `/business/${homestayId}/invoices/${state.fields?.id}`
								}
								className="w-full underline text-accent underline-offset-4"
							>
								View
							</Link>
						</span>
					</div>
				)}
				{state?.issues && (
					<div className="text-red-500">
						<ul>
							{state.issues.map((issue, index) => (
								<li
									key={`${issue}_${
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										index
									}`}
									className="flex gap-1"
								>
									<X fill="red" />
									{issue}
								</li>
							))}
						</ul>
					</div>
				)}
			</Form>
		</Card>
	);
}
function SubmitButton({ action }: { action: "create" | "update" }) {
	const { pending } = useFormStatus();
	return (
		<>
			<Button
				type="submit"
				aria-disabled={pending}
				className={cn(
					"px-4 py-2 text-lg font-semibold rounded-md bg-primary text-primary-foreground",
					pending
						? "cursor-not-allowed bg-primary/40 hover:bg-primary/40"
						: "cursor-pointer",
				)}
			>
				{pending
					? `${action === "create" ? "Generating" : "Updating"} Invoice...`
					: `${action === "create" ? "Generate" : "Update"}  Invoice`}
			</Button>
		</>
	);
}
