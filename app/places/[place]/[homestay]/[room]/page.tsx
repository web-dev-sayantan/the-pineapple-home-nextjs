import { prisma } from "../../../../../server/db";
import NavBar from "../../../../components/navBar";

export default async function Room({
  params,
}: {
  params: { place: string; homestay: string; room: string };
}) {
  const room = await prisma.room.findFirst({
    where: {
      id: params.room,
    },
  });
  return (
    <div>
      <NavBar>
        <span className="text-base text-accent">{room?.name} Room</span>
      </NavBar>
    </div>
  );
}
