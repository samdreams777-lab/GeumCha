# IMAGE_PLAN.md

## Image Strategy for Seoul Korean Cuisine

**Photography Style**: Premium Korean casual dining, modern Seoul after dark
**Consistency**: Single cohesive photo shoot aesthetic across all images
**Format**: WebP primary, AVIF progressive enhancement
**Responsive**: Multiple widths per image via srcset

---

## Required Image Inventory (MVP: 18-20 Images)

### 1. Hero Images (2)
| Key | Description | Aspect | Widths |
|-----|-------------|--------|--------|
| `hero-desktop` | Korean hot pot bubbling + kimchi ramen side by side on dark stone table, warm restaurant lighting, black ceramic ware | 16:9 | 1920w, 1280w, 800w |
| `hero-mobile` | Single signature dish (kimchi ramen or hot pot) vertical crop, dark negative space top for text overlay | 4:5 | 800w, 640w, 480w |

### 2. Signature Dishes — Homepage & Menu (8)
| Key | Dish | Category | Reference |
|-----|------|----------|-----------|
| `kimchi-ramen` | Kimchi Ramen (representative: octopus or beef) | cat_ramen | img_02 |
| `tom-yum-ramen` | Tom Yum Ramen (representative) | cat_ramen | img_04 |
| `korean-hot-pot` | Seafood Hot Pot (large, bubbling) | cat_hotpot | img_06 |
| `bibimbap` | Bibimbap in black stone bowl (dolsot) | cat_rice_noodles | img_11 |
| `tteokbokki` | Assorted Tteokbokki (spicy rice cakes) | cat_street_food | img_13 |
| `korean-fried-chicken` | Seoul Fried Chicken Thigh (crispy, glazed) | cat_chicken | img_14 |
| `kimbap-set` | Kimbap + Fried Kimbap + Dumplings platter | cat_street_food | img_09 |
| `spring-rolls` | Vietnamese Crispy Spring Rolls (Korean style) | cat_snacks | img_15 |

### 3. Drinks (3)
| Key | Drink | Category | Reference |
|-----|-------|----------|-----------|
| `milk-tea` | Seoul Milk Tea (tall glass, pearls visible) | cat_drinks | img_18 |
| `matcha-milk-tea` | Matcha Milk Tea (green gradient layers) | cat_drinks | img_18 |
| `lemon-tea` | Peach/Lemon Tea (golden, lemon slices, ice) | cat_drinks | img_18 |

### 4. Dessert (1)
| Key | Item | Category | Reference |
|-----|------|----------|-----------|
| `yogurt-dessert` | Assorted Yogurt cups (blueberry, strawberry, mango, original) | cat_desserts | img_17 |

### 5. Fresh Ingredients — /fresh-ingredients Page (6-8 Group Shots)
| Key | Group | Contents | Notes |
|-----|-------|----------|-------|
| `ingredients-fresh-meat` | Fresh Meat | Beef slices (marbled), pork belly, chicken thigh | Raw, on stainless tray, dark stone bg |
| `ingredients-fresh-seafood` | Fresh Seafood | Whole shrimp, squid tubes, fish fillet, clams | On ice or wet stone, glistening |
| `ingredients-vegetables` | Fresh Vegetables | Napa cabbage, crown daisy, carrots, onions, bean sprouts, green onions | Whole + prepped, vibrant colors |
| `ingredients-mushrooms-tofu` | Mushrooms & Tofu | Enoki, king oyster, shiitake, soft tofu, fried tofu | Grouped in black ceramic bowls |
| `ingredients-korean-pantry` | Korean Pantry | Kimchi (jar + portion), gochujar, doenjang, sesame oil, rice cakes, noodles | Authentic packaging or decanted |
| `ingredients-hot-pot` | Hot Pot Set | Combined: meat, seafood, veg, mushrooms, tofu, noodles on large platter | "Ready to cook" composition |
| `ingredients-bbq` | Korean BBQ Set | Marinated beef (bulgogi), pork belly, lettuce wraps, ssamjang, garlic | If BBQ menu exists |
| `ingredients-addons` | Paid Add-ons Display | Small portions of each paid add-on: egg, cheese, extra noodles, meats | Visual modifier reference |

---

## Existing Assets Audit

### Current Files (24 in `menu_photos/`)

