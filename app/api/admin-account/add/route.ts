import { NextResponse } from 'next/server';
import { sanityWriteClient } from '@/sanity/lib/sanityClient';

export async function POST(req: Request) {
    try {
        const { name, email } = await req.json();

        if (!name || !email) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const result = await sanityWriteClient.create({
            _type: 'adminAccount',
            name,
            email,
        });

        return NextResponse.json({ message: 'Admin added', data: result });
    } catch (err) {
        console.error('Add Admin Error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
