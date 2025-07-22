"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Gallery', href: '/mediapage' },
    { label: 'About Festival', href: '#about' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Contact Us', href: '#contact' },
];

const Navbar: React.FC =  () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-white font-bold text-xl">
                            Echija Festival
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link
                                key={"signIn"}
                                href={'/signin'}
                                className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white p-2"
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-black/90">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-colors duration-300"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            key={"signIn"}
                            href={'/signin'}
                            className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-colors duration-300"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;