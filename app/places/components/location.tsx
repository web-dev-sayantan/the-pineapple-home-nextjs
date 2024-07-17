import Link from "next/link";
import { LocationType } from "../interfaces";
import { Fragment } from "react";
import Image from "next/image";
import { db } from "../../../drizzle";
import { homestay } from "../../../drizzle/schema";
import { eq } from "drizzle-orm";

export default async function LocationCard({
  location,
}: {
  location: LocationType;
}) {
  const homestays = await db
    .select({ name: homestay.name })
    .from(homestay)
    .where(eq(homestay.locationName, location.name));
  return (
    <Fragment>
      <Link
        href={{
          pathname: `/places/${location?.name}`,
        }}
        prefetch={true}
        className="relative flex flex-col items-center justify-center w-full h-48 rounded-lg bg-blend-darken sm:w-60 text-slate-200 bg-violet-200"
      >
        <Image
          src={location.coverUrl}
          alt="{location.name}"
          fill={true}
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg filter brightness-50"
        />
        <span className="absolute text-3xl font-bold tracking-widest first-letter:text-4xl first-letter:text-fuchsia-200">
          {location?.name.toUpperCase()}
        </span>
        {homestays.length ? (
          ""
        ) : (
          <span className="absolute text-sm bottom-14 text-slate-400">
            Coming Soon
          </span>
        )}
      </Link>
    </Fragment>
  );
}
