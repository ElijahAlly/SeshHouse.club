'use client'

import React, { PropsWithChildren } from 'react'

import { UserType } from '@/types/User'
import Navbar from '../Navbar'
import NavigationBreadcrumbs from '../NavigationBreadcrumbs'

const DefaultLayout: React.FC<{} & PropsWithChildren & {user: UserType | null}> = ({children, user}) => {
    return (
        <div className="relative flex flex-col">
            <Navbar user={user} />
            <NavigationBreadcrumbs />
            <main className='overflow-hidden'>
                {children}
            </main>
        </div>
    )
}

export default DefaultLayout;