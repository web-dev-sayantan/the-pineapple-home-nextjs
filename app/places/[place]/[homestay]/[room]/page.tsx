import { eq } from "drizzle-orm";
import { db } from "../../../../../drizzle";
import NavBar from "../../../../components/navBar";
import { room } from "@/drizzle/schema";

function getRoomById(id: string) {
  return db.query.room.findFirst({
    where: eq(room.id, id),
  });
}
export default async function Room({
  params,
}: {
  params: { place: string; homestay: string; roomId: string };
}) {
  const room = await getRoomById(params.roomId);
  return (
    <div>
      <NavBar>
        <span className="text-base text-accent">{room?.name} Room</span>
      </NavBar>
    </div>
  );
}
