"use client";
import { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import { invoiceSchema } from "../shared/shared-code";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { DateFieldsType, DatePicker } from "../components/datePicker";
import FormPage from "@/app/business/[homestay]/invoice/components/formPage";
import { format, subDays } from "date-fns";
import { generateInvoice } from "../server-actions/server-actions";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";

export default function InvoiceForm({ homestayId }: { homestayId: string }) {
	console.log(homestayId);
	const [state, formAction] = useFormState(generateInvoice, {
		success: false,
	});
	const form = useForm<z.infer<typeof invoiceSchema>>({
		resolver: zodResolver(invoiceSchema),
		defaultValues: {
			guestName: "",
			invoiceDate: new Date(),
			checkinDate: subDays(new Date(), 2),
			checkoutDate: new Date(),
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

	const formRef = useRef<HTMLFormElement>(null);
	return (
		<Form {...form}>
			{state.success && (
				<div className="flex flex-col w-full">{state.message}</div>
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
			<form
				action={formAction}
				ref={formRef}
				onSubmit={(event) => {
					console.log("submitted");
					event.preventDefault();
					form.handleSubmit(() => {
						const formData = new FormData();
						formData.append("guestName", form.getValues("guestName"));
						formData.append(
							"invoiceDate",
							form.getValues("invoiceDate").toString(),
						);
						formData.append(
							"checkinDate",
							form.getValues("checkinDate").toString(),
						);
						formData.append(
							"checkoutDate",
							form.getValues("checkoutDate").toString(),
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
						formData.append(
							"amenities",
							JSON.stringify(form.getValues("amenities")),
						);
						formAction(formData);
					})(event);
				}}
				className="flex flex-col w-full gap-8"
			>
				{/* Basic Details */}
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
								name={"invoiceDate" as DateFieldsType}
								render={({ field }) => (
									<FormItem className="flex flex-col w-full">
										<FormLabel>{"Invoice date"}</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={"outline"}
														className={cn(
															"w-full pl-3 text-left font-normal hover:bg-background",
															!field.value && "text-muted-foreground",
														)}
													>
														{field.value ? (
															format(field.value, "PPP")
														) : (
															<span>Pick a date</span>
														)}
														<CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													disabled={(date) =>
														date > new Date() || date < new Date("2023-12-12")
													}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<FormField
								control={form.control}
								name={"checkinDate" as DateFieldsType}
								render={({ field }) => (
									<DatePicker label="Invoice date" field={field} />
								)}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<FormField
								control={form.control}
								name={"checkoutDate" as DateFieldsType}
								render={({ field }) => (
									<DatePicker label="Invoice date" field={field} />
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
						form={form}
						onAppend={() =>
							accomodationList.append({
								name: "Room 101",
								quantity: 2,
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
					<div className="flex items-center w-full gap-2 ">
						<button
							type="button"
							className="px-4 py-1 text-lg font-semibold rounded-md basis-1/2 bg-accent text-primary-foreground"
							onClick={() => {
								pageNo > 1 && setPageNo((prev) => prev - 1);
							}}
						>
							Back
						</button>
						<button
							type="button"
							className="px-4 py-1 text-lg font-semibold rounded-md basis-1/2 bg-accent text-primary-foreground"
							onClick={() => {
								pageNo < 7 && setPageNo((next) => next + 1);
							}}
						>
							Next
						</button>
					</div>
					<SubmitButton />
				</div>
			</form>
		</Form>
	);
}
function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<Button
			type="submit"
			className="px-4 py-1 text-lg font-semibold rounded-md bg-primary text-primary-foreground"
			aria-disabled={pending}
		>
			{pending ? "Generating Invoice..." : "Generate Invoice"}
		</Button>
	);
}
