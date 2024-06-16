'use client'
import {
  AppShell,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React, { PropsWithChildren } from 'react'

// import FooterCentered from '@/components/FooterCentered'
// import Header from '@/components/Header'
// import { AuthUser } from '@/types/Auth'

// import NavBar from '../NavBar'
import { footer, main } from './layout.css'

const DefaultLayout: React.FC<{} & PropsWithChildren> = ({children}) => {
  const [navOpened, navbar] = useDisclosure(false)
  const { colors } = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const isDarkTheme = colorScheme === 'dark'

    return (
        <AppShell
            header={{
                height: 60,
            }}
            navbar={{
                width: 200,
                breakpoint: 'md',
                collapsed: {
                    mobile: !navOpened,
                    desktop: true,
                },
            }}
            transitionDuration={300}
            footer={{
                height: '54vh',
            }}
            bg={isDarkTheme ? colors.black[9] : '#f5f5f5'}
        >
            <AppShellHeader>
            {/* <Header navOpened={navOpened} toggleNav={navbar.toggle} user={user} /> */}
            </AppShellHeader>
            <AppShellNavbar withBorder>
            {/* <NavBar onClose={navbar.close} navOpened={navOpened} user={user} /> */}
            </AppShellNavbar>
            <AppShellMain className={main}>{children}</AppShellMain>
            <AppShellFooter className={footer}>
            {/* <FooterCentered /> */}
            </AppShellFooter>
        </AppShell>
    )
}

export default DefaultLayout;