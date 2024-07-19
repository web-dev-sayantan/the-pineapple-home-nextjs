import { RateSelect, RoomGallerySelect } from "@/drizzle/schema";
import RoomRates from "./roomRates";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Room = {
  id: string;
  name: string;
  description: string;
  homestayId: string;
  toiletAttached: boolean;
  airConditioned: boolean;
  kitchenAttached: boolean;
  isDorm: boolean;
  occupancy: number;
  houseRecommendation: boolean;
  categoryId: string;
  roomCount: number;
  rates: Partial<RateSelect>[];
  roomGallery: Partial<RoomGallerySelect>[];
};

export default function RoomCard({ room }: { room: Room }) {
  function getCheapestRate(rates: Partial<RateSelect>[]) {
    return rates
      .sort((a, b) => (a.tariff && b.tariff ? a.tariff - b.tariff : 0))
      .at(0);
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:rounded-lg bg-secondary",
        `row-span-${room.rates.length}`
      )}
    >
      <div className="flex flex-col p-4 flex-grow-1">
        {room.houseRecommendation ? (
          <div className="w-32 px-4 py-1 mb-2 text-xs text-center text-teal-100 bg-teal-700 rounded-2xl">
            Recommended
          </div>
        ) : (
          <div>{room.houseRecommendation}</div>
        )}
        <div>{room.houseRecommendation}</div>
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-lg font-semibold text-primary">{room.name}</h1>
          <div className="flex items-center gap-2">
            <button type="button">
              <i className="material-symbol-outlined text-primary">
                gallery_thumbnail
              </i>
            </button>
          </div>
        </div>
        <h2 className="flex items-center gap-4 py-2">
          <span className="w-20 py-1 text-xs text-center rounded-md text-primary bg-primary/10">
            {room.categoryId}
          </span>
        </h2>
      </div>
      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="basis-1">
          {room.roomGallery.map((image) => (
            <CarouselItem key={image.url} className="">
              <div className="px-4">
                <Card>
                  <CardContent className="flex items-center justify-center p-0 aspect-video">
                    <Image
                      src={image.url || ""}
                      alt={image.description || "Room Gallery Image"}
                      width={800}
                      height={200}
                      priority
                      className="w-full h-full rounded-lg"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant={"ghost"} />
        <CarouselNext variant={"ghost"} />
      </Carousel>
      {/* Rates */}
      <div className="p-4">
        <RoomRates rates={room.rates} homestayId={room.homestayId} />
      </div>
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
