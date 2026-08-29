import { Image } from '../ui/Image';
import { useLanguage } from '../../context/LanguageContext';
import type { MenuItem, MenuCategory } from '../../types/menu';
import { getImageForItem } from '../../utils/itemImages';

interface MenuItemCardProps {
  item: MenuItem;
  category: MenuCategory;
  onClick: (item: MenuItem, category: MenuCategory) => void;
}

/** Simple card — every click opens the dish modal. Extras live in the Cart. */
export function MenuItemCard({ item, category, onClick }: MenuItemCardProps) {
  const { t, formatPrice, locale } = useLanguage();

  const priceRange = item.price ? null : getItemPriceRange(item);
  const displayPrice = item.price
    ? formatPrice(item.price)
    : priceRange
      ? `${formatPrice(priceRange.min)} - ${formatPrice(priceRange.max)}`
      : '';

  const hasModifiers = item.modifiers.length > 0;
  const hasRequired = item.modifiers.some(m => m.required);

  return (
    <article className="card-interactive group" role="listitem">
      <div
        onClick={() => onClick(item, category)}
        tabIndex={0}
        role="button"
        className="flex items-stretch gap-3 sm:gap-4 p-3 sm:p-4 h-full"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(item, category);
          }
        }}
      >
        {/* Image — fixed-width column, left side */}
        <div className="relative w-24 sm:w-28 md:w-32 aspect-square sm:aspect-[4/3] shrink-0 overflow-hidden rounded-xl">
          <Image
            src={getImageForItem(item.id)}
            alt={`${item.name_vi} — ${item.description_vi}`}
            className="group-hover:scale-105 transition-transform duration-500"
          />
          {item.name_ko && (
            <span className="absolute top-1.5 left-1.5 badge-gold font-korean text-[10px] leading-none px-1.5 py-1">{item.name_ko}</span>
          )}
          {hasModifiers && !hasRequired && (
            <span className="absolute top-1.5 right-1.5 badge bg-black/50 text-white/90 backdrop-blur-sm text-[10px] leading-none px-1.5 py-1">
              {t.menu.optional}
            </span>
          )}
          {item.needs_review && (
            <span className="absolute bottom-1.5 left-1.5 badge-red text-[10px] leading-none px-1.5 py-1">Cần xem lại</span>
          )}
        </div>

        {/* Info — right side */}
        <div className="flex-1 min-w-0 flex flex-col justify-center py-0.5">
          <h3 className="font-semibold text-seoul-text group-hover:text-seoul-gold transition-colors line-clamp-1 text-sm sm:text-base">
            {locale === 'en' ? item.name_en : item.name_vi}
          </h3>
          <p className="text-xs sm:text-sm text-seoul-text-muted font-medium mt-0.5 line-clamp-1">
            {locale === 'en' ? item.name_vi : item.name_en}
          </p>
          <p className="text-xs text-seoul-text-muted/80 line-clamp-1 sm:line-clamp-2 mt-1">
            {locale === 'en' ? item.description_en : item.description_vi}
          </p>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-seoul-surface">
            <span className="text-base sm:text-lg font-bold text-seoul-gold">{displayPrice}</span>
            {hasModifiers && !hasRequired && (
              <span className="text-xs text-seoul-text-muted/80">{t.menu.optional}</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

// Helper function (duplicated from menuUtils for client-side use)
function getItemPriceRange(item: MenuItem): { min: number; max: number } | null {
  if (item.price) {
    const base = parseInt(item.price, 10);
    if (!isNaN(base)) return { min: base, max: base };
  }

  const sizeModifier = item.modifiers.find(m =>
    m.name.toLowerCase().includes('size') ||
    m.name.toLowerCase().includes('kích cỡ') ||
    m.name.toLowerCase().includes('quantity') ||
    m.name.toLowerCase().includes('số lượng')
  );
  if (sizeModifier && sizeModifier.type === 'single' && sizeModifier.required) {
    const prices = sizeModifier.options.map(o => o.price).filter(p => p > 0);
    if (prices.length > 0) {
      return { min: Math.min(...prices), max: Math.max(...prices) };
    }
  }

  return null;
}