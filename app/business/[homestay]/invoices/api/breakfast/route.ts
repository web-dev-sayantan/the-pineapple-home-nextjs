import { getBreakfastItems } from "@/data/admin/invoice-dto";

export async function GET() {
  const breakfast = await getBreakfastItems();
  return new Response(JSON.stringify(breakfast));
}
