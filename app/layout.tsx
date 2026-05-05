import type { Metadata, Viewport } from "next"
import { Press_Start_2P, Inter } from "next/font/google"
import "./globals.css"

const pressStart = Press_Start_2P({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-arcade"
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans"
})

export const metadata: Metadata = {
  title: "DuoQuest - Enter the Language Dungeon",
  description: "Transform your language learning into an epic arcade RPG adventure. A v0.dev x ElevenLabs hackathon entry reimagining Duolingo as an 80s arcade game.",
  keywords: ["Duolingo", "redesign", "arcade", "RPG", "language learning", "v0", "ElevenLabs", "hackathon"],
  authors: [{ name: "DuoQuest Team" }],
  openGraph: {
    title: "DuoQuest - Enter the Language Dungeon",
    description: "Duolingo reimagined as an 80s arcade RPG. A v0.dev x ElevenLabs hackathon entry.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DuoQuest - Enter the Language Dungeon",
    description: "Duolingo reimagined as an 80s arcade RPG. #ElevenHacks",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`bg-ink ${pressStart.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
