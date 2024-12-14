// biome-ignore lint/correctness/noNodejsModules: Generates sitemap on Node.js
import fs from 'node:fs';
import path from 'node:path';
import {env} from '@repo/env';
import type {MetadataRoute} from 'next';
import {log} from "@repo/observability/log";
import {locales} from "@repo/i18n/translations";
import {LocaleCode} from "@repo/i18n/middleware";
import {allLegals, allPosts} from "content-collections";

const pageRoutes = getPageRoutes()
    // filter out the content managed with content collections
    .filter(p => !p.startsWith('/[locale]/blog/') && !p.startsWith('/[locale]/legal/'))

log.debug("PagesRoutes", JSON.stringify(pageRoutes));

const contentCollections = [
    {
        match: '/[locale]/blog/[slug]',
        values: allPosts
            .map((post) => {
                return {
                    '[locale]': post._meta.path.substring(post._meta.path.lastIndexOf('.') + 1),
                    '[slug]': post.slug,
                }
            })
    },
    {
        match: '/[locale]/legal/[slug]',
        values: allLegals
            .map((post) => {
                return {
                    '[locale]': post._meta.path.substring(post._meta.path.lastIndexOf('.') + 1),
                    '[slug]': post.slug,
                }
            })
    },
]

export default function sitemap(): MetadataRoute.Sitemap {
    const sm: MetadataRoute.Sitemap = [
        {
            url: new URL('/', env.NEXT_PUBLIC_WEB_URL).href,
            lastModified: new Date(),
            alternates: {
                languages: locales.locales.reduce((acc, locale, {}) => {
                    acc[locale.id] = new URL(`${locale.id}`, env.NEXT_PUBLIC_WEB_URL).href;
                    return acc
                }, {} as Record<LocaleCode, string>)
            },
            priority: 1,
        },
        ...pageRoutes
            .flatMap(route => {
                return locales.locales.map(l => {
                    return {
                        url: new URL(route.replace('[locale]', l.id), env.NEXT_PUBLIC_WEB_URL).href,
                        lastModified: new Date(),
                        alternates: {
                            languages: locales.locales.reduce((acc, l, {}) => {
                                acc[l.id] = new URL(route.replace('[locale]', l.id), env.NEXT_PUBLIC_WEB_URL).href;
                                return acc
                            }, {} as Record<LocaleCode, string>)
                        },
                    }
                })
            }),
        ...contentCollections
            .flatMap(cc => {
                return cc.values.map(post => {
                    const replacements = Object.keys(post)
                    let match = cc.match
                    for (let replacement of replacements) {
                        // @ts-ignore
                        match = match.replace(replacement, post[replacement]);
                    }
                    return {
                        url: new URL(match, env.NEXT_PUBLIC_WEB_URL).href,
                        lastModified: new Date(),
                    }
                })
            })
    ]

    return sm
}

// Helper function to recursively get all files in a directory
function getAllFiles(dirPath: string, filter: (file: string) => boolean = () => true): string[] {
    const entries = fs.readdirSync(dirPath, {withFileTypes: true});

    return entries.flatMap((entry) => {
        const fullPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
            // Ignore special folders
            if (entry.name.startsWith('_') || entry.name.startsWith('(')) {
                return [];
            }
            return getAllFiles(fullPath, filter);
        }
        return filter(entry.name) ? [fullPath] : [];
    });
}

// Function to get all page routes
function getPageRoutes(): string[] {
    const appDir = path.join(process.cwd(), 'app');

    return getAllFiles(appDir, (file) => {
        return file.endsWith('page.tsx') || file.endsWith('page.js')
    }).map((fullPath) => {
        // Remove 'app/' and 'page.tsx' to get route
        const relativePath = path.relative(appDir, fullPath)
            .replace(/\/page\.(tsx|js)$/, '')
            .replace(/\/?index$/, '');

        return relativePath ? `/${relativePath}` : '/';
    });
}