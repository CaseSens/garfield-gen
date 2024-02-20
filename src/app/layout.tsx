import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ComicProvider from "./Providers/ComicsProvider";

const poppins = Poppins({
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
      <body className={`${poppins.className} w-dvh h-dvh bg-bg-dark overflow-auto`}>
        <ComicProvider>{children}</ComicProvider>
      </body>
    </html>
  );
}
