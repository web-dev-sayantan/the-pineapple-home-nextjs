import { getLunchItems } from "@/data/admin/invoice-dto";

export async function GET() {
  const lunch = await getLunchItems();
  return new Response(JSON.stringify(lunch));
}
