import { addDays, startOfDay } from "date-fns";
import { DateRange } from "react-day-picker";
import { create } from "zustand";
import { FoodPlanSelect } from "@/drizzle/schema";
import { AvailableRate } from "@/types/available-room-rates";

export type Store = {
	dateRange: DateRange;
	setDateRange: (dateRange: DateRange) => void;
	selectedRoomRates: AvailableRate[];
	addSelectedRoomRate: (rate: AvailableRate) => void;
	removeSelectedRoomRate: (rate: AvailableRate) => void;
	selectedFoodPlans: Partial<FoodPlanSelect>[];
	addSelectedFoodPlan: (rate: Partial<FoodPlanSelect>) => void;
	removeSelectedFoodPlan: (foodPlan: Partial<FoodPlanSelect>) => void;
};
export const useStore = create<Store>((set) => ({
	dateRange: {
		from: startOfDay(new Date()),
		to: addDays(startOfDay(new Date()), 2),
	},
	setDateRange: (dateRange: DateRange) =>
		set((state) => ({ ...state, dateRange })),
	selectedRoomRates: [],
	selectedFoodPlans: [],
	addSelectedRoomRate: (rate) =>
		set((state) => ({
			...state,
			selectedRoomRates: [...(state.selectedRoomRates || []), rate],
		})),
	removeSelectedRoomRate: (rate) =>
		set((state) => ({
			...state,
			selectedRoomRates: state.selectedRoomRates?.filter(
				(selectedRoomRate) => selectedRoomRate.rateId !== rate.rateId,
			),
		})),
	addSelectedFoodPlan: (foodPlan) =>
		set((state) => ({
			...state,
			selectedFoodPlans: [...(state.selectedFoodPlans || []), foodPlan],
		})),
	removeSelectedFoodPlan: (foodPlan) =>
		set((state) => ({
			...state,
			selectedFoodPlans: state.selectedFoodPlans?.filter(
				(selectedFoodPlan) => selectedFoodPlan.id !== foodPlan.id,
			),
		})),
}));
