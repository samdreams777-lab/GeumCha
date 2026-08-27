import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

/** Compact footer: Menu / Location / Book a Table only. */
export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-transparent border-t border-seoul-surface/60 mt-auto" role="contentinfo">
      <div className="container-custom py-6">
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2" aria-label="Footer">
          <Link to="/menu" className="text-sm text-white/80 hover:text-seoul-gold transition-colors">{t.nav.menu}</Link>
          <Link to="/location" className="text-sm text-white/80 hover:text-seoul-gold transition-colors">{t.nav.location}</Link>
          <Link to="/contact" className="text-sm text-white/80 hover:text-seoul-gold transition-colors">{t.footer.bookTable}</Link>
        </nav>
        <p className="mt-3 text-center text-xs text-white/50">
          {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}