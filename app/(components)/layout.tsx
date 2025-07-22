// app/layout.tsx
import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/app/(components)/navbar/navbar";

export const metadata: Metadata = {
    title: "Agila Festival Website",
    description: "Agila Festival Website",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (

            <html>
                <body>
                     <Navbar />
                    {children}
                </body>
            </html>

    );
}

