// lib/fetchFeeds.ts
import { sanityClient } from '@/sanity/lib/client';

export interface Feed {
    id: string;
    title: string;
    media: string;
    isVideo?: boolean;
    description: string;
    category: string[];
}

export async function fetchFeeds(): Promise<Feed[]> {
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

    return data.map((item: any) => ({
        id: item._id,
        title: item.title,
        description: item.description,
        category: item.category,
        media: item.media?.asset?.url,
        isVideo: item.media?.asset?.mimeType?.startsWith('video'),
    }));
}
