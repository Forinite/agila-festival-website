import { NextRequest, NextResponse } from 'next/server';
import { sanityWriteClient, uploadImageToSanity } from '@/sanity/lib/sanityClient';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const file = formData.get('media') as File; // renamed from 'image'
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const category = JSON.parse(formData.get('category') as string); // Expecting array

        if (!file || !title || !description || !category) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        // Upload file (image or video)
        const asset = await uploadImageToSanity(file); // Handles video & image

        // Create feed document
        const newFeed = await sanityWriteClient.create({
            _type: 'feedItem',
            title,
            description,
            category,
            media: {
                _type: 'file',
                asset: {
                    _type: 'reference',
                    _ref: asset._id,
                },
            },
        });

        return NextResponse.json({ success: true, feed: newFeed });
    } catch (err: any) {
        console.error('Error creating feed:', err.message);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
