import { getAllInvoices } from "@/data/admin/invoice-dto";

export async function GET(
  request: Request,
  { params }: { params: { homestay: string } }
) {
  const { homestay } = params;
  const invoices = await getAllInvoices(homestay);
  return new Response(JSON.stringify(invoices));
}
