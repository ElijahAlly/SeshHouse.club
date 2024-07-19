
import { defaultThemeVars } from "@/themes/dark";
import { globalStyle, style } from "@vanilla-extract/css";

export const userMenuGroup = style({
    position: 'relative',

    selectors: {
        '&:hover': {
            backgroundColor: defaultThemeVars.colors.gray[6],
        },
        // '&[data-active="true"]': {
        //     backgroundColor: defaultThemeVars.colors.green[9],
        //     color: defaultThemeVars.colors.green[0],
        // },
        // '&[data-active="true"]:hover': {
        //     backgroundColor: defaultThemeVars.colors.green[9],
        // },
    },
});

export const userProfileImage = style({
    cursor: 'pointer'
    // selectors: {
    //     '&:hover': {
    //         backgroundColor: defaultThemeVars.colors.gray[6],
    //     },
    //     '&[data-active="true"]': {
    //         backgroundColor: defaultThemeVars.colors.green[9],
    //         color: defaultThemeVars.colors.green[0],
    //     },
    //     '&[data-active="true"]:hover': {
    //         backgroundColor: defaultThemeVars.colors.green[9],
    //     },
    // },
});

export const userActions = style({
    display: 'none',
    position: 'absolute',
    width: '150px',
    top: 0,
    left: -150,
    cursor: 'auto',
    
    selectors: {
        '&:hover': {
            display: 'block',
        },
    //     '&[data-active="true"]': {
    //         backgroundColor: defaultThemeVars.colors.green[9],
    //         color: defaultThemeVars.colors.green[0],
    //     },
    //     '&[data-active="true"]:hover': {
    //         backgroundColor: defaultThemeVars.colors.green[9],
    //     },
    },
});

globalStyle(`${userMenuGroup}:hover ${userActions}`, {
    display: 'block'
});
