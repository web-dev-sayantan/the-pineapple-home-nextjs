import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { create } from "zustand";

export type Store = {
  dateRange: DateRange;
  setDateRange: (dateRange: DateRange) => void;
  selectedRoomRates: any[];
  addSelectedRoomRates: (rate: any) => void;
  removeSelectedRoomRates: (rate: any) => void;
};
export const useStore = create<Store>((set) => ({
  dateRange: { from: addDays(new Date(), 7), to: addDays(new Date(), 9) },
  setDateRange: (dateRange: DateRange) =>
    set((state) => ({ ...state, dateRange })),
  selectedRoomRates: [],
  addSelectedRoomRates: (rate: any) =>
    set((state) => ({
      ...state,
      selectedRoomRates: [...state.selectedRoomRates, rate],
    })),
  removeSelectedRoomRates: (rate) =>
    set((state) => ({
      ...state,
      selectedRoomRates: state.selectedRoomRates.filter(
        (selectedRoomRate) => selectedRoomRate.id !== rate.id
      ),
    })),
}));
