'use client';

import React, { useState } from 'react';
import {urlFor} from "@/app/utils/imageBuilder";
// import { urlFor } from '@/utils/imageBuilder';

const categories = ['Dance', 'Pageant', 'Masquerade', 'Parade', 'March'];

const EditFeedFormModal = ({ onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || [],
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

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setIsSubmitting(true);
    //
    //     try {
    //         const updatedData = {
    //             _id: initialData.id,
    //             title: formData.title,
    //             description: formData.description,
    //             category: formData.category,
    //         };
    //
    //         const updateRes = await fetch('/api/create-feed/update', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(updatedData),
    //         });
    //
    //         if (!updateRes.ok) throw new Error('Failed to update feed');
    //
    //         const json = await updateRes.json();
    //         onSubmit(json.updated);
    //     } catch (err) {
    //         console.error('Update error:', err);
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const updatedData = {
            id: initialData.id,
            title: formData.title,
            description: formData.description,
            category: formData.category,
        };

        try {
            const res = await fetch('/api/create-feed/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            if (!res.ok) {
                throw new Error('Failed to update');
            }

            const json = await res.json();
            onSubmit(json.updated);
        } catch (err) {
            console.error(err);
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

                {/* Current Image (View Only) */}
                {initialData.image && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Current Image</label>
                        <img
                            src={urlFor(initialData.image).width(600).url()}
                            alt="Current Feed Image"
                            className="w-full h-48 object-cover rounded-md border"
                        />
                    </div>
                )}

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
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditFeedFormModal;
