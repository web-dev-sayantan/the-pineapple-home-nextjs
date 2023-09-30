import Image from "next/image";
import NavBar from "../../../components/navBar";
import RoomCard from "./components/roomCard";
import BookingButton from "./components/bookingButton";
import { db } from "@/drizzle";
import { eq } from "drizzle-orm";

import { homestay } from "@/drizzle/schema";

function getHomestayById(id: string) {
  return db.query.homestay.findFirst({
    where: eq(homestay.id, id),
    columns: {
      name: true,
    },
    with: {
      location: {
        columns: {
          name: true,
          state: true,
          lat: true,
          long: true,
        },
      },
      rooms: {
        with: {
          categories: {
            columns: {
              id: true,
              name: true,
              description: true,
            },
          },
          rates: {
            columns: {
              id: true,
              tariff: true,
            },
          },
        },
      },
      homestayGallery: {
        columns: {
          url: true,
          category: true,
        },
      },
    },
  });
}

export default async function Homestay({
  params,
}: {
  params: { place: string; homestay: string };
}) {
  const homestayData = await getHomestayById(params.homestay);
  const homestayCoverImage = homestayData?.homestayGallery.find(
    (image) => image.category === "cover"
  );
  const mapLink = `http://www.google.com/maps/place/${homestayData?.location.lat},${homestayData?.location.long}`;
  if (homestay) {
    return (
      <div className="relative flex flex-col items-center justify-center">
        <NavBar>
          <span className="text-accent">{homestayData?.name}</span>
        </NavBar>
        {homestayData ? (
          <>
            <div className="w-full">
              <div className="w-full cover">
                {homestay && homestayCoverImage ? (
                  <Image
                    src={homestayCoverImage.url}
                    alt={homestayData.name}
                    width={800}
                    height={100}
                    priority
                    className="w-full h-60"
                  ></Image>
                ) : null}
              </div>
              <h1 className="flex items-center justify-between w-full p-4 font-semibold text-muted-foreground">
                <span>
                  {homestayData.location.name}, {homestayData.location.state}
                </span>
                <a title="Open Map Location" href={mapLink}>
                  <span className="material-symbols-outlined text-accent">
                    location_on
                  </span>
                </a>
              </h1>
              <div className="rooms">
                {homestayData.rooms.map((room) => (
                  <RoomCard room={room} key={room.id}></RoomCard>
                ))}
              </div>
            </div>
            <BookingButton />
          </>
        ) : null}
      </div>
    );
  }
}
