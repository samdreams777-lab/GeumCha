import { Link } from 'react-router-dom';
import { Image } from '../ui/Image';
import { ButtonLink } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

const baseUrl = import.meta.env.BASE_URL;

const INGREDIENT_GROUPS = [
  {
    id: 'meat',
    labelKey: 'meat',
    image: `${baseUrl}images/ingredients/ingredient-fresh-meat.webp`,
    alt: 'Fresh beef, pork, chicken for Korean BBQ and hot pot',
  },
  {
    id: 'seafood',
    labelKey: 'seafood',
    image: `${baseUrl}images/ingredients/ingredient-fresh-seafood.webp`,
    alt: 'Fresh shrimp, squid, fish for Korean cooking',
  },
  {
    id: 'vegetables',
    labelKey: 'vegetables',
    image: `${baseUrl}images/ingredients/ingredient-vegetables.webp`,
    alt: 'Fresh napa cabbage, crown daisy, carrots, onions, bean sprouts',
  },
  {
    id: 'mushroomsTofu',
    labelKey: 'mushroomsTofu',
    image: `${baseUrl}images/ingredients/ingredient-mushrooms-tofu.webp`,
    alt: 'Fresh enoki, king oyster mushrooms, soft tofu, fried tofu',
  },
  {
    id: 'koreanPantry',
    labelKey: 'koreanPantry',
    image: `${baseUrl}images/ingredients/ingredient-korean-pantry.webp`,
    alt: 'Kimchi, gochujang, doenjang, sesame oil, rice cakes, noodles',
  },
  {
    id: 'hotPotSet',
    labelKey: 'hotPotSet',
    image: `${baseUrl}images/ingredients/ingredient-hot-pot-set.webp`,
    alt: 'Complete hot pot ingredient platter ready to cook',
  },
];

export function FreshIngredientsPreview() {
  const { t } = useLanguage();

  return (
    <section className="section bg-seoul-charcoal/50" aria-labelledby="fresh-ingredients-title">
      <div className="container-custom">
        <header className="section-header">
          <h2 id="fresh-ingredients-title" className="section-title">{t.freshIngredients.title}</h2>
          <div className="divider" aria-hidden="true" />
          <p className="section-subtitle">{t.freshIngredients.subtitle}</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" role="list">
          {INGREDIENT_GROUPS.map((group, index) => (
            <article
              key={group.id}
              className="card-interactive group animate-fade-in stagger-1"
              role="listitem"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={group.image}
                  alt={group.alt}
                  className="group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-seoul-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-medium text-seoul-text group-hover:text-seoul-gold transition-colors">
                  {t.freshIngredients.categories[group.labelKey as keyof typeof t.freshIngredients.categories]}
                </h3>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <ButtonLink to="/fresh-ingredients" variant="outline-gold" size="lg">
            Xem thêm nguyên liệu
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
