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
    clientId: env.AUTH_GOOGLE_CLIENT_ID,
    clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET,
  }),
  FacebookProvider({
    clientId: env.AUTH_FACEBOOK_CLIENT_ID,
    clientSecret: env.AUTH_FACEBOOK_CLIENT_SECRET,
  }),
  AppleProvider({
    clientId: env.AUTH_APPLE_CLIENT_ID,
    clientSecret: env.AUTH_APPLE_CLIENT_SECRET,
  }),
].sort((p1, p2) => p1.name.localeCompare(p2.name));

export const {handlers, signIn, signOut, auth} = NextAuth({
  providers: providers,
  adapter: PrismaAdapter(database),
  useSecureCookies: true,
  pages: {
    signIn: '/sign-in',
  },
});