| Filename | Maps To | Quality | Use? |
|----------|---------|---------|------|
| lucid-origin_Korean_Jajangmyeon...webp | Jajangmyeon (img_11) | ✅ Good | Yes |
| lucid-origin_Authentic_Korean_Kimbap...webp | Kimbap set (img_09) | ✅ Good | Yes |
| lucid-origin_Assorted_Korean_snack_platter...webp | Assorted snacks (img_16) | ✅ Good | Yes |
| lucid-origin_Korean-style_Takoyaki...webp | Takoyaki (img_10) | ✅ Good | Yes |
| lucid-origin_Premium_Korean_yogurt_dessert...webp | Yogurt dessert (img_17) | ✅ Good | Yes |
| lucid-origin_Fresh_raw_ingredients...webp | Fresh ingredients hero (ingredients-hot-pot) | ✅ Good | Yes |
| lucid-origin_Vietnamese_crispy_spring_rolls...webp | Spring rolls (img_15) | ✅ Good | Yes |
| lucid-origin_Traditional_Korean_bibimbap...webp | Bibimbap (img_11) | ✅ Good | Yes |
| lucid-origin_Thai-Korean_fusion_hot_pot...webp | Tom Yum Hot Pot (img_04/06) | ✅ Good | Yes |
| lucid-origin_Same_transparent_tall_glass...webp | All drinks reference (img_18) | ✅ Good | Yes |
| lucid-origin_Premium_Korean_restaurant_french_fries...webp | Fries (img_16) | ✅ Good | Yes |
| lucid-origin_Korean_spicy_tteokbokki...webp | Tteokbokki (img_13) | ✅ Good | Yes |
| lucid-origin_Korean_sparkling_soda_drink...webp | Soda drinks (img_18) | ✅ Good | Yes |
| lucid-origin_Korean_snack_assortment...webp | Snacks (img_16) | ✅ Good | Yes |
| lucid-origin_Korean_seafood_ramen...webp | Seafood ramen (img_02/04) | ✅ Good | Yes |
| lucid-origin_Korean_restaurant_sushi_roll_platter...webp | Roll set (img_09/10) | ✅ Good | Yes |
| lucid-origin_Korean_mixed_noodles_dish...webp | Mixed noodles (img_12) | ✅ Good | Yes |
| lucid-origin_Korean_milk_tea...webp | Milk tea (img_18) | ✅ Good | Yes |
| lucid-origin_Korean_lemon_tea...webp | Lemon tea (img_18) | ✅ Good | Yes |
| lucid-origin_Korean_matcha_milk_tea...webp | Matcha milk tea (img_18) | ✅ Good | Yes |
| lucid-origin_Korean_crispy_fried_chicken_without_sauce...webp | Fried chicken plain (img_14) | ✅ Good | Yes |
| lucid-origin_Korean_crispy_fried_chicken...webp | Fried chicken glazed (img_14) | ✅ Good | Yes |
| lucid-origin_A_Korean_seafood_hot_pot...webp | Seafood hot pot (img_06) | ✅ Good | Yes |
| lucid-origin_A_Korean_kimchi_ramen_dish...webp | Kimchi ramen (img_02) | ✅ Good | Yes |

**All 24 are high-quality, consistent style (dark stone, black ceramic, warm lighting).**
**Action**: Rename to semantic filenames, generate WebP/AVIF variants, create responsive sizes.

---

## Naming Convention

```
{category}-{subject}-{variant?}.{ext}
```

### Categories
- `hero` — Hero/background images
- `menu` — Menu item photos
- `ingredient` — Fresh ingredient groups
- `addon` — Paid add-on portions
- `og` — Open Graph social shares

### Examples
```
hero-desktop.webp
hero-mobile.webp
menu-kimchi-ramen.webp
menu-tom-yum-ramen.webp
menu-korean-hot-pot.webp
menu-bibimbap.webp
menu-tteokbokki-assorted.webp
menu-fried-chicken-seoul.webp
menu-kimbap-set.webp
menu-spring-rolls.webp
menu-milk-tea.webp
menu-matcha-milk-tea.webp
menu-lemon-tea.webp
menu-yogurt-assorted.webp
ingredient-fresh-meat.webp
ingredient-fresh-seafood.webp
ingredient-vegetables.webp
ingredient-mushrooms-tofu.webp
ingredient-korean-pantry.webp
ingredient-hot-pot-set.webp
ingredient-addons.webp
og-default.webp
og-menu.webp
og-fresh-ingredients.webp
```

---

## Responsive Image Specifications

