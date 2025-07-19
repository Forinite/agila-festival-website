import { useEffect, useState } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import {sanityClient} from "@/sanity/lib/client";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: any) {
    return builder.image(source);
}

export interface Feed {
    _id: string;
    title: string;
    description: string;
    category: string[];
    image: string; // url
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
        image
      }`;
            const data = await sanityClient.fetch(query);

            const formatted = data.map((item: any) => ({
                ...item,
                image: urlFor(item.image).url(),
            }));

            setFeeds(formatted);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching feeds:', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeeds();
    }, []);

    return { feeds, loading, refetch: fetchFeeds };
};
