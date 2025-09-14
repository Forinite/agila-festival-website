// app/api/create-feed/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sanityWriteClient } from '@/sanity/lib/sanityClient';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const category = JSON.parse(formData.get('category') as string);
        const media = formData.get('media') as File | null;

        if (!title || !description || !media) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Convert File → Buffer
        const arrayBuffer = await media.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload asset
        const uploadType = media.type.startsWith('video/') ? 'file' : 'image';
        const asset = await sanityWriteClient.assets.upload(uploadType, buffer, {
            contentType: media.type,
            filename: media.name,
        });

        // Create feed document
        const newFeed = await sanityWriteClient.create({
            _type: 'feedItem',
            title,
            description,
            category,
            media: {
                _type: uploadType,
                asset: {
                    _type: 'reference',
                    _ref: asset._id,
                },
            },
        });

        return NextResponse.json({ success: true, feed: newFeed });
    } catch (err) {
        console.error('Error creating feed:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
