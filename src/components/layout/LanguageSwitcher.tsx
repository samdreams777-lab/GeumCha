import { useLanguage } from '../../context/LanguageContext';

/** Fully transparent language panel; readable on any background. */
export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  const base =
    'px-2.5 py-1 rounded-md text-sm font-medium transition-all duration-200 border border-transparent';

  return (
    <div
      className="flex items-center gap-1 bg-transparent p-0.5"
      role="group"
      aria-label={locale === 'vi' ? 'Chọn ngôn ngữ' : 'Select language'}
    >
      <button
        onClick={() => setLocale('vi')}
        className={`${base} ${
          locale === 'vi'
            ? 'border-seoul-gold/70 text-seoul-gold'
            : 'text-white/80 hover:text-seoul-gold hover:border-seoul-gold/40'
        }`}
        aria-pressed={locale === 'vi'}
      >
        VI
      </button>
      <button
        onClick={() => setLocale('en')}
        className={`${base} ${
          locale === 'en'
            ? 'border-seoul-gold/70 text-seoul-gold'
            : 'text-white/80 hover:text-seoul-gold hover:border-seoul-gold/40'
        }`}
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
    </div>
  );
}