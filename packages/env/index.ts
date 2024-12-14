import {createEnv} from '@t3-oss/env-nextjs';
import {z} from 'zod';

const server: Parameters<typeof createEnv>[0]['server'] = {
  NODE_ENV: z.enum(['development', 'production']).default('production'),

  RESEND_AUDIENCE_ID: z.string().min(1).optional(),
  RESEND_FROM: z.string().min(1).email().optional(),
  RESEND_TOKEN: z.string().min(1).startsWith('re_').optional(),
  DATABASE_URL: z.string().min(1).url(),
  STRIPE_SECRET_KEY: z.string().min(1).startsWith('sk_').optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).startsWith('whsec_').optional(),
  BETTERSTACK_API_KEY: z.string().min(1).optional(),
  BETTERSTACK_URL: z.string().min(1).url().optional(),
  ARCJET_KEY: z.string().min(1).startsWith('ajkey_').optional(),
  ANALYZE: z.string().optional(),

  // Added by Sentry Integration, Vercel Marketplace
  SENTRY_ORG: z.string().min(1).optional().optional(),
  SENTRY_PROJECT: z.string().min(1).optional().optional(),

  // Added by Vercel
  VERCEL: z.string().optional(),
  NEXT_RUNTIME: z.enum(['nodejs', 'edge']).default('nodejs').optional(),
  FLAGS_SECRET: z.string().min(1).optional(),

  // Auth
  AUTH_SECRET: z.string().min(1).base64(),
  AUTH_GOOGLE_ID: z.string().min(1),
  AUTH_GOOGLE_SECRET: z.string().min(1),
  AUTH_FACEBOOK_ID: z.string().min(1).optional(),
  AUTH_FACEBOOK_SECRET: z.string().min(1).optional(),
  AUTH_APPLE_ID: z.string().min(1).optional(),
  AUTH_APPLE_SECRET: z.string().min(1).optional(),
};

const client: Parameters<typeof createEnv>[0]['client'] = {
  NEXT_PUBLIC_APP_URL: z.string().min(1).url(),
  NEXT_PUBLIC_WEB_URL: z.string().min(1).url(),
  NEXT_PUBLIC_API_URL: z.string().min(1).url().optional(),
  NEXT_PUBLIC_DOCS_URL: z.string().min(1).url(),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().min(1).startsWith('G-').optional(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1).startsWith('phc_'),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().min(1).url(),

  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1).startsWith("pk_").optional(),

  // Added by Vercel
  NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: z.string().min(1).url().optional(),
};

export const env = createEnv({
  client,
  server,
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    RESEND_AUDIENCE_ID: process.env.RESEND_AUDIENCE_ID,
    RESEND_FROM: process.env.RESEND_FROM,
    DATABASE_URL: process.env.DATABASE_URL,
    RESEND_TOKEN: process.env.RESEND_TOKEN,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    BETTERSTACK_API_KEY: process.env.BETTERSTACK_API_KEY,
    BETTERSTACK_URL: process.env.BETTERSTACK_URL,
    ARCJET_KEY: process.env.ARCJET_KEY,
    ANALYZE: process.env.ANALYZE,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    VERCEL: process.env.VERCEL,
    NEXT_RUNTIME: process.env.NEXT_RUNTIME,
    FLAGS_SECRET: process.env.FLAGS_SECRET,
    LIVEBLOCKS_SECRET: process.env.LIVEBLOCKS_SECRET,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
    process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:
    process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_DOCS_URL: process.env.NEXT_PUBLIC_DOCS_URL,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL:
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,

    // Auth
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    AUTH_FACEBOOK_ID: process.env.AUTH_FACEBOOK_ID,
    AUTH_FACEBOOK_SECRET: process.env.AUTH_FACEBOOK_SECRET,
    AUTH_APPLE_ID: process.env.AUTH_APPLE_ID,
    AUTH_APPLE_SECRET: process.env.AUTH_APPLE_SECRET,
  },
});
