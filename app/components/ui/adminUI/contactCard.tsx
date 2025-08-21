'use client';
import React from 'react';
import { Pencil, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

export interface ContactItem {
    icon: React.ReactNode;
    title: string;
    lines: string[];
}

interface SocialLink {
    href: string;
}

interface ContactCardProps {
    info: ContactItem[];
    social?: SocialLink[];
    onEdit?: () => void;
}

const ContactCard = ({ info = [], social = [], onEdit }: ContactCardProps) => {
    const getSocialIconAndColor = (href: string) => {
        if (href.includes('facebook')) {
            return { icon: <Facebook className="w-6 h-6 text-white" />, bgColor: 'bg-blue-600' };
        }
        if (href.includes('instagram')) {
            return { icon: <Instagram className="w-6 h-6 text-white" />, bgColor: 'bg-pink-600' };
        }
        if (href.includes('youtube')) {
            return { icon: <Youtube className="w-6 h-6 text-white" />, bgColor: 'bg-red-600' };
        }
        if (href.includes('twitter')) {
            return { icon: <Twitter className="w-6 h-6 text-white" />, bgColor: 'bg-blue-400' };
        }
        return { icon: null, bgColor: 'bg-gray-500' };
    };

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-xl w-full mx-auto text-gray-900 shadow-sm relative transition hover:shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                Contact Information
            </h2>

            <ul className="space-y-4 text-sm md:text-base">
                {info.map(({ icon, title, lines }, idx) => (
                    <li key={idx} className="flex items-start gap-4 border-b border-gray-100 pb-3">
                        <div className="shrink-0">{icon}</div>
                        <div>
                            <p className="font-semibold text-gray-700">{title}</p>
                            {lines.map((line, i) => (
                                <p key={i} className="text-gray-600">{line}</p>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>

            {social.length > 0 && (
                <div className="mt-6 flex gap-3 flex-col justify-center">
                    {social.map(({ href }, i) => {
                        const { icon, bgColor } = getSocialIconAndColor(href);
                        return (
                            <li key={href} className="flex items-center gap-4 border-b border-gray-100 pb-3">
                                <div className="shrink-0">
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-10 h-10 flex items-center justify-center rounded-full ${bgColor} hover:opacity-90 transition`}
                                    >
                                        {icon}
                                    </a>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-700">{href}</p>
                                </div>
                            </li>
                        );
                    })}
                </div>
            )}

            {onEdit && (
                <button
                    onClick={onEdit}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                    aria-label="Edit Contact"
                >
                    <Pencil size={20} className="text-gray-600" />
                </button>
            )}
        </div>
    );
};

export default ContactCard;