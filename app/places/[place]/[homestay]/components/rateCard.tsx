"use client";

import { cn } from "@/lib/utils";
import PersonsIcon from "@/components/ui/personsIcon";
import { RateSelect } from "@/drizzle/schema";

export default function RateCard({
  rate,
  onRateSelected,
  isRateSelected,
}: {
  rate: Partial<RateSelect>;
  onRateSelected: (rate: Partial<RateSelect> | null | undefined) => void;
  isRateSelected: (rate: Partial<RateSelect>) => boolean;
}) {
  const mealPlans: { [key: string]: string } = {
    EP: "Stay Only",
    CP: "Free Breakfast",
    MAP: "Free Breakfast + Dinner",
    AP: "All Meals Inclusive",
  };
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex flex-col items-start justify-center w-full gap-2 px-4 py-3 rounded-t-md bg-primary/10">
        <div className="flex items-center justify-between w-full">
          <span
            className={cn(
              "text-xs px-2 py-1 rounded-sm bg-secondary",
              rate.type === "CP" || rate.type === "MAP" || rate.type === "AP"
                ? "text-brand-first font-semibold"
                : "text-primary"
            )}
          >
            {rate.type ? mealPlans[rate.type] : "Accomodation Only"}
          </span>
          <span
            className={cn(
              "px-2 py-1 text-xs font-semibold rounded-sm text-primary",
              `${rate.refundable ? "bg-accent/40" : "bg-destructive/30"}`
            )}
          >
            {rate.refundable ? "refundable" : "non-refundable"}
          </span>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex text-primary">
            {rate.headCount && <PersonsIcon headCount={rate.headCount} />}
          </div>
          <span className="font-bold text-accent">{rate.tariff}/-</span>
        </div>
      </div>
      {/* <div className="flex flex-col">
        <div className="flex items-center px-4 py-2 bg-muted rounded-tr-md">
          <span className="font-bold material-symbols-outlined">add</span>
        </div>
        <div className="flex items-center px-4 py-2 bg-destructive rounded-br-md">
          <span className="font-bold material-symbols-outlined">remove</span>
        </div>
      </div> */}
      {isRateSelected(rate) ? (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center flex-1 p-2 font-bold rounded-bl-mdn bg-accent/80 text-secondary">
            You chose wisely!
          </div>
          <button
            type="button"
            className="flex items-center justify-center p-2 rounded-br-md bg-destructive"
            onClick={() => onRateSelected(null)}
          >
            <i className="font-bold material-symbol-outlined">delete</i>
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="flex items-center justify-center w-full p-2 font-bold rounded-b-md bg-primary/20 text-accent"
          onClick={() => onRateSelected(rate)}
        >
          Select
        </button>
      )}
    </div>
  );
}
