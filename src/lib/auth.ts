import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import { prisma } from "./prisma";
import authConfig from "./auth-config"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { LoginFormSchema } from "@/components/schema/LoginSchema";
import { UserRole } from "@prisma/client";



export type ExtendedUSer = DefaultSession["user"] & {
    roles: UserRole[];
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUSer
    }
}

declare module "next-auth" {
    interface JWT {
        roles: UserRole[];
    }
}



export const { auth, handlers, signIn, signOut } = NextAuth({
    ...authConfig,
    callbacks: {
        ...authConfig.callbacks,
        // This runs after authentication succeeds, for ALL providers:
        //  it can block the user even if the provider is valid
        // Authorization
        async signIn({ user }) {
            const getUser = await prisma.user.findUnique({
                where: { id: user.id }
            })
            if (!getUser) {
                return false;
            }
            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
                const getUser = await prisma.user.findUnique({
                    where: { id: token.sub }
                })
                if (getUser) {
                    token.roles = getUser?.roles;
                    session.user.roles = getUser?.roles;
                }
            }
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;
            const getUser = await prisma.user.findUnique({
                where: { id: token.sub }
            })
            if (!getUser) return token;
            token.roles = getUser?.roles;
            return token;
        }
    },
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    session: { strategy: "jwt" },
    providers: [
        // When some one login with email and password
        // it doesn't generate any token or session
        // check the credentials are valid or not
        // Authentication
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            async authorize(credentials) {
                const validateFields = LoginFormSchema.safeParse(credentials);
                if (!validateFields.success) {
                    throw new Error(validateFields.error.message);
                }
                const { email, password } = validateFields.data;
                const user = await prisma.user.findUnique({
                    where: { email }
                })
                if (!user || !user.hashedPassword) return null;
                const matchPassword = await bcrypt.compare(password, user.hashedPassword);
                if (!matchPassword) return null;
                return user;
            }
        })
    ]
});