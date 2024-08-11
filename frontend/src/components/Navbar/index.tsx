import { usePathname } from 'next/navigation'
import React from 'react'

import { ROUTE_PATHS } from '@/util/routes'
import UserMenu from '../UserMenu'
import { UserType } from '@/types/User'
import { NavigationMenu, NavigationMenuLink } from '../ui/navigation-menu'
import Link from 'next/link'
import Image from 'next/image'
// import { ToggleTheme } from '../ui/toggle-theme'

export type NavBarProps = {
    user: UserType | null
}

const NavBar: React.FC<NavBarProps> = ({ user }) => {
    const pathname = usePathname();

    return (
        <NavigationMenu className='flex w-full h-20 items-center p-4 border-b border-stone-950 dark:border-white bg-white dark:bg-slate-950'>
            <div className="flex w-full h-full items-center">
                <Link
                    href={'/'}
                    passHref
                    className='mr-8'
                >
                    <Image 
                        className='rounded-md min-w-fit min-h-fit'
                        src='/images/seshhouse-logo.jpg' 
                        alt='app logo' 
                        width={42} 
                        height={42} 
                        priority 
                    />
                </Link>
            </div>
            <NavigationMenuLink
                title="Home"
                href={ROUTE_PATHS.HOME}
                active={pathname === '/'}
                className={`mr-8 ${pathname === '/' ? 'text-green-500 hover:text-green-500 underline' : 'hover:text-green-500'}`}
            >Home</NavigationMenuLink>
            <NavigationMenuLink
                title="Events"
                href={ROUTE_PATHS.EVENTS.INDEX}
                className={`mr-8 ${pathname.startsWith('/events') ? 'text-green-500 hover:text-green-500 underline' : 'hover:text-green-500'}`}
            >Events</NavigationMenuLink>
            {/* <div className='mx-6'>
                // TODO: Fix dark: not working
                <ToggleTheme />
            </div> */}
            <div className='mr-6'>
                <UserMenu user={user} pathname={pathname} />
            </div>
        </NavigationMenu>
    )
}

export default NavBar