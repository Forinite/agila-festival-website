import { NextResponse } from 'next/server';
import { sanityWriteClient } from '@/sanity/lib/sanityClient';

export async function POST(req: Request) {
    try {
        const { _id } = await req.json();

        if (!_id) {
            return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
        }

        await sanityWriteClient.delete(_id);

        return NextResponse.json({ message: 'Admin deleted' });
    } catch (err) {
        console.error('Delete Admin Error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
