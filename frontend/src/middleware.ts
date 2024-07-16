import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { getSessionFromCookies } from './lib/crypt'
import { UserType } from './types/User'

async function isAuthenticated() {
    const user: UserType | null = await getSessionFromCookies();
    console.log('data in middleware:::', user);
    return !(!user || !user?.email);
}

const handlePrivatePages = async (request: NextRequest) => {
    const isAuthenticatedBool = await isAuthenticated()
    console.log('isAuthenticatedBool', isAuthenticatedBool)
    if (!isAuthenticatedBool) {
        return NextResponse.redirect(request.nextUrl.origin + '/login')
    }

    // console.log('request', request.nextUrl.href)
    // console.log('request.nextUrl.origin + request.nextUrl.pathname:::', request.nextUrl.origin + request.nextUrl.pathname); // http://localhost:3000/profile
    // return NextResponse.redirect(request.nextUrl.origin + request.nextUrl.pathname)
    return NextResponse.next()
}

const handleLogin = async (_: NextRequest) => {
    const isAuthenticatedBool = await isAuthenticated()
    if (!isAuthenticatedBool) {
        return new NextResponse('Authentication required', {
            status: 401,
            headers: { 'WWW-Authenticate': 'Basic' },
        })
    }

    // const requestHeaders = new Headers(request.headers)
    // const ref = requestHeaders.get('referer')

    return NextResponse.next()
}

const middleware = async (request: NextRequest) => {
    // console.log('--------')
    // console.log('in middleware url:::', request.url); // => http://localhost:3000/profile
    // console.log('in middleware nextUrl pathname:::', request.nextUrl.pathname)
    // if (
    //     request.nextUrl.pathname.startsWith('/events')
    // ) {
    //     return handlePrivatePages(request)
    // }
}

export default middleware;