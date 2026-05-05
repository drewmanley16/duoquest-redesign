import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "DuoQuest - Enter the Language Dungeon",
  description: "Transform your language learning into an epic arcade RPG adventure. Master Spanish, Japanese, French and more through quests, boss battles, and streaks.",
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
    <html lang="en" className="bg-ink">
      <body>{children}</body>
    </html>
  )
}
