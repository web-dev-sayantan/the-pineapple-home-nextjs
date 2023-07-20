"use client";
import { Prisma } from "@prisma/client";
import RateCard from "./rateCard";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function RoomCard({ room }: { room: any }) {
  const pathname = usePathname();
  function getCheapestRate(rate: Prisma.RateSelect[]) {
    return rate.sort((a: any, b: any) => a.tariff - b.tariff).at(0);
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
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-lg font-semibold text-accent/80">
            {room.name}{" "}
            {room.category &&
            room.category.find((category: any) => category.id === "dormitory")
              ? ""
              : "Room"}
          </h1>
          <div className="flex items-center gap-2">
            <button>
              <span className="material-symbols-outlined">location_on</span>
            </button>
            <button>
              <span className="material-symbols-outlined">
                gallery_thumbnail
              </span>
            </button>
          </div>
        </div>
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
        <span className="text-lg font-normal">Starting from Rs. </span>{" "}
        <span className="text-xl font-extrabold text-accent">
          {getCheapestRate(room.Rate)?.tariff || 1400}/-
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {room.Rate.map((rate: any) => (
          <RateCard key={rate.id} rate={rate}></RateCard>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4">
        <Link
          href={{
            pathname: `${pathname}/${room.id}`,
          }}
          className="flex items-center justify-center w-full px-4 py-2 rounded-sm bg-destructive text-primary"
        >
          View Details
        </Link>
        <button className="w-full px-4 py-2 rounded-sm bg-accent/80 text-secondary">
          Book
        </button>
      </div>
    </div>
  );
}
