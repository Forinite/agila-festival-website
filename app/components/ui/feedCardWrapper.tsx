// app/components/ui/feedCardWrapper.tsx
'use client';
import React, { useState } from 'react';
import FeedCard from '@/app/components/ui/feed';
import FeedModal from '@/app/components/ui/feedModal';
import { Feed } from '@/app/types/feed';

interface FeedCardWrapperProps {
    feed: Feed;
    feeds: Feed[]; // List of all feeds for navigation
    index: number; // Current feed index
}

const FeedCardWrapper = ({ feed, feeds, index }: FeedCardWrapperProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(index);

    // Navigate to previous feed
    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // Navigate to next feed
    const handleNext = () => {
        if (currentIndex < feeds.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <>
            <div
                className="mb-4 break-inside-avoid group cursor-pointer"
                onClick={() => {
                    setCurrentIndex(index); // Reset to initial index when opening
                    setIsModalOpen(true);
                }}
            >
                <FeedCard feedInfo={feed} tapPlayLock={true} />
            </div>
            <FeedModal
                feed={isModalOpen ? feeds[currentIndex] : null}
                onClose={() => setIsModalOpen(false)}
                onPrevious={currentIndex > 0 ? handlePrevious : undefined}
                onNext={currentIndex < feeds.length - 1 ? handleNext : undefined}
            />
        </>
    );
};

export default FeedCardWrapper;
