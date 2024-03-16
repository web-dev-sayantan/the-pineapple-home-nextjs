import NavBar from "@/app/components/navBar";
import { getInvoiceById } from "@/data/admin/invoice-dto";

export default async function Invoice({
	params,
}: { params: { invoiceId: string; homestay: string } }) {
	const data = await getInvoiceById(+params.invoiceId);
	console.log(params);
	return (
		<div className="w-full">
			<NavBar>Invoice {params.invoiceId}</NavBar>
			{data ? (
				<div className="w-full p-8">
					<div className="flex items-center justify-between">
						<div className="flex flex-col gap-2">
							<h1 className="flex items-center text-3xl">{params.homestay}</h1>
							<h2 className="flex items-center gap-4 text-xl">
								<span className="font-bold">UPI:</span>
								<span className="text-primary text-md">
									8017523017, 6290853406
								</span>
							</h2>
						</div>
						<div className="flex flex-col">
							<h2 className="text-md">
								Invoice No: <span className="font-bold text-md">{data.id}</span>
							</h2>
							<h2 className="text-md">
								Date:{" "}
								<span className="font-bold text-md">
									{data.invoiceDate.toDateString()}
								</span>
							</h2>
						</div>
					</div>
					<h1 className="mt-20 text-lg font-semibold text-center">
						Guest Name:{" "}
						<span className="font-normal text-primary">{data.guestName}</span>
					</h1>
					<div className="flex flex-col items-center w-full my-2">
						<div className="flex items-center w-full px-2 py-1 rounded-md bg-primary/90 text-primary-foreground">
							<h1 className="text-xl font-bold basis-1/2">Description</h1>
							<h1 className="flex-1 text-xl font-bold text-right">Quantity</h1>
							<h1 className="flex-1 text-xl font-bold text-right">Rate</h1>
							<h1 className="flex-1 text-xl font-bold text-right">Total</h1>
						</div>
						<h1 className="w-full p-1 px-2 mb-2 font-semibold text-center rounded-sm text-md bg-primary/10">
							Accomodation
						</h1>
						<div className="flex flex-col w-full py-2">
							{data.accomodation.map((item) => (
								<div className="flex items-center w-full px-4">
									<div className="text-xl font-semibold basis-1/2">
										{item.name}
									</div>
									<div className="flex-1 text-xl font-semibold text-right">
										{item.quantity}
									</div>
									<div className="flex-1 text-xl font-semibold text-right">
										Rs. {item.rate}
									</div>
									<div className="flex-1 text-xl font-semibold text-right">
										Rs. {item.rate * item.quantity}
									</div>
								</div>
							))}
						</div>
						<h1 className="w-full p-1 px-2 my-2 font-semibold text-center rounded-sm text-md bg-primary/10">
							Food
						</h1>
						<div className="flex flex-col w-full">
							<div className="flex px-4 py-1 italic text-secondary-foreground/80">
								-- Breakfast --
							</div>
							{data.food.map((item) => (
								<div key={item.id}>
									{item.type === "breakfast" && (
										<div className="flex items-center w-full px-4">
											<div className="text-xl font-semibold basis-1/2">
												{item.name}
											</div>
											<div className="flex-1 text-xl font-semibold text-right">
												{item.quantity}
											</div>
											<div className="flex-1 text-xl font-semibold text-right">
												Rs. {item.rate}
											</div>
											<div className="flex-1 text-xl font-semibold text-right">
												Rs. {item.rate * item.quantity}
											</div>
										</div>
									)}
								</div>
							))}
						</div>
						<div className="flex flex-col w-full">
							<div className="flex px-4 py-1 italic text-secondary-foreground/80">
								-- Lunch --
							</div>
							{data.food.map((item) => (
								<div key={item.id}>
									{item.type === "lunch" && (
										<div className="flex items-center w-full px-4">
											<div className="text-xl font-semibold basis-1/2">
												{item.name}
											</div>
											<div className="flex-1 text-xl font-semibold text-right">
												{item.quantity}
											</div>
											<div className="flex-1 text-xl font-semibold text-right">
												Rs. {item.rate}
											</div>
											<div className="flex-1 text-xl font-semibold text-right">
												Rs. {item.rate * item.quantity}
											</div>
										</div>
									)}
								</div>
							))}
						</div>
						<div className="flex flex-col w-full">
							<div className="flex px-4 py-1 italic text-secondary-foreground/80">
								-- Dinner --
							</div>
							{data.food.map((item) => (
								<div key={item.id}>
									{item.type === "dinner" && (
										<div className="flex items-center w-full px-4">
											<div className="text-xl font-semibold basis-1/2">
												{item.name}
											</div>
											<div className="flex-1 text-xl font-semibold text-right">
												{item.quantity}
											</div>
											<div className="flex-1 text-xl font-semibold text-right">
												Rs. {item.rate}
											</div>
											<div className="flex-1 text-xl font-semibold text-right">
												Rs. {item.rate * item.quantity}
											</div>
										</div>
									)}
								</div>
							))}
						</div>
						<h1 className="w-full p-1 px-2 my-2 font-semibold text-center rounded-sm text-md bg-primary/10">
							Others
						</h1>
						<div className="flex flex-col w-full">
							{data.amenities.map((item) => (
								<div className="flex items-center w-full px-4">
									<div className="text-xl font-semibold basis-1/2">
										{item.name}
									</div>
									<div className="flex-1 text-xl font-semibold text-right">
										{item.quantity}
									</div>
									<div className="flex-1 text-xl font-semibold text-right">
										Rs. {item.rate}
									</div>
									<div className="flex-1 text-xl font-semibold text-right">
										Rs. {item.rate * item.quantity}
									</div>
								</div>
							))}
						</div>
						<div className="flex items-center w-full px-2 py-1 my-4 rounded-md bg-primary/10">
							<div className="flex text-2xl font-bold basis-3/4">Total</div>
							<div className="flex-1 px-2 text-2xl font-bold text-right text-primary">
								Rs.&nbsp;
								{data.accomodation.reduce(
									(acc, item) => acc + item.rate * item.quantity,
									0,
								) +
									data.food.reduce(
										(acc, item) => acc + item.rate * item.quantity,
										0,
									) +
									data.amenities.reduce(
										(acc, item) => acc + item.rate * item.quantity,
										0,
									)}
								&nbsp;/-
							</div>
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
