// components/contact/ContactInfo.tsx
import { MapPin, Phone, Mail } from 'lucide-react';
import React from 'react';
import {getContactInfo} from "@/app/libs/queries/getContactInfo";

interface ContactItemProps {
    icon: React.ReactNode;
    title: string;
    lines: string[];
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, title, lines }) => (
    <div className="flex items-start space-x-4">
        <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
            {icon || 'IC'}
        </div>
        <div>
            <h4 className="font-bold text-gray-900 mb-1">{title || 'Title'}</h4>
            {lines?.map((line, index) => (
                <p key={index} className="text-gray-600">
                    {line || '______________'}
                </p>
            ))}
        </div>
    </div>
);

// ✅ SERVER COMPONENT
const ContactInfo = async () => {
    // const data = await getContactInfo();

    let data = null;


    try {
        data = await getContactInfo();
    } catch (error) {
        console.error('Failed to fetch contact info:', error);
    }

    if (!data) {
        return <p className="text-gray-500 text-sm">Contact info not available.</p>;
    }

    const contactItems = [
        {
            icon: <MapPin className="w-6 h-6 text-white" />,
            title: 'Location',
            lines: [data.location?.[0] || '______________', data.location?.[1] || '______________'],
        },
        {
            icon: <Phone className="w-6 h-6 text-white" />,
            title: 'Phone',
            lines: [data.phones?.[0] || '______________', data.phones?.[1] || '______________'],
        },
        {
            icon: <Mail className="w-6 h-6 text-white" />,
            title: 'Email',
            lines: [data.emails?.[0] || '______________', data.emails?.[1] || '______________'],
        },
    ];

    return (
        <div className="space-y-6">
            {contactItems.map((item, index) => (
                <ContactItem key={index} {...item} />
            ))}
        </div>
    );
};

export default ContactInfo;
