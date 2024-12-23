import {defineCollection, defineConfig} from '@content-collections/core';
import {compileMDX} from '@content-collections/mdx';
import {
    rehypeCode,
    type RehypeCodeOptions,
    remarkGfm,
    remarkHeading,
} from 'fumadocs-core/mdx-plugins';
import readingTime from 'reading-time';
import {sqip} from 'sqip';
import {log} from "@repo/observability/log";

const rehypeCodeOptions: RehypeCodeOptions = {
    themes: {
        light: 'catppuccin-mocha',
        dark: 'catppuccin-mocha',
    },
};

const posts = defineCollection({
    name: 'posts',
    directory: 'content/blog',
    include: '**/*.mdx',
    schema: (z) => ({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        image: z.string(),
        authors: z.array(z.string()),
        tags: z.array(z.string()),
    }),
    transform: async (page, context) => {
        const body = await context.cache(page.content, async () =>
            compileMDX(context, page, {
                remarkPlugins: [remarkGfm, remarkHeading],
                rehypePlugins: [[rehypeCode, rehypeCodeOptions]],
            })
        );

        const blur = await context.cache(page._meta.path, async () =>
            sqip({
                input: `./public/${page.image}`,
                plugins: [
                    'sqip-plugin-primitive',
                    'sqip-plugin-svgo',
                    'sqip-plugin-data-uri',
                ],
            })
        );

        const result = Array.isArray(blur) ? blur[0] : blur;

        log.debug(`${page._meta.path}`)

        return {
            ...page,
            body,
            date: new Date(page.date),
            slug: toSlug(page),
            readingTime: readingTime(page.content).text,
            image: page.image,
            imageBlur: result.metadata.dataURIBase64 as string,
        };
    },
});

const legals = defineCollection({
    name: 'legal',
    directory: 'content/legal',
    include: '**/*.mdx',
    schema: (z) => ({
        title: z.string(),
        description: z.string(),
        date: z.string(),
    }),
    transform: async (page, context) => {
        const body = await context.cache(page.content, async () =>
            compileMDX(context, page, {
                remarkPlugins: [remarkGfm, remarkHeading],
                rehypePlugins: [[rehypeCode, rehypeCodeOptions]],
            })
        );

        return {
            ...page,
            body,
            date: new Date(page.date),
            slug: toSlug(page),
            readingTime: readingTime(page.content).text,
        };
    },
});

export default defineConfig({
    collections: [posts, legals],
});

function toSlug(page: any): string {
    let slug = page._meta.path
    const localeIndex = page._meta.path.lastIndexOf('.')
    if (localeIndex < 0) {
        throw new Error(`Expected locale index for ${page._meta.path}, example '${page._meta.path}.en.mdx'`)
    }
    slug = slug.substring(0, localeIndex)

    return slug;
}