import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { create } from "zustand";

export type Store = {
  dateRange: DateRange;
  setDateRange: (dateRange: DateRange) => void;
};
export const useStore = create<Store>((set) => ({
  dateRange: { from: addDays(new Date(), 7), to: addDays(new Date(), 9) },
  setDateRange: (dateRange: DateRange) => set((state) => ({ dateRange })),
}));
