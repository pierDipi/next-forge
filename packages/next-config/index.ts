import withBundleAnalyzer from '@next/bundle-analyzer';

// @ts-expect-error No declaration file
import {PrismaPlugin} from '@prisma/nextjs-monorepo-workaround-plugin';
import type {NextConfig} from 'next';
import {createSecureHeaders} from 'next-secure-headers';
import {env} from "@repo/env";

const secureHeaders = createSecureHeaders({
    // HSTS Preload: https://hstspreload.org/
    forceHTTPSRedirect: [
        true,
        {maxAge: 63_072_000, includeSubDomains: true, preload: true},
    ],
    frameGuard: 'deny',
    nosniff: 'nosniff',
    noopen: 'noopen',
    xssProtection: 'sanitize',
    referrerPolicy: 'strict-origin-when-cross-origin',
    contentSecurityPolicy: {
        directives: {
            defaultSrc: "'self'",
            scriptSrc: [
                "'self'",
                env.NODE_ENV === 'development' ? "'unsafe-eval'" : "",
                "'unsafe-inline'",
                "https://js.stripe.com"
            ],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'blob:', 'data:'],
            frameSrc: [
                "https://js.stripe.com"
            ],
            frameAncestors: "'none'",
            objectSrc: "'none'",
            baseURI: "'self'",
            formAction: "'self'"
        },
        reportOnly: false,
    }
})

const cacheExtensions = [
    '7z', 'csv', 'gif', 'midi', 'png', 'tif', 'zip',
    'avi', 'doc', 'gz', 'mkv', 'ppt', 'tiff', 'zst',
    'avif', 'docx', 'ico', 'mp3', 'pptx', 'ttf',
    'apk', 'dmg', 'iso', 'mp4', 'ps', 'webm',
    'bin', 'ejs', 'jar', 'ogg', 'rar', 'webp',
    'bmp', 'eot', 'jpg', 'otf', 'svg', 'woff',
    'bz2', 'eps', 'jpeg', 'pdf', 'svgz', 'woff2',
    'class', 'js', 'pict', 'swf', 'xls',
    'css', 'flac', 'mid', 'pls', 'tar', 'xlsx'
]

export const config: NextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [],
    },

    // biome-ignore lint/suspicious/useAwait: rewrites is async
    async rewrites() {
        return [
            {
                source: '/ingest/static/:path*',
                destination: 'https://eu-assets.i.posthog.com/static/:path*',
            },
            {
                source: '/ingest/:path*',
                destination: 'https://eu.i.posthog.com/:path*',
            },
            {
                source: '/ingest/decide',
                destination: 'https://eu.i.posthog.com/decide',
            },
        ];
    },

    // biome-ignore lint/suspicious/useAwait: headers is async
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    ...secureHeaders,
                ]
            },
            {
                source: `/:all*(${cacheExtensions.join('|')})`,
                headers: [
                    ...secureHeaders,
                    {
                        key: 'Cache-Control',
                        value: env.NODE_ENV !== 'development' ? 'public, max-age=31536000' : '',
                    }
                ]
            },
        ];
    },

    webpack(config, {isServer}) {
        if (isServer) {
            config.plugins = [...config.plugins, new PrismaPlugin()];
        }

        config.ignoreWarnings = [{module: /@opentelemetry\/instrumentation/}];

        return config;
    },

    // This is required to support PostHog trailing slash API requests
    skipTrailingSlashRedirect: true,
    poweredByHeader: false
};

export const withAnalyzer = (sourceConfig: NextConfig): NextConfig =>
    withBundleAnalyzer()(sourceConfig);
