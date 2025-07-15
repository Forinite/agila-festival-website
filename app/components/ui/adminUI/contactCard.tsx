import { Pencil } from 'lucide-react';

const ContactCard = ({ info, onEdit }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-xl w-full mx-auto text-gray-900 shadow-sm relative transition hover:shadow-md">
            {/* Header */}
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                Contact Information
            </h2>

            {/* Contact Info */}
            <ul className="space-y-4 text-sm md:text-base">
                {[
                    { label: 'Email', value: info.email },
                    { label: 'Phone', value: info.phone },
                    { label: 'Instagram', value: info.instagram },
                    { label: 'Twitter/X', value: info.twitter },
                    { label: 'Facebook', value: info.facebook },
                ].map(({ label, value }, idx) => (
                    <li
                        key={idx}
                        className={`flex justify-between items-start gap-4 ${
                            idx < 4 ? 'border-b border-gray-100 pb-3' : ''
                        }`}
                    >
                        <span className="font-medium text-gray-600">{label}:</span>
                        <span className="text-right break-words max-w-[60%] text-gray-700">
                            {value}
                        </span>
                    </li>
                ))}
            </ul>

            {/* Edit Button */}
            <button
                onClick={onEdit}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                aria-label="Edit Contact"
            >
                <Pencil size={20} className="text-gray-600" />
            </button>
        </div>
    );
};

export default ContactCard;
