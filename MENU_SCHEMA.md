# MENU_SCHEMA.md

## Complete Menu Data Model

This document describes the authoritative data structure for the Seoul Korean Cuisine digital menu. All menu data is sourced from `menu.json` and must not be hardcoded into components.

---

## Top-Level Structure

```typescript
interface RestaurantMenu {
  restaurant: RestaurantInfo;
  categories: MenuCategory[];
}

interface RestaurantInfo {
  name: string;           // "Seoul Korean Cuisine"
  country: string;        // "Vietnam"
  currency: string;       // "VND"
}
```

---

## Category Model

```typescript
interface MenuCategory {
  id: string;                    // Unique slug: "cat_ramen", "cat_hotpot", etc.
  name_vi: string;               // Vietnamese display name
  name_en: string;               // English display name
  name_ko: string;               // Korean display name (optional, for authenticity)
  items: MenuItem[];
  display_order: number;         // For consistent ordering
}
```

### Actual Categories (8 total)

| ID | Vietnamese | English | Korean | Items |
|----|------------|---------|--------|-------|
| `cat_ramen` | Mì Kim Chi & Mì Lẩu Thái | Korean Ramen | 라면 | 22 |
| `cat_hotpot` | Lẩu | Hot Pot | 전골 | 5 |
| `cat_rice_noodles` | Cơm, Mì & Món Trộn | Rice & Noodles | 밥 & 면 | 10 |
| `cat_street_food` | Tokbokki & Món Bánh | Korean Street Food | 한국 길거리 음식 | 13 |
| `cat_chicken` | Món Gà | Korean Chicken | 닭고기 요리 | 3 |
| `cat_snacks` | Ăn Vặt | Snacks | 간식 | 12 |
| `cat_desserts` | Yogurt & Nước Ép | Desserts & Juices | 요구르트 & 주스 | 8 |
| `cat_drinks` | Giải Khát | Drinks | 음료 | 14 |

**Total Items: 81** (matches statistics)

---

## Menu Item Model

```typescript
interface MenuItem {
  id: string;                      // Unique slug: "kimchi_octopus", "bibimbap", etc.
  name_vi: string;                 // Vietnamese name (required)
  name_en: string;                 // English name (required)
  name_ko?: string;                // Korean name (optional, verified only)
  description_vi: string;          // Vietnamese description
  description_en: string;          // English description
  price: string;                   // Base price as string (VND, no formatting)
  image_reference: string;         // Image filename without extension
  modifiers: Modifier[];           // Array of modifier groups
  needs_review?: boolean;          // Flag for items needing verification
}
```

### Price Handling
- **Simple items**: `price` is a string like `"55000"` (base price)
- **Items with required size**: `price` is `""` (empty), actual prices in Size modifier options
- **Currency**: Always VND (Vietnamese Dong), no decimals
- **Display**: Format as `55,000₫` in UI

### Image Reference
- Maps to `/public/images/menu/{image_reference}.webp`
- Current references: `img_02` through `img_19` (18 unique images)
- Multiple items share the same reference image

---

## Modifier Model

```typescript
interface Modifier {
  name: string;                    // Display name: "Extra Ingredients", "Size", "Sugar Level"
  type: "single" | "multi";        // Single = radio (pick one), Multi = checkbox (pick many)
  required: boolean;               // Must user select before adding to cart?
  options: ModifierOption[];
}

interface ModifierOption {
  name: string;                    // Display name: "Small", "Egg (Trứng)", "0%"
  price: number;                   // Additional price in VND (0 for free options)
}
```

### Modifier Types by Category

#### 1. Ramen Items (cat_ramen) — 2 items have modifiers
- **`kimchi_octopus`**, **`kimchi_beef`**, **`tom_yum_octopus`**, **`tom_yum_beef`** have:
  - **Extra Ingredients** (multi, optional) — 17 options, prices 10,000–25,000₫

#### 2. Hot Pot Items (cat_hotpot) — 4 items have modifiers
- All 4 main hot pots have:
  - **Size** (single, required) — Small / Large, prices 229,000–399,000₫
- **`hotpot_seafood`** additionally has:
  - **Extra Hot Pot Ingredients** (multi, optional) — 13 options, prices 15,000–60,000₫

#### 3. Rice & Noodles (cat_rice_noodles) — 3 items have modifiers
- **`fried_rice_beef`**, **`fried_rice_seafood`**, **`fried_rice_assorted`** have:
  - **Size** (single, required) — Small / Large, prices 50,000–110,000₫

#### 4. Street Food (cat_street_food) — 1 item has modifiers
- **`takoyaki`** has:
  - **Quantity** (single, required) — 4 Pieces / 6 Pieces, prices 40,000 / 50,000₫

#### 5. Drinks (cat_drinks) — 6 items have modifiers
- All tea-based drinks (6 items) have:
  - **Sugar Level** (single, required) — 0%, 30%, 50%, 100% (all free)
  - **Ice Level** (single, required) — No Ice, Less Ice, Normal Ice (all free)
- Sodas (Coca Cola, Pepsi, Sprite, Sting) have:
  - **Ice Level** (single, optional) — No Ice, Less Ice, Normal Ice (all free)

---

## Modifier Options Catalog (Paid Add-ons)

All paid add-ons extracted from modifiers with `price > 0`:

