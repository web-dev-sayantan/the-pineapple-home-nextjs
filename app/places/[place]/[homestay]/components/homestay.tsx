"use client";

import NavBar from "@/app/components/navBar";
import BookingButton from "@/app/places/[place]/[homestay]/components/bookingButton";
import RoomCard from "@/app/places/[place]/[homestay]/components/roomCard";
import { homestayOptions } from "@/app/places/[place]/[homestay]/data/homestay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function HomestayClient({ homestayId }: { homestayId: string }) {
  const { data: homestayData } = useQuery(homestayOptions(homestayId));

  const homestayCoverImages = homestayData?.homestayGallery.filter(
    (image) => image.category === "cover"
  );
  const mapLink = `http://www.google.com/maps/place/${homestayData?.location.lat},${homestayData?.location.long}`;

  return (
    <main className="relative flex flex-col items-center justify-center">
      <NavBar>
        <span className="text-primary">{homestayData?.name}</span>
      </NavBar>
      {homestayData ? (
        <>
          <div className="w-full">
            <div className="relative w-full cover">
              {homestayData && homestayCoverImages?.length ? (
                <>
                  <Carousel
                    opts={{
                      align: "start",
                    }}
                    className="w-full"
                  >
                    <CarouselContent className="basis-1">
                      {homestayCoverImages.map((image) => (
                        <CarouselItem key={image.url} className="">
                          <div className="p-1">
                            <Card>
                              <CardContent className="flex items-center justify-center p-6 aspect-square">
                                <Image
                                  src={image.url}
                                  alt={homestayData.name}
                                  width={800}
                                  height={200}
                                  priority
                                  className="w-full h-full"
                                />
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext variant={"ghost"} />
                  </Carousel>
                </>
              ) : null}
            </div>
            <h1 className="flex items-center justify-between w-full p-4 font-semibold text-primary/70">
              <span>
                {homestayData.location.name}, {homestayData.location.state}
              </span>
              <a title="Open Map Location" href={mapLink}>
                <i className="material-symbol-outlined text-primary">
                  location_on
                </i>
              </a>
            </h1>
            <div className="rooms">
              {homestayData.rooms.map((room) => (
                <RoomCard room={room} key={room.id} />
              ))}
            </div>
          </div>
          <BookingButton />
        </>
      ) : null}
    </main>
  );
}
