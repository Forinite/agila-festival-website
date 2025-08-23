// app/components/ui/feedCardWrapper.tsx
'use client';
import React, { useState } from 'react';
import FeedCard from '@/app/components/ui/feed';
import FeedModal from '@/app/components/ui/feedModal';
import { Feed } from '@/app/types/feed';

interface FeedCardWrapperProps {
    feed: Feed;
}

const FeedCardWrapper = ({ feed }: FeedCardWrapperProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div
                className="mb-4 break-inside-avoid group cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                <FeedCard feedInfo={feed} />
            </div>
            <FeedModal feed={isModalOpen ? feed : null} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default FeedCardWrapper;