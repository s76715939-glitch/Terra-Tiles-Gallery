"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/src/lib/auth-client.js";
import {
  LayoutGrid,
  Loader2,
  User,
  Mail,
  Image as ImageIcon,
  Lock,
  UserPlus,
} from "lucide-react";
import { motion } from "motion/react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signUp.email(
        {
          email,
          password,
          name,
          image:
            photoUrl ||
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
          callbackURL: "/login",
        },
        {
          onSuccess: () => {
            router.push("/login?registered=true");
          },
          onError: (ctx) => {
            setError(
              ctx.error.message ||
                "Failed to finalize registration. Ensure credentials are valid.",
            );
            setLoading(false);
          },
        },
      );
    } catch (err) {
      console.error(err);
      setError(
        "An unexpected server error occurred during signature creation.",
      );
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: window.location.origin + "/",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to link with Google Authenticator.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-20 px-4 sm:px-6 relative z-10 text-[#e8e3d9]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white/[0.03] border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl flex flex-col backdrop-blur-xl"
      >
        <div className="text-center mb-8">
          <h2 className="font-display font-black text-2xl tracking-tight text-white uppercase">
            User Registration
          </h2>
          <p className="text-xs text-stone-400 mt-1 font-sans">
            Become a TERRA verified user to view custom tiles.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-semibold text-red-00 font-sans text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-mono font-bold tracking-widest text-[#e8e3d9]/70 uppercase">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3.5 flex items-center text-stone-400">
                <User className="h-4 w-4 text-amber-500" />
              </span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 focus:outline-none transition-all placeholder-stone-500 text-[#e8e3d9]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-mono font-bold tracking-widest text-[#e8e3d9]/70 uppercase">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3.5 flex items-center text-stone-400">
                <Mail className="h-4 w-4 text-amber-500" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 focus:outline-none transition-all placeholder-stone-500 text-[#e8e3d9]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-mono font-bold tracking-widest text-[#e8e3d9]/70 uppercase">
              Photo URL
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3.5 flex items-center text-stone-400">
                <ImageIcon className="h-4 w-4 text-amber-500" />
              </span>
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="Enter Image URL"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 focus:outline-none transition-all placeholder-stone-500 text-[#e8e3d9]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-mono font-bold tracking-widest text-[#e8e3d9]/70 uppercase">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3.5 flex items-center text-stone-400">
                <Lock className="h-4 w-4 text-amber-500" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 focus:outline-none transition-all placeholder-stone-500 text-[#e8e3d9]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full py-3.5 bg-amber-400 text-black rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2 shadow-lg shadow-amber-400/10"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-black" />
                <span>Signing...</span>
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                <span>Create Account</span>
              </>
            )}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/5" />
          </div>
          <span className="relative bg-[#0d0a08] px-3 font-mono text-[9px] uppercase tracking-widest text-stone-400">
            Social Registration
          </span>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
          className="w-full flex items-center justify-center gap-3 border border-white/10 bg-white/5 hover:bg-white/[0.08] py-3.5 px-4 rounded-xl text-xs font-sans font-medium text-stone-200 transition-colors cursor-pointer disabled:opacity-50"
        >
          {googleLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
          ) : (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-2.6-4.53-5.01-4.53z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          )}
          <span>Signup with Google</span>
        </button>

        <p className="mt-8 text-center text-xs text-stone-400 font-sans">
          Already registered?{" "}
          <Link
            href="/login"
            className="font-semibold text-amber-400 hover:text-amber-350 hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
