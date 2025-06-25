import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "resizeimagefast - Free Online Image Compressor",
  description:
    "Fast, free, and privacy-focused image compression tool. Compress, resize, and convert images without uploading to servers.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png"
  },
  keywords: [
    "image compressor",
    "image resizer",
    "free online image optimizer",
    "jpeg png webp compressor",
    "compress image without losing quality"
  ],
  authors: [{ name: "codeNinjaBro" }],
  creator: "resizeimagefast Team",
  openGraph: {
    title: "resizeimagefast — Free Online Image Compressor & Resizer",
    description: "Shrink images easily online without losing quality.",
    url: "",
    siteName: "resizeimagefast",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "resizeimagefast - Image Optimization Tool"
      }
    ],
    type: "website",
  },



}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      <GoogleAnalytics gaId="G-89KJF31WCY" />
      </body>
    </html>
  )
}
