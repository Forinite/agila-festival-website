// lib/sanity/contactInfo.ts
import { sanityClient } from '@/sanity/lib/client';

export interface ContactInfo {
    _id: string;
    location: string[];
    emails: string[];
    phones: string[];
    instagram: string;
    twitter: string;
    facebook: string;
    youtube: string;
}

export async function getContactInfo(): Promise<ContactInfo | null> {
    const query = `*[_type == "contactInfo"][0]{
    _id,
    location,
    emails,
    phones,
    instagram,
    twitter,
    facebook,
    youtube
  }`;

    try {
        const data = await sanityClient.fetch<ContactInfo>(query);
        return data;
    } catch (err) {
        console.error('Failed to fetch contact info:', err);
        return null;
    }
}
