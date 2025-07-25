'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const categories = ['Dance', 'Pageant', 'Masquerade', 'Parade', 'March'];

const AddFeedFormModal = ({ onClose, onSubmit, refetch }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: [],
        media: null,
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Clean up preview URL when component unmounts or media changes
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (cat) => {
        setFormData((prev) => ({
            ...prev,
            category: prev.category.includes(cat)
                ? prev.category.filter((c) => c !== cat)
                : [...prev.category, cat],
        }));
    };

    const handleFile = (file: File) => {
        if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
            setFormData((prev) => ({ ...prev, media: file }));

            const url = URL.createObjectURL(file);
            setPreviewUrl((prevUrl) => {
                if (prevUrl) URL.revokeObjectURL(prevUrl);
                return url;
            });
        } else {
            alert('Only image or video files are allowed.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        const { title, description, category, media } = formData;

        if (!title || !description || !media) {
            alert('All fields are required.');
            return;
        }

        setIsSubmitting(true);

        const formPayload = new FormData();
        formPayload.append('title', title);
        formPayload.append('description', description);
        formPayload.append('category', JSON.stringify(category));
        formPayload.append('media', media);

        try {
            const res = await fetch('/api/create-feed', {
                method: 'POST',
                body: formPayload,
            });

            const result = await res.json();

            if (result.success) {
                console.log('✅ Feed added:', result.feed);
                onSubmit?.(result.feed);
                refetch?.();
                onClose();
            } else {
                console.error('❌ Error:', result.error);
                alert(result.error || 'An error occurred.');
            }
        } catch (err) {
            console.error('❌ Network error:', err);
            alert('Something went wrong.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center px-4 pt-12 h-screen overflow-y-scroll">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl p-6 w-full h-fit max-w-lg text-gray-800 shadow-xl"
            >
                <h3 className="text-xl font-bold mb-6 text-center">Add New Feed</h3>

                {/* Title */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                {/* Categories */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Categories</label>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                type="button"
                                key={cat}
                                className={`px-3 py-1 rounded-full border text-sm ${
                                    formData.category.includes(cat)
                                        ? 'bg-indigo-600 text-white border-indigo-600'
                                        : 'bg-white text-gray-700 border-gray-300'
                                }`}
                                onClick={() => handleCategoryChange(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Media Upload */}
                <div
                    className={`mb-6 p-4 border-2 border-dashed rounded-md transition-all text-center cursor-pointer ${
                        formData.media ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.add('border-indigo-500', 'bg-indigo-50');
                    }}
                    onDragLeave={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove('border-indigo-500', 'bg-indigo-50');
                    }}
                    onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        handleFile(file);
                        e.currentTarget.classList.remove('border-indigo-500', 'bg-indigo-50');
                    }}
                >
                    <label className="block text-sm font-medium mb-2">
                        Upload Image or Video
                    </label>

                    <input
                        type="file"
                        accept="image/*,video/*"
                        ref={fileInputRef}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            handleFile(file);
                        }}
                        hidden
                    />

                    <div className="mt-4 text-sm text-gray-600">
                        {formData.media && previewUrl ? (
                            <>
                                {formData.media.type.startsWith('image/') ? (
                                    <div className="mt-2 flex justify-center">
                                        <Image
                                            src={previewUrl}
                                            alt="Preview"
                                            width={240}
                                            height={240}
                                            className="rounded-md object-contain max-h-60"
                                        />
                                    </div>
                                ) : (
                                    <div className="mt-2 flex justify-center">
                                        <video
                                            controls
                                            src={previewUrl}
                                            className="rounded-md max-h-60"
                                            width="100%"
                                        />
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={() => {
                                        setFormData((prev) => ({ ...prev, media: null }));
                                        if (previewUrl) {
                                            URL.revokeObjectURL(previewUrl);
                                            setPreviewUrl(null);
                                        }
                                    }}
                                    className="mt-3 text-sm text-red-600 hover:underline"
                                >
                                    Remove File
                                </button>
                            </>
                        ) : (
                            <p>Click or drag & drop media file here</p>
                        )}
                    </div>
                </div>

                {/* Buttons */}
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
                        {isSubmitting ? 'Uploading...' : 'Add Feed'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddFeedFormModal;