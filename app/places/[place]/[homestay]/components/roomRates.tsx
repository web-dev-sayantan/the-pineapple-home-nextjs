"use client";

import { useState, Fragment } from "react";
import RateCard from "./rateCard";
import { useStore } from "../../../../../store";
import { FoodPlanSelect, RateSelect } from "@/drizzle/schema";
import { AvailableRate } from "@/types/available-room-rates";

export default function RoomRates({
	rates,
	homestayId,
	roomId,
	pax,
	foodPlans,
}: {
	rates: AvailableRate[];
	homestayId: string;
	roomId: string;
	pax: number;
	foodPlans: FoodPlanSelect[];
}) {
	const {
		selectedRoomRates,
		addSelectedRoomRate,
		removeSelectedRoomRate,
		selectedFoodPlans,
		addSelectedFoodPlan,
		removeSelectedFoodPlan,
	} = useStore();
	const [selectedRate, setSelectedRate] = useState<
		AvailableRate | null | undefined
	>(selectedRoomRates.find((rate) => rate.rateId === rates[0]?.rateId));

	const [selectedFoodPlan, setSelectedFoodPlan] = useState<
		Partial<FoodPlanSelect> | null | undefined
	>(selectedFoodPlans.find((foodPlan) => foodPlan.homestayId === homestayId));

	function onRateSelected(
		rate: AvailableRate | null | undefined,
		foodPlan: Partial<FoodPlanSelect> | null | undefined,
	) {
		if (selectedRate) removeSelectedRoomRate(selectedRate);
		if (selectedFoodPlan) removeSelectedFoodPlan(selectedFoodPlan);
		if (rate && foodPlan) {
			addSelectedRoomRate(rate);
			addSelectedFoodPlan(foodPlan);
		}
		setSelectedRate(rate);
		setSelectedFoodPlan(foodPlan);
	}

	function isRateSelected(rate: AvailableRate) {
		return rate.rateId === selectedRate?.rateId;
	}
	function isFoodPlanSelected(foodPlan: Partial<FoodPlanSelect>) {
		return foodPlan.id === selectedFoodPlan?.id;
	}
	return (
		<div className="flex flex-col items-center w-full gap-2">
			{rates.map((rate) => (
				<Fragment key={rate.rateId}>
					{rate.headCount === pax && (
						<RateCard
							key={rate.rateId}
							rate={rate}
							homestayId={homestayId}
							foodPlans={foodPlans}
							isRateSelected={isRateSelected}
							onRateSelected={onRateSelected}
							isFoodPlanSelected={isFoodPlanSelected}
						/>
					)}
				</Fragment>
			))}
		</div>
	);
}
