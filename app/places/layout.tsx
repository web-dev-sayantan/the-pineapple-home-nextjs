import { Suspense } from "react";

export default function PlacesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { place: string };
}) {
  return <Suspense>{children}</Suspense>;
}
