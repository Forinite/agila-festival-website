import React from 'react';
import FeedCard from '@/app/components/ui/feed';
import {sanityClient} from "@/sanity/lib/client";

const FeedGrid = async () => {
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

    const feeds = data.map((item: any) => ({
        id: item._id,
        title: item.title,
        description: item.description,
        category: item.category,
        media: item.media?.asset?.url,
        isVideo: item.media?.asset?.mimeType?.startsWith('video'),
    }));

    return (
        <>
            <div className="masonry-grid columns-2 sm:columns-2 md:columns-3 lg:columns-5 gap-4 space-y-4">
                {feeds.slice(0, 10).map((item, index) => (
                    <div
                        key={`${item.title}-${index}`}
                        className="masonry-item break-inside-avoid group cursor-pointer mb-4"
                    >
                        <FeedCard feedInfo={item} />
                    </div>
                ))}
            </div>

            {feeds.length > 8 && (
                <div className="text-center mt-12">
                    <a
                        href="/mediapage"
                        className="bg-red-500 text-white px-8 py-3 rounded-full font-bold hover:bg-red-600 transition-colors cursor-pointer"
                    >
                        Load More Moments
                    </a>
                </div>
            )}
        </>
    );
};

export default FeedGrid;
