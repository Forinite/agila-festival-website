// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import {getAdminByEmail} from "@/sanity/lib/getAdminByEmail";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const admin = await getAdminByEmail(credentials.email);

                if (!admin || !admin.hashedPassword) return null;

                const isValid = await bcrypt.compare(credentials.password, admin.hashedPassword);

                if (!isValid) return null;

                return {
                    id: admin._id,
                    name: admin.name,
                    email: admin.email,
                };
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin", // your custom sign-in page
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
