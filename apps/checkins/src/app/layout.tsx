/**
 * Overall layout for the Checkins application.
 */

// External Imports ----------------------------------------------------------

import { ThemeProvider } from "@repo/shadcn-ui/components/theme-provider";
import "@repo/shadcn-ui/globals.css";
import { Toaster } from "@repo/shadcn-ui/components/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// Internal Imports ----------------------------------------------------------

import { NavBar } from "@/components/layout/NavBar";


// Public Objects ------------------------------------------------------------`

export const metadata: Metadata = {
  title: "Checkins",
  description: "CityTeam Check-ins Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <NavBar />
          <main className={"bg-base-100 h=[calc(100vh-60px)]"}>
            {children}
          </main>
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}

// Private Objects -----------------------------------------------------------

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

