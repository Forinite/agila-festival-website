// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import {ToastProvider} from "@/app/toastProvider";
import Navbar from "@/app/(components)/navbar/navbar";

export const metadata: Metadata = {
    metadataBase: new URL("https://echijaculturalfestival.com"),
    title: {
        default: "Echija Cultural Festival",
        template: "%s | Echija Cultural Festival",
    },
    description:
        "Experience the Echija Cultural Festival — a vibrant celebration of Idoma heritage with traditional games, cuisine, parades, and grand cultural showcases in Otukpo.",
    keywords: [
        "Echija Festival",
        "Echija Cultural Festival",
        "Idoma culture",
        "Otukpo festival",
        "Benue carnival",
        "Nigerian cultural festival",
    ],
    authors: [{ name: "Echija Cultural Festival Organizers" }],
    openGraph: {
        type: "website",
        locale: "en_NG",
        url: "https://echijaculturalfestival.com",
        siteName: "Echija Cultural Festival",
        title: "Echija Cultural Festival",
        description:
            "Join us Dec 27-28 in Otukpo for cultural parades, traditional games, food, music, and a grand carnival procession.",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Echija Cultural Festival",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@echijafestival",
        title: "Echija Cultural Festival",
        description:
            "Join us Dec 27-28 in Otukpo for the Echija Cultural Festival — games, cuisine, parades & grand cultural showcases.",
        images: ["/og-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <head>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "Festival",
                            name: "Echija Cultural Festival",
                            url: "https://echijaculturalfestival.com",
                            image: "https://echijaculturalfestival.com/og-image.jpg",
                            description:
                                "A vibrant cultural festival celebrating Idoma heritage with parades, games, cuisine, and artistic showcases.",
                            startDate: "2025-12-27T18:00:00+01:00",
                            endDate: "2025-12-28T23:59:00+01:00",
                            location: {
                                "@type": "Place",
                                name: "Otukpo, Benue, Nigeria",
                                address: {
                                    "@type": "PostalAddress",
                                    addressLocality: "Otukpo",
                                    addressRegion: "Benue",
                                    addressCountry: "NG",
                                },
                            },
                            eventSchedule: [
                                {
                                    "@type": "Event",
                                    name: "The Old-School Picnic",
                                    startDate: "2025-12-27T18:00:00+01:00",
                                    description:
                                        "Traditional games, local cuisine, artisan stalls, and evening parade.",
                                },
                                {
                                    "@type": "Event",
                                    name: "The Grand Carnival Procession",
                                    startDate: "2025-12-28T16:00:00+01:00",
                                    description:
                                        "Costumed dance groups, masquerade parades, community showcases, and competitions.",
                                },
                            ],
                            organizer: {
                                "@type": "Organization",
                                name: "Echija Cultural Festival Organizers",
                                url: "https://echijaculturalfestival.com",
                            },
                        },
                    ]),
                }}
            />
        </head>
        <body className="antialiased">
        <ToastProvider>
            <Navbar />
            {children}
        </ToastProvider>
        </body>
        </html>
    );
}
