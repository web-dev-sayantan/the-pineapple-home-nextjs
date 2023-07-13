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
  console.log(homestay?.Rooms);
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
              <div
                className="flex flex-col gap-4 p-4 m-4 rounded-lg bg-secondary"
                key={room.id}
              >
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
                    {room.category.find(
                      (category) => category.id === "dormitory"
                    )
                      ? ""
                      : "Room"}
                  </h1>
                  <h2 className="flex items-center gap-4 py-2">
                    {room.category.map((category) => (
                      <span
                        key={category.id}
                        className="w-20 py-1 text-xs text-center text-teal-300 rounded-md bg-primary/20"
                      >
                        {category.name}
                      </span>
                    ))}
                  </h2>
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
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