### Breakpoints & Widths
| Breakpoint | Width | Use Case |
|------------|-------|----------|
| Mobile | 400w | Thumbnails, mobile cards |
| Tablet | 800w | Tablet cards, mobile hero |
| Desktop | 1200w | Desktop cards, detail modals |
| Large | 1920w | Hero desktop, full-screen |

### srcset per Component

#### Hero (Desktop)
```html
<picture>
  <source type="image/avif" srcset="hero-desktop-1920.avif 1920w, hero-desktop-1280.avif 1280w" sizes="100vw" />
  <source type="image/webp" srcset="hero-desktop-1920.webp 1920w, hero-desktop-1280.webp 1280w" sizes="100vw" />
  <img src="hero-desktop-1280.webp" width="1920" height="1080" alt="..." loading="eager" fetchpriority="high" />
</picture>
```

#### Hero (Mobile)
```html
<picture>
  <source type="image/avif" srcset="hero-mobile-800.avif 800w, hero-mobile-640.avif 640w" sizes="100vw" />
  <source type="image/webp" srcset="hero-mobile-800.webp 800w, hero-mobile-640.webp 640w" sizes="100vw" />
  <img src="hero-mobile-640.webp" width="800" height="1000" alt="..." loading="eager" fetchpriority="high" />
</picture>
```

#### Menu Item Card (Grid)
```html
<picture>
  <source type="image/avif" srcset="menu-kimchi-ramen-400.avif 400w, menu-kimchi-ramen-800.avif 800w" sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" />
  <source type="image/webp" srcset="menu-kimchi-ramen-400.webp 400w, menu-kimchi-ramen-800.webp 800w" sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" />
  <img src="menu-kimchi-ramen-800.webp" width="800" height="600" alt="Mì Kim Chi Bạch Tuộc — Spicy kimchi ramen with octopus, Seoul Korean Cuisine" loading="lazy" decoding="async" />
</picture>
```

#### Item Detail Modal
```html
<picture>
  <source type="image/avif" srcset="menu-kimchi-ramen-800.avif 800w, menu-kimchi-ramen-1200.avif 1200w" sizes="800px" />
  <source type="image/webp" srcset="menu-kimchi-ramen-800.webp 800w, menu-kimchi-ramen-1200.webp 1200w" sizes="800px" />
  <img src="menu-kimchi-ramen-800.webp" width="800" height="600" alt="..." loading="lazy" />
</picture>
```

#### Fresh Ingredient Card
```html
<picture>
  <source type="image/avif" srcset="ingredient-fresh-meat-400.avif 400w, ingredient-fresh-meat-800.avif 800w" sizes="(max-width: 767px) 100vw, 50vw" />
  <source type="image/webp" srcset="ingredient-fresh-meat-400.webp 400w, ingredient-fresh-meat-800.webp 800w" sizes="(max-width: 767px) 100vw, 50vw" />
  <img src="ingredient-fresh-meat-800.webp" width="800" height="600" alt="Fresh beef, pork, and chicken for Korean BBQ and hot pot at Seoul Korean Cuisine" loading="lazy" />
</picture>
```

---

## WebP/AVIF Generation Pipeline

### Option 1: Build-time (Vite + imagetools)
```bash
npm install -D @vitejs/plugin-imagetools sharp
```
- `import heroDesktop from '/images/menu/hero-desktop.jpg?w=1920;1280;800&format=webp,avif'`
- Automatic srcset generation

### Option 2: Pre-generated (Recommended for consistency)
```bash
# Using sharp CLI or squoosh-cli
for f in source/*.jpg; do
  npx squoosh-cli --webp '{"quality":80}' --avif '{"cqLevel":35}' --resize 1920 1080 -d dist/hero "$f"
  npx squoosh-cli --webp '{"quality":80}' --avif '{"cqLevel":35}' --resize 800 1000 -d dist/hero "$f"
  # ... other sizes
done
```
**Prefer Option 2** — ensures identical color grading, compression across all images.

---

## Alt Text Templates

### Menu Items
```
VI: "{name_vi} — {description_vi}, Seoul Korean Cuisine"
EN: "{name_en} — {description_en}, Seoul Korean Cuisine"
```
Example: `Mì Kim Chi Bạch Tuộc — Mì kim chi cay với bạch tuộc, Seoul Korean Cuisine`

