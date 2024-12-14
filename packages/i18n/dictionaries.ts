import 'server-only'
import {LocaleCode} from "./middleware";
import {log} from "@repo/observability/log";

// When adding new languages, make sure Stripe Checkout supports it.
const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  it: () => import('./dictionaries/it.json').then((module) => module.default),
}

// @ts-ignore
export const languages: LocaleCode[] = Object.keys(dictionaries)

// @ts-ignore
export const getDictionary = async (locale: LocaleCode): Promise<any> => {
  log.debug("getDictionary", locale)
  return dictionaries[locale]()
}