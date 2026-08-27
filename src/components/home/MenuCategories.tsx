import { Link } from 'react-router-dom';
import { useMenu } from '../../context/MenuContext';
import { useLanguage } from '../../context/LanguageContext';
import { ButtonLink } from '../ui/Button';

export function MenuCategories() {
  const { t } = useLanguage();
  const { categories } = useMenu();

  return (
    <section className="section" aria-labelledby="categories-title">
      <div className="container-custom">
        <header className="section-header">
          <h2 id="categories-title" className="section-title">{t.menu.title}</h2>
          <div className="divider" aria-hidden="true" />
          <p className="section-subtitle">
            {t.hero.subheadline}
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4" role="list">
          {categories.map((category, index) => (
            <article
              key={category.id}
              className="card-interactive group text-center p-6 animate-fade-in stagger-1"
              role="listitem"
            >
              <Link to={`/menu#${category.id}`} className="block">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-seoul-surface border border-seoul-text-muted/10 text-seoul-gold mb-4 group-hover:bg-seoul-gold/10 group-hover:border-seoul-gold/30 transition-all duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-semibold text-seoul-text group-hover:text-seoul-gold transition-colors mb-1">
                  {category.name_vi}
                </h3>
                <p className="text-sm text-seoul-text-muted font-medium">{category.name_en}</p>
                <span className="inline-block mt-2 badge-gold text-xs">
                  {category.items.length} món
                </span>
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <ButtonLink to="/menu" variant="cta" size="lg">
            Xem thực đơn
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}