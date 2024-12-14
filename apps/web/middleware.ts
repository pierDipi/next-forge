import {stackMiddlewares} from "@repo/next-config/middleware";
import {withI18n} from "@repo/i18n/middleware";
import {locales} from "@repo/i18n/translations";

export const config = {
    // matcher tells Next.js which routes to run the middleware on. This runs the
    // middleware on all routes except for static assets and Posthog ingest
    matcher: [
        '/((?!_next|sitemap.xml|robots.txt|ingest|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    ],
};

export default stackMiddlewares([withI18n(locales)])
