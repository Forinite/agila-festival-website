// app/components/ui/adminUI/queenFormModal.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { toast } from '@/lib/toast';
import { Queen } from '@/app/types/queen';

interface QueenFormModalProps {
    mode: 'add' | 'edit';
    initialData?: Queen;
    onClose: () => void;
    onSubmit: (queen: Queen) => void;
    refetch: () => void;
}

const QueenFormModal = ({ mode, initialData, onClose, onSubmit, refetch }: QueenFormModalProps) => {
    const [name, setName] = useState(initialData?.name || '');
    const [year, setYear] = useState(initialData?.year?.toString() || '');
    const [role, setRole] = useState(initialData?.role || '');
    const [bio, setBio] = useState(initialData?.bio || '');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.imageUrl || null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        setRole('0')
        setBio('0')
        return () => {
            if (previewUrl && imageFile) URL.revokeObjectURL(previewUrl);
        };


    }, [previewUrl, imageFile]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            toast.info('Only image files are allowed.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;

        // Validate required fields
        if (!name || !year || !role) {
            toast.info('Name, year, and role are required.');
            return;
        }

        setLoading(true);
        try {
            const data = new FormData();
            data.append('name', name);
            data.append('year', year);
            data.append('role', role);
            data.append('bio', bio);
            if (imageFile) data.append('image', imageFile);
            if (mode === 'edit' && initialData?._id) data.append('_id', initialData._id); // Fix: Use '_id' instead of 'id'

            const endpoint = mode === 'edit' ? '/api/queen/update' : '/api/queen';
            const res = await fetch(endpoint, {
                method: 'POST',
                body: data,
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.error || 'API error');

            if (result.data) {
                onSubmit(result.data); // Use result.data instead of result.queen
                refetch();
                onClose();
                toast.success(mode === 'edit' ? 'Leader updated successfully' : 'Leader added successfully');
            } else {
                throw new Error(result.error || 'Failed to save leader');
            }
        } catch (err) {
            console.error('Error saving leader:', err);
            toast.error('There was an error processing the leader data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-hidden shadow-xl flex flex-col"
            >
                <h2 className="text-xl font-medium text-gray-900 mb-4">
                    {mode === 'edit' ? 'Edit Leader' : 'Add New Leader'}
                </h2>
                <div className="flex-1 overflow-y-auto space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                        <input
                            type="number"
                            placeholder="Year"
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                        />
                    </div>
                    {/*<div>*/}
                    {/*    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        placeholder="Role"*/}
                    {/*        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
                    {/*        value={role}*/}
                    {/*        onChange={(e) => setRole(e.target.value)}*/}
                    {/*        required*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <label className="block text-sm font-medium text-gray-700 mb-1">Biography</label>*/}
                    {/*    <textarea*/}
                    {/*        placeholder="Biography (Markdown supported)"*/}
                    {/*        className="w-full border border-gray-300 p-2 rounded-lg min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
                    {/*        value={bio}*/}
                    {/*        onChange={(e) => setBio(e.target.value)}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full text-gray-600"
                            ref={fileInputRef}
                        />
                        <p className="text-xs text-gray-500 italic mt-1">
                            {mode === 'edit' ? 'Leave empty to keep current image' : 'Upload an image'}
                        </p>
                        {previewUrl && (
                            <div className="mt-2 w-full h-32 rounded-lg overflow-hidden">
                                <Image
                                    src={previewUrl}
                                    alt="Preview"
                                    width={400}
                                    height={400}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default QueenFormModal;