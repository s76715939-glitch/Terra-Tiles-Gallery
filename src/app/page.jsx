"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Loader2,
  Eye,
  BadgeInfo,
  Compass,
  Shield,
  Award,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { motion } from "motion/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function HomePage() {
  const [featuredTiles, setFeaturedTiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch("/api/tiles");
        if (!res.ok) throw new Error("Could not load gallery tiles");
        const data = await res.json();
        setFeaturedTiles(data.slice(0, 4));
      } catch (err) {
        console.error(err);
        setError("Unable to connect to the tile service.");
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  const slideImages = [
    {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      sub: "PREMIUM EXHIBIT",
      title: "Handmade Slabs",
      desc: "Authentic clay kiln baked terracotta blocks direct from Valencia.",
    },
    {
      url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
      sub: "LUXURY NATURAL MARBLE",
      title: "Italian Carrara Veins",
      desc: "Finely honed slabs highlighting crystalline grey veins.",
    },
    {
      url: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop",
      sub: "CONTEMPORARY PATTERNS",
      title: "Venetian Terrazzo",
      desc: "Beautiful emerald glass chips suspended in composite materials.",
    },
  ];

  return (
    <div className="w-full flex flex-col min-h-screen relative z-10 text-[#e8e3d9]">
      <section className="relative w-full h-[85vh] overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect={"fade"}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: ".custom-swiper-pagination" }}
          className="h-full w-full"
        >
          {slideImages.map((slide, index) => (
            <SwiperSlide key={index} className="relative h-full w-full">
              <div className="absolute inset-0 bg-black/60 z-10" />
              <img
                src={slide.url}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover scale-105 animate-[zoom_25s_infinite_alternate]"
              />

              <div className="absolute inset-0 z-20 flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-2xl bg-black/40 p-8 sm:p-10 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl"
                >
                  <span className="text-xs uppercase font-mono tracking-[0.3em] text-amber-400 font-semibold block mb-3">
                    {slide.sub}
                  </span>
                  <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
                    {slide.title === "Handmade Slabs"
                      ? "Discover Your Perfect Aesthetic"
                      : slide.title}
                  </h1>
                  <p className="text-sm sm:text-base text-stone-300 mb-8 leading-relaxed font-sans">
                    {slide.desc}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/all-tiles"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 hover:bg-amber-400 px-6 py-3.5 text-sm font-semibold text-black transition-all transform hover:-translate-y-0.5 shadow-lg shadow-amber-500/10"
                    >
                      <span>Browse Now</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-swiper-pagination absolute bottom-12 right-12 z-40 flex gap-2" />
      </section>

      <div className="w-full bg-[#0d0a08]/90 py-4 overflow-hidden border-y border-white/5">
        <div className="animate-marquee whitespace-nowrap flex gap-12 text-xs font-mono font-bold tracking-widest text-amber-400 uppercase items-center">
          <span>
            New Arrivals: Venetian Mosaic Emerald | Weekly Feature: Modern
            Geometric Patterns | Join the Community ...
          </span>
          <span>
            New Arrivals: Venetian Mosaic Emerald | Weekly Feature: Modern
            Geometric Patterns | Join the Community ...
          </span>
          <span>
            New Arrivals: Venetian Mosaic Emerald | Weekly Feature: Modern
            Geometric Patterns | Join the Community ...
          </span>
          <span>
            New Arrivals: Venetian Mosaic Emerald | Weekly Feature: Modern
            Geometric Patterns | Join the Community ...
          </span>
        </div>
      </div>

      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-white/5 pb-6 gap-4"
        >
          <div>
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-amber-400 font-bold block mb-1">
              Hand-collected Series
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Featured Exhibitions
            </h2>
          </div>
          <Link
            href="/all-tiles"
            className="group flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-amber-400 hover:text-white transition-colors"
          >
            <span>Explore Entire Gallery</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-amber-400" />
            <p className="text-xs text-stone-400 font-mono uppercase tracking-widest">
              Consulting Showroom Inventory...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-3xl p-8 max-w-md mx-auto text-center backdrop-blur-md">
            <BadgeInfo className="h-12 w-12 text-amber-400 mb-3 animate-pulse" />
            <p className="text-sm text-white font-bold">
              Showroom Connection Error
            </p>
            <p className="text-xs text-stone-400 mt-2 mb-4">
              We couldn't reach the server databases. Ensure your collection
              endpoints are live.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTiles.map((tile, idx) => (
              <motion.div
                key={tile.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col overflow-hidden bg-white/[0.03] border border-white/5 hover:border-amber-500/30 rounded-3xl shadow-2xl backdrop-blur-xl hover:shadow-[0_10px_40px_-15px_rgba(212,175,55,0.15)] transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden bg-white/5">
                  <img
                    src={tile.image}
                    alt={tile.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-mono tracking-wider text-[#e8e3d9] uppercase border border-white/5">
                      {tile.category}
                    </span>
                  </div>
                </div>

                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-md font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                      {tile.title}
                    </h3>
                    <p className="text-xs text-stone-400 line-clamp-2 mt-2 leading-relaxed font-sans">
                      {tile.description}
                    </p>
                    <div className="flex gap-2 flex-wrap mt-3">
                      {tile.tags?.slice(0, 2).map((tag, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-mono bg-white/5 text-stone-300 px-2 py-0.5 rounded border border-white/5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 border-t border-white/5 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-500 font-mono block">
                        EST. VALUE
                      </span>
                      <span className="text-sm font-semibold text-amber-400">
                        ${tile.price} USD
                      </span>
                    </div>
                    <Link
                      href={`/tile/${tile.id}`}
                      className="rounded-full bg-white/5 text-stone-300 hover:bg-amber-400 hover:text-black p-2.5 border border-white/15 hover:border-amber-400 transition-all cursor-pointer"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-white/[0.02] border-y border-white/5 py-20 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-3 p-6 rounded-3xl bg-[#0e0c0a]/50 border border-white/5 backdrop-blur-xl"
            >
              <Compass className="h-8 w-8 text-amber-400 mb-2" />
              <span className="text-lg font-bold text-white uppercase tracking-tight">
                Authentic Replicas
              </span>
              <p className="text-xs text-stone-400 leading-relaxed font-sans">
                We design and import directly from generational factories around
                Seville, Napoli, and Tuscany, preserving local textures.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-3 p-6 rounded-3xl bg-[#0e0c0a]/50 border border-white/5 backdrop-blur-xl"
            >
              <Award className="h-8 w-8 text-amber-400 mb-2" />
              <span className="text-lg font-bold text-white uppercase tracking-tight">
                Mindful Persistence
              </span>
              <p className="text-xs text-stone-400 leading-relaxed font-sans">
                A custom curated experience running over robust web-based
                sessions, ensuring details remain dynamically saved.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-3 p-6 rounded-3xl bg-[#0e0c0a]/50 border border-white/5 backdrop-blur-xl"
            >
              <Shield className="h-8 w-8 text-amber-400 mb-2" />
              <span className="text-lg font-bold text-white uppercase tracking-tight">
                Exquisite Secrecy
              </span>
              <p className="text-xs text-stone-400 leading-relaxed font-sans">
                Designed with certified, secure credentials, safeguarding your
                curator profile, specifications lists, and premium tile
                selections.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
