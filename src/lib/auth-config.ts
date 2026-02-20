// auth-config.ts
import type { DefaultSession, NextAuthConfig } from "next-auth"
import { UserRole } from "@prisma/client"

// Keep types here so they are available everywhere
declare module "next-auth" {
    interface Session {
        user: {
            roles: UserRole[];
        } & DefaultSession["user"]
    }
    interface JWT {
        roles: UserRole[];
    }
}

export default {
    providers: [], // Providers are added in auth.ts to keep Edge-incompatible code away
    callbacks: {
        async jwt({ token, user }) {
            // In middleware, 'user' is undefined, but the 'token' 
            // already contains what we injected during sign-in.
            return token;
        },
        async session({ session, token }) {
            if (token.roles && session.user) {
                session.user.roles = token.roles as UserRole[];
            }
            return session;
        },
    },
} satisfies NextAuthConfig