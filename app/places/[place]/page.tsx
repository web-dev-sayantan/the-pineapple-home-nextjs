import { eq } from "drizzle-orm";
import { db } from "../../../drizzle";
import { homestay } from "../../../drizzle/schema";
import NavBar from "../../components/navBar";
import HomestayCard from "./components/homestayCard";

export default async function Place({
  params,
  searchParams,
}: {
  params: { place: string };
  searchParams: { id: string };
}) {
  const homestays = await db.query.homestay.findMany({
    where: eq(homestay.locationName, params.place),
    columns: {
      id: true,
      name: true,
    },
    with: {
      homestayGallery: {
        columns: {
          url: true,
          category: true,
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
        {homestays?.length ? (
          homestays.map((homestay) => (
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
