"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, updateUser, authClient } from "@/src/lib/auth-client.js";
import {
  ChevronLeft,
  Loader2,
  User,
  Image as ImageIcon,
  Save,
  CheckCircle,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordUpdating, setPasswordUpdating] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || session.user.photoURL || "");

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
      checkAccounts();
    }
  }, [session]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setUpdating(true);

    if (!name.trim()) {
      setError("Name input cannot be empty.");
      setUpdating(false);
      return;
    }

    try {
      await updateUser(
        {
          name: name,
          image:
            image ||
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
        },
        {
          onSuccess: () => {
            setSuccess(true);
            setUpdating(false);
            setTimeout(() => {
              router.push("/my-profile");
              router.refresh();
            }, 1500);
          },
          onError: (ctx) => {
            setError(
              ctx.error.message ||
                "Failed to edit credentials. Ensure information is valid.",
            );
            setUpdating(false);
          },
        },
      );
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred during user alteration.");
      setUpdating(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    setPasswordUpdating(true);

    try {
      await authClient.changePassword(
        {
          newPassword,
          currentPassword,
          revokeOtherSessions: true,
        },
        {
          onSuccess: () => {
            setPasswordSuccess(true);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setPasswordUpdating(false);
          },
          onError: (ctx) => {
            setPasswordError(
              ctx.error.message ||
                "Failed to update password. Ensure current password is correct.",
            );
            setPasswordUpdating(false);
          },
        },
      );
    } catch (err) {
      console.error(err);
      setPasswordError("An unexpected error occurred during password changes.");
      setPasswordUpdating(false);
    }
  };

  if (sessionLoading) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center py-32 gap-4 text-[#e8e3d9]">
        <Loader2 className="h-10 w-10 animate-spin text-amber-400" />
        <p className="text-xs text-stone-400 font-mono tracking-widest uppercase">
          Verifying...
        </p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex-grow max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 flex items-center justify-center text-[#e8e3d9]">
        <div className="max-w-md w-full bg-white/[0.03] border border-white/10 p-8 rounded-3xl shadow-2xl text-center">
          <h2 className="font-bold text-xl text-white uppercase mb-4">
            Credentials Required
          </h2>
          <p className="text-xs text-stone-400 mb-6 leading-relaxed">
            Please log in first to update curator profile details.
          </p>
          <Link
            href="/login"
            className="inline-block w-full py-3.5 bg-amber-400 text-black rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-amber-300 transition-colors shadow-lg"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex-grow max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10 text-[#e8e3d9]">
      <Link
        href="/my-profile"
        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-amber-400 hover:text-white mb-8 group"
      >
        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        <span>Return to Dashboard</span>
      </Link>

      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.03] border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-xl"
        >
          <div className="mb-8">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-amber-400 block mb-1 font-bold">
              Update operation
            </span>
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">
              Update Your User Info
            </h1>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-semibold text-red-00 font-sans text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>
                Profile updated successfully. Synchronizing session...
              </span>
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-6 font-sans">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono font-bold tracking-widest text-[#e8e3d9]/70 uppercase">
                Name
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
                  placeholder="Eleonora Vance"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 focus:outline-none transition-all placeholder-stone-500 text-[#e8e3d9]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono font-bold tracking-widest text-[#e8e3d9]/70 uppercase">
                Profile Avatar Image Link
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center text-stone-400">
                  <ImageIcon className="h-4 w-4 text-amber-500" />
                </span>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 focus:outline-none transition-all placeholder-stone-500 text-[#e8e3d9]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={updating || success}
              className="w-full py-4 bg-amber-400 text-black rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4 shadow-lg shadow-amber-400/10"
            >
              {updating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-black" />
                  <span>Writing changes...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </>
              )}
            </button>
          </form>
        </motion.div>

        {!isGoogleUser && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/[0.03] border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-xl"
          >
            <div className="mb-8">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-amber-400 block mb-1 font-bold">
                Security
              </span>
              <h1 className="text-2xl font-black text-white uppercase tracking-tight">
                Change Password
              </h1>
            </div>

            {passwordError && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-semibold text-red-400 font-sans">
                {passwordError}
              </div>
            )}

            {passwordSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 flex items-center gap-2 font-sans">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>
                  Password changed successfully. Your credentials are now fully
                  secure.
                </span>
              </div>
            )}

            <form
              onSubmit={handlePasswordUpdate}
              className="space-y-6 font-sans"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-bold tracking-widest text-[#e8e3d9]/70 uppercase">
                  Current Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3.5 flex items-center text-stone-400">
                    <Lock className="h-4 w-4 text-amber-500" />
                  </span>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 focus:outline-none transition-all placeholder-stone-500 text-[#e8e3d9]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-bold tracking-widest text-[#e8e3d9]/70 uppercase">
                  New Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3.5 flex items-center text-stone-400">
                    <Lock className="h-4 w-4 text-amber-500" />
                  </span>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 focus:outline-none transition-all placeholder-stone-500 text-[#e8e3d9]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-bold tracking-widest text-[#e8e3d9]/70 uppercase">
                  Confirm New Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3.5 flex items-center text-stone-400">
                    <Lock className="h-4 w-4 text-amber-500" />
                  </span>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 focus:outline-none transition-all placeholder-stone-500 text-[#e8e3d9]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={passwordUpdating || passwordSuccess}
                className="w-full py-4 bg-white/5 hover:bg-white/[0.08] text-white border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {passwordUpdating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
                    <span>Updating password...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4 text-amber-500" />
                    <span>Change Password</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
