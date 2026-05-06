import type { Metadata, Viewport } from "next"
import { Cinzel, Crimson_Text, IM_Fell_English } from "next/font/google"
import "./globals.css"

const cinzel = Cinzel({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
})

const crimsonText = Crimson_Text({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-crimson',
})

const imFellEnglish = IM_Fell_English({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-fell',
})

export const metadata: Metadata = {
  title: "Codex - The Archive of Knowledge",
  description: "Inscribe your thoughts in the eternal archive. A sanctuary for your notes, documents, and wisdom - preserved like illuminated manuscripts of old.",
}

export const viewport: Viewport = {
  themeColor: "#f4ede4",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${cinzel.variable} ${crimsonText.variable} ${imFellEnglish.variable} bg-background`}
    >
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
