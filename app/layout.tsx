import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Notion Atlas - Living Paper OS",
  description: "A radical Notion redesign that turns docs, projects, wiki pages, and AI into a tactile command desk.",
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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
