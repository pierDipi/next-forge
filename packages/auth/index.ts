import NextAuth from "next-auth";
import {getSession} from "next-auth/react";

import {PrismaAdapter} from "@auth/prisma-adapter"

import {database} from "@repo/database";
import {OAuthConfig} from "next-auth/providers";
import Google from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
import {env} from '@repo/env';

export const providers: OAuthConfig<any>[] = [
    Google({
        clientId: env.AUTH_GOOGLE_CLIENT_ID,
        clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET
    }),
    FacebookProvider({
        clientId: env.AUTH_FACEBOOK_CLIENT_ID,
        clientSecret: env.AUTH_FACEBOOK_CLIENT_SECRET
    }),
    AppleProvider({
        clientId: env.AUTH_APPLE_CLIENT_ID,
        clientSecret: env.AUTH_APPLE_CLIENT_SECRET,
    })
].sort((p1, p2) => p1.name.localeCompare(p2.name));

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: providers,
    adapter: PrismaAdapter(database),
    useSecureCookies: true,
    pages: {
        signIn: '/sign-in',
    },
});

export async function currentUser() {
    const s = await currentUserSession()
    return s?.user
}

export async function currentUserSession() {
    return getSession()
}
