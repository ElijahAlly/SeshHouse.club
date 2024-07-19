import { defaultThemeVars } from "@/themes/dark";
import { style } from "@vanilla-extract/css";

export const navLinkItem = style({
    backgroundColor: defaultThemeVars.colors.gray[9],
    color: defaultThemeVars.colors.gray[0],

    selectors: {
        '&:hover': {
            backgroundColor: defaultThemeVars.colors.gray[6],
        },
        '&[data-active="true"]': {
            backgroundColor: defaultThemeVars.colors.green[9],
            color: defaultThemeVars.colors.green[0],
        },
        '&[data-active="true"]:hover': {
            backgroundColor: defaultThemeVars.colors.green[9],
        },
    },
});