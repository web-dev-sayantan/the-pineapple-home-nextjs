import Image from "next/image";
import { prisma } from "../../../../server/db";
import NavBar from "../../../components/navBar";
import RoomCard from "./components/roomCard";

export default async function Homestay({
  params,
}: {
  params: { place: string; homestay: string };
}) {
  const homestay = await prisma.homestay.findFirst({
    where: {
      id: params.homestay,
    },
    select: {
      name: true,
      location: {
        select: {
          name: true,
          state: true,
        },
      },
      Rooms: {
        include: {
          category: true,
          Rate: true,
        },
      },
      HomestayGallery: {
        select: {
          url: true,
          category: true,
        },
      },
    },
  });
  const homestayCoverImage = homestay?.HomestayGallery.find(
    (image) => image.category === "cover"
  );
  return (
    <div className="flex flex-col items-center justify-center">
      <NavBar>
        <span className="text-fuchsia-400">{homestay?.name}</span>
      </NavBar>
      {homestay ? (
        <div className="w-full">
          <div className="w-full cover">
            {homestay && homestayCoverImage ? (
              <Image
                src={homestayCoverImage.url}
                alt={homestay.name}
                width={800}
                height={100}
                className="w-full h-60"
              ></Image>
            ) : null}
          </div>
          <h1 className="flex items-center justify-start p-4 font-semibold text-muted-foreground">
            {homestay?.location.name}, {homestay?.location.state}
          </h1>
          <div className="rooms">
            {homestay?.Rooms.map((room) => (
              <RoomCard room={room} key={room.id}></RoomCard>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
