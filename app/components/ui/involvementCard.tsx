import { LucideIcon } from 'lucide-react';
import Link from "next/link";

interface InvolvementCardProps {
    title: string;
    value: string;
    description: string;
    icon: LucideIcon;
    bulletPoints: string[];
    buttonText: string;
    onButtonClick?: () => void;
}

const InvolvementCard: React.FC<InvolvementCardProps> = ({
                                                             title,
                                                             value,
                                                             description,
                                                             icon: Icon,
                                                             bulletPoints,
                                                             buttonText,
                                                             onButtonClick
                                                         }) => (
    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
        <div className="text-center">
            <div className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="lg:text-2xl text-lg font-bold text-gray-900 mb-4">{title}</h3>
            <p className="lg:text-base text-xs text-gray-600 mb-6">{description}</p>
            <ul className="text-sm text-gray-600 space-y-2 mb-6 text-left">
                {bulletPoints.map((point, index) => (
                    <li key={index}>• {point}</li>
                ))}
            </ul>
            <Link href={`/contact?option=${value}`}
                onClick={onButtonClick}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 bg-red-500 text-white px-6 py-3 rounded-full font-bold hover:bg-red-600 w-full cursor-pointer"
            >
                {buttonText}
            </Link>
        </div>
    </div>
);

export default InvolvementCard;