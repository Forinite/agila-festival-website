'use client';
import React, { useEffect, useState, useRef } from 'react';
import { toast } from '@/lib/toast';
import { urlFor } from '@/app/utils/imageBuilder';

const AdminContactFormModal = ({ initialData, onClose, refetch }) => {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        title: initialData?.title || '',
        phone: initialData?.phone || '',
        email: initialData?.email || '',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (initialData?.image && !imageFile) {
            try {
                const existingUrl = urlFor(initialData.image);
                setPreviewUrl(existingUrl);
            } catch (err) {
                console.warn('Could not generate preview URL from Sanity image:', err);
            }
        }
    }, [initialData, imageFile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            setFileName(file.name);
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            toast.info('Only image files are allowed.');
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/') && fileInputRef.current) {
            setImageFile(file);
            setFileName(file.name);
            setPreviewUrl(URL.createObjectURL(file));
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInputRef.current.files = dataTransfer.files;
            handleImageChange({ target: fileInputRef.current } as React.ChangeEvent<HTMLInputElement>);
        } else {
            toast.info('Only image files are allowed.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append('_id', initialData._id);
            data.append('name', formData.name);
            data.append('title', formData.title);
            data.append('phone', formData.phone);
            data.append('email', formData.email);
            if (imageFile) data.append('image', imageFile);

            const res = await fetch('/api/admin-contact/update', {
                method: 'POST',
                body: data,
            });

            if (!res.ok) {
                toast.error('Failed to submit contact data');
                throw new Error('Failed to save admin contact!');
            }

            refetch();
            toast.success('Admin contact saved successfully.');
            toast.info('Please refresh the page to see the changes.');
            onClose();
        } catch (err) {
            console.error('Submit error:', err);
            toast.error('Failed to save admin contact!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md text-gray-800"
            >
                <h3 className="text-xl font-bold mb-6 text-center">
                    {initialData ? 'Edit Admin Contact' : 'Add Admin Contact'}
                </h3>

                {/* Input Fields */}
                {[
                    { name: 'name', label: 'Full Name' },
                    { name: 'title', label: 'Title' },
                    { name: 'phone', label: 'Phone Number' },
                    { name: 'email', label: 'Email Address' },
                ].map(({ name, label }) => (
                    <div key={name} className="mb-4">
                        <label
                            htmlFor={name}
                            className="block text-sm md:text-base font-semibold text-gray-700 mb-2 bg-gray-50/50 px-3 py-1 rounded-md"
                        >
                            {label}
                        </label>
                        <input
                            type="text"
                            id={name}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            placeholder={label}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 hover:border-indigo-600 transition-colors"
                        />
                    </div>
                ))}

                {/* Image Upload */}
                <div className="mb-4">
                    <label
                        htmlFor="image-upload"
                        className="block text-sm md:text-base font-semibold text-gray-700 mb-2 bg-gray-50/50 px-3 py-1 rounded-md"
                    >
                        Profile Image
                    </label>
                    <div
                        className={`relative border-2 border-dashed border-gray-300 hover:border-purple-600 rounded-lg p-4 text-center transition-all duration-300 ${
                            isDragging ? 'bg-gray-100 border-indigo-600' : 'bg-white hover:bg-gray-50'
                        } shadow-sm hover:shadow-md focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-opacity-50`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            id="image-upload"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer "
                            aria-describedby="image-upload-desc"
                        />
                        <div className="flex flex-col items-center gap-2">
                            <svg
                                className="w-6 h-6 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7 16V8m0 0l-4 4m4-4l4 4m6-8h-6m-3 12v-6m-3 3h6"
                                />
                            </svg>
                            <p className="text-sm md:text-base text-gray-600">
                                {fileName || (initialData?.image && !imageFile)
                                    ? fileName || 'Current image'
                                    : 'Drag and drop an image or click to select'}
                            </p>
                            <p id="image-upload-desc" className="text-xs text-gray-500 italic">
                                {initialData?.image && !imageFile
                                    ? 'Leave empty to keep current image'
                                    : 'Upload an image (JPG, PNG)'}
                            </p>
                        </div>
                    </div>
                    {previewUrl && (
                        <div className="mt-3 w-full h-40 rounded-lg overflow-hidden shadow-sm">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminContactFormModal;