### Ingredients
```
VI: "Nguyên liệu tươi: {ingredient_list} cho ẩm thực Hàn Quốc tại Seoul Korean Cuisine"
EN: "Fresh ingredients: {ingredient_list} for Korean cuisine at Seoul Korean Cuisine"
```
Example: `Nguyên liệu tươi: thịt bò, thịt heo, đùi gà cho nướng và lẩu Hàn Quốc tại Seoul Korean Cuisine`

### Hero
```
VI: "Seoul Korean Cuisine — {main_dish} trình bày trên bàn đá đen, không gian nhà hàng hiện đại"
EN: "Seoul Korean Cuisine — {main_dish} served on black stone table, modern restaurant interior"
```

### Decorative/Background
```html
alt="" role="presentation"
```

---

## Image Optimization Checklist

- [ ] All images WebP (quality 80-85)
- [ ] AVIF variants for supporting browsers (quality 35-40)
- [ ] Responsive widths: 400w, 800w, 1200w, 1920w as needed
- [ ] Explicit `width`/`height` attributes
- [ ] `loading="lazy"` except hero
- [ ] `decoding="async"` for non-critical
- [ ] `fetchpriority="high"` for hero
- [ ] Descriptive filenames (kebab-case)
- [ ] Alt text per templates above
- [ ] No layout shift (CLS = 0)
- [ ] Total hero weight < 200KB (WebP)
- [ ] Total menu page images < 500KB initial load

---

## Leonardo AI Prompts (For Missing Images)

### Master Style Block (Prepend to every prompt)
```
Premium Korean casual dining restaurant photography, modern Seoul restaurant aesthetic, dark charcoal stone tabletop, matte black ceramic tableware, subtle stainless steel accents, warm cinematic restaurant lighting, sophisticated dark atmosphere, natural food textures, realistic commercial food photography, 45-degree camera angle, shallow depth of field, controlled highlights, realistic shadows, premium editorial food photography, photorealistic, authentic Korean dining atmosphere, clean composition, elegant restrained styling, no text, no logos, no packaging.
```

### Negative Prompt (All images)
```
cartoon, illustration, CGI, 3D render, plastic food, oversaturated colors, fake vegetables, unrealistic ingredients, floating food, excessive props, text, labels, watermark, logo, supermarket packaging, bright white background, clinical lighting, flash photography, oversharpened, artificial colors
```

### Individual Prompts

#### hero-desktop
```
Korean seafood hot pot and kimchi ramen side by side on dark charcoal stone table, large black ceramic hot pot bubbling with red spicy broth, seafood visible (shrimp, squid, mussels), black ceramic ramen bowl with rich red kimchi broth, noodles, octopus, egg, green onions, warm amber restaurant lighting from above, subtle steam rising, matte black ceramic spoons and chopsticks, stainless steel kimchi side dish, sophisticated dark moody atmosphere, 16:9 horizontal composition
```

#### hero-mobile
```
Single Korean kimchi ramen bowl vertical composition, black ceramic bowl with rich red spicy broth, ramen noodles, tender octopus, soft boiled egg, green onions, kimchi, dark charcoal stone table surface, warm cinematic restaurant lighting from top-left, shallow depth of field, blurred dark background, 4:5 aspect ratio, negative space at top for text overlay
```

#### menu-kimchi-ramen
```
Korean kimchi ramen in matte black ceramic bowl, rich deep red spicy broth, chewy ramen noodles, tender octopus tentacles, halved soft boiled egg with runny yolk, fermented kimchi, green onions, sesame seeds, dark charcoal stone table, warm restaurant lighting, 45-degree angle, shallow depth of field, photorealistic commercial food photography
```

#### menu-tom-yum-ramen
```
Thai-Korean fusion Tom Yum ramen in black ceramic bowl, vibrant orange-red aromatic broth with lemongrass, kaffir lime, galangal, rice noodles, large shrimp, squid rings, mushrooms, cherry tomatoes, cilantro, dark stone table, warm amber lighting, 45-degree angle, steam rising, premium editorial style
```

#### menu-korean-hot-pot
```
Large Korean seafood hot pot in matte black ceramic pot, bubbling spicy red broth, abundant fresh seafood: whole shrimp, squid, mussels, fish fillets, crab claws, napa cabbage, enoki mushrooms, rice cakes, glass noodles, dark charcoal stone table, warm cinematic lighting, overhead steam, authentic Korean restaurant atmosphere, 45-degree angle
```

