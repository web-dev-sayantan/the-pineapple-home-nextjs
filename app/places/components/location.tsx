import Link from "next/link";

export default async function LocationCard({ location }: { location: any }) {
  console.log(location);
  return (
    <Link
      href={`/places/${location?.name}`}
      prefetch={true}
      className={`flex items-center justify-center w-full h-32 p-4 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-400 sm:w-60 text-fuchsia-50 ${
        location?.Homestay.length
          ? "cursor-pointer"
          : "opacity-20 cursor-not-allowed"
      }`}
    >
      <span
        className={`text-xl font-bold tracking-widest first-letter:text-3xl first-letter:text-yellow-300`}
      >
        {location?.name}
      </span>
    </Link>
  );
}
