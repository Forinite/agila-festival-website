'use client';
import React, { useState } from 'react';

const AdminContactFormModal = ({ initialData, onClose, onSubmit }) => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md text-gray-800"
            >
                <h3 className="text-xl font-bold mb-6 text-center">Edit Admin Contact</h3>

                {/* Input Fields */}
                {[
                    { name: 'name', label: 'Full Name' },
                    { name: 'title', label: 'Title' },
                    { name: 'phone', label: 'Phone Number' },
                    { name: 'email', label: 'Email Address' },
                ].map(({ name, label }) => (
                    <div key={name} className="mb-4">
                        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                            {label}
                        </label>
                        <input
                            type="text"
                            id={name}
                            name={name}
                            value={formData[name] || ''}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                        />
                    </div>
                ))}

                {/* Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminContactFormModal;
