'use client';

import { useEffect, useState } from 'react';
import { sanityClient } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);

export interface Queen {
    name: string;
    year: number;
    role: string;
    imageUrl: string;
}

export const useQueens = () => {
    const [queens, setQueens] = useState<Queen[]>([]);
    const [loading, setLoading] = useState(true);

        const fetchQueens = async () => {
            try {
                const data = await sanityClient.fetch(`*[_type == "queen"] | order(year desc) {
                    _id,
                    name,
                    year,
                    role,
                    imageUrl,
                    bio
                }`);

                const formatted = data.map((q: any) => ({
                    _id: q._id,
                    name: q.name,
                    year: q.year,
                    role: q.role,
                    bio: q.bio,
                    imageUrl: q.imageUrl ? builder.image(q.imageUrl).url() : null,                }));

                setQueens(formatted);
            } catch (err) {
                console.error("Failed to fetch queens:", err);
            } finally {
                setLoading(false);
            }
        };


    useEffect(() => {
        fetchQueens();
    }, []);

    const currentQueen = queens[0] || null;
    const pastQueens = queens.slice(1);


    return { queens, currentQueen, pastQueens, loading , refetch: fetchQueens};
};
