import type { MenuCategory, MenuItem, AddOnItem, SearchResult } from '../types/menu';

/** Localized label for a modifier or option, falling back to the base `name`. */
export function ModLabel(
  obj: { name: string; name_vi?: string; name_en?: string } | undefined,
  locale: 'vi' | 'en'
): string {
  if (!obj) return '';
  if (locale === 'en') return obj.name_en || obj.name;
  return obj.name_vi || obj.name;
}

export function generateAddOnCatalog(categories: MenuCategory[]): AddOnItem[] {
  const addOnMap = new Map<string, AddOnItem>();

  for (const category of categories) {
    for (const item of category.items) {
      for (const modifier of item.modifiers) {
        if (modifier.type === 'multi') {
          for (const option of modifier.options) {
            if (option.price > 0) {
              const key = `${category.id}-${modifier.name}-${option.name}`;
              if (!addOnMap.has(key)) {
                addOnMap.set(key, {
                  id: key.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                  name_vi: option.name_vi || option.name,
                  name_en: option.name_en || option.name,
                  price: option.price,
                  image_reference: `addon-${option.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
                  source_modifier: modifier.name,
                  source_category: category.id,
                });
              }
            }
          }
        }
      }
    }
  }

  return Array.from(addOnMap.values());
}

export function generateSearchIndex(categories: MenuCategory[]): SearchResult[] {
  const index: SearchResult[] = [];

  for (const category of categories) {
    for (const item of category.items) {
      index.push({
        item,
        category,
        matchedField: 'name_vi',
      });
    }
  }

  return index;
}

export function formatPrice(price: number | string, locale: 'vi' | 'en' = 'vi'): string {
  const num = typeof price === 'string' ? parseInt(price, 10) : price;
  if (isNaN(num)) return '';
  return new Intl.NumberFormat(locale === 'vi' ? 'vi-VN' : 'en-US').format(num) + '₫';
}

export function getItemPriceRange(item: MenuItem): { min: number; max: number } | null {
  if (item.price) {
    const base = parseInt(item.price, 10);
    if (!isNaN(base)) return { min: base, max: base };
  }

  // Check for size modifier
  const sizeModifier = item.modifiers.find(m => m.name.toLowerCase().includes('size') || m.name.toLowerCase().includes('kích cỡ') || m.name.toLowerCase().includes('quantity') || m.name.toLowerCase().includes('số lượng'));
  if (sizeModifier && sizeModifier.type === 'single' && sizeModifier.required) {
    const prices = sizeModifier.options.map(o => o.price).filter(p => p > 0);
    if (prices.length > 0) {
      return { min: Math.min(...prices), max: Math.max(...prices) };
    }
  }

  return null;
}

export function hasRequiredModifiers(item: MenuItem): boolean {
  return item.modifiers.some(m => m.required);
}

export function getRequiredModifiers(item: MenuItem) {
  return item.modifiers.filter(m => m.required);
}

export function getOptionalModifiers(item: MenuItem) {
  return item.modifiers.filter(m => !m.required);
}