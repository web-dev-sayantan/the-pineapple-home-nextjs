import Image from "next/image";
import Link from "next/link";
import { lilita } from "@/app/constants";
import { ModeSwitch } from "@/components/mode-switch";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-between w-full h-full">
      <div className="absolute right-0 p-4">
        <ModeSwitch size={1} />
      </div>
      {/* Secondary Title */}
      <section className="flex flex-col items-end justify-center w-full px-4 py-10 basis-2/5 md:basis-1/4 md:py-4 md:pb-10 ">
        <div
          className={cn(
            "w-full flex flex-col md:flex-row md:justify-center gap-4 text-6xl text-left font-bold tracking-wide md:tracking-widest delay-1000 font-display text-primary-foreground dark:text-primary lg:text-7xl",
            lilita.className
          )}
        >
          <h1 className="text-brand-first">THE</h1>
          <h1 className="flex">
            <span className="text-brand-first">PINE</span>
            <span className="text-brand-second">APPLE</span>
          </h1>
          <h1 className="text-brand-first">HOME</h1>
        </div>
        <div className="hidden w-full pt-2 text-lg leading-relaxed tracking-widest text-center uppercase md:block text-primary lg:text-xl">
          You now have another home <br className="md:hidden" /> in{" "}
          <span className="font-bold text-accent">Manali !!</span>
        </div>
      </section>
      {/* Hero Image w/ main title */}
      <section className="relative flex items-center justify-center basis-3/5 md:basis-3/4 w-full [clip-path:_polygon(61%_19%,_48%_11%,_62%_6%,_100%_25%,_100%_100%,_0_100%,_0_17%,_23%_0)] md:[clip-path:_polygon(0%_100%,_100%_100%,_100%_32%,_75%_11%,_62%_18%,_71%_27%,_48%_6%,_34%_13%,_47%_26%,_19%_0,_0_20%)]">
        <Image
          src={
            "https://res.cloudinary.com/dacarphbj/image/upload/v1721242394/full-homestay-front-snow_hvysmq.jpg"
          }
          alt="{location.name}"
          fill={true}
          priority={true}
          className="rounded-lg brightness-75 dark:brightness-110 md:hidden"
        />
        <Image
          src={
            "https://res.cloudinary.com/dacarphbj/image/upload/v1721242388/full-homestay-front-snow-landscape_ikek3y.jpg"
          }
          alt="{location.name}"
          fill={true}
          priority={true}
          className="rounded-lg brightness-[1.2] hidden md:block"
        />
        {/* CTA Button */}
        <div className="absolute flex flex-col items-center w-full gap-16 px-8 bottom-8 md:top-1/2 ">
          <Link
            href="/places/manali/the-pineapple-home-manali"
            className="w-full sm:w-80 lg:w-[20rem]"
          >
            <button
              type="button"
              className="w-full p-4 text-xl font-semibold tracking-widest text-white bg-gradient-to-br from-brand-second to-accent rounded-xl lg:text-2xl sm:mt-8"
            >
              LET'S GO!
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
