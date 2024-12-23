import {auth} from '@repo/auth';
import {SidebarInset, SidebarProvider} from '@repo/design-system/components/ui/sidebar';
import {redirect} from 'next/navigation';
import type {ReactNode} from 'react';
import {PostHogIdentifier} from "@/app/[locale]/(authenticated)/components/posthog-identifier";
import {LocaleCode} from "@repo/i18n/middleware";

import {AppSidebar} from "@/app/[locale]/(authenticated)/components/sidebar";

type AppLayoutProperties = {
    readonly children: ReactNode;

    params: Promise<{
        locale: LocaleCode
    }>
};

const AppLayout = async ({children, params}: AppLayoutProperties) => {
    const {locale} = await params
    const session = await auth();
    if (!session || !session.user) {
        return redirect(`/${locale}/sign-in`);
    }

    return (
        <SidebarProvider>
            <AppSidebar locale={locale}
                        user={{name: session.user.name, email: session.user.email}}/>
            <SidebarInset>
                {children}
            </SidebarInset>
            <PostHogIdentifier/>
        </SidebarProvider>
    );
};

export default AppLayout;
