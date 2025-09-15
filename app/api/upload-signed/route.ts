// app/api/upload-signed/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { pathname } = await req.json();
        if (!pathname) {
            return NextResponse.json({ error: 'Pathname is required' }, { status: 400 });
        }

        const token = process.env.BLOB_READ_WRITE_TOKEN;
        if (!token) {
            throw new Error('Missing BLOB_READ_WRITE_TOKEN');
        }

        // Generate signed URL using Vercel Blob API
        const response = await fetch(`https://api.vercel.com/v1/blob/put/${encodeURIComponent(pathname)}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'x-vercel-blob-access': 'public',
                'x-vercel-blob-add-random-suffix': 'false',
                'Content-Length': '0',
            },
            body: '{}',
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Vercel Blob API error: ${errorText}`);
        }

        const { url } = await response.json();
        return NextResponse.json({ url });
    } catch (err) {
        console.error('Signed URL error:', err);
        return NextResponse.json({ error: 'Server error: ' + err.message }, { status: 500 });
    }
}