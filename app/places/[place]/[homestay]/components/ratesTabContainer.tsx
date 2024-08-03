"use client";
import { FoodPlanSelect } from "@/drizzle/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonsIcon from "@/components/ui/personsIcon";
import RoomRates from "./roomRates";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AvailableRate } from "@/types/available-room-rates";

export default function RatesTabContainer({
	rates,
	roomId,
	homestayId,
	foodPlans,
}: {
	rates: AvailableRate[];
	roomId: string;
	homestayId: string;
	foodPlans: FoodPlanSelect[];
}) {
	const tabs = Array.from(
		new Set(rates.map((rate) => rate.headCount || 0)),
	).sort();
	const [selectedTab, setSelectedTab] = useState(tabs[0]);
	return (
		<div className="flex flex-col items-center h-full gap-4">
			{tabs.length > 1 ? (
				<Tabs
					defaultValue={`${selectedTab}`}
					className="w-full"
					onValueChange={(val) => setSelectedTab(+val)}
				>
					<TabsList className="w-full">
						{tabs.map((tab) => (
							<TabsTrigger
								value={`${tab}`}
								className="flex-1 group data-[state=active]:border-b data-[state=active]:border-brand-first"
								key={tab}
							>
								<>
									<PersonsIcon
										className="group-data-[state=active]:text-brand-first"
										headCount={tab > 3 ? 3 : tab}
									/>
									{/* Badge for count over 2 persons */}
									{tab - 3 > 0 && (
										<div
											className={cn(
												"mx-1 px-2 py-1 text-xs font-semibold rounded-full bg-secondary",
												selectedTab === tab ? "" : "bg-background",
											)}
										>
											{`+${tab - 3}`}
										</div>
									)}
								</>
							</TabsTrigger>
						))}
					</TabsList>
					{tabs.map((tab) => (
						<TabsContent value={`${tab}`} key={tab}>
							<RoomRates
								rates={rates}
								roomId={roomId}
								homestayId={homestayId}
								pax={tab}
								foodPlans={foodPlans}
							/>
						</TabsContent>
					))}
				</Tabs>
			) : (
				<RoomRates
					rates={rates}
					roomId={roomId}
					homestayId={homestayId}
					pax={tabs[0]}
					foodPlans={foodPlans}
				/>
			)}
		</div>
	);
}
