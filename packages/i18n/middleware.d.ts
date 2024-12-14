import { MiddlewareFactory } from "@repo/next-config/middleware.js";
export interface LocaleConfig {
    locales: Array<Locale>;
    defaultLocale: string;
    algorithm?: 'lookup' | 'best fit';
}
export interface Locale {
    id: string;
}
export declare const withI18n: (config: LocaleConfig) => MiddlewareFactory;
//# sourceMappingURL=middleware.d.ts.map