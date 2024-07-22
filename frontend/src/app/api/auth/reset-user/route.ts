import { NextRequest } from 'next/server'

import { setSessionCookie } from '@/lib/crypt'
import { UserType } from '@/types/User'

export const revalidate = 0 // No cache

export const POST = async (req: NextRequest) => {
    const loginRes = await req.json();
    const user: UserType = loginRes.user;

    if (user.id) {
        await setSessionCookie(user)
        return new Response(JSON.stringify({ message: 'Login successful', user }), { status: 200 })
    } else {
        return new Response(
            JSON.stringify({ error: `Login failed. Login Res: ${JSON.stringify(loginRes)}` }),
            { status: 401 },
        )
    }
}