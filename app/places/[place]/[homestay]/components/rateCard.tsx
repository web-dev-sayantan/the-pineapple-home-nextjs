"use client";

import { Prisma } from "@prisma/client";
import { cn } from "../../../../../lib/utils";
import PersonsIcon from "../../../../../components/ui/personsIcon";

export default function RateCard({ rate }: { rate: any }) {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex flex-col items-start justify-center w-full gap-2 px-4 py-3 rounded-t-md bg-primary/10">
        <div className="flex items-center justify-between w-full">
          <span className="text-sm">Tariff per night for </span>
          <span
            className={cn(
              "px-2 py-1 text-xs font-semibold rounded-sm text-primary",
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
      {/* <div className="flex flex-col">
        <div className="flex items-center px-4 py-2 bg-muted rounded-tr-md">
          <span className="font-bold material-symbols-outlined">add</span>
        </div>
        <div className="flex items-center px-4 py-2 bg-destructive rounded-br-md">
          <span className="font-bold material-symbols-outlined">remove</span>
        </div>
      </div> */}
      <div className="flex flex-col w-full p-2 bg-muted rounded-b-md">
        <button>Select</button>
      </div>
    </div>
  );
}
