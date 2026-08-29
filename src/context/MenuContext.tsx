import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import type { RestaurantMenu, MenuCategory, MenuItem, AddOnItem, SearchResult } from '../types/menu';
import menuData from '../data/menu/menu.json';
import { generateAddOnCatalog, generateSearchIndex } from '../utils/menuUtils';

interface MenuContextType {
  menu: RestaurantMenu | null;
  categories: MenuCategory[];
  addOns: AddOnItem[];
  searchIndex: SearchResult[];
  loading: boolean;
  error: string | null;
  getItemById: (itemId: string) => { item: MenuItem; category: MenuCategory } | null;
  getCategoryById: (categoryId: string) => MenuCategory | null;
  searchItems: (query: string) => SearchResult[];
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState<RestaurantMenu | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate async load
        const timer = setTimeout(() => {
          try {
            // Convert geumcha-menu.json format to RestaurantMenu format
            const convertedMenu = convertMenuData(menuData);
            setMenu(convertedMenu as RestaurantMenu);
            setError(null);
          } catch (e) {
            setError('Failed to load menu data');
          } finally {
            setLoading(false);
          }
        }, 100);
        return () => clearTimeout(timer);
      }, []);

      // Helper to convert geumcha-menu.json to RestaurantMenu format
      const convertMenuData = (data: any): RestaurantMenu => {
        const categories = data.categories.map((cat: any) => ({
          id: cat.id,
          name_vi: cat.name_vi,
          name_en: cat.name_en,
          name_ko: cat.name_ko,
          items: (cat.items || []).map((item: any) => ({
            id: item.id,
            name_vi: item.name_vi,
            name_en: item.name_en,
            name_ko: item.name_ko,
            description_vi: item.description_vi || '',
            description_en: item.description_en || '',
            price: String(item.price ?? ''),
            image_reference: item.image_reference || '',
            modifiers: (item.modifiers || []).map((m: any) => ({
              name: m.name,
              type: m.type === 'multi' ? 'multi' : 'single',
              required: Boolean(m.required),
              options: (m.options || []).map((o: any) => ({
                name: o.name,
                price: Number(o.price || 0),
                name_vi: o.name_vi || o.name,
                name_en: o.name_en || o.name,
              })),
              name_vi: m.name_vi || m.name,
              name_en: m.name_en || m.name,
            })),
            needs_review: (item.description_vi || '').includes('NEEDS_VERIFICATION'),
          })),
          display_order: cat.sort_order,
        }));

        return {
          restaurant: {
            name: data.restaurant.name,
            country: 'Vietnam',
            currency: 'VND',
          },
          categories,
        };
      };

  const categories = useMemo(() => menu?.categories || [], [menu]);

  const addOns = useMemo(() => {
    if (!menu) return [];
    return generateAddOnCatalog(menu.categories);
  }, [menu]);

  const searchIndex = useMemo(() => {
    if (!menu) return [];
    return generateSearchIndex(menu.categories);
  }, [menu]);

  const getItemById = useCallback((itemId: string) => {
    if (!menu) return null;
    for (const category of menu.categories) {
      const item = category.items.find(i => i.id === itemId);
      if (item) return { item, category };
    }
    return null;
  }, [menu]);

  const getCategoryById = useCallback((categoryId: string) => {
    if (!menu) return null;
    return menu.categories.find(c => c.id === categoryId) || null;
  }, [menu]);

  const searchItems = useCallback((query: string) => {
    if (!query.trim() || !menu) return [];
    const lowerQuery = query.toLowerCase().trim();
    return searchIndex.filter(result =>
      result.item.name_vi.toLowerCase().includes(lowerQuery) ||
      result.item.name_en.toLowerCase().includes(lowerQuery) ||
      result.item.description_vi.toLowerCase().includes(lowerQuery) ||
      result.item.description_en.toLowerCase().includes(lowerQuery)
    );
  }, [searchIndex]);

  return (
    <MenuContext.Provider value={{
      menu,
      categories,
      addOns,
      searchIndex,
      loading,
      error,
      getItemById,
      getCategoryById,
      searchItems,
    }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}