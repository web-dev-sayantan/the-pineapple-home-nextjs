import { prisma } from "../../../../server/db";
import NavBar from "../../../components/navBar";

export default async function Homestay({
  params,
}: {
  params: { place: string; homestay: string };
}) {
  const homestay = await prisma.homestay.findFirst({
    where: {
      id: params.homestay,
    },
  });
  return (
    <div className="flex flex-col items-center justify-center">
      <NavBar>
        <span className="text-fuchsia-400">{homestay?.name}</span>
      </NavBar>
      <div className="p-8">Development In Progress. . .</div>
    </div>
  );
}
