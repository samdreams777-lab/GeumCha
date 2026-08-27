export interface RestaurantInfo {
  name: string;
  country: string;
  currency: string;
}

export interface ModifierOption {
  name: string;
  price: number;
  name_vi?: string;
  name_en?: string;
}

export interface Modifier {
  name: string;
  type: 'single' | 'multi';
  required: boolean;
  options: ModifierOption[];
  name_vi?: string;
  name_en?: string;
}

export interface MenuItem {
  id: string;
  name_vi: string;
  name_en: string;
  name_ko?: string;
  description_vi: string;
  description_en: string;
  price: string; // base price as string, empty if size-based
  image_reference: string;
  modifiers: Modifier[];
  needs_review?: boolean;
}

export interface MenuCategory {
  id: string;
  name_vi: string;
  name_en: string;
  name_ko: string;
  items: MenuItem[];
  display_order: number;
}

export interface RestaurantMenu {
  restaurant: RestaurantInfo;
  categories: MenuCategory[];
}

// Derived types for UI
export interface AddOnItem {
  id: string;
  name_vi: string;
  name_en: string;
  price: number;
  image_reference?: string;
  source_modifier: string;
  source_category: string;
}

export interface SearchResult {
  item: MenuItem;
  category: MenuCategory;
  matchedField: 'name_vi' | 'name_en' | 'description_vi' | 'description_en';
}

// Language types
export type Locale = 'vi' | 'en';

export interface TranslationKeys {
  // Navigation
  nav: {
    home: string;
    menu: string;
    about: string;
    freshIngredients: string;
    contact: string;
    location: string;
  };
  // Hero
  hero: {
    bookTable: string;
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaTertiary: string;
    discoverSignature?: string;
  };

  cart: {
    title: string;
    clear: string;
    subtotal: string;
    total: string;
    checkout: string;
    addExtras: string;
    added: string;
    remove: string;
    empty: string;
  };
  // Menu
  menu: {
    title: string;
    all: string;
    searchPlaceholder: string;
    noResults: string;
    addOns: string;
    options: string;
    modifiers: string;
    selectOptions: string;
    required: string;
    optional: string;
    price: string;
    addToOrder: string;
    selectRequired: string;
    total: string;
    ingredients: string;
    sugarLevel: string;
    iceLevel: string;
    size: string;
    quantity: string;
  };
  // Fresh Ingredients
  freshIngredients: {
    title: string;
    subtitle: string;
    categories: {
      meat: string;
      seafood: string;
      vegetables: string;
      mushroomsTofu: string;
      koreanPantry: string;
      hotPotSet: string;
      addOns: string;
    };
  };
  // About
  about: {
    title: string;
    story: string;
    philosophy: string;
    atmosphere: string;
    storyText: string[];
    philosophyItems: string[];
    atmosphereText: string[];
  };
  // Location
  location: {
    title: string;
    address: string;
    hours: string;
    phone: string;
    zalo: string;
    getDirections: string;
    openInMaps: string;
    mapTitle: string;
    mapPlaceholder: string;
  };
  // Contact
  contact: {
    title: string;
    callUs: string;
    zaloChat: string;
    messenger: string;
    email: string;
    followUs: string;
  };
  // Footer
  footer: {
    rights: string;
    privacy: string;
    bookTable: string;
  };
  // Common
  common: {
    loading: string;
    error: string;
    retry: string;
    close: string;
    viewMore: string;
    viewLess: string;
    currency: string;
  };
}