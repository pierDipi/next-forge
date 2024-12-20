import {Mdx} from '@/components/mdx';
import {Sidebar} from '@/components/sidebar';
import {ArrowLeftIcon} from '@radix-ui/react-icons';
import {createMetadata} from '@repo/seo/metadata';
import {allLegals, Legal} from 'content-collections';
import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import Balancer from 'react-wrap-balancer';
import {LocaleCode} from "@repo/i18n/middleware";
import {locales} from "@repo/i18n/translations";

type LegalPageProperties = {
    readonly params: Promise<{
        slug: string;
        locale: LocaleCode
    }>;
};

export const generateMetadata = async ({
                                           params,
                                       }: LegalPageProperties): Promise<Metadata> => {
    const {locale, slug} = await params
    const page = await findPage(locale, slug)
    if (!page) {
        return {};
    }

    return createMetadata({
        title: page.title,
        description: page.description,
        locale: locale,
    });
};

export const generateStaticParams = (): { slug: string }[] =>
    allLegals.map((page) => ({
        slug: page.slug,
    }));

const LegalPage = async ({params}: LegalPageProperties) => {
    const {locale, slug} = await params
    const page = await findPage(locale, slug)
    if (!page) {
        notFound();
    }

    return (
        <div className="container max-w-5xl py-16">
            <Link
                className="mb-4 inline-flex items-center gap-1 text-sm text-white/50 decoration-white/30 transition-colors hover:text-white/70 focus:text-white focus:underline focus:outline-none"
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
    );
};

async function findPage(locale: LocaleCode, slug: string) {
    let page = allLegals.find(({
                                   _meta,
                                   slug: pSlug
                               }) => pSlug === slug && _meta.path.endsWith(locale));
    if (!page) {
        page = allLegals.find(({
                                   _meta,
                                   slug: pSlug
                               }) => pSlug === slug && _meta.path.endsWith(locales.defaultLocale.id));
    }
    return page;
}

export default LegalPage;
