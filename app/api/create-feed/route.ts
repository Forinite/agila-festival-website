// /app/api/create-feed/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {sanityWriteClient, uploadImageToSanity} from "@/sanity/lib/sanityClient";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const file = formData.get('image') as File;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const category = JSON.parse(formData.get('category') as string); // Array

        if (!file || !title || !description) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        // Upload image
        const asset = await uploadImageToSanity(file);

        // Create feed
        const newFeed = await sanityWriteClient.create({
            _type: 'feedItem',
            title,
            description,
            category,
            image: {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: asset._id,
                },
            },
        });

        return NextResponse.json({ success: true, feed: newFeed });
    } catch (err: any) {
        console.error('Error creating feed:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
