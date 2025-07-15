import React, { useState } from 'react';

const ContactFormModal = ({ initialData, onClose, onSubmit }) => {
    const [formData, setFormData] = useState(initialData || {});

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const fields = ['email', 'phone', 'instagram', 'twitter', 'facebook'];

    return (
        <div className="fixed inset-0 z-50 bg-black/50 bg-opacity-50 flex justify-center items-center px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white text-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md"
            >
                <h3 className="text-2xl font-semibold mb-6 text-center">Edit Contact Info</h3>

                <div className="space-y-4">
                    {fields.map((field) => (
                        <div key={field} className="flex flex-col">
                            <label
                                htmlFor={field}
                                className="text-sm font-medium capitalize mb-1"
                            >
                                {field}
                            </label>
                            <input
                                id={field}
                                name={field}
                                type="text"
                                placeholder={`Enter ${field}`}
                                value={formData[field] || ''}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactFormModal;

