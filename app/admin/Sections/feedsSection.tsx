// components/admin/FeedSection.tsx
'use client';

import {useEffect, useState} from 'react';
import Image from 'next/image';
import {Trash, Pencil} from "lucide-react"
import ConfirmModal from "@/app/components/ui/adminUI/modalConfirm";
import AddFeedFormModal from "@/app/components/ui/adminUI/addFeedFormModal";
import {useFeeds} from "@/app/hooks/useFeeds";
import {Loading} from "@/app/components/ui/loading";
import EditFeedFormModal from "@/app/components/ui/adminUI/editFeedFormModal";

interface Feed {
    id: string;
    title: string;
    image: string;
    description: string;
    category: string[];
}

export const FeedsSection = () => {
    const [activeFeeds, setActiveFeeds] = useState<Feed[]>([]);
    const [Feeds, setFeeds] = useState<Feed[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [feedToRemove, setFeedToRemove] = useState<Feed | null>(null);
    const [feedToEdit, setFeedToEdit] = useState<Feed | null>(null);

    const {feeds, loading} = useFeeds();

    useEffect(()=> {
        setFeeds(feeds)
    }, [feeds])



    if (loading) {
        return <Loading />;
    }

    const handleRemoveClick = (feed: Feed) => {
        setFeedToRemove(feed);
        setIsModalOpen(true);
    };

    const confirmRemove = async () => {
        const id = feedToRemove?._id;
        console.log(id, feedToRemove)
        try {
            const res = await fetch('/api/create-feed/deletion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            })

            if (!res.ok) throw new Error('Failed to delete')

            // Optimistically update local state/UI
            setFeeds((prev) => prev.filter((item) => item._id !== id))
        } catch (err) {
            console.error('Delete failed:', err)
            alert('Could not delete feed')
        }

        setIsModalOpen(false);
        setFeedToRemove(null);
    };

    const handleEditClick = (feed: Feed) => {
        setFeedToEdit(feed);
        setShowEditModal(true);
    };
    const handleEdit = () => {
        if (feedToRemove) {
            setActiveFeeds(prev => prev.filter(f => f.id !== feedToRemove.id));
        }
        setShowEditModal(false);
        setFeedToEdit(null);
    };

    const handleAddFeed = () => {
        setShowAddModal(true);
     };
;

    return (
        <section className="p-6 w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="md:text-xl text-xs font-semibold">Media Feeds</h2>
                <button
                    onClick={handleAddFeed}
                    className="text-xs md:text-base px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Add Feed

                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Feeds.map(feed => (
                    <div key={feed._id} className="border rounded-lg p-4 bg-white shadow-md relative">
                        <img
                            src={feed.image}
                            alt={feed.title}
                            width={300}
                            height={200}
                            className="rounded w-full h-[180px] object-cover mb-4"
                        />
                        <h3 className="text-lg font-semibold">{feed.title}</h3>
                        <p className="text-sm text-gray-600 mt-1 mb-2">{feed.description}</p>
                        <div className="text-sm text-blue-600">
                            { feed.category.map((item, index) =>(
                                <p key={index}>#{item}</p>
                            )) }
                        </div>
                        <button
                            onClick={() => handleEditClick(feed)}
                            className="absolute top-2 right-12 text-blue-500 hover:text-blue-700 hover:scale-110 transition-all duration-300 cursor-pointer"
                        >
                            <Pencil />

                        </button>
                        <button
                            onClick={() => handleRemoveClick(feed)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:scale-110 transition-all duration-300 cursor-pointer"
                        >
                           <Trash />

                        </button>
                    </div>
                ))}

            </div>

            <ConfirmModal
                title="Are you sure?"
                description="This feed will be permanently deleted."
                isOpen={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onConfirm={confirmRemove}
            />

            {showAddModal && (
                <AddFeedFormModal
                    onClose={() => setShowAddModal(false)}
                    onSubmit={(newFeed) => {
                        setActiveFeeds((prev) => [...prev, newFeed]);
                    }}
                />
            )}
            {showEditModal && (
                <EditFeedFormModal
                    onClose={() => setShowEditModal(false)}
                    onSubmit={(newFeed) => {
                        setActiveFeeds((prev) => [...prev, newFeed]);
                    }}
                    initialData={{
                        id: feedToEdit?.id,
                        title: feedToEdit?.title,
                        description: feedToEdit?.description,
                        category: feedToEdit?.category,
                        image: feedToEdit?.image, // for fallback
                    }}
                />
            )}

        </section>
    );
};


