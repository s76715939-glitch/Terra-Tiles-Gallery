import { auth } from "@/src/lib/auth.js";
import { toNextJsHandler } from "better-auth/next-js";

export const GET = async (request) => {
  const url = new URL(request.url);
  process.env.BETTER_AUTH_URL = url.origin;
  const handler = toNextJsHandler(auth);
  return handler.GET(request);
};

export const POST = async (request) => {
  const url = new URL(request.url);
  process.env.BETTER_AUTH_URL = url.origin;
  const handler = toNextJsHandler(auth);
  return handler.POST(request);
};
