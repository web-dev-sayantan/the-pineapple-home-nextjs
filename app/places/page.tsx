import { Fragment } from "react";
import { prisma } from "../../server/db";
import LocationCard from "./components/location";

export default async function Places() {
  const locations = await prisma.location.findMany({
    select: {
      id: true,
      name: true,
      coverUrl: true,
      Homestay: {
        select: {
          id: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col items-center justify-between w-full h-full p-4">
      <div className="flex flex-col flex-wrap items-center w-full h-full gap-4 p-8 sm:h-auto sm:flex-row justify-evenly sm:justify-start sm:gap-12">
        {locations.map((location) => (
          <LocationCard location={location} key={location.id} />
        ))}
      </div>
      <h4 className="py-8">
        More places to be added once we&apos;re{" "}
        <span className="text-yellow-400">rich</span>.
      </h4>
    </div>
  );
}
