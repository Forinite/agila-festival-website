// components/contact/MediaResources.tsx
import {resources} from "@/app/constants/contacts";

const MediaResources = () => {

    return (
        <div className="bg-gray-50 rounded-2xl p-6">
            <h4 className="font-bold text-gray-900 mb-4">Media & Press Resources</h4>
            <div className="space-y-3 text-sm">
                {resources.map((resource, index) => (
                    <a
                        key={index}
                        href={resource.href}
                        className="block text-red-500 hover:text-red-600 transition-colors"
                    >
                        {resource.text}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default MediaResources;