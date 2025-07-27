// /app/api/create-feed/update/route.ts
import { NextResponse } from 'next/server';
import { sanityWriteClient } from '@/sanity/lib/sanityClient';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const id = formData.get('id')?.toString();
        const title = formData.get('title')?.toString();
        const description = formData.get('description')?.toString();
        const categoryRaw = formData.get('category')?.toString();
        const mediaTypeOverride = formData.get('mediaType')?.toString();
        const file = formData.get('file') as File | null;
        const existingAssetId = formData.get('existingAssetId')?.toString();

        if (!id) {
            return NextResponse.json({ error: 'Missing feed ID' }, { status: 400 });
        }

        const category = categoryRaw ? JSON.parse(categoryRaw) : [];

        let finalAssetId = existingAssetId || '';
        let finalMediaType = mediaTypeOverride;

        // If a new file was uploaded, upload to Sanity and override asset ID + type
        if (file && file.size > 0) {
            const isVideo = file.type.startsWith('video/');
            const uploaded = await sanityWriteClient.assets.upload(
                isVideo ? 'file' : 'image',
                file,
                {
                    contentType: file.type,
                    filename: file.name,
                }
            );

            finalAssetId = uploaded._id;
            finalMediaType = isVideo ? 'video' : 'image';
        }

        if (!finalAssetId) {
            return NextResponse.json({ error: 'Missing media asset' }, { status: 400 });
        }

        const updated = await sanityWriteClient
            .patch(id)
            .set({
                title,
                description,
                category,
                mediaType: finalMediaType,
                media: {
                    _type: finalMediaType === 'image' ? 'image' : 'file',
                    asset: {
                        _type: 'reference',
                        _ref: finalAssetId,
                    },
                },
            })
            .commit();

        return NextResponse.json({ message: 'Feed updated successfully', updated });
    } catch (err) {
        console.error('Feed update failed:', err);
        return NextResponse.json({ error: 'Server error while updating feed' }, { status: 500 });
    }
}
