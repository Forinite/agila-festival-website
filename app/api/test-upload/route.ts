// app/api/test-upload/route.ts
import { NextResponse } from 'next/server';
import { sanityWriteClient } from '@/sanity/lib/sanityClient';

export async function GET() {
    try {
        const doc = await sanityWriteClient.create({
            _type: 'debugDoc',
            title: 'Testing token',
        });
        return NextResponse.json({ success: true, doc });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}