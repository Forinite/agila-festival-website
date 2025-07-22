import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { email, password } = credentials || {};

                // Replace with actual logic (e.g., DB lookup or hardcoded admin check)
                if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
                    return { id: 'admin-id', name: 'Admin', email };
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: '/signin', // your custom page
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.user = user;
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
