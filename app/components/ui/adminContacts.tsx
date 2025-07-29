// app/(public)/components/AdminContacts.tsx
import React from 'react';
import Image from 'next/image';
import {getAdminContacts} from "@/app/libs/queries/getAdminContacts";
import {getContactInfo} from "@/app/libs/queries/getContactInfo";

const AdminContacts = async () => {
    // const contacts = await getAdminContacts();

    let contacts = null;


    try {
        contacts = await getAdminContacts();
    } catch (error) {
        console.error('Failed to fetch contact info:', error);
    }
    return (
        <div className="w-full flex flex-wrap justify-center gap-8 px-4 mb-16">
            {contacts?.map((contact) => (
                <div
                    key={contact._id}
                    className="relative group w-full max-w-sm rounded-3xl bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:bg-white"
                >
                    {/* Decorative Ring */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-tr from-pink-500 to-indigo-500 w-28 h-28 rounded-full p-[3px] shadow-lg">
                        <div className="w-full h-full bg-white rounded-full overflow-hidden">
                            {contact.imageUrl && (
                                <Image
                                    src={contact.imageUrl}
                                    alt={contact.name}
                                    width={112}
                                    height={112}
                                    className="w-full h-full object-cover rounded-full"
                                />
                            )}
                        </div>
                    </div>

                    {/* Card Content */}
                    <div className="pt-20 pb-6 px-6 text-center">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                            {contact.name}
                        </h3>
                        <h4 className="text-sm text-gray-500 italic mb-4">{contact.title}</h4>

                        <div className="text-sm text-gray-600 space-y-1">
                            <p>
                                <span className="font-semibold text-gray-800">Phone:</span>{' '}
                                <a href={`tel:${contact.phone}`} className="text-red-500 hover:underline">
                                    {contact.phone}
                                </a>
                            </p>
                            <p>
                                <span className="font-semibold text-gray-800">Email:</span>{' '}
                                <a href={`mailto:${contact.email}`} className="text-red-500 hover:underline">
                                    {contact.email}
                                </a>
                            </p>
                        </div>

                        <div className="mt-6 flex justify-center gap-4">
                            <a
                                href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                                className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                Call
                            </a>
                            <a
                                href={`mailto:${contact.email}`}
                                className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                            >
                                Email
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminContacts;
