import { Image } from '../components/ui/Image';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/ui/SEOHead';
import { getImageForItem } from '../utils/itemImages';

const baseUrl = import.meta.env.BASE_URL;

// Geum Cha — 6 carefully selected showcase drinks (not the full menu)
// Each item is a real product from the Geum Cha menu with name, description, price, and image
const SHOWCASE_DRINKS = [
  {
    id: 'milk_tea_geum',
    price: '35000',
    badge: 'new',
  },
  {
    id: 'milk_tea_hokkaido',
    price: '40000',
    badge: 'recommended',
  },
  {
    id: 'milk_tea_pandan_jelly_cheese',
    price: '50000',
    badge: 'recommended',
  },
  {
    id: 'matcha_latte',
    price: '55000',
    badge: 'recommended',
  },
  {
    id: 'fresh_milk_black_pearl_brown_sugar',
    price: '40000',
    badge: 'recommended',
  },
  {
    id: 'yogurt_plain',
    price: '35000',
    badge: 'new',
  },
];

type DrinkInfo = {
  name: string;
  name_vi: string;
  description: string;
  description_vi: string;
};

export function NewRecommendedPage() {
  const { t, locale } = useLanguage();
  const dr: Record<string, DrinkInfo> = t.newRecommended.drinks as Record<string, DrinkInfo>;

  return (
    <>
      <SEOHead pageType="about" />
      <section className="section pt-32" aria-labelledby="new-recommended-title">
        <div className="container-custom">
          <header className="section-header max-w-3xl mx-auto text-center mb-16">
            <h1 id="new-recommended-title" className="section-title">
              {t.newRecommended.title}
            </h1>
            <div className="divider" aria-hidden="true" />
            <p className="section-subtitle">
              {t.newRecommended.subtitle}
            </p>
          </header>

          {/* Premium showcase grid — 6 drinks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" role="list">
            {SHOWCASE_DRINKS.map(({ id, price, badge }, index) => {
              const src = getImageForItem(id);
              const info = dr[id];
              const badgeLabel = badge === 'new' ? t.newRecommended.badgeNew : t.newRecommended.badgeRecommended;
              return (
                <article
                  key={id}
                  className="card-interactive group animate-fade-in"
                  style={{ animationDelay: `${index * 0.06}s` }}
                  role="listitem"
                >
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={src}
                      alt={info ? (locale === 'en' ? info.name : info.name_vi) : id}
                      priority={index < 2}
                      aspectRatio="3/4"
                    />
                    {/* Badge */}
                    <span className="absolute top-3 left-3 badge-gold font-semibold text-xs">
                      {badgeLabel}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-seoul-text text-base leading-tight group-hover:text-seoul-gold transition-colors">
                      {locale === 'en'
                        ? (info?.name || id)
                        : (info?.name_vi || id)}
                    </h3>
                    <p className="text-sm text-seoul-text-muted leading-relaxed">
                      {locale === 'en'
                        ? (info?.description || '')
                        : (info?.description_vi || '')}
                    </p>
                    <p className="text-lg font-bold text-seoul-gold">
                      {new Intl.NumberFormat('vi-VN').format(parseInt(price))} ₫
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="text-center mt-14 pt-8 border-t border-seoul-surface">
            <a href="/menu" className="inline-flex items-center gap-2 text-seoul-gold font-semibold hover:text-seoul-gold/80 transition-colors">
              {t.newRecommended.exploreMenu}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}