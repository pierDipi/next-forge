import {LocaleConfig} from "./middleware.js";
import {languages} from "./dictionaries";

export const locales: LocaleConfig = {
  locales: languages.map(value => { return {id: value}}),
  defaultLocale: {id: 'en'}
}