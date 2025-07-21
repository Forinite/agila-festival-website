import { useEffect, useState } from 'react';
import {sanityClient} from "@/sanity/lib/client";

export interface ContactInfo {
    _id: string;
    location: string[];
    email: string[];
    phones: string[];
}

export interface ContactSocials {
    _id: string;
    instagram: string;
    twitter: string;
    facebook: string;
    youtube: string;
}

export const useContactInfo = () => {
    const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
    const [contactSocials, setContactSocials] = useState<ContactInfo[]>([]);

    const [loading, setLoading] = useState(true);

    const fetchContactInfo = async () => {
        try {
            const query = `*[_type == "contactInfo"] | order(_createdAt desc){
        _id,
        location,
        emails,
        phones,
    
        
      }`;

     const querySocials = `*[_type == "contactInfo"] | order(_createdAt desc){
        _id,
        instagram,
        twitter,
        facebook,
        youtube,
        
      }`;
            const data = await sanityClient.fetch(query);
            const dataSocials = await sanityClient.fetch(querySocials);

            const formatted = data.map((item: any) => ({
                ...item,
            }));
             const formattedSocials = dataSocials.map((item: any) => ({
                 ...item,
             }));

            setContactInfo(formatted);
            setContactSocials(formattedSocials);

            setLoading(false);
        } catch (err) {
            console.error('Error fetching feeds:', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContactInfo();
    }, []);

    return { contactInfo, contactSocials,  loading, refetch: fetchContactInfo };
};


