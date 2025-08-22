'use client';
import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const  SetupPasswordForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/admin-account/set-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.error);

            setSuccess(true);
            setTimeout(() => router.push('/auth/signin'), 2000);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-center text-red-600 font-semibold">
                    Invalid or expired link. Please request a new admin invitation.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 max-w-md w-full">
                <h1 className="text-xl font-bold mb-4">Set Your Password</h1>

                <input
                    type="password"
                    placeholder="New password"
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    disabled={loading}
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                />

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {success && <p className="text-green-600 text-sm mb-4">Password set! Redirecting...</p>}

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Set Password'}
                </button>
            </form>
        </div>
    );
}


import  { Suspense } from 'react';

export default function SetupPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SetupPasswordForm />
        </Suspense>
    );
}
