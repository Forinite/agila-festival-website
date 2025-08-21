// app/hooks/useQueens.ts
'use client';
import { useEffect, useState } from 'react';
import { sanityClient } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Queen } from '@/app/types/queen';

const builder = imageUrlBuilder(sanityClient);

interface RawQueen {
    _id: string;
    name: string;
    year: number;
    role?: string; // Align with optional role
    imageUrl?: SanityImageSource;
    bio?: string;
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
                _id: q._id,
                name: q.name,
                year: q.year,
                role: q.role || 'Queen', // Fallback for missing role
                imageUrl: q.imageUrl ? builder.image(q.imageUrl).url() : null,
                bio: q.bio,
            }));

            setQueens(formatted);
        } catch (err) {
            console.error('Failed to fetch queens:', err);
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