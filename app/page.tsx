import { cn } from "@/lib/utils";
import { Lilita_One } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const lilita = Lilita_One({ weight: "400", subsets: ["latin"] });

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-between w-full h-full gap-4">
      {/* Secondary Title */}
      <section className="flex items-end justify-center w-full px-4 py-10 basis-1/4 md:py-4 md:pb-10 ">
        <div className="w-full pt-2 text-lg leading-relaxed tracking-widest text-center uppercase text-primary lg:text-3xl">
          You now have another home <br className="md:hidden" /> in{" "}
          <span className="text-accent">Manali</span>!
        </div>
      </section>
      {/* Hero Image w/ main title */}
      <section className="relative flex items-center justify-center basis-3/4 w-full [clip-path:_polygon(61%_19%,_48%_11%,_62%_6%,_100%_25%,_100%_100%,_0_100%,_0_17%,_23%_0)]">
        <Image
          src={
            "https://res.cloudinary.com/dacarphbj/image/upload/v1721242394/full-homestay-front-snow_hvysmq.jpg"
          }
          alt="{location.name}"
          fill={true}
          priority={true}
          className="rounded-lg brightness-[0.6] md:hidden"
        />
        <Image
          src={
            "https://res.cloudinary.com/dacarphbj/image/upload/v1721242388/full-homestay-front-snow-landscape_ikek3y.jpg"
          }
          alt="{location.name}"
          fill={true}
          priority={true}
          className="rounded-lg brightness-[0.6] hidden md:block"
        />
        {/* CTA Button for Web */}
        <div className="absolute flex flex-col items-center gap-16 bottom-10 md:top-1/2 ">
          <div
            className={cn(
              "flex flex-col md:flex-row gap-4 text-6xl text-left font-bold tracking-wide md:tracking-widest delay-1000 font-display text-primary-foreground dark:text-accent lg:text-7xl",
              lilita.className
            )}
          >
            <h1>THE</h1> <h1>PINEAPPLE</h1> <h1>HOME</h1>
          </div>
          <Link href="/places" className="w-full sm:w-80 lg:w-[20rem]">
            <button
              type="button"
              className="w-full p-4 text-xl font-semibold tracking-widest dark:bg-gradient-to-br dark:from-accent dark:to-fuchsia-600 rounded-xl lg:text-2xl sm:mt-8 bg-accent text-slate-50"
            >
              LET'S GO!
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
