import React from 'react'
import {Home, Phone} from "lucide-react"
import Feed from "@/app/(media)/mediapage/feed";


// pages/index.js
export default function MediaPage() {
    return (
        <div className="flex min-h-screen h-screen w-screen overflow-hidden absolute z-50 bg-white">
            {/* Sidebar */}
            <nav className="flex flex-col items-center w-18 h-screen border-r overflow-auto pt-20  ">
                <a href="/ " className="p-4 hover:bg-gray-100  rounded-full" >
                    <Home />
                </a>
                <a href="/contact" aria-label="Your boards" className="p-4 hover:bg-gray-100">
                    <Phone/>
                </a>

            </nav>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="flex items-center px-4 h-20 shadow">
                    <button className="sr-only">Skip to content</button>
                    <div className="flex flex-1 items-center bg-gray-100 rounded-md h-12 px-4">
                        <svg className="w-4 h-4 text-gray-500" aria-label="Search icon" /* ... */ />
                        <input
                            type="text"
                            placeholder="Search"
                            className="flex-1 bg-transparent border-none focus:outline-none ml-2 text-gray-800"
                        />
                    </div>
                    <a href="/signin" className="ml-4">
                        <div className="w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">S</span>
                        </div>
                    </a>
                    <button className="ml-2 p-2 hover:bg-gray-100 rounded-full">
                        {/* Accounts dropdown SVG */}
                    </button>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-auto p-4 mt-4">
                    <h1 className="text-2xl font-semibold mb-4">Agila Festival Media Page</h1>
                    <div role="status" aria-live="polite" className="mb-4">See More Media from Agila Festival</div>
                    <Feed />
                </main>

                {/* Footer could go here if needed */}
            </div>
        </div>
    );
}

// Sample PinCard component
// export function PinCard({ src, alt, href }) {
//     return (
//         <a href={href} className="block mb-4 rounded-md overflow-hidden shadow-sm hover:shadow">
//             <Image src={src} alt={alt} className="w-full h-auto object-cover" />
//         </a>
//     );
// }
