import {auth, currentUser} from '@repo/auth';
import {SidebarProvider} from '@repo/design-system/components/ui/sidebar';
import {showBetaFeature} from '@repo/feature-flags';
import {redirect} from 'next/navigation';
import type {ReactNode} from 'react';
import {PostHogIdentifier} from './components/posthog-identifier';

type AppLayoutProperties = {
  readonly children: ReactNode;
};

const AppLayout = async ({children}: AppLayoutProperties) => {
  const authenticated = await auth();
  const user = await currentUser();

  if (!user || !authenticated) {
    return redirect('/sign-in');
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
      <PostHogIdentifier/>
    </SidebarProvider>
  );
};

export default AppLayout;
