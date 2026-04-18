"use client";

import { AnalyticsProvider } from "@/lib/analytics";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

export function AppProviders() {
  return (
    <>
      <AnalyticsProvider />
      <SmoothScrollProvider />
    </>
  );
}
