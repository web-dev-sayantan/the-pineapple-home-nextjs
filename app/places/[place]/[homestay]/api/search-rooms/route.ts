import { getAvailableRoomsByDate } from "@/data/rooms-dto";
import { fromUnixTime } from "date-fns";
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, {params}: {params: { place: string; homestay: string }}) {
  const { place, homestay } = params;
  const from = request.nextUrl.searchParams.get('from');
  const to = request.nextUrl.searchParams.get('to');
  if (from && to) {
    const rooms = await getAvailableRoomsByDate(homestay, { from: fromUnixTime(+from), to: fromUnixTime(+to) });
    // const distinctRooms = []
    // for(const room of rooms) {
    //   const distinctRoom = distinctRooms.find((r) => r.roomId === room.roomId);
    //   if (!distinctRoom) {
    //     distinctRooms.push({...room, rates: [{rateId: room.rateId, rate: room.rate}]})
    //   } else {
    //     distinctRoom.rates.push({ rateId: room.rateId, rate: room.rate })
    //   }
		// }
    return new Response(JSON.stringify(rooms));
  }
  return new Response(null, { status: 400 });
}