import "./globals.css";
import { Nunito_Sans } from "next/font/google";
import localFont from "next/font/local";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import AuthSessionProvider from "@/context/sessionProvider";
import { cn } from "../lib/utils";
import dynamic from "next/dynamic";

const ThemeProvider = dynamic(() => import("../components/theme-provider"), {
  ssr: false,
});

const inter = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The pineapple home - Manali",
  description: "Your second home, in the Himalayas.",
  metadataBase: new URL("https://thepineapplehome.in"),
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
      <html lang="en" className={cn("h-full", materialSymbols.variable)}>
        <AuthSessionProvider session={session}>
          <body
            className={cn(
              "relative h-full antialiased font-sans",
              inter.className
            )}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              enableColorScheme
            >
              {children}
            </ThemeProvider>
          </body>
        </AuthSessionProvider>
      </html>
    </>
  );
}
