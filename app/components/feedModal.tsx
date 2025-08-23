// app/components/ui/feedModal.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import VideoPlayer from '@/app/components/ui/videoPlayer';
import { Feed } from '@/app/types/feed';

interface FeedModalProps {
    feed: Feed | null;
    onClose: () => void;
}

const FeedModal = ({ feed, onClose }: FeedModalProps) => {
    if (!feed) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{feed.title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Close modal"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {feed.isVideo ? (
                    <VideoPlayer
                        src={feed.media}
                        className="w-full h-64 rounded-lg"
                    />
                ) : (
                    <Image
                        src={feed.media}
                        alt={feed.title}
                        width={400}
                        height={400}
                        className="w-full h-auto rounded-lg object-cover"
                    />
                )}

                <div className="mt-4">
                    <p className="text-gray-800">{feed.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {feed.category.map((category) => (
                            <span
                                key={`${feed.title}-${category}`}
                                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-red-500 text-white"
                            >
                {category}
              </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedModal;