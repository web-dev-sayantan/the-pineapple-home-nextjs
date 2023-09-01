import { Prisma, Rate } from "@prisma/client";
import RoomRates from "./roomRates";

const roomWithRelations = Prisma.validator<Prisma.RoomDefaultArgs>()({
  include: { category: true, Rate: true },
});
export type RoomWithRelations = Prisma.RoomGetPayload<typeof roomWithRelations>;

export default function RoomCard({ room }: { room: RoomWithRelations }) {
  function getCheapestRate(rates: Rate[]) {
    return rates.sort((a, b) => a.tariff - b.tariff).at(0);
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
            room.category.find((category) => category.id === "dormitory")
              ? ""
              : "Room"}
          </h1>
          <div className="flex items-center gap-2">
            <button>
              <span className="material-symbols-outlined">
                gallery_thumbnail
              </span>
            </button>
          </div>
        </div>
        <h2 className="flex items-center gap-4 py-2">
          {room.category?.map((category) => (
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
      <RoomRates rates={room.Rate}></RoomRates>
      {/* <div className="flex flex-col items-center justify-center">
        <Link
          href={{
            pathname: `${pathname}/${room.id}`,
          }}
          className="flex items-center justify-center w-full px-4 py-2 rounded-sm bg-destructive text-primary"
        >
          View Details
        </Link>
        <div className="flex items-center w-full p-2 rounded-t-md bg-primary/20">
          <button className="flex items-center px-2 py-1 rounded-s-md bg-destructive">
            <span className="material-symbols-outlined">remove</span>
          </button>
          <input
            className="flex-1 h-[2rem] py-1 bg-secondary/20"
            type="number"
            name=""
            id=""
          />
          <button className="flex items-center px-2 py-1 rounded-e-md bg-muted text-primary">
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
        <button className="w-full px-4 py-2 rounded-md bg-accent/80 text-secondary">
          Book
        </button>
      </div> */}
    </div>
  );
}
