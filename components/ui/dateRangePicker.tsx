"use client";

import * as React from "react";
import { addMonths, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange, Matcher } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useStore } from "../../store";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { dateRange, setDateRange } = useStore((state) => state);
  const disabledDays: Matcher[] = [
    {
      before: new Date(),
      after: addMonths(new Date(), 12),
    },
  ];
  function onDateRangeSelect(selectedDateRange: DateRange | undefined) {
    if (selectedDateRange) {
      setDateRange(selectedDateRange);
    }
  }
  return (
    <div className={cn("grid gap-2 w-full sm:w-80", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left text-lg p-3",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={onDateRangeSelect}
            numberOfMonths={1}
            min={2}
            max={30}
            disabled={disabledDays}
            fixedWeeks
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
