import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/ui/SEOHead';

export function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead pageType="about" />
      <section className="section pt-32" aria-labelledby="about-title">
        <div className="container-custom">
          <header className="section-header max-w-3xl mx-auto text-center mb-16">
            <h1 id="about-title" className="section-title">{t.about.title}</h1>
            <div className="divider" aria-hidden="true" />
            <p className="section-subtitle">
              {t.about.story} • {t.about.philosophy} • {t.about.atmosphere}
            </p>
          </header>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* Story */}
            <article className="animate-fade-in">
              <h2 className="text-2xl font-bold text-seoul-text mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-seoul-gold/10 flex items-center justify-center text-seoul-gold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                {t.about.story}
              </h2>
              <div className="prose prose-invert max-w-none text-seoul-text-muted leading-relaxed space-y-4">
                {t.about.storyText.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </article>

            {/* Philosophy */}
            <article className="animate-fade-in">
              <h2 className="text-2xl font-bold text-seoul-text mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-seoul-gold/10 flex items-center justify-center text-seoul-gold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </span>
                {t.about.philosophy}
              </h2>
              <ul className="space-y-3 text-seoul-text-muted leading-relaxed">
                {t.about.philosophyItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 text-seoul-gold mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* Atmosphere */}
            <article className="animate-fade-in">
              <h2 className="text-2xl font-bold text-seoul-text mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-seoul-gold/10 flex items-center justify-center text-seoul-gold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </span>
                {t.about.atmosphere}
              </h2>
              <div className="prose prose-invert max-w-none text-seoul-text-muted leading-relaxed space-y-4">
                {t.about.atmosphereText.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}