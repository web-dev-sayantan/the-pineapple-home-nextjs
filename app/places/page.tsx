import Link from "next/link";

export default function Places() {
  const places = ["MANALI", "JIBHI", "SAANJH VALLEY", "ZANSKAR", "LANGZA"];
  return (
    <div className="flex flex-col flex-wrap items-center w-full h-full gap-4 p-8 sm:h-auto sm:flex-row justify-evenly sm:justify-start sm:gap-12">
      {places.map((place) => (
        <Link
          href={`/places/${place}`}
          key={place}
          prefetch={true}
          className="flex items-center justify-center w-full h-32 p-4 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-400 sm:w-60 text-fuchsia-50"
        >
          <span className="text-xl font-bold tracking-widest first-letter:text-3xl first-letter:text-yellow-300">
            {place}
          </span>
        </Link>
      ))}
    </div>
  );
}
