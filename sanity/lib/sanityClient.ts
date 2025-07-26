import { createClient } from '@sanity/client';
import { v4 as uuid } from 'uuid';

// 1. Create the write client
export const sanityWriteClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!, // ✅ Replace with your actual project ID
    dataset: 'production',
    apiVersion: '2025-07-15',
    token: process.env.SANITY_API_WRITE_TOKEN, // ✅ Must be set in your .env.local
    useCdn: false,
});

// 2. Upload Media helper
export const uploadMediaToSanity = async (file: File) => {
    const uploadType = file.type.startsWith('video/') ? 'file' : 'image';

    const asset = await sanityWriteClient.assets.upload(uploadType, file, {
        contentType: file.type,
        filename: file.name,
    });

    return asset;
};

