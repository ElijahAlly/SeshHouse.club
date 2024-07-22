import './globals.css'
import { Inter as FontSans } from "next/font/google"

import type { Metadata } from 'next'
import { CookiesProvider } from 'next-client-cookies/server'
import React from 'react'

import DefaultLayout from '@/components/DefaultLayout'
import { getSessionFromCookies } from '@/lib/crypt'
import { UserType } from '@/types/User'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from "@/lib/utils"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'SeshHouse',
  description: 'Vibe @ the SeshHouse',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user: UserType | null = await getSessionFromCookies();

  return (
    <html lang="en" className="min-h-screen min-w-screen scroll-smooth" suppressHydrationWarning>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link href='https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css' rel='stylesheet' />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body
        className={cn(
          "h-screen w-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
            <CookiesProvider>
              <TooltipProvider>
                <DefaultLayout user={user}>
                  {children}
                </DefaultLayout>
              </TooltipProvider>
            </CookiesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}