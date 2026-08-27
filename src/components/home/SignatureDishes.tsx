import { Link } from 'react-router-dom';
import { Image } from '../ui/Image';
import { ButtonLink } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { useMenu } from '../../context/MenuContext';
import { getItemPriceRange } from '../../utils/menuUtils';
import { getImageForItem } from '../../utils/itemImages';

const SIGNATURE_ITEM_IDS = [
  'kimchi_octopus',
  'tom_yum_seafood',
  'hotpot_seafood',
  'bibimbap',
  'tteokbokki_assorted',
  'seoul_fried_chicken',
];

export function SignatureDishes() {
  const { t } = useLanguage();
  const { getItemById } = useMenu();

  const signatureItems = SIGNATURE_ITEM_IDS
    .map(id => getItemById(id))
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null)
    .slice(0, 6);

  return (
    <section className="section bg-seoul-charcoal/50" aria-labelledby="signature-title">
      <div className="container-custom">
        <header className="section-header">
          <h2 id="signature-title" className="section-title">Khám phá món nổi bật</h2>
          <div className="divider" aria-hidden="true" />
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" role="list">
          {signatureItems.map(({ item, category }) => {
            const range = item.price ? null : getItemPriceRange(item);
            const displayPrice = item.price
              ? new Intl.NumberFormat('vi-VN').format(parseInt(item.price)) + '₫'
              : range
                ? `${new Intl.NumberFormat('vi-VN').format(range.min)}₫`
                : '';
            return (
              <article key={item.id} className="card-interactive group animate-fade-in" role="listitem">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={getImageForItem(item.id)}
                    alt={`${item.name_vi} — ${item.description_vi}`}
                  />
                  {item.name_ko && (
                    <span className="absolute top-3 left-3 badge-gold font-korean text-xs">{item.name_ko}</span>
                  )}
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-semibold text-seoul-text group-hover:text-seoul-gold transition-colors line-clamp-1">
                      {item.name_vi}
                    </h3>
                    <p className="text-sm text-seoul-text-muted font-medium mt-0.5">{item.name_en}</p>
                  </div>
                  <p className="text-sm text-seoul-text-muted/80 line-clamp-2">{item.description_vi}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-seoul-surface">
                    <span className="text-lg font-bold text-seoul-gold">{displayPrice}</span>
                    <ButtonLink to="/menu" variant="ghost" size="sm">Xem món</ButtonLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <ButtonLink to="/menu" variant="outline-gold" size="lg">Xem thực đơn</ButtonLink>
        </div>
      </div>
    </section>
  );
}
