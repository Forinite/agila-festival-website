// app/layout.tsx
import type { Metadata } from "next";
import "../globals.css";
import {ToastProvider} from "@/app/toastProvider";
import React from "react";

export const metadata: Metadata = {
    title: "Ech'ija Festival Website",
    description: "Ech'ija Festival Website",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (

            <>
                <>
                     <ToastProvider >

                         {children}
                     </ToastProvider>
                </>
            </>

    );
}

