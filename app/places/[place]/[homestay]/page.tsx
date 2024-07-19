import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";
import {
  foodPlanOptions,
  homestayOptions,
} from "@/app/places/[place]/[homestay]/data/homestay-data";
import HomestayClient from "@/app/places/[place]/[homestay]/components/homestay";

export default async function Homestay({
  params,
}: {
  params: { place: string; homestay: string };
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(homestayOptions(params.homestay));
  await queryClient.prefetchQuery(foodPlanOptions(params.homestay));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomestayClient homestayId={params.homestay} />
    </HydrationBoundary>
  );
}
