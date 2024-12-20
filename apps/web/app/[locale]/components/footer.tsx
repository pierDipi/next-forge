import {env} from '@repo/env';
import Link from 'next/link';
import {LocaleCode} from "@repo/i18n/middleware";
import {getDictionary} from "@repo/i18n/translations";

interface FooterProps {
    locale: LocaleCode
}

export const Footer = async ({locale}: FooterProps) => {
    const d = await getDictionary(locale)

    const navigationItems = [
        {
            title: d.web.header.home,
            href: `/${locale}`,
        },
        {
            title: d.web.footer.pages.title,
            items: [
                {
                    title: d.web.header.blog,
                    href: `/${locale}/blog`,
                },
                {
                    title: d.web.header.pricing,
                    href: `/${locale}/pricing`,
                },
                {
                    title: d.web.header.docs,
                    href: env.NEXT_PUBLIC_DOCS_URL,
                },
            ],
        },
        {
            title: d.web.footer.legal.title,
            items: [
                {
                    title: d.web.footer.legal.terms,
                    href: `/${locale}/legal/terms`,
                },
                {
                    title: d.web.footer.legal.privacy,
                    href: `/${locale}/legal/privacy`,
                },
                {
                    title: d.web.footer.legal.acceptableUse,
                    href: `/${locale}/legal/acceptable-use`,
                },
            ],
        },
    ];

    return (
        <section className="dark border-foreground/10 border-t">
            <div className="w-full bg-background py-20 text-foreground lg:py-30">
                <div className="container mx-auto">
                    <div className="grid items-center gap-10 lg:grid-cols-2">
                        <div className="flex flex-col items-start gap-8">
                            <div className="flex flex-col gap-2">
                                <h2
                                    className="max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl">
                                    next-forge
                                </h2>
                                <p
                                    className="max-w-lg text-left text-foreground/75 text-lg leading-relaxed tracking-tight">
                                    {d.web.footer.paragraph}
                                </p>
                            </div>
                        </div>
                        <div className="grid items-start gap-10 lg:grid-cols-3">
                            {navigationItems
                                .filter(item => item.title != undefined)
                                .map((item) => (
                                    <div
                                        key={item.title}
                                        className="flex flex-col items-start gap-1 text-base"
                                    >
                                        <div className="flex flex-col gap-2">
                                            {item.href ? (
                                                <Link
                                                    href={item.href}
                                                    className="flex items-center justify-between"
                                                    target={
                                                        item.href.includes('http') ? '_blank' : undefined
                                                    }
                                                    rel={
                                                        item.href.includes('http')
                                                            ? 'noopener noreferrer'
                                                            : undefined
                                                    }
                                                >
                                                    <span className="text-xl">{item.title}</span>
                                                </Link>
                                            ) : (
                                                <p className="text-xl">{item.title}</p>
                                            )}
                                            {item.items?.map((subItem) => (
                                                <Link
                                                    key={subItem.title}
                                                    href={subItem.href}
                                                    className="flex items-center justify-between"
                                                    target={
                                                        subItem.href.includes('http') ? '_blank' : undefined
                                                    }
                                                    rel={
                                                        subItem.href.includes('http')
                                                            ? 'noopener noreferrer'
                                                            : undefined
                                                    }
                                                >
                                                <span className="text-foreground/75">
                                                  {subItem.title}
                                                </span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
