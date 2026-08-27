import { Image } from '../components/ui/Image';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/ui/SEOHead';

const baseUrl = import.meta.env.BASE_URL;

const INGREDIENT_GROUPS = [
  {
    id: 'meat',
    labelKey: 'freshIngredients.categories.meat',
    image: `${baseUrl}images/ingredients/ingredient-fresh-meat.webp`,
    alt: 'Fresh beef, pork, chicken for Korean BBQ and hot pot',
    items: ['Thịt bò Mỹ (US Beef)', 'Thịt bò Úc', 'Thịt heo ba chỉ', 'Đùi gà tươi', 'Sườn sụn heo'],
    items_en: ['US Beef', 'Australian Beef', 'Pork Belly', 'Fresh Chicken Thigh', 'Pork Ribs'],
  },
  {
    id: 'seafood',
    labelKey: 'freshIngredients.categories.seafood',
    image: `${baseUrl}images/ingredients/ingredient-fresh-seafood.webp`,
    alt: 'Fresh shrimp, squid, fish for Korean cooking',
    items: ['Tôm sú tươi', 'Mực ống', 'Cá basa', 'Bạch tuộc', 'Sò điệp', 'Cá hồi'],
    items_en: ['Fresh Tiger Prawns', 'Squid', 'Basa Fish', 'Octopus', 'Scallops', 'Salmon'],
  },
  {
    id: 'vegetables',
    labelKey: 'freshIngredients.categories.vegetables',
    image: `${baseUrl}images/ingredients/ingredient-vegetables.webp`,
    alt: 'Fresh napa cabbage, crown daisy, carrots, onions, bean sprouts',
    items: ['Cải thảo (Napa cabbage)', 'Cải ngọt (Crown daisy)', 'Cà rốt', 'Hành tây', 'Giá đỗ', 'Hành lá', 'Rau muống'],
    items_en: ['Napa Cabbage', 'Crown Daisy', 'Carrots', 'Onion', 'Bean Sprouts', 'Green Onion', 'Water Spinach'],
  },
  {
    id: 'mushroomsTofu',
    labelKey: 'freshIngredients.categories.mushroomsTofu',
    image: `${baseUrl}images/ingredients/ingredient-mushrooms-tofu.webp`,
    alt: 'Fresh enoki, king oyster mushrooms, soft tofu, fried tofu',
    items: ['Nấm kim châm (Enoki)', 'Nấm hương', 'Nấm bào ngư', 'Đậu hũ non', 'Đậu hũ chiên', 'Đậu hũ nước'],
    items_en: ['Enoki Mushroom', 'Shiitake', 'Oyster Mushroom', 'Soft Tofu', 'Fried Tofu', 'Silken Tofu'],
  },
  {
    id: 'koreanPantry',
    labelKey: 'freshIngredients.categories.koreanPantry',
    image: `${baseUrl}images/ingredients/ingredient-korean-pantry.webp`,
    alt: 'Kimchi, gochujang, doenjang, sesame oil, rice cakes, noodles',
    items: ['Kimchi cải thảo', 'Gochujang (Tương ớt)', 'Doenjang (Tương đậu nành)', 'Dầu mè', 'Bánh gạo (Tteok)', 'Mì ramen Hàn Quốc', 'Mì lạnh (Naengmyeon)'],
    items_en: ['Napa Kimchi', 'Gochujang (Chili Paste)', 'Doenjang (Soybean Paste)', 'Sesame Oil', 'Rice Cakes (Tteok)', 'Korean Ramen', 'Cold Noodles (Naengmyeon)'],
  },
  {
    id: 'hotPotSet',
    labelKey: 'freshIngredients.categories.hotPotSet',
    image: `${baseUrl}images/ingredients/ingredient-hot-pot-set.webp`,
    alt: 'Complete hot pot ingredient platter ready to cook',
    items: ['Combo Lẩu Hải Sản', 'Combo Lẩu Bò', 'Combo Lẩu Thập Cẩm', 'Rau lẩu thêm', 'Mì lẩu thêm'],
    items_en: ['Seafood Hot Pot Set', 'Beef Hot Pot Set', 'Mixed Hot Pot Set', 'Extra Hot Pot Veggies', 'Extra Hot Pot Noodles'],
  },
  {
    id: 'addOns',
    labelKey: 'freshIngredients.categories.addOns',
    image: `${baseUrl}images/ingredients/ingredient-addons.webp`,
    alt: 'Paid add-on portions: egg, cheese, extra meat, seafood',
    items: ['Trứng gà', 'Kimchi thêm', 'Phô mai', 'Thịt bò thêm', 'Tôm thêm', 'Mực thêm', 'Bạch tuộc thêm', 'Mì thêm', 'Nấm kim châm thêm'],
    items_en: ['Egg', 'Extra Kimchi', 'Cheese', 'Extra Beef', 'Extra Shrimp', 'Extra Squid', 'Extra Octopus', 'Extra Noodles', 'Extra Enoki'],
  },
];

