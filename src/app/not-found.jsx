import React from "react";
import Link from "next/link";
import { Compass, HelpCircle, LayoutGrid } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="max-w-md bg-mauve-950 border border-sand-200 rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col items-center">
        <h1 className="font-display font-black text-4xl text-stone-950 uppercase tracking-tight">
          Page 404
        </h1>
        <span className="text-[10px] font-mono tracking-widest text-amber-700 uppercase mt-1 block">
          No Route or Page Found
        </span>

        <p className="text-xs text-stone-500 font-sans mt-4 mb-8 leading-relaxed">
          The requested coordinate or design folder does not exist in our
          physical stone inventory. Try navigating back to the main lobby.
        </p>

        <Link
          href="/"
          className="w-full py-3.5 bg-mauve-950 text-white rounded-xl text-xs font-display font-medium uppercase tracking-wider hover:bg-mist-900 transition-colors flex items-center justify-center gap-2"
        >
          <span>Return to Home</span>
        </Link>
      </div>
    </div>
  );
}
