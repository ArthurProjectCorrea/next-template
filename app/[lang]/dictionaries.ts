import 'server-only';

const dictionaries = {
  en: () => import('../../lang/en.json').then((m) => m.default),
} as const;

export type Locale = keyof typeof dictionaries;

export const locales: readonly Locale[] = ['en'];
export const defaultLocale: Locale = 'en';

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
