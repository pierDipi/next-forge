import {match} from '@formatjs/intl-localematcher'
// @ts-ignore
import Negotiator from 'negotiator'
import {MiddlewareFactory} from "@repo/next-config/middleware.js";
import {NextFetchEvent, NextRequest, NextResponse} from "next/server";
import {log} from "@repo/observability/log";

export interface LocaleConfig {
  locales: Array<Locale>
  defaultLocale: Locale
  algorithm?: 'lookup' | 'best fit';
}

export type LocaleCode = 'en' | 'it'

export interface Locale {
  id: LocaleCode
}

export const withI18n = (config: LocaleConfig): MiddlewareFactory => {

  const supportedLocales = config.locales.map(v => v.id)

  return (next) => {
    return async (request: NextRequest, _next: NextFetchEvent) => {
      if (request.nextUrl.pathname.startsWith('/ingest')) {
        log.debug(`[${request.nextUrl.origin}][${request.nextUrl.pathname}] Skip i18n middleware`, config)
        return next(request, _next)
      }

      log.debug(`[${Date.now()}][${request.nextUrl.origin}][${request.nextUrl.pathname}] i18n middleware match`, config)

      // Check if there is any supported locale in the pathname
      const {pathname} = request.nextUrl

      const pathnameHasLocale = config.locales.some(
        (locale) => compareLocale(pathname, locale)
      )
      if (pathnameHasLocale) {
        log.debug(`[${request.nextUrl.origin}][${request.nextUrl.pathname}] i18n middleware pathname has locale`, config)
        return next(request, _next)
      }


      try {
        const languages = new Negotiator(request)
          .languages()
          .map((l: string) => l === "*" ? config.defaultLocale.id : l);

        const locale = match(
          languages,
          supportedLocales,
          config.defaultLocale.id,
          {algorithm: config.algorithm ?? 'lookup'},
        );

        log.debug(`[${request.nextUrl.origin}][${request.nextUrl.pathname}] i18n middleware`,
          "languages", languages,
          "locale", locale,
          "defaultLocale", config.defaultLocale.id)

        // The new path is now /<locale>/<path>
        const url = request.nextUrl.clone()
        url.pathname = `/${locale}${request.nextUrl.pathname}`

        log.debug(`[${request.nextUrl.origin}][${request.nextUrl.pathname}] i18n middleware`,
          "redirect", request.nextUrl.pathname,
          "languages", languages,
          "locale", locale,
          "defaultLocale", config.defaultLocale.id)

        return NextResponse.redirect(url)

      } catch (err) {
        log.error(`[${request.nextUrl.origin}][${request.nextUrl.pathname}] i18n middleware, failed to detect locale: ${err}`)
        return next(request, _next)
      }
    };
  };
};

export const getLocaleFromPath = (config: LocaleConfig, path: string): Locale => {
  for (const locale of config.locales) {
    if (compareLocale(path, locale)) {
      return locale
    }
  }
  return config.defaultLocale
}

function compareLocale(path: string, locale: Locale): boolean {
  return path.startsWith(`/${locale.id}/`) || path === `/${locale.id}`
}
