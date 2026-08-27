import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import logo from '../../assets/logo.webp';

/**
 * Clean hero per spec: dominant logo + exactly two CTAs.
 * Language switcher lives in the site Header (single instance).
 */
export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative" aria-labelledby="hero-title">
      <div className="min-h-[100svh] flex flex-col items-center justify-center px-4 py-4 relative">
        {/* Dominant golden SEOUL logo + CTAs pulled close to it */}
        <div className="w-full flex items-center justify-center min-h-0">
          <img
            src={logo}
            alt="Seoul Korean Cuisine — Vua Mì Cay"
            width={1168}
            height={784}
            fetchPriority="high"
            decoding="async"
            className="object-contain w-auto drop-shadow-[0_6px_28px_rgba(0,0,0,0.65)]"
            style={{ maxHeight: 'calc(100svh - 220px)', maxWidth: '94vw' }}
          />
        </div>

        {/* Two primary actions only — directly beneath the logo */}
        <div className="w-full max-w-sm mx-auto text-center mt-5">
          <h1 id="hero-title" className="sr-only">Seoul Korean Cuisine</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <Link to="/menu" className="btn-hero-dark">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {t.hero.ctaPrimary}
            </Link>
            <Link to="/contact" className="btn-hero-dark">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
              </svg>
              {t.hero.bookTable}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}