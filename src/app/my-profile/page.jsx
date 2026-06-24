"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, authClient } from "@/src/lib/auth-client.js";
import {
  ShieldCheck,
  User,
  Mail,
  Calendar,
  Edit3,
  Loader2,
  Award,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();
  const [isGoogleUser, setIsGoogleUser] = useState(false);

  useEffect(() => {
    async function checkAccounts() {
      try {
        const res = await authClient.listAccounts();
        if (res?.data) {
          const isGoogle =
            res.data.some((acc) => acc.provider === "google") ||
            session?.user?.image?.includes("googleusercontent");
          setIsGoogleUser(isGoogle);
        }
      } catch (err) {
        console.error(err);
      }
    }
    if (session) {
      checkAccounts();
    }
  }, [session]);

  if (isPending) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center py-32 gap-4 text-[#e8e3d9]">
        <Loader2 className="h-10 w-10 animate-spin text-amber-400" />
        <p className="text-xs text-stone-400 font-mono tracking-widest uppercase">
          Verifying profile credentials...
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
            Protected
          </h2>
          <p className="text-xs text-stone-400 mt-3 mb-8 leading-relaxed font-sans">
            Authentication is required to view member profile. Log in using your
            registered email credential or linked Google identity.
          </p>
          <div className="flex flex-col gap-3 w-full">
            <Link
              href="/login"
              className="w-full py-3.5 bg-amber-400 text-black rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-amber-300 transition-colors flex items-center justify-center gap-2"
            >
              <span>Login to Account</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="w-full flex-grow max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10 text-[#e8e3d9]">
      <div className="mb-10 text-center sm:text-left">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-400 block mb-1 font-bold">
          TERRA member subspace
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase">
          My Profile
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/[0.03] border border-white/10 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 backdrop-blur-xl"
      >
        <div className="md:col-span-4 bg-black/30 p-8 text-center flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5 text-white">
          <div className="relative mb-5">
            {user.image || user.photoURL ? (
              <img
                src={user.image || user.photoURL}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="h-28 w-28 rounded-full object-cover border-4 border-amber-500/20"
              />
            ) : (
              <div className="h-28 w-28 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-3xl border-4 border-amber-500/20">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-amber-400 text-black flex items-center justify-center border-2 border-[#0a0908] font-bold scale-105 shadow-md">
              <Award className="h-4.5 w-4.5" />
            </div>
          </div>

          <h2 className="font-extrabold text-lg tracking-tight uppercase max-w-full truncate">
            {user.name}
          </h2>
          <span className="text-[9px] font-mono tracking-widest text-amber-400 uppercase mt-1 block">
            {isGoogleUser ? "Verified via Google" : "Verified via Email"}
          </span>

          <div className="mt-8 flex items-center gap-1.5 py-1.5 px-3.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-stone-300">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>SESSION SECURED</span>
          </div>
        </div>

        <div className="md:col-span-8 p-8 sm:p-10 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="border-b border-white/5 pb-4">
              <h3 className="text-xs uppercase font-mono tracking-widest text-[#e8e3d9]/50 font-bold mb-4 block">
                User Info
              </h3>

              <div className="space-y-4 font-sans text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/5 rounded-xl text-amber-400 border border-white/10">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block font-mono">
                      FULL REGISTERED NAME
                    </span>
                    <strong className="text-white text-sm font-medium">
                      {user.name}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/5 rounded-xl text-amber-400 border border-white/10">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block font-mono">
                      EMAIL
                    </span>
                    <strong className="text-white text-sm break-all font-medium">
                      {user.email}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/5 rounded-xl text-amber-400 border border-white/10">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block font-mono">
                      ACCOUNT GENERATION DATE
                    </span>
                    <strong className="text-white text-xs font-normal">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString(
                            undefined,
                            { dateStyle: "long" },
                          )
                        : "October 22, 2025"}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-[11px] text-stone-300 leading-relaxed font-sans">
              <strong>User Privileges Enabled:</strong> You have active
              clearances to inspect physical gallery stock, copy Hex codes,
              construct custom material configurations, and update profiles.
              Maintain absolute confidentiality.
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Link
              href="/my-profile/update"
              className="flex items-center gap-2 rounded-full bg-amber-400 hover:bg-amber-300 text-black px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-amber-400/10 hover:scale-[1.02] cursor-pointer"
            >
              <Edit3 className="h-4 w-4" />
              <span>Update Credentials</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
