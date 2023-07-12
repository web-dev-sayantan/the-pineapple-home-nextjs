import Image from "next/image";
import { prisma } from "../../../../server/db";
import NavBar from "../../../components/navBar";

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
            <div className="p-4 m-4 rounded-lg bg-secondary" key={room.id}>
              <h1 className="text-lg font-semibold text-accent/80">
                {room.name} Room
              </h1>
              <h2 className="flex items-center gap-4 py-2">
                {room.category.map((category) => (
                  <span
                    key={category.id}
                    className="w-24 p-2 text-sm text-center rounded-md bg-primary/70 text-secondary"
                  >
                    {category.name}
                  </span>
                ))}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
