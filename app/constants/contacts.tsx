
import { MapPin, Phone, Mail } from 'lucide-react';

// //contact.tsx
// export const contactInfo = {
//     ...contactItems,
//     ...socialLinks
// }

export const contactItems = [
    {
        icon: <MapPin className="w-6 h-6 text-white" />,
        title: "Location",
        lines: ["Otukpo Local Government Area", "Benue State, Nigeria"]
    },
    {
        icon: <Phone className="w-6 h-6 text-white" />,
        title: "Phone",
        lines: ["+234 803 XXX XXXX", "+234 806 XXX XXXX"]
    },
    {
        icon: <Mail className="w-6 h-6 text-white" />,
        title: "Email",
        lines: ["info@agilacarnival.com", "media@agilacarnival.com"]
    }
];

// Social Links
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

export const socialLinks = [
    {
        href: "facebook@agila",
        icon: <Facebook className="w-6 h-6 text-white" />,
        bgColor: "bg-blue-600"
    },
    {
        href: "instagram@agila",
        icon: <Instagram className="w-6 h-6 text-white" />,
        bgColor: "bg-pink-600"
    },
    {
        href: "youtube@agila",
        icon: <Youtube className="w-6 h-6 text-white" />,
        bgColor: "bg-red-600"
    },
    {
        href: "twitter@agila",
        icon: <Twitter className="w-6 h-6 text-white" />,
        bgColor: "bg-blue-400"
    }
];

// Media Resources
export const resources = [
    { text: "📁 Download Media Kit", href: "#" },
    { text: "🎨 Official Logos & Branding", href: "#" },
    { text: "📺 Previous Media Coverage", href: "#" },
    { text: "📰 Press Inquiries", href: "#" }
];
