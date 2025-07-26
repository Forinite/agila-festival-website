import { NextResponse } from 'next/server';
import { sanityWriteClient } from '@/sanity/lib/sanityClient';
import bcrypt from 'bcryptjs';
import {deleteToken, verifyToken} from "@/sanity/lib/tokenStore";

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();

        const email = verifyToken(token);
        if (!email) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const updated = await sanityWriteClient
            .patch({
                query: '*[_type == "adminAccount" && email == $email][0]',
                params: { email },
            })
            .set({ hashedPassword })
            .commit();

        deleteToken(token);
        return NextResponse.json({ message: 'Password set', data: updated });
    } catch (err) {
        console.error('Set Password Error:', err);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}
