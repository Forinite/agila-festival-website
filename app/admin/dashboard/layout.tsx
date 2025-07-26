//app/admin/dashboard/layout.tsx
import React from 'react';
import AuthSessionProvider from "@/app/sessionProvider";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthSessionProvider>
            {children}
        </AuthSessionProvider>
    );
}

