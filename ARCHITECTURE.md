# ARCHITECTURE.md

## Application Architecture

**Stack**: React 18 + TypeScript + Vite + Tailwind CSS
**Routing**: React Router v6 (HashRouter for static hosting compatibility)
**State**: React Context + useReducer for language, menu, cart
**Data**: JSON-driven menu from `/src/data/menu/menu.json`
**Images**: `/public/images/menu/` and `/public/images/ingredients/`
**Build**: Vite production build with code splitting
**Deployment**: Static hosting (Netlify, Vercel, or GitHub Pages)

---

## Routing

```
/                          → HomePage
/menu                      → MenuPage (with category anchor links)
/menu/:categoryId          → MenuPage scrolled to category
/menu/:categoryId/:itemId  → MenuItemDetailModal (URL-synced)
/about                     → AboutPage
/fresh-ingredients         → FreshIngredientsPage
/contact                   → ContactPage
/location                  → LocationPage
/privacy                   → PrivacyPage
```

Language prefix is NOT used in URLs. Language is stored in localStorage and applied via Context.

---

## Component Architecture

### Layout Components
- `Layout` — Root wrapper, providers, SEO head
- `Header` — Logo, language switcher, desktop nav
- `Footer` — NAP, links, language switcher, copyright
- `StickyMobileNav` — Bottom bar: Menu, Map, Call, Zalo, Review

### Homepage Sections
- `Hero` — Full-screen hero with background image, CTAs
- `SignatureDishes` — Horizontal scroll of 4–6 featured items
- `RestaurantIntro` — Story, philosophy, atmosphere
- `FreshIngredientsPreview` — Teaser linking to /fresh-ingredients
- `MenuCategories` — Category cards linking to /menu#category
- `WhyUs` — Value propositions
- `SocialProof` — Google reviews, rating, CTA
- `LocationSection` — Address, map preview, directions CTA
- `ContactSection` — Phone, Zalo, quick actions

### Menu Page
- `MenuPage` — Category tabs (horizontal scroll), search, item grid
- `MenuCategory` — Section per category
- `MenuItemCard` — Image, name (VI/EN/KO), description, price, CTA
- `MenuItemDetailModal` — Full detail: image, ingredients, modifiers, add-ons, quantity, CTA

### Modifiers & Add-ons
- `ModifierSelector` — Single (radio) or Multi (checkbox) selector
- `AddOnSelector` — Visual ingredient cards with price

### Fresh Ingredients
- `FreshIngredientsPage` — Grouped ingredient cards
- `IngredientCard` — Image, name, description, category badge

### Shared UI
- `Button` — Primary, secondary, ghost, CTA variants
- `Image` — Responsive, lazy-loaded, WebP/AVIF, srcset, blur placeholder
- `LanguageSwitcher` — VI | EN toggle, persists to localStorage
- `Modal` — Accessible, focus-trap, escape-close
- `SearchInput` — Debounced menu search
- `CategoryTabs` — Horizontal scrolling tabs with active indicator

---

## Data Architecture

```
/src/data/
  menu/
    menu.json           # Complete menu data (categories, items, modifiers, add-ons)
    categories.json     # Derived: category order, metadata
    addons.json         # Derived: global add-on catalog
  i18n/
    vi.json             # Vietnamese UI strings
    en.json             # English UI strings
  restaurant/
    info.json           # NAP, hours, social, coordinates
    seo.json            # Default SEO values per page
```

All menu data is typed via TypeScript interfaces (see MENU_SCHEMA.md).

---

## Image Architecture

```
/public/images/
  menu/
    *.webp              # Optimized menu item images (800w, 400w)
    *.avif              # AVIF variants where supported
  ingredients/
    *.webp              # Ingredient group images
  hero/
    hero-desktop.webp   # 1920w
    hero-mobile.webp    # 800w
  og/
    og-default.webp     # 1200x630 Open Graph default
```

**Naming**: kebab-case, descriptive: `kimchi-ramen.webp`, `fresh-beef-korean-cuisine.webp`
**Responsive**: `srcset` with 400w, 800w, 1200w; `sizes` per component
**Lazy**: `loading="lazy"` except hero; `decoding="async"`
**Dimensions**: Explicit `width`/`height` on all `<img>` to prevent CLS

---

## Localization Architecture

**Context**: `LanguageContext` provides `{ locale, setLocale, t }`
**Storage**: `localStorage.setItem('locale', 'vi' | 'en')`
**Default**: `vi`
**SSR**: Not applicable (static site). Language applied on mount.
**Translation keys**: Nested JSON, e.g., `header.menu`, `menu.addOns`
**Korean names**: Stored in menu data as `name_ko`, rendered optionally under VI/EN name

---

## SEO Architecture

**Per-page**: Unique `title`, `meta.description`, `canonical`, `og:*`, `twitter:*`, `hreflang`
**Structured Data**: JSON-LD injected via `SEOHead` component
- Home: `Restaurant`, `LocalBusiness`, `FoodEstablishment`
- Menu: `Menu`, `MenuSection`, `MenuItem`
- Location: `LocalBusiness` with `geo`, `openingHoursSpecification`
- Fresh Ingredients: `ItemList` of ingredients
**Sitemap**: Generated at build (`vite-plugin-sitemap`)
**Robots**: `/public/robots.txt` with sitemap reference

---

## Responsive Strategy

**Mobile-first** Tailwind breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
**Menu grid**: 1 col (mobile) → 2 col (tablet) → 3 col (desktop)
**Category tabs**: Horizontal scroll on all sizes, snap-x
**StickyMobileNav**: Fixed bottom on mobile only (`md:hidden`)

---

## Performance Strategy

- **Code splitting**: Route-level `React.lazy` + `Suspense`
- **Images**: WebP/AVIF via Vite imagetools or pre-generated; `srcset`/`sizes`
- **Fonts**: Self-hosted Inter + Noto Sans KR (subset for Korean dish names only), `font-display: swap`, preload
- **Maps**: Lazy-load Google Maps iframe on IntersectionObserver
- **JS**: Minimal deps; no heavy UI libraries; tree-shaken Tailwind
- **Caching**: Static assets with long-term cache headers (Netlify/Vercel defaults)
- **Target**: LCP < 2.5s on mobile 4G, Lighthouse Perf > 90