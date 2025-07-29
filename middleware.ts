// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    const isStudioRoute = req.nextUrl.pathname.startsWith('/studio')

    if (isStudioRoute && !token) {
        // If no token and trying to access studio, redirect to sign in
        return NextResponse.redirect(new URL('/signin', req.url))
    }

    return NextResponse.next()
}
