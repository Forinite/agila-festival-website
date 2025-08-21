// lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sanityWriteClient } from '@/sanity/lib/sanityClient';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                console.log('[Auth] Attempting login:', credentials);
                if (!credentials?.email || !credentials?.password) {
                    console.warn('[Auth] Missing credentials');
                    return null;
                }
                const user = await sanityWriteClient.fetch(
                    `*[_type == "adminAccount" && email == $email][0]`,
                    { email: credentials.email }
                );
                console.log('[Auth] Fetched user from Sanity:', user);
                if (!user) {
                    console.warn('[Auth] No admin found for email:', credentials.email);
                    return null;
                }
                const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);
                console.log('[Auth] Password match result:', isValid);
                if (!isValid) {
                    console.warn('[Auth] Invalid password for:', credentials.email);
                    return null;
                }
                console.log('[Auth] Login success for:', credentials.email);
                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/sign-in',
    },
    secret: process.env.NEXTAUTH_SECRET,
};