function getInvoice() {
	return {
		id: "1",
		name: "The PineApple Home Manali",
		description: "Accomodation",
		date: "2024-03-10",
		guestName: "Debotosh",
		accomodation: [
			{
				rate: 1500,
				description: "Room 101",
				noOfDays: 2,
			},
		],
		food: {
			breakfast: [
				{
					name: "Veg Maggie",
					quantity: 8,
					rate: 50,
				},
				{
					name: "Butter Toast",
					quantity: 4,
					rate: 40,
				},
			],
			lunch: [
				{
					name: "Omelete Thali",
					quantity: 4,
					rate: 150,
				},
			],
			dinner: [
				{
					name: "Chicken Thali",
					quantity: 4,
					rate: 200,
				},
			],
		},
	};
}

export default async function Invoice() {
	const data = getInvoice();
	return (
		<div className="w-full p-8">
			<div className="flex items-center justify-between">
				<div className="flex flex-col gap-2">
					<h1 className="flex items-center text-3xl">{data.name}</h1>
					<h2 className="flex items-center gap-4 text-xl">
						<span className="font-bold">UPI:</span>
						<span className="text-primary text-md">8017523017, 6290853406</span>
					</h2>
				</div>
				<div className="flex flex-col">
					<h2 className="text-md">
						Invoice No: <span className="font-bold text-md">{data.id}</span>
					</h2>
					<h2 className="text-md">
						Date: <span className="font-bold text-md">{data.date}</span>
					</h2>
				</div>
			</div>
			<h1 className="mt-20 text-lg font-semibold text-center">
				Guest Name:{" "}
				<span className="font-normal text-primary">{data.guestName}</span>
			</h1>
			<div className="flex flex-col items-center w-full my-2">
				<div className="flex items-center w-full px-2 py-1 rounded-md bg-primary/10">
					<h1 className="text-xl font-bold basis-1/2">Description</h1>
					<h1 className="flex-1 text-xl font-bold text-right">Quantity</h1>
					<h1 className="flex-1 text-xl font-bold text-right">Rate</h1>
					<h1 className="flex-1 text-xl font-bold text-right">Total</h1>
				</div>
				<h1 className="w-full p-1 px-2 font-semibold text-center text-white rounded-sm text-md bg-primary">
					Accomodation
				</h1>
				<div className="flex flex-col w-full">
					{data.accomodation.map((item) => (
						<div className="flex items-center w-full px-4">
							<div className="text-xl font-semibold basis-1/2">
								{item.description}
							</div>
							<div className="flex-1 text-xl font-semibold text-right">
								{item.noOfDays}
							</div>
							<div className="flex-1 text-xl font-semibold text-right">
								Rs. {item.rate}
							</div>
							<div className="flex-1 text-xl font-semibold text-right">
								Rs. {item.rate * item.noOfDays}
							</div>
						</div>
					))}
				</div>
				<h1 className="w-full p-1 px-2 my-2 font-semibold text-center text-white rounded-sm text-md bg-primary">
					Food
				</h1>
				<div className="flex flex-col w-full">
					{data.food.breakfast.map((item) => (
						<div className="flex items-center w-full px-4">
							<div className="text-xl font-semibold basis-1/2">{item.name}</div>
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
				<div className="flex flex-col w-full">
					{data.food.lunch.map((item) => (
						<div className="flex items-center w-full px-4">
							<div className="text-xl font-semibold basis-1/2">{item.name}</div>
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
				<div className="flex flex-col w-full">
					{data.food.dinner.map((item) => (
						<div className="flex items-center w-full px-4">
							<div className="text-xl font-semibold basis-1/2">{item.name}</div>
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
							(acc, item) => acc + item.rate * item.noOfDays,
							0,
						) +
							data.food.breakfast.reduce(
								(acc, item) => acc + item.rate * item.quantity,
								0,
							) +
							data.food.lunch.reduce(
								(acc, item) => acc + item.rate * item.quantity,
								0,
							) +
							data.food.dinner.reduce(
								(acc, item) => acc + item.rate * item.quantity,
								0,
							)}
						&nbsp;/-
					</div>
				</div>
			</div>
		</div>
	);
}
