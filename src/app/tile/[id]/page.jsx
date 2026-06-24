"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/src/lib/auth-client.js";
import {
  ChevronLeft,
  Loader2,
  Award,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";

export default function TileDetailPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const { data: session, isPending: sessionLoading } = useSession();
  const [tile, setTile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchDetails() {
      setLoading(true);
      try {
        const res = await fetch(`/api/tiles?id=${id}`);
        if (!res.ok) throw new Error("Could not find the requested tile");
        const data = await res.json();
        setTile(data);
      } catch (err) {
        console.error(err);
        setError("Showroom tile not found.");
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [id]);

  if (sessionLoading || loading) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center py-32 gap-4 text-[#e8e3d9]">
        <Loader2 className="h-10 w-10 animate-spin text-amber-400" />
        <p className="text-xs text-stone-400 font-mono tracking-widest uppercase">
          Consulting Showroom Inventory...
        </p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex-grow max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 flex items-center justify-center text-[#e8e3d9] relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/[0.03] border border-white/10 p-8 rounded-3xl shadow-2xl text-center flex flex-col items-center backdrop-blur-xl"
        >
          <div className="h-14 w-14 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
            <ShieldAlert className="h-7 w-7" />
          </div>
          <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight">
            Members Showroom Only
          </h2>
          <p className="text-xs text-stone-400 mt-3 mb-8 leading-relaxed font-sans">
            Detailed configurations, real-time measurements, and raw
            specifications for{" "}
            <strong>{tile?.title || "this premium item"}</strong> are reserved
            for authenticated TERRA members. Only registered designers are
            permitted access to our elite Italian suppliers.
          </p>
          <div className="flex flex-col gap-3 w-full">
            <Link
              href="/login"
              className="w-full py-3.5 bg-amber-400 text-black rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-amber-300 transition-colors flex items-center justify-center gap-2"
            >
              <span>Login to Account</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/register"
              className="w-full py-3.5 bg-transparent border border-white/10 text-stone-300 rounded-full text-xs font-medium uppercase tracking-wider hover:bg-white/5 transition-colors"
            >
              Register New ID
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error || !tile) {
    return (
      <div className="flex-grow max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center text-[#e8e3d9]">
        <h2 className="font-display text-2xl font-bold text-white">
          Architectural Piece Irretrievable
        </h2>
        <p className="text-sm text-stone-500 mt-2 max-w-xs leading-relaxed font-sans">
          The specified tile ID <strong>"{id}"</strong> is not active in our
          catalogue index.
        </p>
        <Link
          href="/all-tiles"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-400 text-black px-6 py-2.5 text-xs font-bold"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Gallery</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex-grow max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10 text-[#e8e3d9]">
      <Link
        href="/all-tiles"
        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-amber-400 hover:text-white mb-10 group"
      >
        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        <span>Return to Exhibitions</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 gap-12 lg:grid-cols-12 bg-white/[0.03] border border-white/5 p-6 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-xl"
      >
        <div className="lg:col-span-7 flex flex-col">
          <div className="relative h-[450px] sm:h-[550px] w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10">
            <img
              src={tile.image}
              alt={tile.title}
              className="h-full w-full object-cover select-none hover:scale-[1.02] transition-transform duration-500"
            />
            <div className="absolute top-5 left-5">
              <span className="rounded-full bg-black/60 backdrop-blur-md px-4 py-1.5 text-[10px] font-mono tracking-wider text-amber-400 uppercase border border-white/5">
                {tile.category} Collection
              </span>
            </div>
          </div>
          <p className="text-[10px] font-mono text-stone-500 mt-3 text-center uppercase tracking-widest">
            Detailed 10x Scale High-Resolution Texture Feed
          </p>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-400 font-bold block">
                {tile.material || "Fine Quartz"} Base
              </span>

              {tile.inStock ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-extrabold uppercase bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  <span>In Stock</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-red-400 font-extrabold uppercase bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
                  <XCircle className="h-3 w-3 text-red-400" />
                  <span>Out of Stock</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 leading-tight">
              {tile.title}
            </h1>

            <p className="text-xs text-stone-400 font-sans mb-6">
              Designer Port:{" "}
              <span className="font-mono font-medium text-amber-450">
                {tile.creator || "Anonymous Studio"}
              </span>
            </p>

            <div className="border-t border-white/5 pt-5 mt-5">
              <h3 className="text-xs font-mono font-bold tracking-widest text-stone-500 uppercase mb-2">
                Description
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans mb-6">
                {tile.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/10 mb-6 font-sans">
              <div>
                <span className="text-[10px] font-mono text-stone-400 block uppercase">
                  Dimensions
                </span>
                <span className="text-xs font-semibold text-white">
                  {tile.dimensions || "N/A Standard"}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-stone-400 block uppercase">
                  Primary Material
                </span>
                <span className="text-xs font-semibold text-white">
                  {tile.material || "Ceramic Slate"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-black/40 border border-white/5 px-6 py-4 rounded-2xl text-white mb-6">
              <div>
                <span className="text-[10px] font-mono text-amber-450 block">
                  ESTIMATED SHOWROOM RETAIL
                </span>
                <span className="text-xl font-bold tracking-tight text-amber-400">
                  ${tile.price} {tile.currency || "USD"}{" "}
                  <span className="text-xs text-stone-400 font-normal">
                    / sq. meter
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-5 mt-6">
            <h3 className="text-[10px] font-mono font-bold tracking-widest text-stone-500 uppercase mb-3">
              Styles & Tags
            </h3>
            <div className="flex gap-2 flex-wrap">
              {tile.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-white/5 border border-white/15 px-3.5 py-1.5 text-xs text-stone-300 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
