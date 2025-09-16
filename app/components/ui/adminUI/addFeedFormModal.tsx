// app/components/ui/adminUI/addFeedFormModal.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { toast } from '@/lib/toast';
import { Feed } from '@/app/types/feed';
import { sanityWriteClient } from '@/sanity/lib/sanityClient';
import {upload} from "@vercel/blob/client";
import {type PutBlobResult} from "@vercel/blob";

interface AddFeedFormModalProps {
    onClose: () => void;
    onSubmit: (feed: Feed) => void;
    refetch: () => void;
}

const AddFeedFormModal = ({ onClose, onSubmit, refetch }: AddFeedFormModalProps) => {
    type FormDataKeys = 'title' | 'description';
    const [formData, setFormData] = useState<{
        [key: string]: string | string[] | File | null;
        title: string;
        description: string;
        category: string[];
        media: File | null;
    }>({
        title: '',
        description: '',
        category: [],
        media: null,
    });
    const [useBlob, setUseBlob] = useState(false); // Toggle for Blob vs Sanity
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [progress, setProgress] = useState<number | null>(0);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);

    const  addRandomSuffix = (filename) => {
        const randomString = Math.random().toString(36).substring(2, 8); // 6-char alphanumeric
        const [name, ext] = filename.split(/\.([^.]+)$/); // Split at last dot
        return `${name}_${randomString}.${ext}`;
    }
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name as FormDataKeys]: value }));
    };

    const handleFile = (file: File | undefined) => {
        if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
            setFormData((prev) => ({ ...prev, media: file }));
            const url = URL.createObjectURL(file);
            setPreviewUrl((prevUrl) => {
                if (prevUrl) URL.revokeObjectURL(prevUrl);
                return url;
            });
        } else {
            toast.info('Only image or video files are allowed.');
        }
    };

    const extractHashtags = (text: string): string[] => {
        return text
            .split(/\s+/)
            .filter((word) => word.startsWith('#') && word.length > 1);
    };

    // Sanity upload (unchanged)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;

        const { title, description, media } = formData;
        const category = extractHashtags(description);

        if (!title || !description || !media) {
            toast.info('All fields are required.');
            return;
        }

        setIsSubmitting(true);

        try {
            const body = new FormData();
            body.append('title', title);
            body.append('description', description);
            body.append('category', JSON.stringify(category));
            body.append('media', media);

            const res = await fetch('/api/create-feed', {
                method: 'POST',
                body,
            });

            const result: { success: boolean; feed?: Feed; error?: string } = await res.json();

            if (result.success && result.feed) {
                onSubmit(result.feed);
                refetch();
                onClose();
            } else {
                throw new Error(result.error || 'An error occurred.');
            }
        } catch (err: any) {
            console.error('❌ Upload error:', err);
            toast.error(err.message || 'Something went wrong.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Vercel Blob upload
    const handleBlobSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;

        setProgress(0)

        const { title, description, media } = formData;
        const category = extractHashtags(description);

        if (!title || !description || !media) {
            toast.info('All fields are required.');
            return;
        }

        setIsSubmitting(true);
        // const file = fileInputRef.current?.files[0];
        // console.log(fileInputRef.current.files, media.name)
        try {
            // Get signed URL from Vercel Blob
            await upload(`/festival/media/${addRandomSuffix(media.name)}`,media, {
                access: "public",
                handleUploadUrl: '/api/upload-signed',
                onUploadProgress: (progressEvent) => {
                    setProgress(progressEvent.percentage);
                }
            })

            setBlob(blob)
            /*
            // const signedRes = await fetch('/api/upload-signed', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ pathname: `feeds/${media.name}` }),
            // });
            //
            // if (!signedRes.ok) {
            //     const errorText = await signedRes.text();
            //     throw new Error(`Failed to get signed URL: ${errorText}`);
            // }
            //
            // const { url } = await signedRes.json();
            //
            // // Upload to Vercel Blob
            // const uploadRes = await fetch(url, {
            //     method: 'PUT',
            //     body: media,
            //     headers: { 'Content-Type': media.type },
            // });
            //
            // if (!uploadRes.ok) {
            //     throw new Error(`Upload to Blob failed: ${uploadRes.status}`);
            // }
            //
            // // Create feed item in Sanity with blobUrl
            // const newFeed = await sanityWriteClient.create({
            //     _type: 'feedItem',
            //     title,
            //     description,
            //     category,
            //     blobUrl: url,
            // });
            //
            // toast.success('Feed added!');
            // onSubmit({
            //     id: newFeed._id,
            //     title,
            //     description,
            //     category,
            //     media: url,
            //     isVideo: media.type.startsWith('video/'),
            // });
            */
            // refetch();
            // onClose();
        } catch (error) {
            console.error('❌ Blob upload error:', error);
            toast.error('Blob upload failed: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center px-4 pt-12 h-screen overflow-y-scroll">
            <form
                onSubmit={useBlob ? handleBlobSubmit : handleSubmit}
                className="bg-white rounded-xl p-6 w-full h-fit max-w-lg text-gray-800 shadow-xl"
            >
                <h3 className="text-xl font-bold mb-6 text-center">Add New Feed_Dev_</h3>

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

                {/* Toggle */}
                <div className="mb-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={useBlob}
                            onChange={(e) => setUseBlob(e.target.checked)}
                            className="form-checkbox h-4 w-4 text-indigo-600"
                        />
                        <span className="text-sm font-medium">Upload to Vercel Blob (for large files)</span>
                    </label>
                </div>

                {/* File Upload */}
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
                    <label className="block text-sm font-medium mb-2">Upload Image or Video</label>
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
                                        <video controls src={previewUrl} className="rounded-md max-h-60" width="100%" />
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
                    <p>{progress}%</p>
                    {blob && <div className={"text-xs"}>{blob.url}</div>}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    {!useBlob && <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Uploading...' : 'Add Feed'}
                    </button>}
                    {useBlob &&
                        <button
                        type="submit"
                        className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded cursor-not-allowed"
                        disabled={isSubmitting || false}
                    >
                         Under Development
                    </button>}
                </div>
            </form>
        </div>
    );
};

export default AddFeedFormModal;