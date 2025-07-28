import { NextResponse } from 'next/server';
import { sanityWriteClient } from '@/sanity/lib/sanityClient';
import bcrypt from 'bcryptjs';
import {sendInviteEmail} from "@/sanity/lib/email/sendInviteEmail";
import {toast} from "@/lib/toast";
// import { sendInviteEmail } from '@/sanity/lib/email/sendInviteEmail';

export async function POST(req: Request) {
    console.log('[API] Received admin invitation request');

    try {
        const { name, email, password } = await req.json();
        console.log('[API] Payload:', { name, email });

        if (!name || !email || !password) {
            toast.info('Missing required fields');

            console.warn('[API] Missing required fields');
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const existing = await sanityWriteClient.fetch(
            `*[_type == "adminAccount" && email == $email][0]`,
            { email }
        );
        if (existing) {
            toast.info('Admin already exists');

            console.warn('[API] Admin already exists with email:', email);
            return NextResponse.json({ error: 'Admin already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await sanityWriteClient.create({
            _type: 'adminAccount',
            name,
            email,
            hashedPassword,
        });

        try {
            await sendInviteEmail({ email, name, password });
            toast.success('Admin invited');
            console.log('[API] Email sent successfully');
        } catch (emailErr) {
            toast.error('Email sending failed');
            console.error('[API] Email sending failed:', emailErr);
            await sanityWriteClient.delete(admin._id); // rollback if email fails
            return NextResponse.json({ error: 'Email sending failed' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Admin invited', data: admin });
    } catch (err) {
        toast.error('Internal Server Error, Please Try Again')
        console.error('[API] General error during invite flow:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
