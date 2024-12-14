"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withI18n = void 0;
const intl_localematcher_1 = require("@formatjs/intl-localematcher");
// @ts-ignore
const negotiator_1 = __importDefault(require("negotiator"));
const server_1 = require("next/server");
const log_1 = require("@repo/observability/log");
const localeCookie = 'locale';
const withI18n = (config) => {
    const supportedLocales = config.locales.map(v => v.id);
    return (next) => {
        return async (request, _next) => {
            log_1.log.debug(`[${request.nextUrl.origin}][${request.nextUrl.pathname}] i18n middleware match`, config);
            // Check if there is any supported locale in the pathname
            const { pathname } = request.nextUrl;
            const pathnameHasLocale = config.locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
            if (pathnameHasLocale) {
                return next(request, _next);
            }
            const languages = new negotiator_1.default(request).languages();
            log_1.log.debug(`[${request.nextUrl.origin}][${request.nextUrl.pathname}] i18n middleware: ${languages}`);
            try {
                const locale = (0, intl_localematcher_1.match)(languages, supportedLocales, config.defaultLocale, { algorithm: config.algorithm ?? 'best fit' });
                if (locale == config.defaultLocale) {
                    return next(request, _next);
                }
                request.nextUrl.pathname = `/${locale}${pathname}`;
            }
            catch (err) {
                console.error(err);
                return next(request, _next);
            }
            // The new path is now /<locale>/<path>
            return server_1.NextResponse.redirect(request.nextUrl);
        };
    };
};
exports.withI18n = withI18n;
