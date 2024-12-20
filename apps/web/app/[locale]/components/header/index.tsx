import {env} from '@repo/env';
import {LocaleCode} from "@repo/i18n/middleware";
import {HeaderClient} from "@/app/[locale]/components/header/headerClient";
import {getDictionary} from "@repo/i18n/translations";

interface HeaderProps {
    locale: LocaleCode
}

export const Header = async ({locale}: HeaderProps) => {
    const d = await getDictionary(locale)
    const navigationItems = [
        {
            title: d.web.header.home,
            href: `/${locale}`,
        },
        {
            title: d.web.header.product.title,
            description: d.web.header.product.description,
            items: [
                {
                    title: d.web.header.pricing,
                    href: `/${locale}/pricing`,
                },
            ],
        },
        {
            title: d.web.header.blog,
            href: `/${locale}/blog`,
        },
        {
            title: d.web.header.docs,
            href: env.NEXT_PUBLIC_DOCS_URL,
        },
    ];

    return (
        <HeaderClient
            contact={d.web.header.contact}
            cta={d.web.header.cta}
            locale={locale}
            navigationItems={navigationItems}
        />
    );
};
