import { defaultThemeVars } from '@/themes/dark'
import { style } from '@vanilla-extract/css'

export const main = style({
    paddingBottom: '99px',
    fontFamily: 'Palantino',
    backgroundColor: defaultThemeVars.colors.white[2]
})

export const footer = style({
    position: 'sticky',
    height: 0,
    backgroundColor: defaultThemeVars.colors.white[2]
})