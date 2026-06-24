"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Loader2,
  SlidersHorizontal,
  ArrowRight,
  Grid3X5,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AllTilesPage() {
  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Ceramic",
    "Marble",
    "Terracotta",
    "Terrazzo",
    "Slate",
  ];

  useEffect(() => {
    async function fetchTiles() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.set("q", search);
        if (category && category !== "All")
          queryParams.set("category", category);

        const res = await fetch(`/api/tiles?${queryParams.toString()}`);
        if (!res.ok) throw new Error("Could not fetch tiles collection");
        const data = await res.json();
        setTiles(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      fetchTiles();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, category]);

  return (
    <div className="w-full flex-1 max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10 text-[#e8e3d9]">
      <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4"
        >
          Exquisite Tile Showroom
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-sans text-stone-400 text-sm max-w-lg mb-8 leading-relaxed"
        >
          Filter and explore luxury surface items, geometric patterns, organic
          textures, and hand-molded structural blocks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative w-full max-w-2xl group"
        >
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-stone-500 group-focus-within:text-amber-400 transition-colors">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Search by tile title (e.g., Ceramic, Carrara)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/[0.04] border border-white/15 text-sm font-sans placeholder-stone-500 shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400/80 focus:bg-white/[0.07] transition-all text-[#e8e3d9]"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center flex-wrap gap-2.5 mb-16 border-b border-white/5 pb-8 max-w-4xl mx-auto"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
              category === cat
                ? "bg-amber-400 text-black border-amber-400 shadow-lg shadow-amber-400/10"
                : "bg-white/[0.03] border-white/10 text-stone-400 hover:bg-white/[0.07] hover:border-white/20 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-amber-400" />
          <p className="text-xs text-stone-400 font-mono tracking-widest uppercase animate-pulse">
            Fetching showroom pieces...
          </p>
        </div>
      ) : tiles.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 max-w-md mx-auto"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 mx-auto mb-4 border border-amber-400/20">
            <SlidersHorizontal className="h-6 w-6" />
          </div>
          <p className="font-bold text-lg text-white">No pieces found</p>
          <p className="text-xs text-stone-500 mt-2 leading-relaxed">
            There are no tiles matching your search term. Try switching tabs or
            searching other keywords.
          </p>
        </motion.div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {tiles.map((tile, idx) => (
              <motion.div
                key={tile.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col overflow-hidden bg-white/[0.03] border border-white/5 hover:border-amber-500/20 rounded-3xl shadow-2xl backdrop-blur-xl hover:shadow-[0_10px_40px_-15px_rgba(212,175,55,0.15)] transition-all duration-350"
              >
                <div className="relative h-72 overflow-hidden bg-white/5 border-b border-white/5">
                  <img
                    src={tile.image}
                    alt={tile.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-mono tracking-wider text-white uppercase border border-white/5">
                      {tile.category}
                    </span>
                  </div>
                </div>

                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                      {tile.title}
                    </h3>
                    <p className="text-xs text-stone-400 line-clamp-2 mt-2 leading-relaxed font-sans">
                      {tile.description}
                    </p>
                    <div className="flex gap-2 flex-wrap mt-4">
                      {tile.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] font-mono bg-white/5 border border-white/5 text-stone-300 px-2.5 py-0.5 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 border-t border-white/5 pt-5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-500 font-mono block">
                        VALUATION
                      </span>
                      <span className="text-sm font-semibold text-amber-400">
                        ${tile.price} {tile.currency || "USD"}
                      </span>
                    </div>

                    <Link
                      href={`/tile/${tile.id}`}
                      className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 text-stone-300 hover:bg-amber-400 hover:text-black hover:border-amber-400 px-4 py-2 text-xs font-semibold transition-all cursor-pointer shadow-md"
                    >
                      <span>Details</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