### Extra Ingredients (Ramen)
| Name (VI) | Name (EN) | Price (₫) |
|-----------|-----------|-----------|
| Trứng | Egg | 10,000 |
| Kimchi | Kimchi | 15,000 |
| Cải Tím | Red Cabbage | 15,000 |
| Bông Cải | Broccoli | 15,000 |
| Kim Châm | Enoki Mushroom | 15,000 |
| Xúc Xích | Sausage | 15,000 |
| Cá Viên | Fish Ball | 15,000 |
| Cá Basa | Pangasius | 18,000 |
| Sườn Sụn | Pork Cartilage | 20,000 |
| Bò | Beef | 22,000 |
| Tôm | Shrimp | 22,000 |
| Bạch Tuộc | Octopus | 22,000 |
| Bò Mỹ | US Beef | 22,000 |
| Mực | Squid | 22,000 |
| Đùi Gà | Chicken Thigh | 22,000 |
| Mì Thêm | Extra Noodle | 25,000 |

### Extra Hot Pot Ingredients
| Name (VI) | Name (EN) | Price (₫) |
|-----------|-----------|-----------|
| Mì Thêm | Extra Noodle | 15,000 |
| Kimchi | Kimchi | 35,000 |
| Rau Thêm | Extra Vegetables | 35,000 |
| Kim Châm | Enoki Mushroom | 35,000 |
| Cá Viên | Fish Ball | 35,000 |
| Xúc Xích | Sausage | 35,000 |
| Viên Lẩu | Hot Pot Balls | 35,000 |
| Bò | Beef | 50,000 |
| Bò Mỹ | US Beef | 50,000 |
| Sườn Sụn | Pork Cartilage | 50,000 |
| Cá Basa | Pangasius | 50,000 |
| Tôm | Shrimp | 60,000 |
| Bạch Tuộc | Octopus | 60,000 |
| Mực | Squid | 60,000 |

### Size Options (Required)
| Item | Small | Large |
|------|-------|-------|
| Hot Pot Seafood | 269,000 | 369,000 |
| Hot Pot Beef | 229,000 | 329,000 |
| Hot Pot US Beef | 229,000 | 329,000 |
| Hot Pot Assorted | 299,000 | 399,000 |
| Fried Rice Beef | 50,000 | 95,000 |
| Fried Rice Seafood | 50,000 | 95,000 |
| Fried Rice Assorted | 60,000 | 110,000 |
| Takoyaki (4pc) | 40,000 | 50,000 (6pc) |

---

## Drink Modifiers (Free Options)

### Sugar Level (Required for teas)
- 0% — `price: 0`
- 30% — `price: 0`
- 50% — `price: 0`
- 100% — `price: 0`

### Ice Level (Required for teas, Optional for sodas)
- No Ice — `price: 0`
- Less Ice — `price: 0`
- Normal Ice — `price: 0`

---

## Korean Names Policy

- Korean names (`name_ko`) are **optional** cultural/authenticity elements
- Only include when **verified** from actual menu/source
- Do NOT auto-translate or invent Korean names
- Display: Optional line under VI/EN name in menu detail
- NOT a website language — no `/ko` routes, no Korean SEO

---

## Image References Mapping

Current `image_reference` values in menu.json (18 unique):

| Reference | Likely Dishes | File Exists |
|-----------|--------------|-------------|
| `img_02` | Kimchi Ramen variants, Tom Yum variants | ✅ (multiple photos) |
| `img_03` | Kimchi Ramen variants, Tom Yum variants | ✅ |
| `img_04` | Tom Yum variants, Hot Pot | ✅ |
| `img_05` | Tom Yum variants, Hot Pot | ✅ |
| `img_06` | Hot Pot variants | ✅ |
| `img_07` | US Beef Hot Pot | ✅ |
| `img_08` | (Not referenced in current data) | - |
| `img_09` | Kimbap, Fried Kimbap, Dumplings, Golden Ball | ✅ |
| `img_10` | Takoyaki, Korean Pancakes, Fresh Milk Cake | ✅ |
| `img_11` | Bibimbap, Jajangmyeon | ✅ |
| `img_12` | Mixed Noodles | ✅ |
| `img_13` | Tteokbokki variants | ✅ |
| `img_14` | Korean Chicken variants | ✅ |
| `img_15` | Snacks (Tempura, Cheese Tofu, Spring Rolls, etc.) | ✅ |
| `img_16` | Assorted Snacks, Fries, Cheese Sticks | ✅ |
| `img_17` | Yogurts, Juices | ✅ |
| `img_18` | All Drinks | ✅ |
| `img_19` | Fried Rice, Calamari, Chicken Feet | ✅ |

**Note**: 24 image files exist in `menu_photos/` but only 18 unique references in menu.json. Some photos are duplicates/alternates.

---

## Data Validation Rules

1. Every `category.id` must be unique
2. Every `item.id` must be unique across all categories
3. Every `modifier.name` within an item must be unique
4. If `item.price === ""`, item MUST have a required `Size` modifier
5. All `price` values are non-negative integers (VND)
6. `image_reference` should map to existing file in `/public/images/menu/`
7. `needs_review: true` items must be flagged in admin/dev UI

---

## Derived Data Files (Generated at Build)

- `categories.json` — Category metadata for navigation
- `addons.json` — Flattened global add-on catalog for Fresh Ingredients page
- `search-index.json` — Item search index (name_vi, name_en, description_vi, description_en)

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| Categories | 8 |
| Total Menu Items | 81 |
| Items with Modifiers | 16 |
| Total Modifier Groups | 52 |
| Paid Add-on Options | 30 unique |
| Items with Size Options | 4 |
| Items with Sugar/Ice Options | 6 (teas) + 4 (sodas) = 10 |
| Unique Image References | 18 |
| Items Needing Review | 1 (`matcha_milk_tea`) |