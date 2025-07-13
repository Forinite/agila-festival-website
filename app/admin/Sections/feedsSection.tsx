// components/admin/FeedSection.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import {feedList} from "@/app/constants/feedInfo";

interface Feed {
    id: string;
    title: string;
    image: string;
    description: string;
}

export const FeedsSection = () => {
    const [feeds, setFeeds] = useState<Feed[]>([]);

    const handleAddFeed = () => {
        // This will later be hooked to Sanity or form logic
        const newFeed: Feed = {
            id: crypto.randomUUID(),
            title: 'New Feed',
            image: '/placeholder.jpg',
            description: 'Description goes here',
        };
        setFeeds([newFeed, ...feeds]);
    };

    const handleRemoveFeed = (id: string) => {
        setFeeds(feeds.filter(feed => feed.id !== id));
    };

    return (
        <section className="p-6 w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Media Feeds</h2>
                <button
                    onClick={handleAddFeed}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Add Feed
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {feedList.map(feed => (
                    <div key={feed.id} className="border rounded-lg p-4 bg-white shadow-md relative">
                        <Image
                            src={feed.image}
                            alt={feed.title}
                            width={300}
                            height={200}
                            className="rounded w-full h-[180px] object-cover mb-4"
                        />
                        <h3 className="text-lg font-semibold">{feed.title}</h3>
                        <p className="text-sm text-gray-600 mt-1 mb-2">{feed.description}</p>
                        <button
                            onClick={() => handleRemoveFeed(feed.id)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};


