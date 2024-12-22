import {cn} from '@repo/design-system/lib/utils';
import type {Blog, WithContext} from '@repo/seo/json-ld';
import {JsonLd} from '@repo/seo/json-ld';
import {createMetadata} from '@repo/seo/metadata';
import {allPosts} from 'content-collections';
import Image from 'next/image';
import Link from 'next/link';
import {LocaleCode} from "@repo/i18n/middleware";
import {getDictionary, locales} from "@repo/i18n/translations";

const title = 'Blog';
const description = 'Thoughts, ideas, and opinions.';

interface BlogIndexProps {
    params: Promise<{
        locale: LocaleCode
    }>;
}

export async function generateMetadata({params}: BlogIndexProps) {
    const {locale} = await params
    const d = await getDictionary(locale)

    return createMetadata({
        title: title,
        description: description,
        locale: locale
    })
}

export async function generateStaticParams() {
    return locales.locales.map((l) => ({locale: l.id}))
}

const BlogIndex = async ({params}: BlogIndexProps) => {
    const jsonLd: WithContext<Blog> = {
        '@type': 'Blog',
        '@context': 'https://schema.org',
    };

    const {locale} = await params

    return (
        <>
            <JsonLd code={jsonLd}/>
            <div className="w-full py-20 lg:py-40">
                <div className="container mx-auto flex flex-col gap-14">
                    <div
                        className="flex w-full flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                        <h4 className="max-w-xl font-regular text-3xl tracking-tighter md:text-5xl">
                            Latest articles
                        </h4>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {allPosts
                            .filter(post => post._meta.path.endsWith(locale))
                            .map((post, index) => (
                                <Link
                                    href={`/${locale}/blog/${post.slug}`}
                                    className={cn(
                                        'flex cursor-pointer flex-col gap-4 hover:opacity-75',
                                        !index && 'md:col-span-2'
                                    )}
                                    key={post.title}
                                >
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        width={1336}
                                        height={751}
                                        blurDataURL={post.imageBlur}
                                        placeholder="blur"
                                    />
                                    <div className="flex flex-row items-center gap-4">
                                        <p className="text-muted-foreground text-sm">
                                            {new Date(post.date).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="max-w-3xl text-4xl tracking-tight">
                                            {post.title}
                                        </h3>
                                        <p className="max-w-3xl text-base text-muted-foreground">
                                            {post.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogIndex;
