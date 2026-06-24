import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// Try to initialize MongoDB connection for BetterAuth
let betterAuthDb = null;
const uri = process.env.MONGODB_URI;

if (uri && !uri.includes("<username>")) {
  try {
    const mongoClient = new MongoClient(uri);
    // Explicitly connect or let driver handle it
    betterAuthDb = mongoClient.db();
  } catch (error) {
    console.error("Better-Auth: Failed to pre-load MongoDB client", error);
  }
}

// Config with fallback so the Next.js builds/runs perfectly without hard crashes
export const auth = betterAuth({
  // If MongoDB is connected, use it! Otherwise fallback gracefully
  database: betterAuthDb ? mongodbAdapter(betterAuthDb) : undefined,
  get baseURL() {
    return process.env.BETTER_AUTH_URL || "http://localhost:3000";
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "placeholder-google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder-google-client-secret",
    },
  },
  trustedOrigins: [
    "https://*.run.app",
    "http://localhost:3000"
  ],
  advanced: {
    useSecureCookies: true,
    disableCsrfCheck: true
  },
  user: {
    additionalFields: {
      photoURL: {
        type: "string",
        required: false,
        defaultValue: ""
      }
    }
  },
  secret: process.env.BETTER_AUTH_SECRET || "a-long-32-character-random-hex-placeholder-key-for-better-auth",
});
