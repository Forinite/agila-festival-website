'use client'
// components/contact/ContactInfo.tsx

import {contactItems} from "@/app/constants/contacts";
import {useContactInfo} from "@/app/hooks/useContactInfo";

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
            {lines && lines.map((line, index) => (
                <p key={index} className="text-gray-600">
                    {line}
                </p>
            ))}
        </div>
    </div>
);

import { MapPin, Phone, Mail } from 'lucide-react';

const ContactInfo = () => {
    const { contactInfo, contactSocials, loading, refetch } = useContactInfo();
    const contactItems = [
        {
            icon: <MapPin className="w-6 h-6 text-white" />,
            title: 'Location',
            lines: [contactInfo[0]?.location[0]? contactInfo[0]?.location[0] : ' ______________', contactInfo[0]?.location[1]? contactInfo[0]?.location[1] : ' ______________',]
        },
        {
            icon: <Phone className="w-6 h-6 text-white" />,
            title: 'Phone',
            lines: [contactInfo[0]?.phones[0]? contactInfo[0]?.phones[0] : ' ______________', contactInfo[0]?.phones[1]? contactInfo[0]?.phones[1] : ' ______________',]
        },
        {
            icon: <Mail className="w-6 h-6 text-white" />,
            title: 'Location',
            lines: [contactInfo[0]?.emails[0]? contactInfo[0]?.emails[0] : ' ______________', contactInfo[0]?.emails[1]? contactInfo[0]?.emails[1] : ' ______________',]
        },
    ]

    return (
        <div className="space-y-6">
            {contactItems.map((item, index) => (
                <ContactItem key={index} {...item} />
            ))}
        </div>
    );
};

export default ContactInfo;