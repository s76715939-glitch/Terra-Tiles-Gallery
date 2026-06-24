import React from "react";
import "@/src/app/globals.css";
import { Roboto } from "next/font/google";
import Navbar from "@/src/components/Navbar.jsx";
import Footer from "@/src/components/Footer.jsx";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "TERRA Tiles Gallery — Discover Your Perfect Aesthetic",
  description:
    "A premium architectural showroom showcasing elite natural mosaics, marble slab tiles, and handmade terracotta clay floorings.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-[#080706] text-[#e8e3d9] relative overflow-x-hidden font-sans">
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[120px]" />
          <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#8c6239]/5 blur-[150px]" />
          <div className="absolute top-[-10%] right-[20%] w-[400px] h-[400px] rounded-full bg-amber-600/5 blur-[100px]" />
        </div>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow flex flex-col">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
