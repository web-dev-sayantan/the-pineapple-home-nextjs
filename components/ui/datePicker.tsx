import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { UseFormReturn, useForm } from "react-hook-form";

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
import { Invoice } from "@/app/business/[homestay]/invoice/create/shared/shared-code";

export function DatePickerForm({
	form,
	fieldName,
	label,
}: {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	form: UseFormReturn<Invoice, any, undefined>;
	fieldName: "invoiceDate" | "checkinDate" | "checkoutDate";
	label: string;
}) {
	return (
		<FormField
			control={form.control}
			name={fieldName}
			render={({ field }) => (
				<FormItem className="flex flex-col w-full">
					<FormLabel>{label}</FormLabel>
					<Popover>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant={"outline"}
									className={cn(
										"w-full pl-3 text-left font-normal",
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
									date > new Date() || date < new Date("1900-01-01")
								}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
