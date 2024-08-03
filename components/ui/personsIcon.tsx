"use client";

import { cn } from "@/lib/utils";

export default function PersonsIcon({
	headCount,
	className = "",
}: { headCount: number; className?: string }) {
	return Array.from(Array(headCount)).map((item, index) => (
		<i
			className={cn("material-symbol-outlined text-primary", className)}
			key={index}
		>
			person
		</i>
	));
}
