// lib/sanity/queries.ts
import { sanityClient } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import { projectId, dataset } from '@/sanity/env';
import type {SanityImageSource} from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder({ projectId, dataset });

export interface AdminContact {
    _id: string;
    name: string;
    title: string;
    phone: string;
    email: string;
    image?: string;
    imageUrl?: string;
}

function urlFor(source: SanityImageSource) {
    return builder.image(source).width(200).url();
}

export const getAdminContacts = async () => {
    const query = `*[_type == "adminContact"] | order(_createdAt desc){
    _id, name, title, phone, email, image
  }`;

    const data = await sanityClient.fetch(query);

    return data.map((contact: AdminContact) : AdminContact  => ({
        _id: contact._id,
        name: contact.name,
        title: contact.title,
        phone: contact.phone,
        email: contact.email,
        imageUrl: contact.image ? urlFor(contact.image) : undefined,
    }));
};
