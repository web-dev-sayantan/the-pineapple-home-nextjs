import { cn } from "@/lib/utils";
import { Lilita_One } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const lilita = Lilita_One({ weight: "400", subsets: ["latin"] });

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-between w-full h-full gap-4">
      <section className="relative flex items-center justify-center flex-1 w-full [clip-path:_ellipse(100%_100%_at_32%_0%)]">
        <Image
          src={
            "https://res.cloudinary.com/dacarphbj/image/upload/v1721242394/full-homestay-front-snow_hvysmq.jpg"
          }
          alt="{location.name}"
          fill={true}
          priority={true}
          className="rounded-lg brightness-[0.6]"
        />
        <div
          className={cn(
            "absolute flex flex-col gap-4 px-4 text-6xl text-left font-bold tracking-wider delay-1000 transform -translate-y-1/2 font-display text-accent top-[40%] lg:text-7xl",
            lilita.className
          )}
        >
          <h1>THE</h1> <h1>PINEAPPLE</h1> <h1>HOME</h1>
        </div>
      </section>
      <section className="flex w-full px-4 py-10 sm:items-center sm:justify-center ">
        <div className="w-full pt-2 text-lg leading-relaxed tracking-widest text-center uppercase text-primary lg:text-4xl">
          You now have another home <br /> in{" "}
          <span className="text-accent">Manali</span>!
        </div>
      </section>
      <section className="flex flex-col items-center justify-end w-full gap-2 px-4 pb-4 sm:justify-center ">
        <Link href="/places" className="w-full sm:w-80 lg:w-[28rem]">
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button className="w-full p-4 text-xl font-semibold tracking-widest rounded-md animate-pulse lg:text-2xl sm:mt-8 bg-gradient-to-br from-accent to-accent/60 text-slate-50">
            LET'S GO!
          </button>
        </Link>
        {/* <Link href="/admin" className="w-full sm:w-80 lg:w-[28rem]">
		      <button className="w-full p-2 text-lg font-semibold tracking-widest rounded-md lg:text-2xl sm:mt-8 bg-muted text-slate-50">
		        ADMIN
		      </button>
		    </Link> */}
      </section>
    </main>
  );
}
