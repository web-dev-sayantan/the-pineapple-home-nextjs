import "./globals.css";
import { Nunito_Sans } from "next/font/google";
import localFont from "next/font/local";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import AuthSessionProvider from "@/context/sessionProvider";

const inter = Nunito_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "The pineapple home - Manali",
  description: "Your second home, in the Himalayas.",
};

const materialSymbols = localFont({
  variable: "--font-family-symbols", // Variable name (to reference after in CSS/styles)
  style: "normal",
  src: "../node_modules/material-symbols/material-symbols-rounded.woff2", // This is a reference to woff2 file from NPM package "material-symbols"
  display: "block",
  weight: "100 400 700",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <html lang="en" className={`${materialSymbols.variable}`}>
        <AuthSessionProvider session={session}>
          <body className={inter.className}>{children}</body>
        </AuthSessionProvider>
      </html>
    </>
  );
}
