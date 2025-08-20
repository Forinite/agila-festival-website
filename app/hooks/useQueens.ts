'use client';

import { useEffect, useState } from 'react';
import { sanityClient } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(sanityClient);

// Interface for the raw Sanity data
interface RawQueen {
    _id: string;
    name: string;
    year: number;
    role: string;
    imageUrl?: SanityImageSource; // imageUrl is a Sanity image asset
    bio?: string;
}

// Interface for the transformed Queen data
export interface Queen {
    name: string;
    year: number;
    role: string;
    imageUrl: string | null; // Transformed to a string URL or null
}

export const useQueens = () => {
    const [queens, setQueens] = useState<Queen[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchQueens = async () => {
        try {
            const data: RawQueen[] = await sanityClient.fetch(`*[_type == "queen"] | order(year desc) {
        _id,
        name,
        year,
        role,
        imageUrl,
        bio
      }`);

            const formatted: Queen[] = data.map((q: RawQueen) => ({
                name: q.name,
                year: q.year,
                role: q.role,
                imageUrl: q.imageUrl ? builder.image(q.imageUrl).url() : null,
            }));

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

    return { queens, currentQueen, pastQueens, loading, refetch: fetchQueens };
};