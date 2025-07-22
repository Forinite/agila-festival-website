
'use client';


import React, { useState } from 'react';
import { Film, Users, Mail, Settings, Book } from 'lucide-react';
import { FeedsSection } from '@/app/admin/Sections/feedsSection';
import { QueenSection } from '@/app/admin/Sections/queenSection';
import { ContactSection } from '@/app/admin/Sections/contactSection';
import { AdminSection } from '@/app/admin/Sections/adminSection';
import ScheduleSection from "@/app/admin/Sections/scheduleSection";

const navItems = [
    { label: 'Feeds', icon: <Film size={18} />, section: 'feeds' },
    { label: 'Queen Info', icon: <Users size={18} />, section: 'queen' },
    { label: 'Contact Info', icon: <Mail size={18} />, section: 'contact' },
    { label: 'Admin Management', icon: <Settings size={18} />, section: 'admins' },
    { label: 'Event Schedule', icon: <Book size={18} />, section: 'schedule' },
];

export default function AdminLayout() {
    const [activeSection, setActiveSection] = useState('feeds');

    return (
        <div className="flex flex-col md:flex-row h-screen max-w-screen w-full bg-gray-100 text-gray-800 relative z-50">
            {/* Sidebar for Desktop */}
            <aside className="hidden md:block w-[240px] bg-white border-r px-4 py-6 space-y-4">
                <div className="text-2xl font-bold mb-6">Echija Admin</div>
                <nav className="space-y-2 w-full">
                    {navItems.map(({ label, icon, section }) => (
                        <button
                            key={label}
                            onClick={() => setActiveSection(section)}
                            className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-left cursor-pointer ${
                                activeSection === section
                                    ? 'bg-indigo-100 text-indigo-600 font-semibold'
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            {icon}
                            <span>{label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Mobile Bottom Nav */}
            <nav className="flex md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow px-2 py-2 justify-around">
                {navItems.map(({ icon, section }, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveSection(section)}
                        className={`flex flex-col items-center justify-center px-3 py-1 text-sm cursor-pointer ${
                            activeSection === section ? 'text-indigo-600 font-medium' : 'text-gray-500'
                        }`}
                    >
                        {icon}
                        <span className="text-[11px]">{section.split(' ')[0]}</span>
                    </button>
                ))}
            </nav>

            {/* Main Area */}
            <div className="flex-1 flex flex-col w-full overflow-hidden pt-0 md:pt-0 pb-16 md:pb-0">
                {/* Top Header */}
                <header className="h-16 bg-white border-b px-6 flex items-center justify-between sticky top-0 z-30">
                    <h2 className="text-lg font-semibold capitalize">{activeSection.replace('-', ' ')}</h2>
                    <div className="text-sm text-gray-500">Admin Panel</div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-6 md:pb-6">
                    {activeSection === 'feeds' && <FeedsSection />}
                    {activeSection === 'queen' && <QueenSection />}
                    {activeSection === 'contact' && <ContactSection />}
                    {activeSection === 'admins' && <AdminSection />}
                    {activeSection === 'schedule' && <ScheduleSection />}
                </main>
            </div>
        </div>
    );
}

