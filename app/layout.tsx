import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
//import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
//import logo from '@/app/logo.png'
import { Toaster } from "@/components/ui/sonner"
import AuthProvider from "@/components/providers/session-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Malify - Never Miss Important Emails Again",
  description: "Mailify uses AI to identify and summarize your most important emails, delivering instant\
                    notifications when urgent matters need your attention.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/logo.png" type="image/png" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        {children}
        {/*<Analytics />*/}
        <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
