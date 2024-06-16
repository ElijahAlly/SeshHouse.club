'use client'

import { generateColors } from '@mantine/colors-generator'
import { createTheme, rem } from '@mantine/core'
import { themeToVars } from '@mantine/vanilla-extract'

export const darkTheme = createTheme({
    fontFamily: 'Palantino',
    radius: {
        lg: rem(0),
        md: rem(0),
        sm: rem(0),
        xl: rem(0),
        xs: rem(0),
    },
    colors: {
        white: generateColors('#fff'),
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
    primaryColor: 'teal',
    primaryShade: {
        light: 9,
        dark: 8,
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
    defaultGradient: {
        from: '#f5f5f5',
        to: 'teal',
        deg: 45,
    },
    defaultRadius: 1,
})

export const darkThemeVars = themeToVars(darkTheme);