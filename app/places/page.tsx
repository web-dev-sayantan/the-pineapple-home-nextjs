import Link from "next/link";

export default function Places() {
  const places = ["MANALI", "JIBHI", "SAANJH VALLEY", "ZANSKAR", "LANGZA"];
  return (
    <div className="flex flex-col flex-wrap items-center w-full h-full gap-4 p-8 sm:h-auto sm:flex-row justify-evenly sm:justify-start sm:gap-12">
      {places.map((place) => (
        <div
          className="flex items-center justify-center w-full h-32 p-4 bg-teal-600 rounded-lg sm:w-60 text-slate-50"
          key={place}
        >
          <Link href={`/places/${place}`}>
            <span className="text-xl font-bold tracking-widest capitalize first-letter:text-3xl first-letter:text-yellow-300">
              {place}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
}
