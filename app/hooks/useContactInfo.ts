'use client';

import { useEffect, useState } from 'react';
import { sanityClient } from '@/sanity/lib/client';

// Interface for raw Sanity contact info data
interface RawContactInfo {
    _id: string;
    location: string[];
    emails: string[];
    phones: string[];
}

// Interface for raw Sanity socials data
interface RawContactSocials {
    _id: string;
    instagram: string;
    twitter: string;
    facebook: string;
    youtube: string;
}

// Interface for transformed contact info data
export interface ContactInfo {
    _id: string;
    location: string[];
    emails: string[];
    phones: string[];
}

// Interface for transformed socials data
export interface ContactSocials {
    _id: string;
    instagram: string;
    twitter: string;
    facebook: string;
    youtube: string;
}

export const useContactInfo = () => {
    const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
    const [contactSocials, setContactSocials] = useState<ContactSocials[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchContactInfo = async () => {
        try {
            const query = `*[_type == "contactInfo"] | order(_createdAt desc){
        _id,
        location,
        emails,
        phones
      }`;

            const querySocials = `*[_type == "contactInfo"] | order(_createdAt desc){
        _id,
        instagram,
        twitter,
        facebook,
        youtube
      }`;

            const data: RawContactInfo[] = await sanityClient.fetch(query);
            const dataSocials: RawContactSocials[] = await sanityClient.fetch(querySocials);

            const formatted: ContactInfo[] = data.map((item: RawContactInfo) => ({
                _id: item._id,
                location: item.location,
                emails: item.emails,
                phones: item.phones,
            }));

            const formattedSocials: ContactSocials[] = dataSocials.map((item: RawContactSocials) => ({
                _id: item._id,
                instagram: item.instagram,
                twitter: item.twitter,
                facebook: item.facebook,
                youtube: item.youtube,
            }));

            setContactInfo(formatted);
            setContactSocials(formattedSocials);
        } catch (err) {
            console.error('Error fetching contact info:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContactInfo();
    }, []);

    return { contactInfo, contactSocials, loading, refetch: fetchContactInfo };
};
