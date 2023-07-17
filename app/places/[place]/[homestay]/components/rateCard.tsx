"use client";

import { Prisma } from "@prisma/client";
import { cn } from "../../../../../lib/utils";

export default function RateCard({ rate }: { rate: Prisma.RateSelect }) {
  return (
    <div className="flex items-center gap-4 p-4">
      <span>{rate.headCount} Persons</span>
      <span>{rate.tariff}</span>
      <span
        className={cn(
          "px-4 py-1 text-xs rounded-md",
          `${rate.refundable ? "bg-accent/40" : "bg-destructive/60"}`
        )}
      >
        {rate.refundable ? "refundable" : "non-refundable"}
      </span>
    </div>
  );
}
