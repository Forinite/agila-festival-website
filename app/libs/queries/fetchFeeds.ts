import { sanityClient } from '@/sanity/lib/client';

export interface Feed {
    id: string;
    title: string;
    media: string;
    isVideo?: boolean;
    description: string;
    category: string[];
}


interface RawFeed {
    _id: string;
    title: string;
    description: string;
    category: string[];
    media?: {
        asset: {
            url: string;
            mimeType: string;
        };
    };
}

export async function fetchFeeds(searchQuery = ''): Promise<Feed[]> {
    const match = searchQuery.trim();

    const query = `
    *[_type == "feedItem" ${
        match
            ? `&& (
            title match "${match}*" ||
            description match "*${match}*" ||
            category[] match "${match}*"
          )`
            : ''
    }] | order(_createdAt desc){
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
    }
  `;

    const data: RawFeed[] = await sanityClient.fetch(query);

    return data.map((item: RawFeed) => ({
        id: item._id,
        title: item.title,
        description: item.description,
        category: item.category,
        media: item.media?.asset?.url || '',
        isVideo: item.media?.asset?.mimeType?.startsWith('video'),
    }));
}