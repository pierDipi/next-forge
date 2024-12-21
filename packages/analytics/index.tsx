import {env} from '@repo/env';
import {ReactNode, Suspense} from 'react';
import {GoogleAnalytics} from './google';
import {PostHogProvider} from './posthog/client';
import {PostHogIdentifier} from "./posthog/posthog-identifier";

type AnalyticsProviderProps = {
    readonly children: ReactNode;
};

export const AnalyticsProvider = ({children}: AnalyticsProviderProps) => (
    <PostHogProvider>
        <Suspense fallback={null}>
            <PostHogIdentifier />
        </Suspense>
        {children}
        {env.NODE_ENV !== 'development'
            && env.NEXT_PUBLIC_GA_MEASUREMENT_ID != undefined
            && (
                <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_MEASUREMENT_ID}/>
            )}
    </PostHogProvider>
);
