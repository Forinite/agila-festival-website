//app/hooks/useFeeds.ts
'use client';
import { useEffect, useState } from 'react';
import { sanityClient } from '@/sanity/lib/client';
import { Feed } from '@/app/types/feed';

// Interface for raw Sanity data
interface RawFeed {
    _id: string;
    title: string;
    description: string;
    category: string[];
    media?: {
        asset: {
            _id: string;
            url: string;
            mimeType: string;
        };
    };
    blobUrl?: string;
}

export const useFeeds = () => {
    const [feeds, setFeeds] = useState<Feed[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchFeeds = async () => {
        try {
            const query = `*[_type == "feedItem"] | order(_createdAt desc){
                _id,
                title,
                description,
                category,
                media {
                    asset->{
                        _id,
                        url,
                        mimeType
                    }
                },
                blobUrl
            }`;
            const data: RawFeed[] = await sanityClient.fetch(query);

            const formatted: Feed[] = data.map((item: RawFeed) => ({
                id: item._id,
                title: item.title,
                description: item.description,
                category: item.category,
                media: item.blobUrl || item.media?.asset?.url || '', // Prioritize blobUrl
                isVideo: item.blobUrl
                    ? item.blobUrl.includes('.mp4') // Adjust based on your file extensions
                    : item.media?.asset?.mimeType?.startsWith('video') ?? false,
                mediaAssetId: item.media?.asset?._id,
            }));

            setFeeds(formatted);
        } catch (err) {
            console.error('Error fetching feeds:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeeds();
    }, []);

    return { feeds, loading, refetch: fetchFeeds };
};