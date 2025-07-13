'use client'
import React, { useState } from 'react'
import { Home, Film, Users, Mail, Settings } from 'lucide-react'
import {FeedsSection} from "@/app/admin/Sections/feedsSection";
import {QueenSection} from "@/app/admin/Sections/queenSection";
import {ContactSection} from "@/app/admin/Sections/contactSection";
import {AdminSection} from "@/app/admin/Sections/adminSection";

const navItems = [
    { label: 'Feeds', icon: <Film size={18} />, section: 'feeds' },
    { label: 'Queen Info', icon: <Users size={18} />, section: 'queen' },
    { label: 'Contact Info', icon: <Mail size={18} />, section: 'contact' },
    { label: 'Admin Management', icon: <Settings size={18} />, section: 'admins' },
]

export default function AdminLayout() {
    const [activeSection, setActiveSection] = useState('feeds')

    return (
        <div className="flex h-screen w-screen bg-gray-100 text-gray-800 absolute z-50">
            {/* Sidebar */}
            <aside className="w-[240px] bg-white border-r px-4 py-6 space-y-4">
                <div className="text-2xl font-bold mb-6">Agila Admin</div>
                <nav className="space-y-2">
                    {navItems.map(({ label, icon, section }) => (
                        <button
                            key={label}
                            className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-left ${
                                activeSection === section ? 'bg-indigo-100 text-indigo-600 font-semibold' : 'hover:bg-gray-100'
                            }`}
                            onClick={() => setActiveSection(section)}
                        >
                            {icon}
                            <span>{label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col w-full">
                {/* Top Header */}
                <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
                    <h2 className="text-lg font-semibold capitalize">{activeSection.replace('-', ' ')}</h2>
                    <div className="text-sm text-gray-500">Admin Panel</div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-6">
                    {activeSection === 'feeds' && <FeedsSection />}
                    {activeSection === 'queen' && <QueenSection />}
                    {activeSection === 'contact' && <ContactSection />}
                    {activeSection === 'admins' && <AdminSection />}
                </main>
            </div>
        </div>
    )
}

