"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HomestayCard({
  homestay,
}: {
  homestay: {
    id: string;
    name: string;
    HomestayGallery: {
      url: string;
      category: string;
    }[];
  };
}) {
  const pathname = usePathname();
  const coverImage = homestay.HomestayGallery.find(
    (image) => image.category === "cover"
  );
  return (
    <div className="w-full h-48 text-center" key={homestay.id}>
      <Link
        href={{
          pathname: `${pathname}/${homestay.id}`,
        }}
        prefetch={true}
        className={`flex relative flex-col items-center justify-center w-full h-48 bg-blend-darken rounded-lg sm:w-60 text-slate-200 bg-violet-600`}
      >
        {coverImage ? (
          <Image
            src={coverImage.url}
            alt="{homestay.name}"
            fill={true}
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-lg filter brightness-50"
          ></Image>
        ) : null}
        <span
          className={`absolute text-xl font-semibold tracking-widest first-letter:text-3xl first-letter:text-fuchsia-200`}
        >
          {homestay?.name.toUpperCase()}
        </span>
      </Link>
    </div>
  );
}
