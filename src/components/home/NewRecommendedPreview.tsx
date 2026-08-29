import { Link } from 'react-router-dom';
import { Image } from '../ui/Image';
import { ButtonLink } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { getImageForItem } from '../../utils/itemImages';

const baseUrl = import.meta.env.BASE_URL;

// Geum Cha New & Recommended — 6 showcase drinks for homepage preview
const SHOWCASE_PREVIEWS = [
  { id: 'milk_tea_geum',                   badge: 'new' },
  { id: 'milk_tea_hokkaido',               badge: 'recommended' },
  { id: 'milk_tea_pandan_jelly_cheese',    badge: 'recommended' },
  { id: 'matcha_latte',                    badge: 'recommended' },
  { id: 'fresh_milk_black_pearl_brown_sugar', badge: 'recommended' },
  { id: 'yogurt_plain',                    badge: 'new' },
];

export function NewRecommendedPreview() {
  const { t, locale } = useLanguage();
  const nr = t.newRecommended;

  return (
    <section className="section bg-seoul-charcoal/50" aria-labelledby="new-recommended-title">
      <div className="container-custom">
        <header className="section-header">
          <h2 id="new-recommended-title" className="section-title">{nr.title}</h2>
          <div className="divider" aria-hidden="true" />
          <p className="section-subtitle">{nr.subtitle}</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" role="list">
          {SHOWCASE_PREVIEWS.map(({ id, badge }, index) => {
            const badgeLabel = badge === 'new' ? nr.badgeNew : nr.badgeRecommended;
            return (
              <article
                key={id}
                className="card-interactive group animate-fade-in stagger-1"
                role="listitem"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={getImageForItem(id)}
                    alt={id}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-seoul-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                  {/* Badge */}
                  <span className="absolute top-2 left-2 badge-gold font-semibold text-[10px]">
                    {badgeLabel}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <ButtonLink to="/menu" variant="outline-gold" size="lg">
            {nr.exploreMenu}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}