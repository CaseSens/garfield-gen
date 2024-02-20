import type { Metadata } from "next";
import { Baloo_Tamma_2 } from "next/font/google";
import "./globals.css";
import ComicProvider from "./Providers/ComicsProvider";

const baloo = Baloo_Tamma_2({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Garfield Archive",
  description: "Archive for Garfield comics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${baloo.className} w-dvh h-dvh bg-bg-dark overflow-auto text-text-white`}
      >
        <ComicProvider>{children}</ComicProvider>
      </body>
    </html>
  );
}
