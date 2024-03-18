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
				<Skeleton className="flex flex-col items-center justify-center h-[88px] w-[366px] md:h-[256px] md:w-[286px] rounded-xl">
					<Skeleton className="w-[160px] h-[20px] rounded-xl" />
				</Skeleton>
				<Skeleton className="flex flex-col gap-2 w-[366px] h-[256px] md:w-[286px] rounded-xl p-6">
					<div className="flex items-center justify-center w-full ">
						<Skeleton className="w-[200px] h-[20px] md:w-[286px] rounded-xl" />
					</div>
					<div className="flex w-full">
						<Skeleton className="mt-4 w-[250px] h-[20px] md:w-[286px] rounded-xl" />
					</div>
					<div className="flex w-full">
						<Skeleton className="w-[250px] h-[20px] md:w-[286px] rounded-xl" />
					</div>
					<div className="flex items-center justify-between w-full gap-2 mt-4">
						<Skeleton className="flex-1 h-[2.25rem] rounded-md" />
						<Skeleton className="w-[4.6rem] h-[2.25rem] rounded-md" />
					</div>
					<div className="flex w-full">
						<Skeleton className="w-full h-[2.25rem] rounded-md" />
					</div>
				</Skeleton>
				<Skeleton className="flex flex-col gap-2 w-[366px] h-[256px] md:w-[286px] rounded-xl p-6">
					<div className="flex items-center justify-center w-full ">
						<Skeleton className="w-[200px] h-[20px] md:w-[286px] rounded-xl" />
					</div>
					<div className="flex w-full">
						<Skeleton className="mt-4 w-[250px] h-[20px] md:w-[286px] rounded-xl" />
					</div>
					<div className="flex w-full">
						<Skeleton className="w-[250px] h-[20px] md:w-[286px] rounded-xl" />
					</div>
					<div className="flex items-center justify-between w-full gap-2 mt-4">
						<Skeleton className="flex-1 h-[2.25rem] rounded-md" />
						<Skeleton className="w-[4.6rem] h-[2.25rem] rounded-md" />
					</div>
					<div className="flex w-full">
						<Skeleton className="w-full h-[2.25rem] rounded-md" />
					</div>
				</Skeleton>
			</div>
		</>
	);
}
