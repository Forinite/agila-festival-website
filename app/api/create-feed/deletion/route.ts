// /app/api/create-feed/delete/route.ts
import { NextResponse } from 'next/server';
import { sanityWriteClient } from '@/sanity/lib/sanityClient';
import { del } from '@vercel/blob';

export async function POST(req: Request) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: 'Feed ID is required' }, { status: 400 });
        }

        // Fetch feedItem to get blobUrl or media
        const feedItem = await sanityWriteClient.getDocument(id);
        if (!feedItem) {
            return NextResponse.json({ error: 'Feed not found' }, { status: 404 });
        }

        // Delete Vercel Blob file if blobUrl exists
        if (feedItem.blobUrl) {
            try {
                await del(feedItem.blobUrl, { token: process.env.BLOB_READ_WRITE_TOKEN });
            } catch (blobError) {
                console.error('Blob deletion failed:', blobError);
                // Continue to delete feedItem even if Blob deletion fails
            }
        }

        // Delete Sanity asset if media exists
        if (feedItem.media?.asset?._ref) {
            try {
                await sanityWriteClient.delete(feedItem.media.asset._ref);
            } catch (assetError) {
                console.error('Sanity asset deletion failed:', assetError);
                // Continue to delete feedItem
            }
        }

        // Delete feedItem
        await sanityWriteClient.delete(id);

        return NextResponse.json({ success: true, id });
    } catch (err) {
        console.error('Delete error:', err);
        return NextResponse.json({ error: 'Failed to delete feed: ' + (err as Error).message }, { status: 500 });
    }
}