import NextAuth from 'next-auth';

import {PrismaAdapter} from '@auth/prisma-adapter';

import {database} from '@repo/database';
import {env} from '@repo/env';
import type {OAuthConfig} from 'next-auth/providers';
import AppleProvider from 'next-auth/providers/apple';
import FacebookProvider from 'next-auth/providers/facebook';
import Google from 'next-auth/providers/google';

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

export const {handlers, signIn, signOut, auth} = NextAuth({
  debug: env.NODE_ENV == 'development',
  providers: providers,
  adapter: PrismaAdapter(database),
  useSecureCookies: env.NODE_ENV === 'production',
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  cookies: {
    pkceCodeVerifier: {
      name: "auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "strict",
        secure: env.NODE_ENV === "production",
        path: "/",
      },
    },
    sessionToken: {
      name: "auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "strict",
        secure: env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24,
      },
    },
  }
});

