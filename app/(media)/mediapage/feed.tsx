// app/(media)/mediapage/feed.tsx
import React from 'react';
import FeedCardWrapper from '@/app/components/ui/feedCardWrapper';
import { fetchFeeds } from '@/app/libs/queries/fetchFeeds';

const Feed = async () => {
    const feeds = await fetchFeeds();

    return (
        <div className="columns-2 md:columns-3 lg:columns-5 gap-4">
            {feeds.map((item) => (
                <FeedCardWrapper key={item.id} feed={item} />
            ))}
        </div>
    );
};

export default Feed;