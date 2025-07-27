'use client';
import React, { useState, useEffect } from 'react';
import { urlFor } from '@/app/utils/imageBuilder';

const categories = ['Dance', 'Pageant', 'Masquerade', 'Parade', 'March'];

const EditFeedFormModal = ({ onClose, onSubmit, initialData, showModal, refetch }) => {
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || [],
        mediaType: initialData.mediaType || 'image',
        mediaAssetId: initialData.mediaAssetId || null,
    });

    const [newFile, setNewFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Setup existing media preview
    useEffect(() => {
        if (!newFile && initialData.media) {
            try {
                const url = urlFor(initialData.media).url();
                setPreviewUrl(url);
            } catch (err) {
                console.warn('Could not generate preview from existing media:', err);
            }
        }
    }, [initialData, newFile]);

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

    const handleMediaChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewFile(file);
            setFormData((prev) => ({
                ...prev,
                mediaType: file.type.startsWith('video/') ? 'video' : 'image',
            }));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const form = new FormData();

            form.append('id', initialData.id);
            form.append('title', formData.title);
            form.append('description', formData.description);
            form.append('category', JSON.stringify(formData.category || []));
            form.append('mediaType', formData.mediaType || 'image');

            // If there's an existing asset and no new file, keep the asset ID
            if (!newFile && (initialData.mediaAssetId || initialData.image?._id || initialData.video?._id)) {
                form.append('existingAssetId', initialData.mediaAssetId || initialData.image?._id || initialData.video?._id);
            }

            // If new file is selected, append it
            if (newFile) {
                form.append('file', newFile);
            }

            const res = await fetch('/api/create-feed/update', {
                method: 'POST',
                body: form,
            });

            const json = await res.json();

            if (!res.ok) {
                throw new Error(json.error || 'Failed to update feed');
            }

            onSubmit(json.updated);
            showModal(false);
            refetch();
        } catch (err) {
            console.error('[Edit Feed Error]', err);
            alert('Error updating feed');
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
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Title"
                    className="w-full mb-4 border px-3 py-2 rounded-md"
                />

                {/* Description */}
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Description"
                    className="w-full mb-4 border px-3 py-2 rounded-md"
                />

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
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Replace Media (optional)</label>
                    <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleMediaChange}
                        className="w-full"
                    />
                </div>

                {/* Preview */}
                {previewUrl && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Preview</label>
                        {formData.mediaType === 'image' ? (
                            <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover rounded" />
                        ) : (
                            <video
                                src={previewUrl}
                                controls
                                className="w-full h-48 object-cover rounded"
                            />
                        )}
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
