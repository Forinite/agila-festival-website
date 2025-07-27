// lib/queries/getQueens.ts
import { sanityClient } from "@/sanity/lib/client";
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);

export interface Queen {
    _id: string;
    name: string;
    year: number;
    role: string;
    imageUrl: string;
    bio?: string;
}

export const getQueens = async (): Promise<{
    currentQueen: Queen | null;
    pastQueens: Queen[];
}> => {
    const data = await sanityClient.fetch(`
    *[_type == "queen"] | order(year desc) {
      _id,
      name,
      year,
      role,
      imageUrl,
      bio
    }
  `);

    const queens = data.map((q: any) => ({
        _id: q._id,
        name: q.name,
        year: q.year,
        role: q.role,
        bio: q.bio,
        imageUrl: builder.image(q.imageUrl).url(),
    }));

    const currentQueen = queens[0] || null;
    const pastQueens = queens.slice(1);

    return { currentQueen, pastQueens };
};
