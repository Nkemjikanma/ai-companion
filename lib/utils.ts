import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createURL = (path: string) => {
  return window.location.origin + path;
};

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export const rateLimit = async (identifier: string) => {
  const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "10 s"),
    analytics: true,
    prefix: "@upstash/ratelimit",
  });

  return await rateLimit.limit(identifier);
};
