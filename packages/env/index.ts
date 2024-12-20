import {createEnv} from '@t3-oss/env-nextjs';
import {z} from 'zod';

const server: Parameters<typeof createEnv>[0]['server'] = {
    NODE_ENV: z.enum(['development', 'production']).default('production'),

    DATABASE_URL: z.string().min(1).url(),
    STRIPE_SECRET_KEY: z.string().min(1).startsWith('sk_').optional(),
    STRIPE_WEBHOOK_SECRET: z.string().min(1).startsWith('whsec_').optional(),
    ANALYZE: z.string().optional(),

    SEO_APPLICATION_NAME: z.string().min(1),
    SEO_AUTHOR_NAME: z.string().min(1).optional(),
    SEO_AUTHOR_URL: z.string().min(1).optional(),
    SEO_TWITTER_HANDLE: z.string().min(1).optional(),
    SEO_FACEBOOK_APP_ID: z.string().min(1).optional(),

    // Added by Vercel
    NEXT_RUNTIME: z.enum(['nodejs', 'edge']).default('nodejs').optional(),

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
    NEXT_PUBLIC_DOCS_URL: z.string().min(1).url().optional(),
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

        SEO_APPLICATION_NAME: process.env.SEO_APPLICATION_NAME,
        SEO_AUTHOR_NAME: process.env.SEO_AUTHOR_NAME,
        SEO_AUTHOR_URL: process.env.SEO_AUTHOR_URL,
        SEO_TWITTER_HANDLE: process.env.SEO_TWITTER_HANDLE,
        SEO_FACEBOOK_APP_ID: process.env.SEO_FACEBOOK_APP_ID,

        DATABASE_URL: process.env.DATABASE_URL,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
        ANALYZE: process.env.ANALYZE,
        NEXT_RUNTIME: process.env.NEXT_RUNTIME,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_DOCS_URL: process.env.NEXT_PUBLIC_DOCS_URL,
        NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
        NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
        NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,

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
