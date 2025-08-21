'use client';
import React, { useState} from 'react';
import { useSearchParams, useRouter } from 'next/navigation';


export default function SetupPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token || !password) return;

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
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
        }finally {
            setLoading(false);
        }
    };

    if (!token) {
        return <div className="text-center mt-10 text-red-500">Invalid or missing token</div>;
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
                />

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {success && <p className="text-green-600 text-sm mb-4">Password set! Redirecting...</p>}

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Set Password'}
                </button>
            </form>
        </div>
    );
}
