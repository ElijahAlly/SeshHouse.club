export const ROUTE_PATHS = {
    HOME: '/',
    EVENTS: {
        INDEX: '/events',
        SINGlE: '/events/{slug}',
        TICKETS: '/events/{slug}/tickets',
        CALENDAR: '/events/{slug}/calendar'
    },
    CAFE_ITEM: {
        INDEX: '/cafe',
        SINGlE: '/cafe/{slug}',
    },
    LOGIN: '/login',
    SIGNUP: '/login?signup=true',
    MY_PROFILE: {
        INDEX: '/my-profile'
    }
};

export const getTitleToUrl = (title: string) => {
    return encodeURI(title);
}

export const getUrlToDisplay = (titleUrl: string) => {
    return decodeURI(titleUrl);
}

export const pathShouldNotHaveLink = (path: string): boolean => {
    if (path !== 'events'
        && path !== 'tickets'
        && path !== 'calendar'
    ) {
        return true;
    }
    return false;
}