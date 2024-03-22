import { getHomestayById } from "@/data/homestay-dto";

export async function generateMetadata({
	params,
}: {
	params: { homestay: string };
}) {
	const homestay = await getHomestayById(params.homestay);
	return {
		title: `Invoices | ${homestay?.name}`,
		description: `Create invoices for ${homestay?.name}`,
	};
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
