// app/hooks/useAdminContacts.ts
import { useEffect, useState } from 'react';
import { sanityClient } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import { projectId, dataset } from '@/sanity/env';

interface AdminContact {
    _id: string;
    name: string;
    title: string;
    phone: string;
    email: string;
    imageUrl?: string;
}

const builder = imageUrlBuilder({ projectId, dataset });

function urlFor(source: any) {
    return builder.image(source).width(200).url();
}

export const useAdminContacts = () => {
    const [contacts, setContacts] = useState<AdminContact[]>([]);
    const [loading, setLoading] = useState(true);

        const fetchContacts = async () => {
            const data = await sanityClient.fetch(
                `*[_type == "adminContact"] | order(_createdAt desc){
            _id, name, title, phone, email, image
        }`
            );

            const withUrls = data.map((contact: any) => ({
                ...contact,
                imageUrl: contact.image ? urlFor(contact.image) : undefined,
            }));

            setContacts(withUrls);
            setLoading(false);
        };

        useEffect(() => {
            fetchContacts();
        }, []);



    return { contacts, loading, refetch: fetchContacts };
};
