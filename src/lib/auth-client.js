import { createAuthClient } from "better-auth/react";

// Standard browser friendly URL
const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return process.env.BETTER_AUTH_URL || process.env.APP_URL || "http://localhost:3000";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL()
});

export const { signIn, signUp, signOut, useSession, updateUser } = authClient;
