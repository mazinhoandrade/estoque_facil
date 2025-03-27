"use client";

import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/src/components/ui/toaster";

import { Providers } from "../_providers/transtackProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
    </Providers>
  );
}
