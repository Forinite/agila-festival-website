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

// 2. Upload image helper
export const uploadImageToSanity = async (file: File) => {
    const asset = await sanityWriteClient.assets.upload('image', file, {
        contentType: file.type,
        filename: file.name,
    });

    return asset; // asset._id is used for referencing
};

// 3. Create feed item (pass in the uploaded asset)
export const createFeedItem = async (formData: {
    title: string;
    description: string;
    category: string[];
    imageAssetId: string; // we expect _id from uploadImageToSanity
}) => {
    return sanityWriteClient.create({
        _type: 'feedItem',
        title: formData.title,
        description: formData.description,
        category: formData.category,
        image: {
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: formData.imageAssetId,
            },
        },

    });
};

// Create Queen
export const createQueen = async (data: {
    name: string;
    year: number;
    role: string;
    imageAssetId: string;
}) => {
    return sanityWriteClient.create({
        _type: 'queen',
        name: data.name,
        year: data.year,
        role: data.role,
        imageUrl: {
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: data.imageAssetId,
            },
        },
    });
};
