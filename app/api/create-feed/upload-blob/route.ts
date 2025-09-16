//app/api/create-feed/upload-blob/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { sanityWriteClient } from '@/sanity/lib/sanityClient';

export async function POST(req: NextRequest) {
    try {
        const { title, description, category, blobUrl, isVideo } = await req.json();

        // Validate input
        if (!title || !description || !category || !blobUrl) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Validate blobUrl format (optional, for extra safety)
        if (!blobUrl.startsWith('https://') || !blobUrl.includes('.blob.vercel-storage.com/festival/media/')) {
            return NextResponse.json({ error: 'Invalid blobUrl' }, { status: 400 });
        }

        // Create feed document
        const newFeed = await sanityWriteClient.create({
            _type: 'feedItem',
            title,
            description,
            category,
            blobUrl,
        });

        // Return feed object matching Feed type
        return NextResponse.json({
            success: true,
            feed: {
                id: newFeed._id,
                title,
                description,
                category,
                media: blobUrl, // For compatibility with useFeeds.ts
                isVideo,
            },
        });
    } catch (err) {
        console.error('Error creating feed with blobUrl:', err);
        return NextResponse.json({ error: 'Server error: ' + (err as Error).message }, { status: 500 });
    }
}