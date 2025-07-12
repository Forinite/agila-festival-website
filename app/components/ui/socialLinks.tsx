// components/contact/SocialLinks.tsx
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

interface SocialLinkProps {
    href: string;
    icon: React.ReactNode;
    bgColor: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, bgColor }) => (
    <a
        href={href}
        className={`${bgColor} w-12 h-12 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity`}
    >
        {icon}
    </a>
);

const SocialLinks = () => {
    const socialLinks = [
        {
            href: "#",
            icon: <Facebook className="w-6 h-6 text-white" />,
            bgColor: "bg-blue-600"
        },
        {
            href: "#",
            icon: <Instagram className="w-6 h-6 text-white" />,
            bgColor: "bg-pink-600"
        },
        {
            href: "#",
            icon: <Youtube className="w-6 h-6 text-white" />,
            bgColor: "bg-red-600"
        },
        {
            href: "#",
            icon: <Twitter className="w-6 h-6 text-white" />,
            bgColor: "bg-blue-400"
        }
    ];

    return (
        <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Follow Us</h3>
            <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                    <SocialLink key={index} {...link} />
                ))}
            </div>
            <p className="text-gray-600 mt-4 text-sm">
                Stay connected for the latest updates, behind-the-scenes content, and carnival preparations throughout the year.
            </p>
        </div>
    );
};

export default SocialLinks;