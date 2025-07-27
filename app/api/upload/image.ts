import { sanityWriteClient } from '@/sanity/lib/sanityClient';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    const asset = await sanityWriteClient.assets.upload('image', file, {
        contentType: file.type,
        filename: file.name,
    });

    return NextResponse.json({ assetId: asset._id });
}