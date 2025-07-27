import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import { LanguageProvider } from "@/lib/language-context"
import { AuthProvider } from "@/lib/auth-context"
import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const cairo = localFont({
  src: [
    {
      path: "../public/fonts/cairo-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/cairo-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cairo",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
})

export const metadata: Metadata = {
  title: "Chat2Site - AI-Powered Landing Page Builder",
  description:
    "Create professional landing pages in minutes using AI-powered chat interface. Supports Arabic and English with RTL support.",
  keywords: ["AI", "Landing Page", "Website Builder", "Arabic", "RTL", "Chat"],
  authors: [{ name: "Chat2Site Team" }],
  openGraph: {
    title: "Chat2Site - AI-Powered Landing Page Builder",
    description: "Create professional landing pages in minutes using AI",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${cairo.variable}`}>
      <body className="font-inter">
        <AuthProvider>
          <LanguageProvider>
            <Navbar />
            <main>{children}</main>
            <Toaster />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
