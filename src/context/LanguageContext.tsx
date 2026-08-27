import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Locale, TranslationKeys } from '../types/menu';
import viTranslations from '../data/i18n/vi.json';
import enTranslations from '../data/i18n/en.json';

const translations: Record<Locale, TranslationKeys> = {
  vi: viTranslations as TranslationKeys,
  en: enTranslations as TranslationKeys,
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;
  formatPrice: (price: number | string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('locale') as Locale) || 'vi';
    }
    return 'vi';
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = translations[locale];

  const formatPrice = useCallback((price: number | string): string => {
    const num = typeof price === 'string' ? parseInt(price, 10) : price;
    if (isNaN(num)) return '';
    return new Intl.NumberFormat('vi-VN').format(num) + '₫';
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, formatPrice }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}