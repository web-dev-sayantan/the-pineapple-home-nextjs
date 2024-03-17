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
				<Skeleton className="h-[88px] w-[366px] md:h-[208px] md:w-[286px] rounded-xl" />
				<Skeleton className="w-[366px] h-[210px] md:h-[208px] md:w-[286px] rounded-xl" />
				<Skeleton className="w-[366px] h-[210px] md:h-[208px] md:w-[286px] rounded-xl" />
			</div>
		</>
	);
}
