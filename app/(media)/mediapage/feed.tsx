'use client'

import React from 'react'
import FeedCard from "@/app/components/ui/feed";
import {useFeeds} from "@/app/hooks/useFeeds";

export const Feed = () => {
    const { feeds, loading } = useFeeds();

    if (loading) {
        return <p className="text-center">Loading feeds...</p>;
    }

    return (
        <div className="columns-2 md:columns-3 lg:columns-6 gap-4">
            {/* Repeat this PinCard component for each pin */}
            {feeds.map((item) => (
                <div key={`${item.title}`} className="masonry-item break-insie-avoid group cursor-pointer mb-4">
                    <FeedCard feedInfo={item} />
                </div>
            ))}
            {/* ...etc */}
        </div>
    )
}
