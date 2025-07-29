// components/contact/SocialLinks.tsx
// import { getContactInfo } from '@/lib/sanity/contactInfo';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import {getContactInfo} from "@/app/libs/queries/getContactInfo";

interface SocialLinkProps {
    href: string;
    icon: React.ReactNode;
    bgColor: string;
}

const SocialLink = ({ href, icon, bgColor }: SocialLinkProps) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${bgColor} w-12 h-12 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity`}
    >
        {icon}
    </a>
);

// ✅ SERVER COMPONENT
const SocialLinks = async () => {

    // const contactInfo = await getContactInfo();
    let contactInfo = null;


    try {
        contactInfo = await getContactInfo();
    } catch (error) {
        console.error('Failed to fetch contact info:', error);
    }

    if (!contactInfo) {
        return <p className="text-sm text-gray-500">No social links found.</p>;
    }

    const links = [
        {
            href: contactInfo.facebook,
            icon: <Facebook className="w-6 h-6 text-white" />,
            bgColor: 'bg-blue-600',
        },
        {
            href: contactInfo.instagram,
            icon: <Instagram className="w-6 h-6 text-white" />,
            bgColor: 'bg-pink-600',
        },
        {
            href: contactInfo.youtube,
            icon: <Youtube className="w-6 h-6 text-white" />,
            bgColor: 'bg-red-600',
        },
        {
            href: contactInfo.twitter,
            icon: <Twitter className="w-6 h-6 text-white" />,
            bgColor: 'bg-blue-400',
        },
    ];

    return (
        <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Follow Us</h3>
            <div className="flex space-x-4">
                {links.map(
                    (link, index) =>
                        link.href && (
                            <SocialLink key={index} {...link} />
                        )
                )}
            </div>
            <p className="text-gray-600 mt-4 text-sm">
                Stay connected for the latest updates, behind-the-scenes content, and carnival preparations throughout the year.
            </p>
        </div>
    );
};

export default SocialLinks;
