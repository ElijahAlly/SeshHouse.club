'use client'

import React, { PropsWithChildren } from 'react'

import { UserType } from '@/types/User'
import NavigationBreadcrumbs from '../NavigationBreadcrumbs'
import NavBar from '../Navbar'

const DefaultLayout: React.FC<{} & PropsWithChildren & {user: UserType | null}> = ({children, user}) => {
    return (
        <div className="relative flex flex-col">
            <div className='h-24 w-full p-0 m-0 fixed top-0 left-0 z-50'>
                <NavBar user={user} />
                <NavigationBreadcrumbs />
            </div>
            <main className='mt-24 overflow-y-auto overflow-x-hidden'>
                {children}
            </main>
        </div>
    )
}

export default DefaultLayout;