export function FreshIngredientsPage() {
  const { t, locale } = useLanguage();

  return (
    <>
      <SEOHead pageType="fresh-ingredients" />
      <section className="section pt-32" aria-labelledby="fresh-title">
        <div className="container-custom">
          <header className="section-header max-w-3xl mx-auto text-center mb-16">
            <h1 id="fresh-title" className="section-title">{t.freshIngredients.title}</h1>
            <div className="divider" aria-hidden="true" />
            <p className="section-subtitle">{t.freshIngredients.subtitle}</p>
          </header>

          <div className="space-y-16">
            {INGREDIENT_GROUPS.map((group, index) => (
              <article
                key={group.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                role="region"
                aria-labelledby={`${group.id}-title`}
              >
                <div className={index % 2 === 0 ? '' : 'lg:order-2'}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image
                      src={group.image}
                      alt={group.alt}
                      priority={index < 2}
                    />
                  </div>
                </div>
                <div className={index % 2 === 0 ? '' : 'lg:order-1'}>
                  <h2 id={`${group.id}-title`} className="text-2xl md:text-3xl font-bold text-seoul-text mb-4">
                    {t.freshIngredients.categories[group.labelKey as keyof typeof t.freshIngredients.categories]}
                  </h2>
                  <p className="text-seoul-text-muted leading-relaxed mb-6">
                    {locale === 'en'
                      ? 'We carefully select every ingredient to ensure the best quality for your dishes.'
                      : 'Chúng tôi chọn lọc kỹ lưỡng từng nguyên liệu để đảm bảo chất lượng tốt nhất cho món ăn của bạn.'}
                  </p>
                  <ul className="space-y-3" role="list">
                    {(locale === 'en' ? group.items_en : group.items).map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-3 text-seoul-text-muted animate-fade-in" style={{ animationDelay: `${(index * 0.1) + (itemIndex * 0.05)}s` }}>
                        <svg className="w-5 h-5 flex-shrink-0 text-seoul-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16 pt-8 border-t border-seoul-surface">
            <h3 className="text-xl font-semibold text-seoul-text mb-3">
              {t.hero.headline.includes('Hàn') ? 'Muốn trải nghiệm nguyên liệu tươi nhất?' : 'Want to experience the freshest ingredients?'}
            </h3>
            <p className="text-seoul-text-muted mb-6 max-w-md mx-auto">
              {t.hero.headline.includes('Hàn')
                ? 'Đến trực tiếp Seoul Korean Cuisine để chọn nguyên liệu tươi sống và nấu theo ý thích của bạn.'
                : 'Visit Seoul Korean Cuisine to hand-pick fresh ingredients and cook your way.'}
            </p>
            <a
              href="/menu"
              className="inline-flex items-center gap-2 text-seoul-gold font-semibold hover:text-seoul-gold/80 transition-colors"
            >
              <span>{t.menu.title}</span>
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
