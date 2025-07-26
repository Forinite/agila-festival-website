import { NextResponse } from 'next/server';
import { sanityWriteClient } from '@/sanity/lib/sanityClient';
import bcrypt from 'bcryptjs';
import {sendInviteEmail} from "@/sanity/lib/email/sendInviteEmail";
// import { sendInviteEmail } from '@/sanity/lib/email/sendInviteEmail';

export async function POST(req: Request) {
    console.log('[API] Received admin invitation request');

    try {
        const { name, email, password } = await req.json();
        console.log('[API] Payload:', { name, email });

        if (!name || !email || !password) {
            console.warn('[API] Missing required fields');
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const existing = await sanityWriteClient.fetch(
            `*[_type == "adminAccount" && email == $email][0]`,
            { email }
        );
        if (existing) {
            console.warn('[API] Admin already exists with email:', email);
            return NextResponse.json({ error: 'Admin already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('[API] Password hashed successfully');

        const admin = await sanityWriteClient.create({
            _type: 'adminAccount',
            name,
            email,
            hashedPassword,
        });

        console.log('[API] Admin account created in Sanity:', admin._id);

        try {
            await sendInviteEmail({ email, name, password });
            console.log('[API] Email sent successfully');
        } catch (emailErr) {
            console.error('[API] Email sending failed:', emailErr);
            await sanityWriteClient.delete(admin._id); // rollback if email fails
            return NextResponse.json({ error: 'Email sending failed' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Admin invited', data: admin });
    } catch (err) {
        console.error('[API] General error during invite flow:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
