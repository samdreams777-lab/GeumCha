import { useLanguage } from '../../context/LanguageContext';
import type { MenuCategory } from '../../types/menu';

interface CategoryTabsProps {
  categories: MenuCategory[];
  activeCategory: string | null;
  onSelect: (categoryId: string) => void;
  searchQuery?: string;
}

export function CategoryTabs({ categories, activeCategory, onSelect, searchQuery }: CategoryTabsProps) {
  const { t, locale } = useLanguage();

  // Filter categories to only show those with items matching search
  const visibleCategories = searchQuery?.trim()
    ? categories // In search mode, show all but highlight matches
    : categories;

  return (
    <div className="container-custom">
      <div
        className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide snap-x"
        role="tablist"
        aria-label="Menu categories"
      >
        {/* All Categories Button */}
        <button
          role="tab"
          aria-selected={!activeCategory}
          onClick={() => onSelect('')}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap snap-start touch-target ${
            !activeCategory
              ? 'bg-seoul-gold text-seoul-black shadow-md'
              : 'bg-seoul-surface text-seoul-text-muted hover:text-seoul-text hover:bg-seoul-text-muted/10'
          }`}
        >
          {t.menu.all}
        </button>

        {visibleCategories.map(category => (
          <button
            key={category.id}
            role="tab"
            aria-selected={activeCategory === category.id}
            onClick={() => onSelect(category.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              activeCategory === category.id
                ? 'bg-seoul-gold text-seoul-black shadow-md'
                : 'bg-seoul-surface text-seoul-text-muted hover:text-seoul-text hover:bg-seoul-text-muted/10'
            }`}
          >
            {locale === 'en' ? category.name_en : category.name_vi}
          </button>
        ))}
      </div>
    </div>
  );
}