import {auth} from '@repo/auth';
import {SidebarProvider} from '@repo/design-system/components/ui/sidebar';
import {showBetaFeature} from '@repo/feature-flags';
import {redirect} from 'next/navigation';
import type {ReactNode} from 'react';
import {PostHogIdentifier} from "@/app/[locale]/(authenticated)/components/posthog-identifier";
import {GlobalSidebar} from "@/app/[locale]/(authenticated)/components/sidebar";
import {LocaleCode} from "@repo/i18n/middleware";

type AppLayoutProperties = {
    readonly children: ReactNode;

    params: Promise<{
        locale: LocaleCode
    }>
};

const AppLayout = async ({children, params}: AppLayoutProperties) => {
    const {locale} = await params
    const session = await auth();
    if (!session) {
        return redirect(`/${locale}/sign-in`);
    }

    const betaFeature = await showBetaFeature();

    return (
        <SidebarProvider>
            <GlobalSidebar locale={locale}>
                {betaFeature && (
                    <div
                        className="m-4 rounded-full bg-success p-1.5 text-center text-sm text-success-foreground">
                        Beta feature now available
                    </div>
                )}
                {children}
            </GlobalSidebar>
            <PostHogIdentifier/>
        </SidebarProvider>
    );
};

export default AppLayout;
