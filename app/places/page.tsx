import { prisma } from "../../server/db";
import LocationCard from "./components/location";

export default async function Places() {
  const locations = await prisma.location.findMany({
    select: {
      id: true,
      name: true,
      Homestay: {
        select: {
          id: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col flex-wrap items-center w-full h-full gap-4 p-8 sm:h-auto sm:flex-row justify-evenly sm:justify-start sm:gap-12">
      {locations.map((location) => (
        <LocationCard location={location} key={location.id} />
      ))}
    </div>
  );
}
