// sanity/lib/sanityClient.ts
import { createClient } from '@sanity/client';

export const sanityWriteClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: 'production',
    apiVersion: '2025-07-15',
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
});

export const uploadMediaToSanity = async (file: File | Blob) => {
    const uploadType = file.type.startsWith('video/') ? 'file' : 'image';

    // Convert Blob/File → Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const asset = await sanityWriteClient.assets.upload(uploadType, buffer, {
        contentType: file.type,
        filename: 'name' in file ? file.name : 'upload',
    });

    return asset;
};
