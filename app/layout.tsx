import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/(components)/navbar/navbar";
import {ToastProvider} from "@/app/toastProvider";
import React from "react";

export const metadata: Metadata = {
    title: "Ech'ija Cultural Festival Website",
    description: "Ech'ija Cultural Festival Festival Website",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body
                className={`antialiased `}
            >
            <Navbar />
            <ToastProvider >

                {children}
            </ToastProvider>
            </body>
        </html>

    );
}
