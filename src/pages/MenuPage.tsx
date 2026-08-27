import { useState, useMemo, useCallback, useEffect } from 'react';
import { useMenu } from '../context/MenuContext';
import { useLanguage } from '../context/LanguageContext';
import { formatPrice, getItemPriceRange, getRequiredModifiers, getOptionalModifiers } from '../utils/menuUtils';
import { MenuItemCard } from '../components/menu/MenuItemCard';
import { MenuItemDetailModal } from '../components/menu/MenuItemDetailModal';
import { CategoryTabs } from '../components/menu/CategoryTabs';

export function MenuPage() {
  const { t, locale } = useLanguage();
  const { categories, searchItems } = useMenu();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<{ item: any; category: any } | null>(null);
  const [navSolid, setNavSolid] = useState(false);

  // Track scroll so the category navigation blends transparent -> dark
  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;

    const results = searchItems(searchQuery);
    const categoryIds = new Set(results.map(r => r.category.id));
    return categories.filter(c => categoryIds.has(c.id));
  }, [categories, searchQuery, searchItems]);

  // Get all items for search results display
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchItems(searchQuery);
  }, [searchQuery, searchItems]);

  const handleItemClick = useCallback((item: any, category: any) => {
    setSelectedItem({ item, category });
    document.body.style.overflow = 'hidden';
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedItem(null);
    document.body.style.overflow = '';
  }, []);

  const scrollToCategory = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    if (!categoryId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Category navigation — sits directly under the header, reads as one navigation system.
          Transparent at the top of the page, dark once the user scrolls. */}
      <nav
        className={`sticky top-20 md:top-24 z-30 transition-colors duration-300 ${
          navSolid ? 'bg-seoul-black/95 backdrop-blur-md border-b border-seoul-surface' : 'bg-transparent'
        }`}
        aria-label="Menu categories"
      >
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onSelect={scrollToCategory}
          searchQuery={searchQuery}
        />
      </nav>

      {/* Menu Content */}
      <main className="container-custom py-8" id="menu-content" role="main">
        {searchQuery.trim() ? (
          // Search Results View
          <section aria-labelledby="search-results-title">
            <h2 id="search-results-title" className="sr-only">
              {t.menu.title} - {searchResults.length} kết quả cho "{searchQuery}"
            </h2>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
                {searchResults.map(({ item, category }) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    category={category}
                    onClick={handleItemClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <svg className="w-16 h-16 mx-auto text-seoul-text-muted/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-seoul-text-muted text-lg">{t.menu.noResults}</p>
                <p className="text-seoul-text-muted/70 mt-1">Thử tìm với từ khóa khác</p>
              </div>
            )}
          </section>
        ) : (
          // Category View
          <div role="list">
            {filteredCategories.map((category, catIndex) => (
              <section
                key={category.id}
                id={category.id}
                className={catIndex > 0 ? 'pt-12' : ''}
                aria-labelledby={`${category.id}-title`}
                role="listitem"
              >
                <header className="mb-6 pb-4 border-b border-seoul-surface flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 id={`${category.id}-title`} className="text-xl md:text-2xl font-bold tracking-tight">
                      {locale === 'en' ? category.name_en : category.name_vi}
                    </h2>
                    <p className="text-seoul-text-muted mt-1">{locale === 'en' ? category.name_vi : category.name_en}</p>
                    {category.name_ko && (
                      <p className="font-korean text-sm text-seoul-text-muted/70 mt-1">{category.name_ko}</p>
                    )}
                  </div>
                  <span className="badge-gold">{category.items.length} món</span>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
                  {category.items.map((item, index) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      category={category}
                      onClick={handleItemClick}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* Item Detail Modal */}
      {selectedItem && (
        <MenuItemDetailModal
          item={selectedItem.item}
          category={selectedItem.category}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
