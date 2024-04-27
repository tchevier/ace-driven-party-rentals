import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ACE Driven Party Rentals",
  description:
    "Party and Event rentals of the highest quality. We have a large selection of clean equipment. ACE Driven Party Rentals LLC Haltom City TX - Party Rental and Bounce House Rental",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Navbar />
        <div className="">{children}</div>
      </body>
    </html>
  );
}
