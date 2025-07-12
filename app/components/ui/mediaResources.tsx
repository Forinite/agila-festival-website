// components/contact/MediaResources.tsx
const MediaResources = () => {
    const resources = [
        { text: "📁 Download Media Kit", href: "#" },
        { text: "🎨 Official Logos & Branding", href: "#" },
        { text: "📺 Previous Media Coverage", href: "#" },
        { text: "📰 Press Inquiries", href: "#" }
    ];

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