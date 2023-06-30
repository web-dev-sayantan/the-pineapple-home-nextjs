import Link from "next/link";
import { LocationType } from "../interfaces";
import { Fragment } from "react";
import Image from "next/image";

export default async function LocationCard({
  location,
}: {
  location: LocationType;
}) {
  return (
    <Fragment>
      <Link
        href={{
          pathname: `/places/${location?.name}`,
        }}
        prefetch={true}
        className={`flex relative flex-col items-center justify-center w-full h-48 bg-blend-darken rounded-lg sm:w-60 text-slate-200 bg-violet-200`}
      >
        <Image
          src={location.coverUrl}
          alt="{location.name}"
          fill={true}
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg filter brightness-50"
        ></Image>
        <span
          className={`absolute text-3xl font-bold tracking-widest first-letter:text-4xl first-letter:text-fuchsia-200`}
        >
          {location?.name.toUpperCase()}
        </span>
        {location.Homestay.length ? (
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
