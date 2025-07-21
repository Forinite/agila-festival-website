'use client';

import React, { useState } from 'react';
import {createFeedItem, uploadImageToSanity} from "@/sanity/lib/sanityClient";

const categories = ['Dance', 'Pageant', 'Masquerade', 'Parade', 'March'];

const AddFeedFormModal = ({ onClose, onSubmit, refetch }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: [],
        image: null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, image: file }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;
        if (!formData.title || !formData.description || !formData.image) return;
        setIsSubmitting(true)

        const formPayload = new FormData();
        formPayload.append('title', formData.title);
        formPayload.append('description', formData.description);
        formPayload.append('category', JSON.stringify(formData.category));
        formPayload.append('image', formData.image);

        try {
            const res = await fetch('/api/create-feed', {
                method: 'POST',
                body: formPayload,
            });

            const result = await res.json();

            if (result.success) {
                console.log('✅ Feed added:', result.feed);
                onSubmit(result.feed); // optional: update local state
                onClose();
            } else {
                console.error('❌ Error:', result.error);
            }
            refetch()
        } catch (err) {
            console.error('❌ Network error:', err);
        }
    };


    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl p-6 w-full max-w-lg text-gray-800 shadow-xl"
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

                {/* Image Upload */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
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