#### menu-bibimbap
```
Traditional Korean bibimbap in hot black stone bowl (dolsot), steamed rice base, colorful arranged vegetables: spinach, bean sprouts, carrots, zucchini, mushrooms, fried egg sunny-side up on top, gochujang red pepper paste, sesame seeds, sesame oil drizzle, dark stone table, warm lighting, crispy rice crust forming at bottom visible at edges
```

#### menu-tteokbokki-assorted
```
Assorted Korean tteokbokki on black matte plate, cylindrical rice cakes in thick glossy red gochujang sauce, fish cakes, boiled eggs, green onions, cabbage, cheese powder dusting, sesame seeds, dark charcoal background, warm restaurant lighting, 45-degree angle, glossy sauce texture, appetizing steam
```

#### menu-fried-chicken-seoul
```
Korean fried chicken thigh on black ceramic plate, golden ultra-crispy craggy batter, glazed with spicy gochujang sauce, white sesame seeds, sliced green onions, pickled radish cubes on side, dark stone table, warm amber lighting, 45-degree angle, crunchy texture detail, photorealistic
```

#### menu-kimbap-set
```
Korean kimbap rolls neatly sliced on long black matte plate, 3 varieties: classic (vegetable, egg, pickled radish), beef bulgogi, tuna mayo, served with kimchi, danmuji (yellow pickled radish), dark stone table, warm lighting, clean composition, 45-degree angle
```

#### menu-spring-rolls
```
Vietnamese crispy spring rolls Korean restaurant style, golden crispy exterior, glass noodles, pork, shrimp, vegetables inside, served with nuoc cham dipping sauce in small black ceramic bowl, lettuce and herbs for wrapping, dark charcoal stone table, warm lighting
```

#### menu-milk-tea
```
Korean milk tea in tall clear modern glass, rich brown tea with creamy milk layers, large tapioca pearls (boba) visible at bottom, metal straw, ice cubes, dark stone coaster, warm restaurant ambient lighting, 45-degree angle, glass transparency and condensation detail
```

#### menu-matcha-milk-tea
```
Matcha milk tea in tall clear glass, beautiful green gradient layers — vibrant matcha base, creamy white milk, ice cubes between layers, tapioca pearls, metal straw, dark stone surface, warm cinematic lighting, 45-degree angle, color separation detail
```

#### menu-lemon-tea
```
Peach lemon iced tea in tall clear glass, golden amber tea, fresh lemon wheels, peach slices, ice cubes, mint sprig, metal straw, condensation on glass, dark stone coaster, warm restaurant lighting, refreshing appetizing look
```

#### menu-yogurt-assorted
```
Four Korean yogurt cups on black matte tray: blueberry (purple), strawberry (pink), mango (yellow), original (white), each with real fruit pieces visible, clear glass or ceramic cups, dark charcoal stone table, warm soft lighting, clean minimal composition
```

#### ingredient-fresh-meat
```
Fresh raw Korean BBQ meats on stainless steel tray: marbled beef short rib (galbi), thin-sliced beef brisket (chadolbaegi), pork belly (samgyeopsal), chicken thigh, dark charcoal stone background, warm restaurant lighting, natural meat texture and marbling detail, 45-degree angle
```

#### ingredient-fresh-seafood
```
Fresh seafood for Korean cooking on wet dark stone: whole tiger shrimp, cleaned squid tubes and tentacles, white fish fillet, mussels, clams, scattered ice shards, glistening water droplets, warm amber lighting, 45-degree angle, premium freshness appeal
```

#### ingredient-vegetables
```
Fresh Korean cooking vegetables arranged: napa cabbage quarters, crown daisy (ssukgat), julienned carrots, sliced onions, bean sprouts, green onions, Korean radish (mu), perilla leaves (kkaennip), dark stone surface, warm lighting, vibrant natural colors
```

#### ingredient-mushrooms-tofu
```
Korean mushrooms and tofu selection in black ceramic bowls: enoki clusters, king oyster mushrooms sliced, shiitake caps, fresh soft tofu (sundubu), fried tofu pockets (yubu), dark stone table, warm lighting, natural textures
```

#### ingredient-korean-pantry
```
Korean pantry essentials: napa cabbage kimchi in traditional earthenware jar + portion in small bowl, gochujang (red pepper paste) in ceramic pot, doenjang (soybean paste), sesame oil bottle, cylindrical rice cakes (tteok), fresh ramen noodles bundle, dark stone surface
```

