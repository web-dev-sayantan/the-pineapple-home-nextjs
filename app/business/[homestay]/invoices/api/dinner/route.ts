import { getDinnerItems } from "@/data/admin/invoice-dto";

export async function GET() {
  const dinner = await getDinnerItems();
  return new Response(JSON.stringify(dinner));
}
