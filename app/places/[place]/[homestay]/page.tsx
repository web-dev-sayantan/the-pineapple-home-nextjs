import { prisma } from "../../../../server/db";

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
    <div className="flex flex-col items-center justify-center py-4">
      <h1 className="p-4 text-2xl text-fuchsia-400">{homestay?.name}</h1>
      <p className="p-4">Development In Progress. . .</p>
    </div>
  );
}
