export const dynamic = 'force-dynamic';

export async function GET(request: Request, {params}: {params: { place: string; homestay: string }}) {
  const { place, homestay } = params;
  return new Response(JSON.stringify({ place, homestay }));
}