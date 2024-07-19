import { defaultThemeVars } from "@/themes/dark";
import { globalStyle, style } from "@vanilla-extract/css";

export const eventItem = style({
    border: `1px solid ${defaultThemeVars.colors.dark[9]}`,
    cursor: 'pointer',

    selectors: {
        '&:hover': {
            borderColor: defaultThemeVars.colors.green[9],
        },
    },
});

export const imageItem = style({
    border: `2px solid ${defaultThemeVars.colors.dark[9]}`, 
});

export const eventTitle = style({
   color: defaultThemeVars.colors.dark[9], 
});

globalStyle(`${eventItem}:hover ${imageItem}`, {
    borderColor: defaultThemeVars.colors.green[9],
});

globalStyle(`${eventItem}:hover ${eventTitle}`, {
    color: defaultThemeVars.colors.green[9],
});