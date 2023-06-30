import { prisma } from "../../../server/db";
import NavBar from "../../components/navBar";
import HomestayCard from "./components/homestayCard";

export default async function Place({
  params,
  searchParams,
}: {
  params: { place: string };
  searchParams: { id: string };
}) {
  console.log(searchParams);
  const homestays = await prisma.location.findFirst({
    where: {
      name: params.place,
    },
    select: {
      Homestay: {
        select: {
          id: true,
          name: true,
          HomestayGallery: {
            select: {
              url: true,
              category: true,
            },
          },
        },
      },
    },
  });
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <NavBar>
        <span>
          Homestays in&nbsp;
          <span className="font-bold text-fuchsia-400">{params.place}</span>
        </span>
      </NavBar>
      <div className="flex flex-col items-center justify-center w-full gap-8 p-8">
        {homestays?.Homestay.length ? (
          homestays?.Homestay.map((homestay) => (
            <HomestayCard key={homestay.id} homestay={homestay}></HomestayCard>
          ))
        ) : (
          <h2 className="flex items-center justify-center p-4 text-sm">
            We are trying hard to make one&nbsp;
            <span className="text-fuchsia-400">soon</span>!
          </h2>
        )}
      </div>
    </div>
  );
}
