'use client'

import { MantineProvider } from '@mantine/core'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import React, { PropsWithChildren } from 'react'

import { useSchemeManager } from '@/hooks/useSchemeManager'
import { darkTheme } from '@/themes/dark'
import { defaultTheme, defaultThemeVars } from '@/themes/light'
import { ModalsProvider } from '@mantine/modals'

// import CartProvider from './CartProvider'

const AppProviders: React.FC<PropsWithChildren> = ({ children }) => {
    const schemeManager = useSchemeManager()
    
    return (
        <>
            <MantineProvider
                theme={schemeManager.get('auto') === 'dark' ? darkTheme : defaultTheme}
                defaultColorScheme={schemeManager.defaultScheme}
                colorSchemeManager={schemeManager}
            >
            <ProgressBar
                height="3px"
                color={defaultThemeVars.colors.teal[9]}
                options={{ showSpinner: true, easing: 'ease-in-out' }}
                shallowRouting={false}
                delay={1}
            />
            <ModalsProvider>
                {children}
            {/* 
                <CartProvider>
                // TODO: Move children into here
                </CartProvider>
            */}
            </ModalsProvider> 
            </MantineProvider>
        </>
    )
}

export default AppProviders;