import {auth} from '@repo/auth';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@repo/design-system/components/ui/breadcrumb';
import {Separator} from '@repo/design-system/components/ui/separator';
import {SidebarTrigger} from '@repo/design-system/components/ui/sidebar';
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {Checkout} from "@repo/payments/client/checkout";
import {getDictionary, locales} from "@repo/i18n/translations";
import {LocaleCode} from "@repo/i18n/middleware";
import UploadProgressToast from "@/app/[locale]/(authenticated)/components/upload";

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
        locale?: LocaleCode
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
        <>
            <header className="flex h-16 shrink-0 items-center justify-between gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1"/>
                    <Separator orientation="vertical" className="mr-2 h-4"/>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="block">
                                <BreadcrumbLink href="#link">
                                    Building Your Application
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="block"/>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <Checkout locale={locale} title={d.app.checkout.action.promptComplete}
                      path={`/${locale}/api/stripe/checkout/sessions`}/>
        </>
    );
};


export default App;
