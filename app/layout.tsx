import type { Metadata, Viewport } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-sans"
})

export const metadata: Metadata = {
  title: "Duolingo Reimagined - A v0 x ElevenLabs Hackathon Entry",
  description: "Experience Duolingo as a full-screen immersive video game. Navigate quest paths, defeat language bosses, and level up your skills with voice-powered learning.",
  keywords: ["Duolingo", "redesign", "video game", "language learning", "v0", "ElevenLabs", "hackathon", "immersive"],
  authors: [{ name: "Hackathon Team" }],
  openGraph: {
    title: "Duolingo Reimagined - Full-Screen Language Game",
    description: "Duolingo as you've never seen it. A v0.dev x ElevenLabs hackathon entry.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Duolingo Reimagined",
    description: "Full-screen immersive language learning. #ElevenHacks #v0dev",
  },
}

export const viewport: Viewport = {
  themeColor: "#0d1117",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`bg-[#0d1117] ${dmSans.variable}`}>
      <body className="font-sans antialiased overflow-hidden">{children}</body>
    </html>
  )
}
