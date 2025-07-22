'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (res?.ok) {
            router.push('/admin/dashboard'); // 🔁 this is the redirect path after login
        } else {
            setError('Invalid email or password');
        }

        setIsLoading(false);

    };

    return (
        <div className="relative w-full h-screen bg-black flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl text-white">
                <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm mb-1">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition duration-200 cursor-pointer disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;
