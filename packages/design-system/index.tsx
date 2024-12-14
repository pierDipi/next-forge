import {AnalyticsProvider} from '@repo/analytics';
import {AuthProvider} from '@repo/auth/provider';
import type {ThemeProviderProps} from 'next-themes';
import {ThemeProvider} from 'next-themes';
import {Toaster} from './components/ui/sonner';
import {TooltipProvider} from './components/ui/tooltip';
import {CookieConsent} from "@repo/design-system/components/cookie-consent";

type DesignSystemProviderProperties = ThemeProviderProps & {
    authDisabled?: boolean
};

export const DesignSystemProvider = ({
                                         children,
                                         authDisabled,
                                         ...properties
                                     }: DesignSystemProviderProperties) => (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            {...properties}
        >
            <AuthProvider disabled={authDisabled}>
                <AnalyticsProvider>
                    <TooltipProvider>{children}</TooltipProvider>
                    <Toaster/>
                    <CookieConsent
                        title={"We use cookies"}
                        text={"This website uses essential cookies for functionality and analytics cookies to improve your experience. You can manage your preferences below."}
                        accept={"Accept"}
                        essentialLabel={"Essential"}
                        analyticsLabel={"Analytics"}
                    />
                </AnalyticsProvider>
            </AuthProvider>
        </ThemeProvider>
    )
;
