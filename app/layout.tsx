import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
})

export const metadata: Metadata = {
  title: 'Finora | Engineering the Future',
  description: 'Finora is an innovative software development brand and tech lab building advanced software solutions, from OSINT tools to modern web apps.',
  icons: {
    icon: [
      {
        url: '/icon-light.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.png',
      },
    ],
    apple: '/icon-dark.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#050505',
}

import { Toaster } from 'sonner'
import { BackgroundEffects } from '@/components/background-effects'
import { CustomCursor } from '@/components/custom-cursor'
import { Loader } from '@/components/loader'
import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased relative md:cursor-none`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Loader />
          <CustomCursor />
          <BackgroundEffects />
          {children}
          <Toaster position="top-center" richColors />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
