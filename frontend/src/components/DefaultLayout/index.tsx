'use client'

import React, { PropsWithChildren } from 'react'

import { UserType } from '@/types/User'
import NavigationBreadcrumbs from '../NavigationBreadcrumbs'
import NavBar from '../Navbar'
import Footer from '../Footer'

const DefaultLayout: React.FC<{} & PropsWithChildren & {user: UserType | null}> = ({children, user}) => {
    return (
        <div className="relative flex flex-col h-screen">
            <div className='h-fit w-full p-0 m-0 fixed top-0 left-0 z-50 bg-white'>
                <NavBar user={user} />
                <NavigationBreadcrumbs />
            </div>
            <main className='mt-16 overflow-y-auto h-screen'>
                {children}
                <Footer user={user} />
            </main>
        </div>
    )
}

export default DefaultLayout;