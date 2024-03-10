"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "../lib/utils";

export function ModeToggle({ size }: { size: number }) {
	const { setTheme } = useTheme();
	const sizeClassName = `text-[${size}rem]`;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon" className="flex items-center">
					<i
						className={cn(
							"material-symbol-outlined rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0",
							sizeClassName,
						)}
					>
						light_mode
					</i>
					<i
						className={cn(
							"material-symbol-outlined absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
							sizeClassName,
						)}
					>
						dark_mode
					</i>
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
