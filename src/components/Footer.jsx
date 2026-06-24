"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutGrid,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Heart,
  Compass,
} from "lucide-react";
import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#060504] text-stone-300 border-t border-white/5 relative z-10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div>
                <div>
                  <span className="font-display text-lg font-bold tracking-tight text-white block">
                    <span className="text-yellow-600 font-bold text-2xl">
                      TERRA
                    </span>{" "}
                    Tiles Gallery
                  </span>
                </div>
              </div>
            </Link>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed">
              Curating architectural aesthetics, organic surfaces, and premium
              floorings with natural texture ranges for high-end designers.
            </p>
          </div>

          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-amber-400">
              Aesthetic Gallery
            </h3>
            <ul className="mt-4 space-y-2 text-xs text-stone-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-amber-300 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/all-tiles"
                  className="hover:text-amber-300 transition-colors"
                >
                  All Tiles
                </Link>
              </li>
              <li>
                <Link
                  href="/my-profile"
                  className="hover:text-amber-300 transition-colors"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-amber-400">
              Social Links
            </h3>
            <div className="mt-4 flex gap-4 text-stone-400">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-300 hover:scale-110 transition-all p-2 rounded-full bg-white/5 border border-white/5"
              >
                <Instagram className="h-4.5 w-4.5 text-amber-400" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-300 hover:scale-110 transition-all p-2 rounded-full bg-white/5 border border-white/5"
              >
                <Twitter className="h-4.5 w-4.5 text-amber-400" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-300 hover:scale-110 transition-all p-2 rounded-full bg-white/5 border border-white/5"
              >
                <Compass className="h-4.5 w-4.5 text-amber-400" />
              </a>
            </div>
            <p className="text-[11px] text-stone-500 mt-3">
              Follow our moodboards for daily inspiration.
            </p>
          </div>

          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-amber-400">
              Contact us
            </h3>
            <ul className="mt-4 space-y-2 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span>studio@terragallery.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span>+8801772661151</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span>Mawna, Sreepur, Gazipur</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-6 text-center text-[11px] text-stone-500 gap-4">
          <p>
            © {new Date().getFullYear()} TERRA Tiles Gallery. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
