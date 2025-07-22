// import AuthSessionProvider from '../(admin)/session-provider'; // adjust path if needed
import React from 'react';
import AuthSessionProvider from "@/app/sessionProvider";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthSessionProvider>
            {children}
        </AuthSessionProvider>
    );
}
