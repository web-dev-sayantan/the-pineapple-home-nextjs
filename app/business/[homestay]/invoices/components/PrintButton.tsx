"use client";

import { Button } from "@/components/ui/button";

export default function PrintButton() {
	return (
		<Button
			onClick={() => window.print()}
			className="my-2 print:hidden print:py-0"
		>
			Print
		</Button>
	);
}
