import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-start justify-between w-full h-full ">
      <section className="flex flex-1 w-full p-8 sm:items-center sm:justify-center bg-gradient-to-b md:bg-gradient-to-r from-teal-600 to-yellow-400 bg-clip-text">
        <h1 className="flex flex-wrap my-3 text-2xl font-bold leading-loose tracking-widest text-transparent lg:text-4xl">
          WHERE DO YOU SEE YOURSELF ON YOUR NEXT . . .
        </h1>
      </section>
      <section className="flex items-baseline w-full px-8 sm:justify-center">
        <h1 className="text-5xl font-bold tracking-wider text-yellow-400 delay-1000 lg:text-7xl animate-toYellow">
          VACATION
        </h1>
        <h1 className="pl-1 text-6xl font-bold text-teal-600 lg:text-8xl animate-toTeal">
          ?
        </h1>
      </section>
      <div className="flex flex-col items-center justify-end flex-1 w-full p-8 sm:justify-center ">
        <Link href="/places" className="w-full sm:w-80 lg:w-[28rem]">
          <button className="w-full p-4 text-xl font-semibold tracking-widest rounded-md animate-pulse lg:text-2xl sm:mt-8 bg-gradient-to-br from-teal-800 to-yellow-700 text-slate-50">
            DIVE IN
          </button>
        </Link>
      </div>
    </main>
  );
}
