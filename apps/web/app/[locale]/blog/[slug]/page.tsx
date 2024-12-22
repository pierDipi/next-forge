import {Mdx} from '@/components/mdx';
import {Sidebar} from '@/components/sidebar';
import {ArrowLeftIcon} from '@radix-ui/react-icons';
import {env} from '@repo/env';
import {type BlogPosting, JsonLd, type WithContext} from '@repo/seo/json-ld';
import {createMetadata} from '@repo/seo/metadata';
import {allPosts} from 'content-collections';
import Image from 'next/image';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import Balancer from 'react-wrap-balancer';
import {LocaleCode} from "@repo/i18n/middleware";

type BlogPostProperties = {
    readonly params: Promise<{
        slug: string;
        locale: LocaleCode
    }>;
};

export async function generateMetadata({
                                           params,
                                       }: BlogPostProperties) {
    const {slug, locale} = await params;
    const page = findBlogPost(slug, locale)
    if (!page) {
        return {}
    }

    return createMetadata({
        title: page.title,
        description: page.description,
        image: page.image,
        locale: locale,
    });
};

export const generateStaticParams = (): { slug: string }[] =>
    allPosts.map((page) => ({
        slug: page.slug,
    }));

const BlogPost = async ({params}: BlogPostProperties) => {
    const {slug, locale} = await params;
    const page = findBlogPost(slug, locale);
    if (!page) {
        redirect(`/${locale}/blog`)
    }

    const jsonLd: WithContext<BlogPosting> = {
        '@type': 'BlogPosting',
        '@context': 'https://schema.org',
        datePublished: page.date.toISOString(),
        description: page.description,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': new URL(
                `/${locale}/blog/${slug}`,
                env.NEXT_PUBLIC_WEB_URL,
            ).toString(),
        },
        headline: page.title,
        image: page.image,
        dateModified: page.date.toISOString(),
        author: page.authors.at(0),
        isAccessibleForFree: true,
    };

    return (
        <>
            <JsonLd code={jsonLd}/>
            <div className="container py-16">
                <Link
                    className="mb-4 inline-flex items-center gap-1 text-muted-foreground text-sm focus:underline focus:outline-none"
                    href={`/${locale}/blog`}
                >
                    <ArrowLeftIcon className="h-4 w-4"/>
                    Back to Blog
                </Link>
                <h1 className="scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl">
                    <Balancer>{page.title}</Balancer>
                </h1>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    <Balancer>{page.description}</Balancer>
                </p>
                {page.image ? (
                    <Image
                        src={page.image}
                        width={1920}
                        height={1080}
                        alt=""
                        className="my-16 h-full w-full rounded-xl"
                        priority
                        blurDataURL={page.imageBlur}
                        placeholder="blur"
                    />
                ) : undefined}
                <div className="mt-16 flex flex-col items-start gap-8 sm:flex-row">
                    <div className="sm:flex-1">
                        <Mdx code={page.body}/>
                    </div>
                    <div className="sticky top-24 hidden shrink-0 md:block">
                        <Sidebar
                            content={page.content}
                            readingTime={page.readingTime}
                            date={page.date}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogPost;

function findBlogPost(slug: string, locale: LocaleCode) {
    return allPosts
        .find(({_meta, slug: pSlug}) => pSlug === slug && _meta.path.endsWith(locale));
}
