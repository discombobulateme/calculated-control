export const STORAGE_KEY = 'cc-locale';

export const allowedLocales = [
  'en',
  'de',
];

export const defaultLocale = 'en';

const locale = localStorage.getItem(STORAGE_KEY);

export const getCurrentLocale = () => {
  return allowedLocales.includes(locale) ? locale : defaultLocale;
};

export const getSwitchableLocale = () => {
  const current = getCurrentLocale();
  return allowedLocales.find(l => l !== current)
    || navigator.language.split('-').shift()
    || defaultLocale;
};

export const switchLocale = (locale) => {
  localStorage.setItem(STORAGE_KEY, locale);
};
