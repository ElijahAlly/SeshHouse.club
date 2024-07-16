'use client'

import { generateColors } from '@mantine/colors-generator'
import { createTheme, rem } from '@mantine/core'
import { themeToVars } from '@mantine/vanilla-extract'

export const defaultTheme = createTheme({
    radius: {
        lg: rem(0),
        md: rem(0),
        sm: rem(0),
        xl: rem(0),
        xs: rem(0),
    },
    colors: {
        // white: generateColors('#fff'),
        white: [
            '#f5f5f5',
            '#f5f5f5',
            '#f5f5f5',
            '#f5f5f5',
            '#f5f5f5',
            '#f5f5f5',
            '#f5f5f5',
            '#f5f5f5',
            '#f5f5f5',
            '#f5f5f5',
        ],
        teal: generateColors('#087F5B'), // teal
        cyan: generateColors('#0B7285'), // cyan
        lime: generateColors('#5C940D'), // lime
        orange: generateColors('#D9480F'), // orange
        grape: generateColors('#862E9C'), // grape
        red: generateColors('#C92A2A'), // red
        gray: generateColors('#212529'), // gray
        blue: generateColors('#1864AB'), // blue
        pink: generateColors('#A61E4D'), // pink
        black: [
            '#1a1b1e',
            '#1a1b1e',
            '#1a1b1e',
            '#1a1b1e',
            '#1a1b1e',
            '#1a1b1e',
            '#1a1b1e',
            '#1a1b1e',
            '#1a1b1e',
            '#1a1b1e',
        ],
    },
    primaryColor: 'green',
    primaryShade: {
        light: 8,
        dark: 9,
    },
    components: {
        Container: {
            defaultProps: {
                size: 'xl',
            },
        },
        Indicator: {
            defaultProps: {
                zIndex: 1,
            },
        },
    },
    breakpoints: {
        xs: '36em',
        sm: '48em',
        md: '62em',
        lg: '75em',
        xl: '88em',
    },
    spacing: {
        xs: '2px',
        sm: '9px',
        md: '12px',
        lg: '15px',
        xl: '20px',
    },
    fontFamily: 'Palantino',
    defaultGradient: {
        from: '#f5f5f5',
        to: 'teal',
        deg: 45,
    },
    defaultRadius: 5,
})

export const defaultThemeVars = {
    ...themeToVars(defaultTheme),
    radiusDefault: 9,
}