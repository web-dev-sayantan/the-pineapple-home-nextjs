"use client";

import { useState } from "react";
import RateCard from "./rateCard";
import { useStore } from "../../../../../store";

export default function RoomRates({ rates }: { rates: any[] }) {
  const { addSelectedRoomRates, removeSelectedRoomRates } = useStore();
  const [selectedRate, setSelectedRate] = useState<any>(null);
  function onRateSelected(rate: any) {
    if (rate) {
      if (selectedRate) removeSelectedRoomRates(selectedRate);
      addSelectedRoomRates(rate);
    } else {
      removeSelectedRoomRates(selectedRate);
    }
    setSelectedRate(rate);
  }
  function isRateSelected(rate: any) {
    return rate.id === selectedRate?.id;
  }
  return (
    <div className="flex flex-col h-full gap-4">
      {rates.map((rate: any) => (
        <RateCard
          key={rate.id}
          rate={rate}
          isRateSelected={isRateSelected}
          onRateSelected={onRateSelected}
        ></RateCard>
      ))}
    </div>
  );
}
