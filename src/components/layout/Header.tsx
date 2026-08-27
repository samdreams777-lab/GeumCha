import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import logo from '../../assets/logo.webp';

const navItems = [
  { path: '/', labelKey: 'nav.home' },
  { path: '/menu', labelKey: 'nav.menu' },
  { path: '/about', labelKey: 'nav.about' },
  { path: '/fresh-ingredients', labelKey: 'nav.freshIngredients' },
  { path: '/contact', labelKey: 'nav.contact' },
  { path: '/location', labelKey: 'nav.location' },
] as const;

export function Header() {
  const { t } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-seoul-black/95 backdrop-blur-md border-b border-seoul-surface' : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20 md:h-24 px-1">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center flex-shrink-0 -my-2 pr-2"
            aria-label={t.nav.home}
          >
            <img
              src={logo}
              alt="Seoul Korean Cuisine"
              width={1168}
              height={784}
              className="object-contain w-[150px] sm:w-[170px] md:w-[200px] lg:w-[220px] h-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))
                    ? 'text-seoul-gold'
                    : 'text-seoul-text-muted hover:text-seoul-text'
                }`}
              >
                {(t.nav as Record<string,string>)[item.labelKey]}
                {location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path)) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-seoul-gold" aria-hidden="true" />
                )}
              </Link>
              ))}
              </nav>

              {/* Unified controls: single Language Switcher + Menu button (mutually exclusive desktop/mobile nav) */}
              <div className="flex items-center gap-2">
              <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="site-menu"
              aria-label={mobileMenuOpen ? t.common.close : 'Menu'}
              className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border text-sm font-medium transition-all duration-300 ${
                mobileMenuOpen
                  ? 'border-seoul-gold/60 bg-seoul-gold/10 text-seoul-gold'
                  : 'border-white/25 bg-transparent text-white hover:border-seoul-gold/60 hover:text-seoul-gold'
              }`}
            >
              {mobileMenuOpen ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>
        </div>
        {/* Site-wide navigation dropdown */}
        {mobileMenuOpen && (
          <div id="site-menu" className="animate-slide-down mx-3 mb-3 mt-2 rounded-xl bg-black/40 backdrop-blur-md ring-1 ring-inset ring-white/15 shadow-lg shadow-black/30">
            <nav className="py-4 space-y-2" role="navigation" aria-label="Site navigation">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors border border-transparent ${
                    location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))
                      ? 'bg-seoul-gold/15 text-seoul-gold border-seoul-gold/30'
                      : 'text-white hover:text-seoul-gold hover:bg-white/10'
                  }`}
                >
                  {(t.nav as Record<string,string>)[item.labelKey.split('.')[1]]}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}