// app/components/sections/Feed.tsx
import React from 'react';
import FeedCard from '@/app/components/ui/feed';
import {fetchFeeds} from "@/app/libs/queries/fetchFeeds";

const Feed = async () => {
    const feeds = await fetchFeeds();

    return (
        <div className="columns-2 md:columns-3 lg:columns-5 gap-4">
            {feeds.map((item) => (
                <div key={item.id} className="masonry-item break-inside-avoid group cursor-pointer mb-4">
                    <FeedCard feedInfo={item} />
                </div>
            ))}
        </div>
    );
};

export default Feed;