#### ingredient-hot-pot-set
```
Complete hot pot ingredient platter on large black matte tray: arranged sections of thin-sliced beef, pork belly, shrimp, squid, fish balls, napa cabbage, enoki mushrooms, crown daisy, rice cakes, glass noodles, tofu, dark stone table, warm restaurant lighting, "ready to cook" composition
```

#### ingredient-addons
```
Paid add-on ingredients displayed as small portions: quail egg, sliced cheese, extra ramen noodles bundle, beef slices, shrimp, octopus, squid, pork cartilage, enoki mushrooms, kimchi, each in small black ceramic dish on dark stone, visual menu reference style
```

#### og-default
```
Seoul Korean Cuisine signature composition: kimchi ramen bowl, hot pot, banchan sides, soju bottle, all on dark charcoal stone table with warm restaurant lighting, 1200x630 landscape, premium editorial food photography, clean composition for social sharing
```

---

## Image Delivery Checklist

| Image | Source | Status | WebP 400w | WebP 800w | WebP 1200w | AVIF | Alt Text | Dimensions |
|-------|--------|--------|-----------|-----------|------------|------|----------|------------|
| hero-desktop | menu_photos | 🔄 Rename/Resize | ✅ | ✅ | ✅ | ✅ | ✅ | 1920x1080 |
| hero-mobile | menu_photos | 🔄 Crop/Resize | ✅ | ✅ | - | ✅ | ✅ | 800x1000 |
| kimchi-ramen | img_02 | ✅ Exists | ✅ | ✅ | ✅ | ✅ | ✅ | 800x600 |
| tom-yum-ramen | img_04 | ✅ Exists | ✅ | ✅ | ✅ | ✅ | ✅ | 800x600 |
| korean-hot-pot | img_06 | ✅ Exists | ✅ | ✅ | ✅ | ✅ | ✅ | 800x600 |
| bibimbap | img_11 | ✅ Exists | ✅ | ✅ | ✅ | ✅ | ✅ | 800x600 |
| tteokbokki-assorted | img_13 | ✅ Exists | ✅ | ✅ | ✅ | ✅ | ✅ | 800x600 |
| fried-chicken-seoul | img_14 | ✅ Exists | ✅ | ✅ | ✅ | ✅ | ✅ | 800x600 |
| kimbap-set | img_09 | ✅ Exists | ✅ | ✅ | ✅ | ✅ | ✅ | 800x600 |
| spring-rolls | img_15 | ✅ Exists | ✅ | ✅ | ✅ | ✅ | ✅ | 800x600 |
| milk-tea | img_18 | ✅ Exists | ✅ | ✅ | ✅ | ✅ | ✅ | 800x1000 |
| matcha-milk-tea | img_18 | ✅ Exists | ✅ | ✅ | ✅ | ✅ | ✅ | 800x1000 |
| lemon-tea | img_18 | ✅ Exists | ✅ | ✅ | ✅ | ✅ | ✅ | 800x1000 |
| yogurt-assorted | img_17 | ✅ Exists | ✅ | ✅ | ✅ | ✅ | ✅ | 800x600 |
| ingredient-fresh-meat | 🎨 Generate | ❌ Missing | ✅ | ✅ | ✅ | ✅ | ✅ | 800x600 |
| ingredient-fresh-seafood | 🎨 Generate | ❌ Missing | ✅ | ✅ | ✅ | ✅ | ✅ | 800x600 |
| ingredient-vegetables | 🎨 Generate | ❌ Missing | ✅ | ✅ | ✅ | ✅ | ✅ | 800x600 |
| ingredient-mushrooms-tofu | 🎨 Generate | ❌ Missing | ✅ | ✅ | ✅ | ✅ | ✅ | 800x600 |
| ingredient-korean-pantry | 🎨 Generate | ❌ Missing | ✅ | ✅ | ✅ | ✅ | ✅ | 800x600 |
| ingredient-hot-pot-set | img_06 (crop) | 🔄 Derive | ✅ | ✅ | ✅ | ✅ | ✅ | 800x600 |
| ingredient-addons | 🎨 Generate | ❌ Missing | ✅ | ✅ | ✅ | ✅ | ✅ | 800x600 |
| og-default | 🎨 Generate | ❌ Missing | - | - | 1200x630 | ✅ | ✅ | 1200x630 |

**Total Unique Compositions Needed**: 22 (14 exist, 8 need generation)
**Total File Variants**: ~22 × 4 widths × 2 formats = ~176 files