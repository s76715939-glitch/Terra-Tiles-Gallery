"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/src/lib/auth-client.js";
import { LayoutGrid, User, LogOut, LogIn, Loader2 } from "lucide-react";
import { motion } from "motion/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  const isActive = (path) => {
    return pathname === path
      ? "text-amber-400 font-bold border-b-2 border-amber-400 pb-1"
      : "text-stone-300 hover:text-white transition-colors pb-1";
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#080706]/60 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div>
            <span className="font-display flex items-center text-lg font-bold tracking-tight text-white">
              <span className="text-yellow-600 font-bold text-2xl">TERRA</span>{" "}
              Tiles Gallery
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-display">
          <Link href="/" className={isActive("/")}>
            Home
          </Link>
          <Link href="/all-tiles" className={isActive("/all-tiles")}>
            All Tiles
          </Link>
          <Link href="/my-profile" className={isActive("/my-profile")}>
            My Profile
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <nav className="md:hidden flex items-center gap-4 text-[10px] uppercase tracking-wider font-display mr-2">
            <Link href="/" className={isActive("/")}>
              Home
            </Link>
            <Link href="/all-tiles" className={isActive("/all-tiles")}>
              Tiles
            </Link>
          </nav>

          {isPending ? (
            <div className="flex items-center gap-2 text-stone-400 text-sm">
              <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
            </div>
          ) : session?.user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/my-profile"
                className="flex items-center gap-2 group"
              >
                {session.user.image || session.user.photoURL ? (
                  <img
                    src={session.user.image || session.user.photoURL}
                    alt={session.user.name || "User"}
                    referrerPolicy="no-referrer"
                    className="h-8 w-8 rounded-full object-cover border border-amber-500/30 group-hover:border-amber-400 transition-colors"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 font-bold border border-amber-500/30 group-hover:border-amber-400 transition-colors">
                    {session.user.name
                      ? session.user.name.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                )}
                <span className="hidden lg:inline text-xs font-medium text-stone-300 group-hover:text-white">
                  {session.user.name}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-display font-medium text-stone-300 hover:bg-amber-500/10 hover:text-white hover:border-amber-500/30 transition-all cursor-pointer"
              >
                <LogOut className="h-3 w-3 text-amber-400" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 text-xs font-display font-medium text-amber-400 hover:bg-amber-500 hover:text-black transition-all"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  );
}
