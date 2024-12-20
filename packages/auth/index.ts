import NextAuth, {type NextAuthResult} from 'next-auth';

import {PrismaAdapter} from '@auth/prisma-adapter';

import {Prisma} from '@prisma/client';

import {database} from '@repo/database';
import {env} from '@repo/env';
import type {OAuthConfig} from 'next-auth/providers';
import AppleProvider from 'next-auth/providers/apple';
import FacebookProvider from 'next-auth/providers/facebook';
import Google from 'next-auth/providers/google';
import {locales} from "@repo/i18n/translations";
import {log} from "@repo/observability/log";

export const providers: OAuthConfig<any>[] = [
    Google({
        clientId: env.AUTH_GOOGLE_ID,
        clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
    FacebookProvider({
        clientId: env.AUTH_FACEBOOK_ID,
        clientSecret: env.AUTH_FACEBOOK_SECRET,
    }),
    AppleProvider({
        clientId: env.AUTH_APPLE_ID,
        clientSecret: env.AUTH_APPLE_SECRET,
    }),
].sort((p1, p2) => p1.name.localeCompare(p2.name));

const result = NextAuth({
    debug: env.NODE_ENV === 'development',
    providers: providers,
    adapter: PrismaAdapter(database),
    useSecureCookies: env.NODE_ENV !== 'development',
    basePath: `/${locales.defaultLocale.id}/api/auth`,
    pages: {
        signIn: '/sign-in',
    },
    session: {
        strategy: 'jwt',
    },
    cookies: {
        pkceCodeVerifier: {
            name: "authjs.pkce.code_verifier",
            options: {
                httpOnly: true,
                sameSite: "strict",
                secure: env.NODE_ENV !== "development",
                path: "/",
            },
        },
        sessionToken: {
            name: "authjs.session-token",
            options: {
                httpOnly: true,
                sameSite: "strict",
                secure: env.NODE_ENV !== "development",
                path: "/",
                maxAge: 60 * 60 * 24,
            },
        },
    }
});

export const handlers: NextAuthResult['handlers'] = result.handlers;
export const auth: NextAuthResult['auth'] = result.auth;
export const signIn: NextAuthResult['signIn'] = result.signIn;
export const signOut: NextAuthResult['signOut'] = result.signOut;

export interface UserTransactions {
    transactionSelect?: Prisma.TransactionSelect<any> | null
}

export const userTransactions = async (args?: UserTransactions) => {
    const user = await auth()
    if (!user || !user.user || !user.user.email) {
        return null
    }

    log.debug(`Getting user transactions for user ${user.user}`)

    return database.user.findUnique({
        where: {
            email: user.user.email
        },
        include: {
            transactions: {
                select: args?.transactionSelect,
                include: {
                    price: {
                        include: {
                            product: true
                        }
                    }
                },
            }
        }
    })
}

