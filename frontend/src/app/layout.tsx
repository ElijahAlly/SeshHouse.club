import './globals.css'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
// import '@mantine/dropzone/styles.css'
// import '@mantine/carousel/styles.css'
// import '@mantine/spotlight/styles.css'

import { ColorSchemeScript } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import type { Metadata } from 'next'
import { CookiesProvider } from 'next-client-cookies/server'
import React from 'react'

import DefaultLayout from '@/components/DefaultLayout'
// import SpotlightController from '@/components/SpotlightController'
// import { interFont } from '@/fonts/inter'
// import { getSessionFromCookies } from '@/lib/crypt'
import AppProviders from '@/providers/AppProviders'
// import { AuthUser } from '@/types/Auth'

export const metadata: Metadata = {
  title: 'SeaTheMoss',
  description: 'Shop High Quality Sea Moss Products',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // const user: AuthUser | null = await getSessionFromCookies()

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* <link rel="icon" type="image/png" sizes="32x32" href="/images/SeaTheMoss-Empty-Icon.png" /> */}
        {/* <link
          rel="icon"
          type="image/svg"
          sizes="16x16" 
          href="/images/SeaTheMoss-Empty-Icon-30px.svg"
        />
      */}
        {/* <link rel="icon" href="/images/SeaTheMoss-Empty-Icon.png" /> */}
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
      </head>
      <body className='body'>
        <CookiesProvider>
          <AppProviders>
            <DefaultLayout>
              <Notifications />
              {/* <SpotlightController /> */}
              {children}
            </DefaultLayout>
          </AppProviders>
        </CookiesProvider>
      </body>
    </html>
  )
}