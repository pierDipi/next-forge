import merge from 'lodash.merge';
import type {Metadata} from 'next';
import {LocaleCode} from "@repo/i18n/middleware";
import {env} from "@repo/env";

type MetadataGenerator = Omit<Metadata, 'description' | 'title'> & {
    title: string;
    description: string;
    locale: LocaleCode
    image?: string;
};

export const createMetadata = ({
                                   title,
                                   description,
                                   image,
                                   locale,
                                   ...properties
                               }: MetadataGenerator): Metadata => {
    const applicationName = env.SEO_APPLICATION_NAME
    const parsedTitle = `${title} | ${applicationName}`;
    const defaultMetadata: Metadata = {
        title: parsedTitle,
        description,
        applicationName,
        authors: [
            {
                name: env.SEO_AUTHOR_NAME,
                url: env.SEO_AUTHOR_URL,
            }
        ],
        creator: env.SEO_AUTHOR_NAME,
        formatDetection: {
            telephone: false,
        },
        appleWebApp: {
            capable: true,
            statusBarStyle: 'default',
            title: parsedTitle,
        },
        openGraph: {
            title: parsedTitle,
            description,
            type: 'website',
            siteName: applicationName,
            locale: locale,
        },
        publisher: env.SEO_AUTHOR_NAME,
        twitter: {
            card: 'summary_large_image',
            creator: env.SEO_TWITTER_HANDLE,
        },
        facebook: {
            appId: env.SEO_FACEBOOK_APP_ID
        }
        // TODO: add alternates/languages URLs
    };

    const metadata: Metadata = merge(defaultMetadata, properties);

    if (image && metadata.openGraph) {
        metadata.openGraph.images = [
            {
                url: image,
                width: 1200,
                height: 630,
                alt: title,
            },
        ];
    }

    return metadata;
};
