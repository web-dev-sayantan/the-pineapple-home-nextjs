import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/next-auth";

import AuthSessionProvider from "@/context/sessionProvider";
import { CSPostHogProvider } from "./providers";
import { cn } from "../lib/utils";
import dynamic from "next/dynamic";
import { setDefaultOptions } from "date-fns";
import { enIN } from "date-fns/locale";

const ThemeProvider = dynamic(() => import("../components/theme-provider"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The PineApple home - Manali",
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
  setDefaultOptions({
    locale: enIN,
  });
  return (
    <>
      <html lang="en" className={cn("h-full", materialSymbols.variable)}>
        <CSPostHogProvider>
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
        </CSPostHogProvider>
      </html>
    </>
  );
}
