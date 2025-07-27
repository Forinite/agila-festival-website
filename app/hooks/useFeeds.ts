
import { useEffect, useState } from 'react';
import { sanityClient } from '@/sanity/lib/client';

interface Feed {
    id: string;
    title: string;
    media: string;
    isVideo?: boolean;
    description: string;
    category: string[];
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
                }
            }`;
            const data = await sanityClient.fetch(query);

            const formatted = data.map((item: any) => ({
                id: item._id,
                title: item.title,
                description: item.description,
                category: item.category,
                media: item.media?.asset?.url,
                isVideo: item.media?.asset?.mimeType?.startsWith('video'),
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
