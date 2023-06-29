import Link from "next/link";
import { prisma } from "../../server/db";

export default async function Places() {
  const locations = await prisma.location.findMany({
    select: {
      id: true,
      name: true,
      Homestay: true,
    },
  });
  console.log(locations[0]);
  return (
    <div className="flex flex-col flex-wrap items-center w-full h-full gap-4 p-8 sm:h-auto sm:flex-row justify-evenly sm:justify-start sm:gap-12">
      {locations.map((location) => (
        <Link
          href={`/places/${location.name}`}
          key={location.id}
          prefetch={true}
          className={`flex items-center justify-center w-full h-32 p-4 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-400 sm:w-60 text-fuchsia-50 ${
            location.Homestay.length
              ? "cursor-pointer"
              : "opacity-20 cursor-not-allowed"
          }`}
        >
          <span
            className={`text-xl font-bold tracking-widest first-letter:text-3xl first-letter:text-yellow-300`}
          >
            {location.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
