import {auth, userTransactions} from '@repo/auth';
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
import {locales} from "@repo/i18n/translations";
import {getDictionary} from "@repo/i18n/translations";
import {LocaleCode} from "@repo/i18n/middleware";

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

const App = async (props: AppProps) => {
  const session = await auth();
  if (!session) {
    notFound();
  }

  const locale = (await props.params)?.locale ?? locales.defaultLocale.id
  const d = await getDictionary(locale)

  const transactions = await userTransactions()

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1"/>
          <Separator orientation="vertical" className="mr-2 h-4"/>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block"/>
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">Transactions</div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <pre>{JSON.stringify(transactions, null, "  ")}</pre>
        </div>
      </div>
      <Checkout locale={locale} title={d.app.checkout.action.promptComplete} path={`/${locale}/api/stripe/checkout/sessions`}/>
    </>
  );
};

export default App;
