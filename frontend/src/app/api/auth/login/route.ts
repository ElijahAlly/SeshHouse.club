import { NextRequest } from 'next/server'

import { setCookie, setSessionCookie } from '@/lib/crypt'
import { UserType } from '@/types/User'
// import { auth } from '@/lib/auth'

export const revalidate = 0 // No cache

export const POST = async (req: NextRequest) => {
    // const { email, password, isTempPass } = await req.json()
    const loginRes = await req.json();
    const user: UserType = loginRes.user;

    if (user.id) {
        await setSessionCookie(user)
        // isTempPass && (await setCookie(password, 'tp'))
        loginRes.jwt && (await setCookie(loginRes.jwt, 'jwt'))
        return new Response(JSON.stringify({ message: 'Login successful', user }), { status: 200 })
    } else {
        return new Response(
            JSON.stringify({ error: `Login failed. Login Res: ${JSON.stringify(loginRes)}` }),
            { status: 401 },
        )
    }
}