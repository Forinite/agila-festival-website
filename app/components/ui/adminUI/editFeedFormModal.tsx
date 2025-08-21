'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { toast } from '@/lib/toast';
import { Feed } from '@/app/types/feed';

interface EditFeedFormModalProps {
    initialData: Feed;
    onClose: () => void;
    onSubmit: (feed: Feed) => void;
    showModal: (value: boolean) => void;
    refetch: () => void;
}

const EditFeedFormModal = ({ initialData, onClose, onSubmit, showModal, refetch }: EditFeedFormModalProps) => {
    type FormDataKeys = 'title' | 'description' | 'category';
    const [formData, setFormData] = useState<{
        [key: string]: string | string[] | null;
        title: string;
        description: string;
        category: string[];
    }>({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || [],
    });

    const [newFile, setNewFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialData.media || null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        return () => {
            if (previewUrl && newFile) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl, newFile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name as FormDataKeys]: value }));
    };

    const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const extractHashtags = (text: string): string[] => {
        return text
            .split(/\s+/)
            .filter((word) => word.startsWith('#') && word.length > 1);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const form = new FormData();
            const category = extractHashtags(formData.description);
            form.append('id', initialData.id);
            form.append('title', formData.title);
            form.append('description', formData.description);
            form.append('category', JSON.stringify(category || []));
            form.append('isVideo', JSON.stringify(!!(newFile && newFile.type.startsWith('video/')) || initialData.isVideo || false));

            if (!newFile && initialData.mediaAssetId) {
                form.append('existingAssetId', initialData.mediaAssetId);
            }

            if (newFile) {
                form.append('file', newFile);
            }

            const res = await fetch('/api/create-feed/update', {
                method: 'POST',
                body: form,
            });

            const json: { success: boolean; updated?: Feed; error?: string } = await res.json();

            if (!res.ok) {
                throw new Error(json.error || 'Failed to update feed');
            }

            if (json.updated) {
                onSubmit(json.updated);
                showModal(false);
                toast.success('Feed updated successfully');
                refetch();
            }
        } catch (err) {
            console.error('[Edit Feed Error]', err);
            toast.error('Error updating feed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl p-6 w-full max-w-lg text-gray-800 shadow-xl"
            >
                <h3 className="text-xl font-bold mb-6 text-center">Edit Feed</h3>

                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Title"
                    className="w-full mb-4 border px-3 py-2 rounded-md"
                />

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Description"
                    className="w-full mb-4 border px-3 py-2 rounded-md"
                />

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Replace Media (optional)</label>
                    <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleMediaChange}
                        className="w-full"
                    />
                </div>

                {previewUrl && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Preview</label>
                        {newFile?.type.startsWith('image/') || (!newFile && !initialData.isVideo) ? (
                            <Image
                                src={previewUrl}
                                alt="Preview"
                                width={300}
                                height={200}
                                className="w-full h-48 object-cover rounded"
                            />
                        ) : (
                            <video
                                src={previewUrl}
                                controls
                                className="w-full h-48 object-cover rounded"
                            />
                        )}
                    </div>
                )}

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditFeedFormModal;