"use client";
import { SessionProvider } from "next-auth/react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
  });
}
export function CSPostHogProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  session: any;
}) {
  return (
    <SessionProvider session={session}>
      <PostHogProvider client={posthog}>{children}</PostHogProvider>
    </SessionProvider>
  );
}
