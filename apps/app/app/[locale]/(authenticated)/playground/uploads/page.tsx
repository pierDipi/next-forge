import {auth} from '@repo/auth';
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {getDictionary, locales} from "@repo/i18n/translations";
import {LocaleCode} from "@repo/i18n/middleware";
import React from "react";
import {UploadPage} from "@/app/[locale]/(authenticated)/components/upload-page";

const title = 'Acme Inc';
const description = 'My application.';

export const metadata: Metadata = {
    title,
    description,
};

export async function generateStaticParams() {
    return locales.locales.map((l) => ({locale: l.id}))
}

interface AppProps {
    params?: Promise<{
        locale: LocaleCode
    }>
}

const App = async ({params}: AppProps) => {
    const session = await auth();
    if (!session) {
        notFound();
    }

    const {locale} = await params
    const d = await getDictionary(locale)

    return (
        <UploadPage />
    );
};

export default App;
