'use client';
import React, {useEffect, useState} from 'react';
import {urlFor} from "@/app/utils/imageBuilder";
import {Loading} from "@/app/components/ui/loading";
import {toast} from "@/lib/toast";

const AdminContactFormModal = ({ initialData, onClose, refetch }) => {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        title: initialData?.title || '',
        phone: initialData?.phone || '',
        email: initialData?.email || '',
    });


    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const [loading, setLoading] = useState(false);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file)); // Local preview
        }
        console.log('Edit')

    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append('_id', initialData._id); // always present
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
                toast.error('Failed to submit contact data')
                throw new Error('Failed to save admin contact!');
            }

            refetch()
            toast.success('Admin contact saved successfully.');
            toast.info('Please refresh the page to see the changes.')
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
                        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                        </label>
                        <input
                            type="text"
                            id={name}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                        />
                    </div>
                ))}

                {/* Image Upload */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full"
                    />
                    {previewUrl && (
                        <div className="mt-3 w-full h-40 rounded overflow-hidden">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="object-cover w-full h-full rounded"
                            />
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        type="button"
                        onClick={() => {
                            onClose()
                        }}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded"
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
