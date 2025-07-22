import type { Metadata } from "next";
import "../globals.css";

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
        < >

        {children}

        </>
    );
}
