// app/(media)/mediapage/page.tsx
import React from 'react';
import { Home, Phone } from 'lucide-react';
import { fetchFeeds } from '@/app/libs/queries/fetchFeeds';
import FeedCardWrapper from '@/app/components/ui/feedCardWrapper';
import Link from 'next/link';
import { type NextPage } from 'next';
import Image from 'next/image';

interface MediaPageProps {
    searchParams: Promise<{ q?: string }> | undefined;
}

const MediaPage: NextPage<MediaPageProps> = async ({ searchParams }) => {
    const resolvedSearchParams = await searchParams;
    const query = resolvedSearchParams?.q || '';
    const feeds = await fetchFeeds(query);

    return (
        <div className="flex flex-col md:flex-row min-h-screen max-w-screen bg-white overflow-hidden absolute z-50">
            {/* Sidebar Navigation */}
            <nav className="flex md:flex-col items-center justify-between md:justify-start w-full md:w-20 h-16 md:h-screen border-b md:border-b-0 md:border-r p-2 md:pt-20 bg-white">
                <Link href="/" className="p-3 hover:bg-gray-100 rounded-full">
                    <Image width={40} height={40} src={'/favicon.ico'} alt={'logo'} />
                </Link>
                <Link href="/" className="p-3 hover:bg-gray-100 rounded-full">
                    <Home className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="p-3 hover:bg-gray-100 rounded-full">
                    <Phone className="w-5 h-5" />
                </Link>
            </nav>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header with Search */}
                <header className="flex items-center justify-between px-4 h-16 md:h-20 shadow bg-white">
                    <form
                        method="GET"
                        className="flex flex-1 items-center bg-gray-100 rounded-md h-10 md:h-12 px-3"
                    >
                        <input
                            type="text"
                            name="q"
                            placeholder="Search"
                            defaultValue={query}
                            className="flex-1 bg-transparent border-none focus:outline-none text-gray-800 placeholder:text-sm"
                        />
                        <button type="submit" className="ml-2">
                            <svg
                                className="w-5 h-5 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 10-10.61 0 7.5 7.5 0 0010.61 0z"
                                />
                            </svg>
                        </button>
                    </form>

                    <Link href="/signin" className="ml-4">
                        <div className="w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">S</span>
                        </div>
                    </Link>
                </header>

                {/* Main Feed Content */}
                <main className="flex-1 overflow-auto p-4">
                    <h1 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4">
                        Ech&apos;ija Festival Media Page
                    </h1>

                    <div className="mb-4 text-sm md:text-base">
                        Showing results for:{' '}
                        <strong className="text-gray-800">{query || 'All Media'}</strong>
                    </div>

                    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-5 gap-4">
                        {feeds.map((item, index) => (
                            <FeedCardWrapper key={item.id} feed={item} feeds={feeds} index={index} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MediaPage;