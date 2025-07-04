"use client";


import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import QueryProvider from "@/lib/providers/QueryProvider";
import { MswProvider } from "@/components/MswProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Toaster } from "@/components/ui/sonner";
import { useVisibilityRefresh } from "@/hooks/useVisibilityRefresh";
import { servicesKeys } from "@/lib/queries/services";

function GlobalRefresh() {
  useVisibilityRefresh([
    [...servicesKeys.all],
    [...servicesKeys.lists()],
    [...servicesKeys.statuses()],
  ]);
  return null;
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MswProvider />
        <QueryProvider>
          <GlobalRefresh />
          <Navbar />
          {children}
          <Footer />
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
