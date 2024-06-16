'use client'

import { useCookies } from 'next-client-cookies'
import { useRef } from 'react'

import { ColorSchemeManager } from '@/themes/colorSchemeManager'

export const useSchemeManager = () => {
    const cookies = useCookies()
    const manager = useRef(new ColorSchemeManager(cookies))

    return manager.current
}