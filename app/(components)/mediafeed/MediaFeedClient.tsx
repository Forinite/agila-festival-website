'use client';

import FeedCard from "@/app/components/ui/feed";
import {useFeeds} from "@/app/hooks/useFeeds";

const ClientFeedGrid = () => {
    const { feeds, loading } = useFeeds();

    if (loading) {
        return <p className="text-center">Loading feeds...</p>;
    }

    return (
        <>
            <div className="masonry-grid columns-2 sm:columns-2 md:columns-3 lg:columns-5 gap-4 space-y-4">
                {feeds.map((item, index) => (
                    <div
                        key={`${item.title}-${index}`}
                        className={`masonry-item break-insie-avoid group cursor-pointer mb-4 ${
                            index > 9 ? 'hidden' : ''
                        }`}
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

export default ClientFeedGrid;
