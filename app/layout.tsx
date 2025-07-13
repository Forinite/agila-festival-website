import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/(components)/navbar/navbar";

export const metadata: Metadata = {
    title: "Festival Website",
    description: "Festival Website",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`antialiased `}
        >
        <Navbar />

        {children}
        </body>
        </html>
    );
}
