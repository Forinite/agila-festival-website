'use client';

import React from 'react';
import Link from 'next/link';

const SignInPage = () => {
    return (
        <div className="relative w-full h-screen bg-black flex items-center justify-center px-4">

            <div className="w-full max-w-sm bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl text-white">
                <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

                <form className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition duration-200"
                    >
                        Sign In
                    </button>
                </form>

            </div>
        </div>
    );
};

export default SignInPage;
