'use client';
import React, { useState } from 'react';
import FeedCard from '@/app/components/ui/feed';
import FeedModal from '@/app/components/ui/feedModal';
import { Feed } from '@/app/types/feed';

interface FeedListProps {
    feeds: Feed[];
    className?: string; // Allow custom classes for styling
}

const FeedList = ({ feeds, className }: FeedListProps) => {
    const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null);

    return (
        <>
            <div className={className}>
                {feeds.map((item) => (
                    <div
                        key={item.id}
                        className="mb-4 break-inside-avoid group cursor-pointer"
                        onClick={() => setSelectedFeed(item)}
                    >
                        <FeedCard feedInfo={item} />
                    </div>
                ))}
            </div>
            <FeedModal feed={selectedFeed} onClose={() => setSelectedFeed(null)} />
        </>
    );
};

export default FeedList;