"use client";
import { format, subDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ControllerRenderProps } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Invoice } from "../shared/shared-code";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export type DateFieldsType = "invoiceDate";
export type DateRangeFieldsType = "stayDuration";

export function DatePicker({
	label,
	field,
}: {
	label: string;
	field: ControllerRenderProps<Invoice, DateFieldsType>;
}) {
	const [open, setOpen] = useState(false);

	return (
		<FormItem className="flex flex-col w-full">
			<FormLabel>{label}</FormLabel>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<FormControl>
						<Button
							variant={"outline"}
							className={cn(
								"w-full pl-3 text-left font-normal hover:bg-background",
								!field.value && "text-muted-foreground",
							)}
						>
							{field.value ? (
								format(field.value, "PPP")
							) : (
								<span>Pick a date</span>
							)}
							<CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
						</Button>
					</FormControl>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
						selected={field.value}
						onSelect={(e) => {
							field.onChange(e);
							setOpen(false);
							field.onBlur();
						}}
						disabled={(date) =>
							date > new Date() || date < new Date("2023-12-12")
						}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
			<FormMessage />
		</FormItem>
	);
}

export function DateRangePicker({
	label,
	field,
	onSelected,
}: {
	label: string;
	field: ControllerRenderProps<Invoice, DateRangeFieldsType>;
	onSelected: (date: DateRange) => void;
}) {
	const [open, setOpen] = useState(false);
	return (
		<FormItem className="flex flex-col w-full">
			<FormLabel>{label}</FormLabel>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<FormControl>
						<Button
							variant={"outline"}
							className={cn(
								"w-full text-left justify-start font-normal hover:bg-background",
								!field.value && "text-muted-foreground",
							)}
						>
							<CalendarIcon className="w-4 h-4 mr-2" />
							{field.value?.from ? (
								field.value.to ? (
									<>
										{format(field.value.from, "LLL dd, y")} -{" "}
										{format(field.value.to, "LLL dd, y")}
									</>
								) : (
									format(field.value.from, "LLL dd, y")
								)
							) : (
								<span>Pick a date</span>
							)}
						</Button>
					</FormControl>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="range"
						selected={field.value}
						onSelect={(e) => {
							field.onChange(e);
							if (e) {
								onSelected(e);
							}
						}}
						disabled={(date) =>
							date > new Date() || date < new Date("2023-12-12")
						}
						initialFocus
						footer={
							<div className="flex items-center justify-end w-full gap-2 py-2">
								<Button
									variant={"destructive"}
									className={cn("justify-end font-normal hover:bg-background")}
									onClick={() => {
										field.onChange({
											from: subDays(new Date(), 2),
											to: new Date(),
										});
										setOpen(false);
										field.onBlur();
									}}
								>
									Clear
								</Button>
								<Button
									variant={"accent"}
									className={cn("justify-end font-normal hover:bg-background")}
									onClick={() => {
										setOpen(false);
										field.onBlur();
									}}
								>
									Done
								</Button>
							</div>
						}
					/>
				</PopoverContent>
			</Popover>
			<FormMessage />
		</FormItem>
	);
}
