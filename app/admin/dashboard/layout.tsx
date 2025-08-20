//app/admin/dashboard/layout.tsx
import React from 'react';
import AuthSessionProvider from "@/app/sessionProvider";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthSessionProvider>
            {/*<ToastProvider >*/}
                {children}
            {/*</ToastProvider>*/}
        </AuthSessionProvider>
    );
}

