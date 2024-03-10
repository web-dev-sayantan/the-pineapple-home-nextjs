"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Invoice } from "@/app/business/[homestay]/invoice/create/shared/shared-code";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { DatePickerForm } from "@/components/ui/datePicker";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CreateInvoice() {
	const form = useForm<Invoice>();
	const accomodationList = useFieldArray({
		control: form.control, // control props comes from useForm (optional: if you are using FormContext)
		name: "accomodation", // unique name for your Field Array
	});
	const breakfastList = useFieldArray({
		control: form.control, // control props comes from useForm (optional: if you are using FormContext)
		name: "food.breakfast", // unique name for your Field Array
	});
	const lunchList = useFieldArray({
		control: form.control, // control props comes from useForm (optional: if you are using FormContext)
		name: "food.lunch", // unique name for your Field Array
	});
	const dinnerList = useFieldArray({
		control: form.control, // control props comes from useForm (optional: if you are using FormContext)
		name: "food.dinner", // unique name for your Field Array
	});
	const snacksList = useFieldArray({
		control: form.control, // control props comes from useForm (optional: if you are using FormContext)
		name: "food.snacks", // unique name for your Field Array
	});
	const amenitiesList = useFieldArray({
		control: form.control, // control props comes from useForm (optional: if you are using FormContext)
		name: "amenities", // unique name for your Field Array
	});
	const [pageNo, setPageNo] = useState(1);
	const onSubmit: SubmitHandler<Invoice> = async (data) => {
		console.log(data);
		if (pageNo === 1) {
			setPageNo(2);
		} else {
			setPageNo(1);
		}
	};
	return (
		<div className="container flex flex-col items-center">
			<div className="flex flex-col items-center w-full md:w-[30rem] gap-4 py-8 md:px-8">
				<h1 className="w-full p-4 mb-4 text-2xl font-bold text-center rounded-sm text-primary">
					Create Invoice
				</h1>
				<Card className="w-full p-4 md:p-8 bg-white/40">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex flex-col w-full gap-8"
						>
							{/* Basic Details */}
							{pageNo === 1 && (
								<>
									<div className="flex flex-col gap-2">
										<label htmlFor="guestName">Guest name:</label>
										<Input {...form.register("guestName")} />
									</div>
									<div className="flex flex-col gap-2">
										<DatePickerForm
											form={form}
											fieldName="invoiceDate"
											label="Invoice date"
										/>
									</div>
									<div className="flex flex-col gap-2">
										<DatePickerForm
											form={form}
											fieldName="checkinDate"
											label="Checkin date"
										/>
									</div>
									<div className="flex flex-col gap-2">
										<DatePickerForm
											form={form}
											fieldName="checkoutDate"
											label="Checkout date"
										/>
									</div>
								</>
							)}
							{/* Accomodation */}
							{pageNo === 2 && (
								<>
									<div className="flex flex-col gap-6">
										<h1 className="text-2xl font-semibold">Accomodation</h1>
										<Button
											className="mb-2"
											onClick={(e) => {
												e.preventDefault();
												accomodationList.append({
													description: "Room 101",
													noOfDays: 2,
													rate: 1500,
												});
											}}
										>
											Add Item
										</Button>
										{accomodationList.fields.map((_, index) => (
											<div
												className="flex flex-col gap-2"
												// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
												key={_.description + _.noOfDays + _.rate + index}
											>
												<hr className="border-2" />
												<div className="flex items-center justify-between">
													<h1 className="text-lg font-semibold">
														Item {index + 1} :{" "}
													</h1>
													<Button
														variant={"destructive"}
														onClick={() => accomodationList.remove(index)}
													>
														<i className="font-bold material-symbol-outlined">
															delete
														</i>
													</Button>
												</div>
												<hr className="border-2" />
												<div className="flex flex-col gap-4 px-2">
													<Label className="font-semibold">Room Name:</Label>
													<Input
														type="text"
														{...form.register(
															`accomodation.${index}.description`,
														)}
													/>
													<Label className="font-semibold">
														No of days stayed:
													</Label>
													<Input
														type="number"
														{...form.register(`accomodation.${index}.noOfDays`)}
													/>
													<Label className="font-semibold">
														Rate per day(INR):
													</Label>
													<Input
														type="number"
														{...form.register(`accomodation.${index}.rate`)}
													/>
												</div>
											</div>
										))}
									</div>
								</>
							)}
							{/* Breakfast */}
							{pageNo === 3 && (
								<div className="flex flex-col gap-2">
									<h1 className="text-2xl font-semibold">Breakfast</h1>
									<Button
										className="mb-2"
										onClick={(e) => {
											e.preventDefault();
											breakfastList.append({
												name: "Veg Maggie",
												quantity: 2,
												rate: 50,
											});
										}}
									>
										Add Breakfast
									</Button>
									{breakfastList.fields.map((_, index) => (
										<div
											className="flex flex-col gap-2"
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											key={_.name + _.quantity + _.rate + index}
										>
											<hr className="border-2" />
											<div className="flex items-center justify-between">
												<h1 className="text-lg font-semibold">
													Item {index + 1} :{" "}
												</h1>
												<Button
													variant={"destructive"}
													onClick={() => breakfastList.remove(index)}
												>
													<i className="font-bold material-symbol-outlined">
														delete
													</i>
												</Button>
											</div>
											<hr className="border-2" />
											<div className="flex flex-col gap-4 px-2">
												<Label className="font-semibold">Item Name:</Label>
												<Input
													type="text"
													{...form.register(`food.breakfast.${index}.name`)}
												/>
												<Label className="font-semibold">Quantity:</Label>
												<Input
													type="number"
													{...form.register(`food.breakfast.${index}.quantity`)}
												/>
												<Label className="font-semibold">
													Rate per plate(INR):
												</Label>
												<Input
													type="number"
													{...form.register(`food.breakfast.${index}.rate`)}
												/>
											</div>
										</div>
									))}
								</div>
							)}
							{/* Lunch */}
							{pageNo === 4 && (
								<div className="flex flex-col gap-2">
									<h1 className="text-2xl font-semibold">Lunch</h1>
									<Button
										className="mb-2"
										onClick={(e) => {
											e.preventDefault();
											lunchList.append({
												name: "Egg Thali",
												quantity: 2,
												rate: 150,
											});
										}}
									>
										Add Lunch
									</Button>
									{lunchList.fields.map((_, index) => (
										<div
											className="flex flex-col gap-2"
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											key={_.name + _.quantity + _.rate + index}
										>
											<hr className="border-2" />
											<div className="flex items-center justify-between">
												<h1 className="text-lg font-semibold">
													Item {index + 1} :{" "}
												</h1>
												<Button
													variant={"destructive"}
													onClick={() => lunchList.remove(index)}
												>
													<i className="font-bold material-symbol-outlined">
														delete
													</i>
												</Button>
											</div>
											<hr className="border-2" />
											<div className="flex flex-col gap-4 px-2">
												<Label className="font-semibold">Item Name:</Label>
												<Input
													type="text"
													{...form.register(`food.lunch.${index}.name`)}
												/>
												<Label className="font-semibold">Quantity:</Label>
												<Input
													type="number"
													{...form.register(`food.lunch.${index}.quantity`)}
												/>
												<Label className="font-semibold">
													Rate per plate(INR):
												</Label>
												<Input
													type="number"
													{...form.register(`food.lunch.${index}.rate`)}
												/>
											</div>
										</div>
									))}
								</div>
							)}
							{/* Dinner */}
							{pageNo === 5 && (
								<div className="flex flex-col gap-2">
									<h1 className="text-2xl font-semibold">Dinner</h1>
									<Button
										className="mb-2"
										onClick={(e) => {
											e.preventDefault();
											dinnerList.append({
												name: "Chicken Thali",
												quantity: 2,
												rate: 50,
											});
										}}
									>
										Add Dinner
									</Button>
									{dinnerList.fields.map((_, index) => (
										<div
											className="flex flex-col gap-2"
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											key={_.name + _.quantity + _.rate + index}
										>
											<hr className="border-2" />
											<div className="flex items-center justify-between">
												<h1 className="text-lg font-semibold">
													Item {index + 1} :{" "}
												</h1>
												<Button
													variant={"destructive"}
													onClick={() => dinnerList.remove(index)}
												>
													<i className="font-bold material-symbol-outlined">
														delete
													</i>
												</Button>
											</div>
											<hr className="border-2" />
											<div className="flex flex-col gap-4 px-2">
												<Label className="font-semibold">Item Name:</Label>
												<Input
													type="text"
													{...form.register(`food.dinner.${index}.name`)}
												/>
												<Label className="font-semibold">Quantity:</Label>
												<Input
													type="number"
													{...form.register(`food.dinner.${index}.quantity`)}
												/>
												<Label className="font-semibold">
													Rate per plate(INR):
												</Label>
												<Input
													type="number"
													{...form.register(`food.dinner.${index}.rate`)}
												/>
											</div>
										</div>
									))}
								</div>
							)}
							{/* Snacks */}
							{pageNo === 6 && (
								<div className="flex flex-col gap-2">
									<h1 className="text-2xl font-semibold">Snacks</h1>
									<Button
										className="mb-2"
										onClick={(e) => {
											e.preventDefault();
											snacksList.append({
												name: "Veg Momo",
												quantity: 2,
												rate: 100,
											});
										}}
									>
										Add Snacks
									</Button>
									{snacksList.fields.map((_, index) => (
										<div
											className="flex flex-col gap-2"
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											key={_.name + _.quantity + _.rate + index}
										>
											<hr className="border-2" />
											<div className="flex items-center justify-between">
												<h1 className="text-lg font-semibold">
													Item {index + 1} :{" "}
												</h1>
												<Button
													variant={"destructive"}
													onClick={() => snacksList.remove(index)}
												>
													<i className="font-bold material-symbol-outlined">
														delete
													</i>
												</Button>
											</div>
											<hr className="border-2" />
											<div className="flex flex-col gap-4 px-2">
												<Label className="font-semibold">Item Name:</Label>
												<Input
													type="text"
													{...form.register(`food.snacks.${index}.name`)}
												/>
												<Label className="font-semibold">Quantity:</Label>
												<Input
													type="number"
													{...form.register(`food.snacks.${index}.quantity`)}
												/>
												<Label className="font-semibold">
													Rate per plate(INR):
												</Label>
												<Input
													type="number"
													{...form.register(`food.snacks.${index}.rate`)}
												/>
											</div>
										</div>
									))}
								</div>
							)}
							{/* Amenties */}
							{pageNo === 7 && (
								<div className="flex flex-col gap-2">
									<h1 className="text-2xl font-semibold">Amenties</h1>
									<Button
										className="mb-2"
										onClick={(e) => {
											e.preventDefault();
											amenitiesList.append({
												name: "Room Heater",
												quantity: 2,
												rate: 200,
											});
										}}
									>
										Add Amenties
									</Button>
									{amenitiesList.fields.map((_, index) => (
										<div
											className="flex flex-col gap-2"
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											key={_.name + _.quantity + _.rate + index}
										>
											<hr className="border-2" />
											<div className="flex items-center justify-between">
												<h1 className="text-lg font-semibold">
													Item {index + 1} :{" "}
												</h1>
												<Button
													variant={"destructive"}
													onClick={() => amenitiesList.remove(index)}
												>
													<i className="font-bold material-symbol-outlined">
														delete
													</i>
												</Button>
											</div>
											<hr className="border-2" />
											<div className="flex flex-col gap-4 px-2">
												<Label className="font-semibold">Item Name:</Label>
												<Input
													type="text"
													{...form.register(`amenities.${index}.name`)}
												/>
												<Label className="font-semibold">Quantity:</Label>
												<Input
													type="number"
													{...form.register(`amenities.${index}.quantity`)}
												/>
												<Label className="font-semibold">
													Rate per plate(INR):
												</Label>
												<Input
													type="number"
													{...form.register(`amenities.${index}.rate`)}
												/>
											</div>
										</div>
									))}
								</div>
							)}
							{/* Submit */}
							<div className="flex flex-col gap-4">
								<div className="flex items-center w-full gap-2 ">
									<button
										type="button"
										className="px-4 py-1 text-lg font-semibold rounded-md basis-1/2 bg-accent text-primary-foreground hover:bg-accent/80"
										onClick={() => {
											pageNo > 1 && setPageNo((prev) => prev - 1);
										}}
									>
										Previous
									</button>
									<button
										type="button"
										className="px-4 py-1 text-lg font-semibold rounded-md basis-1/2 bg-accent text-primary-foreground hover:bg-accent/80"
										onClick={() => {
											pageNo < 7 && setPageNo((next) => next + 1);
										}}
									>
										Next
									</button>
								</div>
								<button
									type="submit"
									className="px-4 py-1 text-lg font-semibold rounded-md bg-primary text-primary-foreground hover:bg-accent/80"
								>
									Submit
								</button>
							</div>
						</form>
					</Form>
				</Card>
			</div>
		</div>
	);
}
