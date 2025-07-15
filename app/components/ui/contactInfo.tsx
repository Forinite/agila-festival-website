// components/contact/ContactInfo.tsx

import {contactItems} from "@/app/constants/contacts";

interface ContactItemProps {
    icon: React.ReactNode;
    title: string;
    lines: string[];
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, title, lines }) => (
    <div className="flex items-start space-x-4">
        <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
            {lines.map((line, index) => (
                <p key={index} className="text-gray-600">
                    {line}
                </p>
            ))}
        </div>
    </div>
);

const ContactInfo = () => {

    return (
        <div className="space-y-6">
            {contactItems.map((item, index) => (
                <ContactItem key={index} {...item} />
            ))}
        </div>
    );
};

export default ContactInfo;