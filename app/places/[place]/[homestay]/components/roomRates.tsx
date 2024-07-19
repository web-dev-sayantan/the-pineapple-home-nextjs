"use client";

import { useState } from "react";
import RateCard from "./rateCard";
import { useStore } from "../../../../../store";
import { RateSelect } from "../../../../../drizzle/schema";

export default function RoomRates({
  rates,
  homestayId,
}: {
  rates: Partial<RateSelect>[];
  homestayId: string;
}) {
  const { addSelectedRoomRates, removeSelectedRoomRates, selectedRoomRates } =
    useStore();
  const [selectedRate, setSelectedRate] = useState<
    Partial<RateSelect> | null | undefined
  >(selectedRoomRates.find((rate) => rate.roomId === rates[0]?.roomId));

  function onRateSelected(rate: Partial<RateSelect> | null | undefined) {
    if (rate) {
      if (selectedRate) removeSelectedRoomRates(selectedRate);
      addSelectedRoomRates(rate);
    } else {
      removeSelectedRoomRates(selectedRate);
    }
    setSelectedRate(rate);
  }

  function isRateSelected(rate: Partial<RateSelect>) {
    return rate.id === selectedRate?.id;
  }

  return (
    <div className="flex flex-col items-center h-full gap-4">
      {rates.map((rate) => (
        <RateCard
          key={rate.id}
          rate={rate}
          homestayId={homestayId}
          isRateSelected={isRateSelected}
          onRateSelected={onRateSelected}
        />
      ))}
    </div>
  );
}
