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
        <section className="absolute flex flex-col items-center justify-center top-[40%] md:top-1/2 transform -translate-y-1/2 ">
          <div
            className={cn(
              "flex flex-col md:flex-row gap-4 px-4 text-6xl text-left font-bold tracking-wide md:tracking-widest delay-1000 font-display text-primary-foreground dark:text-accent lg:text-7xl",
              lilita.className
            )}
          >
            <h1>THE</h1> <h1>PINEAPPLE</h1> <h1>HOME</h1>
          </div>
          <Link
            href="/places"
            className="hidden md:block w-full sm:w-80 lg:w-[20rem]"
          >
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button className="w-full p-4 text-xl font-semibold tracking-widest rounded-xl lg:text-2xl sm:mt-8 bg-accent text-slate-50">
              LET'S GO!
            </button>
          </Link>
        </section>
      </section>
      <section className="flex w-full px-4 py-10 md:py-4 md:pb-10 sm:items-center sm:justify-center ">
        <div className="w-full pt-2 text-lg leading-relaxed tracking-widest text-center uppercase text-primary lg:text-3xl">
          You now have another home <br className="md:hidden" /> in{" "}
          <span className="text-accent">Manali</span>!
        </div>
      </section>
      <section className="flex flex-col items-center justify-end w-full gap-2 px-4 pb-4 md:hidden sm:justify-center ">
        <Link href="/places" className="w-full sm:w-80 lg:w-[28rem]">
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button className="w-full p-4 text-xl font-semibold tracking-widest rounded-md dark:animate-pulse lg:text-2xl sm:mt-8 bg-accent dark:bg-gradient-to-br dark:from-accent dark:to-accent/60 text-slate-50">
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
