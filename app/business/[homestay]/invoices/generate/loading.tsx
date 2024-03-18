import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<>
			<div className="flex items-center justify-between gap-4 p-4">
				<Skeleton className="w-[40px] h-[40px] rounded-xl" />
				<Skeleton className="flex-1 h-[40px] rounded-xl" />
				<Skeleton className="w-[40px] h-[40px] rounded-xl" />
			</div>
			<div className="grid w-full grid-cols-1 gap-4 p-8 md:grid-cols-3">
				<div className="flex flex-col gap-2">
					<Skeleton className="h-[19px] w-[80px] rounded-xl" />
					<Skeleton className="w-[332px] h-[36px] md:w-[350px] rounded-xl" />
				</div>
				<div className="flex flex-col gap-2">
					<Skeleton className="h-[19px] w-[80px] rounded-xl" />
					<Skeleton className="w-[332px] h-[36px] md:w-[350px] rounded-xl" />
				</div>
				<div className="flex flex-col gap-2">
					<Skeleton className="h-[19px] w-[80px] rounded-xl" />
					<Skeleton className="w-[332px] h-[36px] md:w-[350px] rounded-xl" />
				</div>
				<div className="flex flex-col gap-2">
					<Skeleton className="h-[19px] w-[80px] rounded-xl" />
					<Skeleton className="w-[332px] h-[36px] md:w-[350px] rounded-xl" />
				</div>
			</div>
		</>
	);
}
