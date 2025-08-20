'use client';
import React, { useState } from 'react';
import {toast} from "@/lib/toast";

const InviteAdminFormModal = ({ onClose, onSubmit }: { onClose: () => void, onSubmit: (admin: any) => void }) => {
    const [formData, setFormData] = useState({ name: '', email: '' , password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, email, password } = formData;

        if (!name || !email || !password) {
            setError('All fields are required');
            return;
        }

        setError(null);
        setLoading(true);

        try {

            // Add right after fetch
            console.log('[UI] Sending invite request...', formData);
            toast.info('[UI] Sending invite request...');

            const res = await fetch('/api/admin-account/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            console.log('[UI] Response status:', res.status);

            if (!res.ok) {
                const data = await res.json();
                console.error('[UI] Invite failed:', data);
                throw new Error(data?.error || 'Failed to invite admin');
            }


            const result = await res.json();
            onSubmit(result.data); // Send the new admin back to AdminSection
            onClose(); // Close only on success
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl"
            >
                <h2 className="text-lg font-bold mb-4 text-gray-800">Invite New Admin</h2>

                <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border border-gray-300 rounded"
                    required
                    disabled={loading}
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border border-gray-300 rounded"
                    required
                    disabled={loading}
                />
                <input
                    name="password"
                    type="text"
                    placeholder="Default Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border border-gray-300 rounded"
                    required
                    disabled={loading}
                />

                {error && (
                    <p className="text-sm text-red-600 mb-3">{error}</p>
                )}

                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={`px-4 py-2 rounded text-white ${
                            loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Invite'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InviteAdminFormModal;
