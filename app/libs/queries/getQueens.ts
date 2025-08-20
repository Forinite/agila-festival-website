import { sanityClient } from "@/sanity/lib/client";
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

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
    _id: string;
    name: string;
    year: number;
    role: string;
    imageUrl: string | null; // Transformed to a string URL or null
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

    const queens: Queen[] = data.map((q: RawQueen) => ({
        _id: q._id,
        name: q.name,
        year: q.year,
        role: q.role,
        bio: q.bio,
        imageUrl: q.imageUrl ? builder.image(q.imageUrl).url() : null,
    }));

    const currentQueen = queens[0] || null;
    const pastQueens = queens.slice(1);

    return { currentQueen, pastQueens };
};