// app/api/get-uploaded-url/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sanityWriteClient } from '@/sanity/lib/sanityClient';

export async function POST(req: NextRequest) {
    try {
        const { filename, contentType } = await req.json();

        if (!filename || !contentType) {
            return NextResponse.json({ error: 'Missing filename or contentType' }, { status: 400 });
        }

        // Request a signed upload URL from Sanity
        const asset = await sanityWriteClient.assets.upload('file', Buffer.from([]), {
            filename,
            contentType,
            preserveFilename: true,
            returnUrl: true, // ensures we get the upload URL
        });

        if (!asset || !asset._id) {
            throw new Error('Failed to get signed URL');
        }

        return NextResponse.json({
            uploadUrl: asset.url,
            assetId: asset._id,
        });
    } catch (err) {
        console.error('Error getting upload URL:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
