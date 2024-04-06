import { Button } from "@/components/ui/button";
import PrintButton from "../components/PrintButton";
import NavBar from "@/app/components/navBar";
import { getInvoiceById } from "@/data/admin/invoice-dto";
import { getHomestayById } from "@/data/homestay-dto";
import { FoodTypesEnum } from "@/drizzle/schema";
import Link from "next/link";

export default async function Invoice({
	params,
}: { params: { invoiceId: string; homestay: string } }) {
	const [data, homestay] = await Promise.all([
		getInvoiceById(+params.invoiceId, params.homestay),
		getHomestayById(params.homestay),
	]);
	const breakfast = data?.food.filter(
		(item) => item.type === FoodTypesEnum.enumValues[0],
	);
	const lunch = data?.food.filter(
		(item) => item.type === FoodTypesEnum.enumValues[1],
	);
	const dinner = data?.food.filter(
		(item) => item.type === FoodTypesEnum.enumValues[2],
	);
	const snacks = data?.food.filter(
		(item) => item.type === FoodTypesEnum.enumValues[3],
	);
	const total = data
		? data.accomodation.reduce(
				(acc, item) => acc + item.rate * item.quantity,
				0,
		  ) +
		  data.food.reduce((acc, item) => acc + item.rate * item.quantity, 0) +
		  data.amenities.reduce((acc, item) => acc + item.rate * item.quantity, 0)
		: 0;
	return (
		<div className="w-full">
			<div className="print:hidden">
				<NavBar>Invoice {params.invoiceId}</NavBar>
			</div>
			{data ? (
				<div className="w-full p-8">
					<div className="flex flex-col items-center justify-between md:flex-row">
						<div className="flex flex-col w-full gap-3 md:gap-2">
							<h1 className="flex items-center justify-center mb-8 text-xl font-bold underline capitalize underline-offset-2 md:no-underline md:mb-0 text-primary md:font-normal md:justify-start md:text-3xl">
								{homestay?.name}, {homestay?.locationName}
							</h1>
						</div>
						<div className="flex flex-col w-full md:w-auto">
							<h2 className="flex gap-2 text-md">
								<span className="font-bold min-w-[5rem]">Invoice ID:</span>
								<span className="text-primary">{data.id}</span>
							</h2>
							<h2 className="flex items-center gap-2 text-md">
								<span className="font-bold min-w-[5rem]">Date:</span>
								<span className=" text-primary text-nowrap">
									{data.invoiceDate.toDateString()}
								</span>
							</h2>
							<h2 className="flex items-center gap-2 text-md md:hidden">
								<span className="font-bold min-w-[5rem]">Stay:</span>
								<span className=" text-primary text-nowrap">
									{data.checkinDate.toDateString()} -{" "}
									{data.checkoutDate.toDateString()}
								</span>
							</h2>
							<h2 className="flex items-center gap-2 text-md md:hidden">
								<span className="font-bold min-w-[5rem]">Guest:</span>
								<span className="text-primary">{data.guestName}</span>
							</h2>
							<div className="flex items-center gap-2">
								<div className="basis-1/3">
									<Link
										href={`${params.invoiceId}/edit`}
										className="min-w-[10rem] print:hidden"
									>
										<Button
											variant="accent"
											className="w-full hover:text-primary-foreground"
										>
											Edit
										</Button>
									</Link>
								</div>
								<PrintButton />
							</div>
						</div>
					</div>
					<div className="hidden mt-20 font-bold md:block">
						<div>
							Guest Name:{" "}
							<span className="font-normal text-primary">{data.guestName}</span>
						</div>
						<div className="text-sm font-bold">
							Stay:{" "}
							<span className="text-sm font-normal text-primary">
								{data.checkinDate.toDateString()} -{" "}
								{data.checkoutDate.toDateString()}
							</span>
						</div>
					</div>
					<div className="flex flex-col items-center w-full my-2 text-sm">
						<div className="flex items-center w-full px-2 py-1 rounded-md bg-primary/90 text-primary-foreground">
							<h1 className="font-bold md:text-xl basis-1/3 md:basis-1/2">
								Description
							</h1>
							<h1 className="flex-1 font-bold text-right md:text-xl">
								Quantity
							</h1>
							<h1 className="flex-1 font-bold text-right md:text-xl">Rate</h1>
							<h1 className="flex-1 font-bold text-right md:text-xl">Total</h1>
						</div>
						<h1 className="w-full p-1 px-2 mt-2 mb-2 font-semibold text-center rounded-sm bg-primary/10">
							Accomodation
						</h1>
						<div className="flex flex-col w-full py-2">
							{data.accomodation.map((item) => (
								<div className="flex items-center w-full px-4" key={item.id}>
									<div className="font-semibold md:text-xl basis-1/3 md:basis-1/2">
										{item.name}
									</div>
									<div className="flex-1 font-semibold text-right md:text-xl">
										{item.quantity}
									</div>
									<div className="flex-1 font-semibold text-right md:text-xl">
										Rs. {item.rate}
									</div>
									<div className="flex-1 font-semibold text-right md:text-xl">
										Rs. {item.rate * item.quantity}
									</div>
								</div>
							))}
						</div>
						{data.food.length ? (
							<h1 className="w-full p-1 px-2 my-2 font-semibold text-center rounded-sm text-md bg-primary/10">
								Food
							</h1>
						) : null}
						{
							/* Breakfast */
							breakfast?.length ? (
								<div className="flex flex-col w-full">
									<div className="flex px-4 py-1 italic text-secondary-foreground/80">
										-- Breakfast --
									</div>
									{breakfast.map((item) => (
										<div key={item.id}>
											<div className="flex items-center w-full px-4">
												<div className="font-semibold md:text-xl basis-1/3 md:basis-1/2">
													{item.name}
												</div>
												<div className="flex-1 font-semibold text-right md:text-xl">
													{item.quantity}
												</div>
												<div className="flex-1 font-semibold text-right md:text-xl">
													Rs. {item.rate}
												</div>
												<div className="flex-1 font-semibold text-right md:text-xl">
													Rs. {item.rate * item.quantity}
												</div>
											</div>
										</div>
									))}
								</div>
							) : null
						}
						{
							/* Lunch */
							lunch?.length ? (
								<div className="flex flex-col w-full">
									<div className="flex px-4 py-1 italic text-secondary-foreground/80">
										-- Lunch --
									</div>
									{lunch.map((item) => (
										<div key={item.id}>
											<div className="flex items-center w-full px-4">
												<div className="font-semibold md:text-xl basis-1/3 md:basis-1/2">
													{item.name}
												</div>
												<div className="flex-1 font-semibold text-right md:text-xl">
													{item.quantity}
												</div>
												<div className="flex-1 font-semibold text-right md:text-xl">
													Rs. {item.rate}
												</div>
												<div className="flex-1 font-semibold text-right md:text-xl">
													Rs. {item.rate * item.quantity}
												</div>
											</div>
										</div>
									))}
								</div>
							) : null
						}
						{
							/* Dinner */
							dinner?.length ? (
								<div className="flex flex-col w-full">
									<div className="flex px-4 py-1 italic text-secondary-foreground/80">
										-- Dinner --
									</div>
									{dinner.map((item) => (
										<div key={item.id}>
											<div className="flex items-center w-full px-4">
												<div className="font-semibold md:text-xl basis-1/3 md:basis-1/2">
													{item.name}
												</div>
												<div className="flex-1 font-semibold text-right md:text-xl">
													{item.quantity}
												</div>
												<div className="flex-1 font-semibold text-right md:text-xl">
													Rs. {item.rate}
												</div>
												<div className="flex-1 font-semibold text-right md:text-xl">
													Rs. {item.rate * item.quantity}
												</div>
											</div>
										</div>
									))}
								</div>
							) : null
						}
						{
							/* Snacks */
							snacks?.length ? (
								<div className="flex flex-col w-full">
									<div className="flex px-4 py-1 italic text-secondary-foreground/80">
										-- Other Food Items --
									</div>
									{snacks.map((item) => (
										<div key={item.id}>
											<div className="flex items-center w-full px-4">
												<div className="font-semibold md:text-xl basis-1/3 md:basis-1/2">
													{item.name}
												</div>
												<div className="flex-1 font-semibold text-right md:text-xl">
													{item.quantity}
												</div>
												<div className="flex-1 font-semibold text-right md:text-xl">
													Rs. {item.rate}
												</div>
												<div className="flex-1 font-semibold text-right md:text-xl">
													Rs. {item.rate * item.quantity}
												</div>
											</div>
										</div>
									))}
								</div>
							) : null
						}
						{data.amenities.length ? (
							<>
								<h1 className="w-full p-1 px-2 my-2 font-semibold text-center rounded-sm text-md bg-primary/10">
									Others
								</h1>
								<div className="flex flex-col w-full">
									{data.amenities.map((item) => (
										<div
											className="flex items-center w-full px-4"
											key={item.id}
										>
											<div className="font-semibold md:text-xl basis-1/3 md:basis-1/2">
												{item.name}
											</div>
											<div className="flex-1 font-semibold text-right md:text-xl">
												{item.quantity}
											</div>
											<div className="flex-1 font-semibold text-right md:text-xl">
												Rs. {item.rate}
											</div>
											<div className="flex-1 font-semibold text-right md:text-xl">
												Rs. {item.rate * item.quantity}
											</div>
										</div>
									))}
								</div>
							</>
						) : null}
						<div className="flex items-center w-full px-2 py-1 my-4 rounded-md bg-primary/10">
							<div className="flex text-lg font-bold md:text-2xl basis-3/4">
								Total
							</div>
							<div className="flex-1 px-2 text-lg font-bold text-right md:text-2xl text-primary">
								Rs.&nbsp;
								{total}
								&nbsp;/-
							</div>
						</div>
						<div className="flex items-center w-full px-2 py-1 mb-4 rounded-md bg-primary/10">
							<div className="flex font-bold md:text-2xl basis-3/4">
								Advance paid:
							</div>
							<div className="flex-1 px-2 text-lg font-bold text-right md:text-2xl text-accent">
								Rs.&nbsp;
								{1400}
								&nbsp;/-
							</div>
						</div>
						<div className="flex items-center w-full px-2 py-1 mb-4 rounded-md bg-primary/10">
							<div className="flex font-bold md:text-2xl basis-3/4">
								Payment Due:
							</div>
							<div className="flex-1 px-2 text-lg font-bold text-right md:text-2xl text-destructive">
								Rs.&nbsp;
								{total - 1400}
								&nbsp;/-
							</div>
						</div>

						<div className="flex flex-col items-center w-full gap-2 p-2 rounded-md bg-primary/10 md:justify-start md:text-lg">
							<span className="font-bold text-nowrap">UPI Numbers:</span>
							<span className="md:text-lg text-primary text-wrap">
								8017523017 (Sudipta)
							</span>
							<span className="md:text-lg text-primary text-wrap">
								6290853406 (Sayantan)
							</span>
						</div>
					</div>
				</div>
			) : (
				<div className="flex items-center justify-center w-full h-full">
					No Invoice Found
				</div>
			)}
		</div>
	);
}
