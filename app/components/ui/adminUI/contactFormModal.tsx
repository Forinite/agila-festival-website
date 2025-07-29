'use client'
import React, { useState } from 'react';
import {toast} from "@/lib/toast";
import {useAdminContacts} from "@/app/hooks/useAdminContacts";

const ContactFormModal = ({ initialData, onClose, onSubmit }) => {
    const [isSumbiting, setIsSumbiting] = useState(false);
    const { contacts, loading, refetch } = useAdminContacts();
    const [formState, setFormState] = useState(() => {
        return {
            location1: initialData?.info?.[0]?.lines?.[0] || '',
            location2: initialData?.info?.[0]?.lines?.[1] || '',
            email1: initialData?.info?.[1]?.lines?.[0] || '',
            email2: initialData?.info?.[1]?.lines?.[1] || '',
            phone1: initialData?.info?.[2]?.lines?.[0] || '',
            phone2: initialData?.info?.[2]?.lines?.[1] || '',
            instagram: initialData?.social?.find(s => s.href?.includes('instagram'))?.href || '',
            twitter: initialData?.social?.find(s => s.href?.includes('twitter'))?.href || '',
            facebook: initialData?.social?.find(s => s.href?.includes('facebook'))?.href || '',
            youtube: initialData?.social?.find(s => s.href?.includes('youtube'))?.href || '',

        };
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormState((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSumbiting(true);
        const updatedData = {
            id: initialData?.id, // You need to pass the `_id` of the document in `initialData`
            location: [formState.location1, formState.location2].filter(Boolean), // optional: derive from formState
            emails: [formState.email1, formState.email2].filter(Boolean),
            phones: [formState.phone1, formState.phone2].filter(Boolean),
            instagram: formState.instagram,
            twitter: formState.twitter,
            facebook: formState.facebook,
            youtube: formState.youtube,
        };

        try {
            const res = await fetch('/api/contact-info/update', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedData),
            });

            if (!res.ok) {
                toast.error('Failed to update contact info');
                throw new Error('Failed to update');
            }

            toast.success('Contact info updated successfully');


            const json = await res.json();
            onSubmit(json.updated);
            refetch()
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="fixed inset-0 z-50 bg-black/50 w-screen h-screen overflow-y-auto flex items-start justify-center px-4 py-8">
            <form
                onSubmit={handleSubmit}
                className="bg-white text-gray-800 rounded-xl shadow-lg p-5 sm:p-6 w-full max-w-md"
            >
                <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
                    Edit Contact Info
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                    {[
                        { label: 'Location 1', name: 'location1' },
                        { label: 'Location 2', name: 'location2' },
                        { label: 'Email 1', name: 'email1' },
                        { label: 'Email 2', name: 'email2' },
                        { label: 'Phone 1', name: 'phone1' },
                        { label: 'Phone 2', name: 'phone2' },
                        { label: 'Instagram', name: 'instagram' },
                        { label: 'Twitter', name: 'twitter' },
                        { label: 'Facebook', name: 'facebook' },
                        { label: 'Youtube', name: 'youtube' },
                    ].map(({ label, name }) => (
                        <div key={name} className="flex flex-col">
                            <label
                                htmlFor={name}
                                className="text-xs sm:text-sm font-medium mb-1"
                            >
                                {label}
                            </label>
                            <input
                                type="text"
                                name={name}
                                id={name}
                                value={formState[name] || ''}
                                onChange={handleChange}
                                placeholder={`Enter ${label}`}
                                className="px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm sm:text-base bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm sm:text-base bg-blue-600 text-white hover:bg-blue-700 rounded-md transition"
                        disabled={isSumbiting}
                    >
                        {isSumbiting ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );


}
export default ContactFormModal;
