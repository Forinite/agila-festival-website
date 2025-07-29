'use client';
import React from 'react';
import Image from 'next/image';
import { Pencil, Trash2 } from 'lucide-react';
import { useAdminContacts } from '@/app/hooks/useAdminContacts';

const AdminContactList = ({ onEdit, onDelete }) => {
    const { contacts, loading, refetch } = useAdminContacts();
    if (loading) return <p className="text-white">Loading contact info...</p>;

    if (!contacts.length) {
        return <p className="text-gray-300 italic">No admin contacts available.</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {contacts.map((contact) => (
                <div
                    key={contact._id}
                    className="bg-white border border-gray-300 rounded-xl p-5 flex items-start gap-4 shadow-lg hover:shadow-xl transition-all relative"
                >
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 shadow shrink-0">
                        {contact.imageUrl ? (
                            <Image
                                src={contact.imageUrl}
                                alt={contact.name}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                                No Image
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                        <p className="text-sm text-gray-600 italic">{contact.title}</p>
                        <div className="text-sm text-gray-700 mt-2 leading-relaxed">
                            <p>
                                <span className="font-medium">📞</span>{' '}
                                <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                                    {contact.phone}
                                </a>
                            </p>
                            <p>
                                <span className="font-medium">✉️</span>{' '}
                                <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                                    {contact.email}
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="absolute top-3 right-3 flex space-x-2">
                        <button
                            onClick={() => onEdit(contact)}
                            className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-blue-700 hover:text-blue-900 transition"
                            aria-label="Edit"
                        >
                            <Pencil size={18} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminContactList;
