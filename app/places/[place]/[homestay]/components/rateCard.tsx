"use client";

import { Prisma } from "@prisma/client";
import { cn } from "../../../../../lib/utils";
import PersonsIcon from "../../../../../components/ui/personsIcon";

export default function RateCard({ rate }: { rate: any }) {
  return (
    <div className="flex flex-col items-start justify-center gap-2 p-2 rounded-md bg-primary/20">
      <div className="flex items-center justify-between w-full">
        <span>Tariff per night for </span>
        <span
          className={cn(
            "px-2 py-1 text-xs font-semibold rounded-md text-primary",
            `${rate.refundable ? "bg-accent/40" : "bg-destructive/60"}`
          )}
        >
          {rate.refundable ? "refundable" : "non-refundable"}
        </span>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex">
          <PersonsIcon headCount={rate.headCount}></PersonsIcon>
        </div>
        <span className="font-bold text-accent">{rate.tariff}/-</span>
      </div>
    </div>
  );
}
