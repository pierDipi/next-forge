import {auth} from '@repo/auth';
import {SidebarProvider} from '@repo/design-system/components/ui/sidebar';
import {showBetaFeature} from '@repo/feature-flags';
import {redirect} from 'next/navigation';
import type {ReactNode} from 'react';

type AppLayoutProperties = {
  readonly children: ReactNode;

  params: Promise<{
    locale: string
  }>
};

const AppLayout = async ({children, params}: AppLayoutProperties) => {
  // const locale = await params?.locale ?? locales.defaultLocale
  const session = await auth();
  if (!session) {
    const {locale} = await params
    return redirect(`/${locale}/sign-in`);
  }

  const betaFeature = await showBetaFeature();

  return (
    <SidebarProvider>
      {betaFeature && (
        <div
          className="m-4 rounded-full bg-success p-1.5 text-center text-sm text-success-foreground">
          Beta feature now available
        </div>
      )}
      {children}
    </SidebarProvider>
  );
};

export default AppLayout;
