"use client";
import { Prisma } from "@prisma/client";
export default function RoomCard({ room }: { room: any }) {
  function getCheapestRate(rate: Prisma.RateSelect[]) {
    return rate.sort().at(0);
  }
  return (
    <div className="flex flex-col gap-4 p-4 m-4 rounded-lg bg-secondary">
      <div className="flex flex-col flex-grow-1">
        {room.houseRecommendation ? (
          <div className="w-32 px-4 py-1 mb-2 text-xs text-center text-teal-100 bg-teal-700 rounded-2xl">
            Recommended
          </div>
        ) : (
          <div>{room.houseRecommendation}</div>
        )}
        <div>{room.houseRecommendation}</div>
        <h1 className="text-lg font-semibold text-accent/80">
          {room.name}{" "}
          {room.category &&
          room.category.find((category: any) => category.id === "dormitory")
            ? ""
            : "Room"}
        </h1>
        <h2 className="flex items-center gap-4 py-2">
          {room.category?.map((category: any) => (
            <span
              key={category.id}
              className="w-20 py-1 text-xs text-center text-teal-300 rounded-md bg-primary/20"
            >
              {category.name}
            </span>
          ))}
        </h2>
      </div>
      <div className="w-full p-2 text-center">
        <span className="text-lg font-normal">Starting from Rs.</span>{" "}
        <span className="text-xl font-extrabold text-accent">
          {getCheapestRate(room.Rate)?.tariff || 1400}/-
        </span>
      </div>
      <div className="flex items-center justify-center gap-4">
        <button className="w-full px-4 py-2 rounded-sm bg-destructive text-primary">
          View Details
        </button>
        <button className="w-full px-4 py-2 rounded-sm bg-accent text-secondary">
          Book
        </button>
      </div>
    </div>
  );
}
