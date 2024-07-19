import { Flex, Group, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { usePathname } from 'next/navigation'
import React from 'react'

import { ROUTE_PATHS } from '@/util/routes'
import NavLinkItem from '../NavLinkItem'
import UserMenu from '../UserMenu'

// import ColorSchemeToggler from '../ColorSchemeToggler'
// import NavLinkItem from '../NavLinkItem'
// import { navLink, navLinkContClosed, navLinkContOpened } from './NavBar.css'


export type NavBarProps = {
}

const NavBar: React.FC<NavBarProps> = ({  }) => {
    const pathname = usePathname()
    const { colors, defaultRadius } = useMantineTheme()
    const { colorScheme } = useMantineColorScheme()
    const isDarkTheme = colorScheme === 'dark'

    return (
        <Flex
            w="100%"
            py={'1vh'}
            px={'3vw'}
            bg={isDarkTheme ? colors.dark[8] : '#f5f5f5'}
            h={'8vh'}
            justify={'space-between'}
        >
            <Group>
                <NavLinkItem
                    label="Home"
                    title="Home"
                    href={ROUTE_PATHS.HOME}
                    active={pathname === '/'}
                    style={{ borderRadius: defaultRadius }}
                />
                <NavLinkItem
                    label="/Events"
                    title="Events"
                    href={ROUTE_PATHS.EVENTS.INDEX}
                    active={pathname === '/events' || pathname.startsWith('/events')}
                    style={{ borderRadius: defaultRadius }}
                />
            </Group>
            <UserMenu />
        </Flex>
    )
}

export default NavBar