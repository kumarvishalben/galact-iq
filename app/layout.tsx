import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GalactIQ',
  description: 'Unlocking the Universe, One Question at a Time',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
