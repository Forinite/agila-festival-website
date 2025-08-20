'use client';

import { useEffect, useState } from 'react';
import { sanityClient } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { projectId, dataset } from '@/sanity/env';

// Interface for raw Sanity data
interface RawAdminContact {
    _id: string;
    name: string;
    title: string;
    phone: string;
    email: string;
    image?: SanityImageSource; // Image asset for Sanity image
}

// Interface for transformed contact data
export interface AdminContact {
    _id: string;
    name: string;
    title: string;
    phone: string;
    email: string;
    imageUrl?: string;
}

const builder = imageUrlBuilder({ projectId, dataset });

function urlFor(source: SanityImageSource) {
    return builder.image(source).width(200).url();
}

export const useAdminContacts = () => {
    const [contacts, setContacts] = useState<AdminContact[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchContacts = async () => {
        try {
            const data: RawAdminContact[] = await sanityClient.fetch(
                `*[_type == "adminContact"] | order(_createdAt desc){
          _id,
          name,
          title,
          phone,
          email,
          image
        }`
            );

            const withUrls: AdminContact[] = data.map((contact: RawAdminContact) => ({
                _id: contact._id,
                name: contact.name,
                title: contact.title,
                phone: contact.phone,
                email: contact.email,
                imageUrl: contact.image ? urlFor(contact.image) : undefined,
            }));

            setContacts(withUrls);
        } catch (err) {
            console.error('Error fetching admin contacts:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return { contacts, loading, refetch: fetchContacts };
};