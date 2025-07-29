import React from 'react';

const BRAND_INFO = {
    name: {
        first: 'AGILA',
        second: 'CARNIVAL'
    },
    description: 'Celebrating Idoma unity, culture, and heritage through the most colorful grassroots carnival in Nigeria.'
};

const QUICK_LINKS = [
    { label: 'About the Festival', href: '#about' },
    { label: 'Cultural Feed', href: '#media' },
    { label: 'Event Schedule', href: '#schedule' },
    // { label: 'Face of Idoma', href: '#pageant' },
];

const INVOLVEMENT_LINKS = [
    { label: 'Volunteer', href: '/contact?option=volunteer' },
    { label: 'Sponsorship', href: '/contact?option=partnership' },
    { label: 'Planning Committee', href: '/contact?option=planning' },
    { label: 'Press Media', href: '/contact?option=media' },
];

const CONTACT_INFO = {
    address: {
        city: 'Otukpo',
        state: 'Benue State',
        country: 'Nigeria'
    },
    email: 'info@agilacarnival.com',
    phone: '+234 803 XXX XXXX'
};

const LEGAL_LINKS = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Accessibility', href: '#' }
];

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <div className="flex items-center mb-4">
                            <span className="text-2xl font-black">{BRAND_INFO.name.first}</span>
                            <span className="text-red-500 ml-2 text-2xl font-black">{BRAND_INFO.name.second}</span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {BRAND_INFO.description}
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            {QUICK_LINKS.map(({label, href}) => (
                                <li key={label}>
                                    <a href={href} className="text-gray-300 hover:text-red-500 transition-colors text-left">
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Get Involved Section */}
                    <div>
                        <h4 className="font-bold mb-4">Get Involved</h4>
                        <ul className="space-y-2 text-sm">
                            {INVOLVEMENT_LINKS.map(({label, href}) => (
                                <li key={label}>
                                    <a href={href} className="text-gray-300 hover:text-red-500 transition-colors text-left">
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h4 className="font-bold mb-4">Contact</h4>
                        <div className="space-y-2 text-sm text-gray-300">
                            <p>
                                {CONTACT_INFO.address.city}, {CONTACT_INFO.address.state}<br />
                                {CONTACT_INFO.address.country}
                            </p>
                            <p>{CONTACT_INFO.email}</p>
                            <p>{CONTACT_INFO.phone}</p>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-300 text-sm">
                        © {currentYear} Agila Carnival Initiative. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        {LEGAL_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-gray-300 hover:text-red-500 transition-colors text-sm"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;