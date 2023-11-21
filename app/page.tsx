import Link from "next/link";
import { DatePickerWithRange } from "../components/ui/dateRangePicker";

export default function Home() {
  return (
    <main className="flex flex-col items-start justify-between w-full h-full ">
      <section className="flex flex-1 w-full p-8 sm:items-center sm:justify-center ">
        <h1 className="flex flex-wrap my-3 text-2xl font-bold leading-loose tracking-widest text-primary lg:text-4xl">
          WHERE DO YOU SEE YOURSELF ON YOUR NEXT . . .
        </h1>
      </section>
      <section className="flex items-baseline justify-center w-full px-8">
        <h1 className="text-5xl font-bold tracking-wider delay-1000 text-accent lg:text-7xl animate-toYellow">
          VACATION
        </h1>
        <h1 className="pl-1 text-6xl font-bold text-accent/60 lg:text-8xl animate-toTeal">
          ?
        </h1>
      </section>
      <div className="flex flex-col items-center justify-end flex-1 w-full gap-2 p-8 sm:justify-center ">
        <div className="flex flex-col items-center justify-center w-full py-8">
          <h1 className="py-4 text-lg font-semibold text-accent/70">
            Choose your <span className="text-lg text-red-400">dates</span>
          </h1>
          <DatePickerWithRange className="text-accent/80" />
        </div>
        <Link href="/places" className="w-full sm:w-80 lg:w-[28rem]">
          <button className="w-full p-4 text-xl font-semibold tracking-widest rounded-md animate-pulse lg:text-2xl sm:mt-8 bg-gradient-to-br from-primary/80 to-accent/40 text-slate-50">
            DIVE IN
          </button>
        </Link>
        {/* <Link href="/admin" className="w-full sm:w-80 lg:w-[28rem]">
          <button className="w-full p-2 text-lg font-semibold tracking-widest rounded-md lg:text-2xl sm:mt-8 bg-muted text-slate-50">
            ADMIN
          </button>
        </Link> */}
      </div>
    </main>
  );
}
