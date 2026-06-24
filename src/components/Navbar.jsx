"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/src/lib/auth-client.js";
import {
  LayoutGrid,
  User,
  LogOut,
  LogIn,
  Loader2,
  Menu,
  X,
} from "lucide-react";
import { motion } from "motion/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/all-tiles", label: "All Tiles" },
    { href: "/my-profile", label: "My Profile" },
  ];

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

        {/* Desktop Menu (md and up) */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-display">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Small device inline links removed; replaced by hamburger */}
          {/* Hamburger visible on md:hidden */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen((s) => !s)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded-md text-stone-300 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

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

      {/* Mobile Menu Panel (shows same links as desktop) */}
      <div
        className={`md:hidden transition-max-height duration-200 ease-in-out overflow-hidden border-t border-white/5 bg-[#080706]/60 ${
          mobileOpen ? "max-h-100 py-3" : "max-h-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-col gap-2 text-[12px] uppercase tracking-widest font-display">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md ${isActive(link.href)} hover:bg-white/3`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-2 border-t border-white/5 mt-2 flex items-center justify-between">
              {isPending ? (
                <div className="flex items-center gap-2 text-stone-400 text-sm">
                  <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
                </div>
              ) : session?.user ? (
                <div className="flex items-center gap-3">
                  <Link
                    href="/my-profile"
                    className="flex items-center gap-2 group"
                    onClick={() => setMobileOpen(false)}
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
                    <span className="text-xs font-medium text-stone-300 group-hover:text-white">
                      {session.user.name}
                    </span>
                  </Link>

                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-display font-medium text-stone-300 hover:bg-amber-500/10 hover:text-white hover:border-amber-500/30 transition-all cursor-pointer"
                  >
                    <LogOut className="h-3 w-3 text-amber-400" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 text-xs font-display font-medium text-amber-400 hover:bg-amber-500 hover:text-black transition-all"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
