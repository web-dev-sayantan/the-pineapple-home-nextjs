import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	FormControl,
	FormField,
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

export type DateFieldsType = "invoiceDate" | "checkinDate" | "checkoutDate";

export function DatePicker({
	label,
	field,
}: {
	label: string;
	field: ControllerRenderProps<Invoice, DateFieldsType>;
}) {
	return (
		<FormItem className="flex flex-col w-full">
			<FormLabel>{label}</FormLabel>
			<Popover>
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
						onSelect={field.onChange}
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
