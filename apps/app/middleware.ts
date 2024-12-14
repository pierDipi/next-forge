import {withAuth} from "@repo/auth/middleware";
import {stackMiddlewares} from "@repo/next-config/middleware";
import {withI18n} from "@repo/i18n/middleware";
import {locales} from "@repo/i18n/translations";
import {withLogging} from "@repo/observability/log";

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|ingest|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

export default stackMiddlewares([withLogging, withAuth, withI18n(locales)]);