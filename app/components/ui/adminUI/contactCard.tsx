import { Pencil } from 'lucide-react';
import {Icon} from "@sanity/icons";

interface ContactItem {
    icon: React.ReactNode;
    title: string;
    lines: string[];
}

interface SocialLink {
    href: string;
    icon: React.ReactNode;
    bgColor: string;
}

interface ContactCardProps {
    info: ContactItem[];
    social?: SocialLink[];
    onEdit?: () => void;
}

const ContactCard = ({ info =[], social = [], onEdit }: ContactCardProps) => {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-xl w-full mx-auto text-gray-900 shadow-sm relative transition hover:shadow-md">
            {/* Header */}
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                Contact Information
            </h2>

            {/* Contact Info */}
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

            {/* Social Links */}
            { social.length > 0 && (
                <div className="mt-6 flex gap-3 flex-col justify-center">

                    {social.map(({ href, icon, bgColor }, i) => (

                        <li key={href} className="flex items-center gap-4 border-b border-gray-100 pb-3">
                        <div className="shrink-0">
                            <a
                                key={i}
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
                    ))}
                </div>
            )}

            {/* Edit Button */}
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
