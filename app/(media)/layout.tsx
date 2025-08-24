import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Ech'ija Festival Website",
    description: "Media page of Ech'ija Cultural Festival Website",
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
