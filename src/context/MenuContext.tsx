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
        setMenu(menuData as RestaurantMenu);
        setError(null);
      } catch (e) {
        setError('Failed to load menu data');
      } finally {
        setLoading(false);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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