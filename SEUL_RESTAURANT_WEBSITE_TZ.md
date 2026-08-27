# SEO Restaurant Website — Technical Specification
## Seoul Korean Cuisine — Vietnam

Version: 1.0
Status: Development Specification
Project type: Restaurant SEO Website + Digital Menu
Primary language: Vietnamese
Secondary language: English
Target market: Local Vietnamese customers + Korean/foreign visitors
Primary goal: Restaurant discovery → menu exploration → visit/order
Secondary goal: Google Maps visibility → reviews → repeat visits

---

# 1. PROJECT OBJECTIVE

Create a premium, mobile-first restaurant website for:

Seoul Korean Cuisine

The website must combine:

1. Restaurant presentation
2. SEO landing pages
3. Digital menu
4. Fresh ingredient presentation
5. Location / Google Maps
6. Contact and directions
7. Social proof
8. Conversion-oriented CTAs
9. Vietnamese + English localization

The website must NOT look like a generic restaurant template.

Visual positioning:

Premium Korean casual dining.

The visual identity should communicate:

- authentic Korean cuisine
- freshness
- quality ingredients
- modern Seoul atmosphere
- warm hospitality
- premium but accessible dining
- real restaurant experience

---

# 2. PRIMARY BUSINESS OBJECTIVES

## 2.1 Discovery

Capture searches related to:

- Korean restaurant
- Korean food
- Korean BBQ
- Korean hot pot
- Korean noodles
- Korean ramen
- Bibimbap
- Tteokbokki
- Korean fried chicken
- Korean drinks
- Korean dessert
- Korean restaurant in [city]
- Korean food near me

Vietnamese search intent should be prioritized.

Examples:

- Nhà hàng Hàn Quốc
- Quán ăn Hàn Quốc
- Món Hàn Quốc
- Lẩu Hàn Quốc
- Mì Hàn Quốc
- Tokbokki
- Gà rán Hàn Quốc
- Bibimbap
- Đồ ăn Hàn Quốc
- Nhà hàng Hàn Quốc gần tôi

---

# 3. TARGET USERS

## Primary

Vietnamese customers aged approximately 18–45.

Typical intents:

- looking for Korean food
- looking for a place to eat with friends
- looking for dinner
- looking for hot pot
- looking for Korean BBQ / grilled food
- discovering new restaurants

## Secondary

Foreign visitors:

- Koreans
- English-speaking tourists
- expats

They require:

- English menu
- clear location
- Google Maps
- easy contact
- visual menu
- simple directions

---

# 4. DESIGN DIRECTION

## Core visual concept

"Modern Seoul after dark."

The website should feel like entering a modern Korean restaurant at night.

Avoid:

- generic food delivery aesthetic
- bright white restaurant templates
- excessive red/black Korean clichés
- excessive Korean flags
- cartoon illustrations
- fake traditional Korean decoration
- excessive neon

Preferred:

- charcoal / near-black background
- warm off-white typography
- muted Korean red / burgundy accents
- subtle warm amber highlights
- dark stone textures
- black ceramic tableware
- warm restaurant lighting
- large food photography
- restrained Korean-inspired graphic details

---

# 5. COLOR SYSTEM

Primary:

#111111
Near-black

Secondary:

#1B1B1B
Charcoal

Surface:

#242424
Dark surface

Text:

#F5F2EA
Warm white

Secondary text:

#B7B3AA
Muted warm gray

Accent:

#8E2525
Deep Korean red

Secondary accent:

#C69A5B
Muted warm gold

Do NOT use saturated neon colors.

---

# 6. TYPOGRAPHY

Use a modern sans-serif system.

Recommended:

English:
Inter / Manrope / Plus Jakarta Sans

Vietnamese:
Inter / Be Vietnam Pro

Headings:

Large
Bold
Editorial spacing

Body:

Highly readable
16–18px mobile

Menu prices:

Strong visual hierarchy

Korean names may use:

Noto Sans KR

---

# 7. RESPONSIVE STRATEGY

Mobile-first.

Primary device:

Mobile phone.

Breakpoints:

Mobile:
320–767px

Tablet:
768–1023px

Desktop:
1024px+

The mobile version is the primary product.

Do NOT simply shrink desktop layouts.

---

# 8. WEBSITE STRUCTURE

Required pages:

/

 /menu

 /about

 /fresh-ingredients

 /contact

 /location

 /privacy

Optional SEO pages:

 /korean-food

 /korean-hot-pot

 /korean-ramen

 /korean-bbq

 /bibimbap

 /tteokbokki

SEO pages must only be created where real content/value exists.

Do not create thin doorway pages.

---

# 9. HOMEPAGE

## Hero

Full-screen or near-full-screen hero.

Background:

Premium food photography.

Recommended hero:

signature Korean dish / hot pot / Korean dining scene.

Overlay:

Restaurant name

"Seoul Korean Cuisine"

Headline in Vietnamese.

Example:

"Khám phá hương vị Hàn Quốc đích thực"

Subheadline:

"Món Hàn tươi ngon, nguyên liệu chất lượng và trải nghiệm ẩm thực ấm cúng."

Primary CTA:

Xem thực đơn

Secondary CTA:

Chỉ đường

Third CTA where appropriate:

Gọi ngay

---

# 10. HERO DESIGN

Hero image:

16:9 desktop

4:5 or 3:4 mobile crop

Image should have dark negative space for text.

Use gradient overlay.

Do NOT put important text over visually complex food areas.

Hero should immediately communicate:

Korean food + restaurant + atmosphere.

---

# 11. QUICK ACTION BAR

On mobile:

Sticky bottom navigation:

[ Menu ] [ Map ] [ Call ] [ Zalo ]

Optional:

[ Review ]

This is extremely important.

The user should never need to scroll to find:

- menu
- location
- contact

---

# 12. SIGNATURE MENU

Homepage section:

"Khám phá món nổi bật"

Display 4–6 dishes.

Each card:

- image
- Vietnamese name
- English name
- short description
- price
- CTA

Example:

Kimchi Ramen

Mì ramen Hàn Quốc với kimchi cay và nước dùng đậm đà.

[ Xem món ]

---

# 13. DIGITAL MENU

Route:

/menu

The digital menu is a major conversion component.

Features:

- category navigation
- search
- item cards
- item details
- prices
- modifiers
- add-ons
- size selection
- sugar level
- ice level
- ingredient information

Mobile UX:

horizontal category scrolling.

Cards:

Image
Name
Description
Price

---

# 14. MENU CATEGORIES

Use the final categories extracted from the restaurant menu.

Current conceptual structure:

1. Korean Ramen
2. Korean Street Food
3. Rice & Noodles
4. Korean Hot Pot
5. Korean Fried Chicken
6. Rolls & Spring Rolls
7. Snacks
8. Drinks
9. Desserts

Final names must follow the actual restaurant menu.

---

# 15. MODIFIERS

Modifiers must be represented as structured data.

Examples:

Size:

- Small
- Medium
- Large

Sugar:

- 0%
- 30%
- 50%
- 100%

Ice:

- No Ice
- Less Ice
- Normal Ice

Add-ons:

- additional meat
- additional vegetables
- egg
- cheese
- noodles
- mushrooms
- seafood
- other actual restaurant options

Every paid add-on must have:

name
price

Do NOT hardcode modifiers into UI.

---

# 16. FRESH INGREDIENTS SECTION

This is a key differentiator.

Route:

/fresh-ingredients

Purpose:

Show customers the quality of the ingredients used for Korean cooking.

Concept:

"Fresh ingredients, prepared your way."

Visual presentation:

Fresh ingredients photographed individually or in curated groups.

Potential groups:

## Meat

- beef
- pork
- chicken

## Seafood

- shrimp
- squid
- other seafood actually present in menu

## Vegetables

- napa cabbage
- leafy greens
- carrots
- onions
- green onions
- bean sprouts
- mushrooms
- other actual vegetables

## Korean ingredients

- kimchi
- tofu
- rice cakes
- noodles
- Korean sauces / seasonings where appropriate

The final ingredient list MUST come from the actual restaurant menu.

Do not invent ingredients.

---

# 17. FRESH INGREDIENT VISUAL STYLE

Photography:

- premium commercial food photography
- realistic
- fresh raw ingredients
- dark stone surface
- black ceramic dishes
- stainless steel trays
- warm restaurant lighting
- 45-degree angle
- shallow depth of field
- natural texture
- high detail
- appetizing
- sophisticated

Avoid:

- supermarket packaging
- plastic bags
- labels
- artificial vegetables
- excessive decoration
- finished cooked dishes
- unrealistic colors
- floating ingredients

---

# 18. INGREDIENT COLLECTION

Create a consistent image set.

Recommended image groups:

1. Fresh meat selection
2. Fresh seafood selection
3. Fresh vegetables
4. Mushrooms and tofu
5. Kimchi and Korean ingredients
6. Noodles and rice cakes
7. Hot pot ingredient selection
8. Korean BBQ ingredient selection

Not every ingredient requires a separate image.

Use curated compositions when multiple ingredients belong together.

---

# 19. ADD-ONS VISUAL SYSTEM

Paid extras should visually appear as small ingredient portions.

Example card:

Extra Beef

+50,000₫

Image

[ + Add ]

The image should show the ingredient portion itself.

This makes the modifier system visually understandable.

---

# 20. WHY THIS MATTERS

The website should communicate:

"You don't just order a dish.
You choose how you want your meal."

This increases:

- perceived freshness
- perceived customization
- average order value
- menu engagement

---

# 21. ABOUT SECTION

Homepage section:

"Vị Hàn Quốc trong từng món ăn"

Content:

- restaurant story
- Korean culinary influence
- ingredient philosophy
- dining atmosphere
- hospitality

Avoid generic AI-generated restaurant history.

Only use facts provided by owner.

---

# 22. SOCIAL PROOF

Section:

"Khách hàng nói gì về chúng tôi"

Include:

- Google reviews
- rating
- selected customer quotes
- review CTA

CTA:

"Để lại đánh giá"

Important:

Do not fabricate reviews.

Only use real customer reviews.

---

# 23. LOCATION

Dedicated section:

"Đến Seoul Korean Cuisine"

Include:

- exact address
- Google Maps
- opening hours
- phone
- Zalo
- directions

CTA:

"Chỉ đường"

Map should be lazy-loaded.

---

# 24. CONTACT

Provide:

Phone

Zalo

Messenger if available

Google Maps

Social media

Use real links only.

---

# 25. FOOTER

Footer:

Restaurant name

Address

Opening hours

Phone

Social links

Menu

Location

Privacy

Language switch

Copyright

---

# 26. SEO ARCHITECTURE

Every page requires:

Unique title
Unique meta description
Canonical URL
Open Graph
Twitter/X metadata where relevant
Structured data
Semantic HTML
Alt text
Hreflang

---

# 27. STRUCTURED DATA

Implement:

Restaurant

LocalBusiness

FoodEstablishment

BreadcrumbList

Menu where appropriate

Review / AggregateRating ONLY if valid and compliant with Google's structured data policies.

Do NOT invent ratings.

---

# 28. LOCAL SEO

Strong emphasis on local search.

Optimize:

restaurant name
city
district
address
phone
opening hours
Google Maps

Use consistent NAP:

Name
Address
Phone

across the website and external profiles.

---

# 29. SEO CONTENT

Homepage should naturally include relevant terms.

Do NOT keyword-stuff.

Example semantic cluster:

nhà hàng Hàn Quốc
món Hàn
ẩm thực Hàn Quốc
lẩu Hàn Quốc
mì Hàn Quốc
tokbokki
bibimbap
gà Hàn Quốc
đồ ăn Hàn Quốc

Use natural Vietnamese.

---

# 30. IMAGE SEO

Every image:

- descriptive filename
- alt text
- width
- height
- modern image format

Preferred:

WebP

Optional:

AVIF

Examples:

kimchi-ramen.webp
korean-hot-pot.webp
fresh-beef-korean-cuisine.webp
fresh-vegetables-hot-pot.webp

Avoid:

IMG_001.jpg
DSC_3921.jpg

---

# 31. IMAGE PERFORMANCE

Hero:

WebP / AVIF

Menu images:

WebP

Thumbnail:

320px

Full image:

800–1024px

Lazy-load all non-critical images.

Hero image should be optimized separately.

Use:

srcset
sizes

Avoid layout shift by specifying dimensions.

Target:

LCP < 2.5 seconds on mobile 4G.

---

# 32. DESIGN COMPONENTS

Required reusable components:

Hero
SectionHeader
DishCard
MenuCard
CategoryTabs
ModifierSelector
AddOnSelector
IngredientCard
ReviewCard
LocationCard
ContactBar
StickyMobileNav
LanguageSwitcher
Footer
ImageLightbox

---

# 33. INTERACTION DESIGN

Animations must be subtle.

Use:

fade
slide
scale

Avoid:

large parallax
heavy 3D
continuous animation
excessive motion

Restaurant website must feel premium, not like an AI demo.

Respect:

prefers-reduced-motion

---

# 34. MOBILE UX

Mobile menu should be extremely fast.

Recommended:

sticky category navigation

Example:

[ Ramen ] [ Hot Pot ] [ Rice ] [ Chicken ] [ Drinks ]

Tap item:

open detail drawer / modal.

Avoid unnecessary page navigation.

---

# 35. MENU ITEM DETAIL

Show:

Image

Name

Description

Price

Ingredients

Allergens where known

Modifiers

Add-ons

Quantity

CTA

Example:

Kimchi Ramen

₫XX,000

Ingredients:
Ramen noodles
Kimchi
...
 
Add-ons:

+ Extra Beef
+ Egg
+ Cheese

[ Add to Order ]

---

# 36. VISUAL HIERARCHY

Priority:

1. Food
2. Restaurant identity
3. Price
4. CTA
5. Description
6. Secondary information

Food photography should dominate.

---

# 37. IMAGE ART DIRECTION

All generated images must share:

same camera language
same lighting
same table surface
same color grading
same depth of field
same restaurant atmosphere

This is critical.

The site must not look like:

"13 unrelated AI images."

It should look like:

"One professional restaurant photo shoot."

---

# 38. IMAGE COLLECTION

Initial MVP:

12–20 images.

Recommended:

### Signature dishes

1. Kimchi Ramen
2. Seafood Ramen
3. Hot Pot
4. Bibimbap
5. Tteokbokki
6. Korean Fried Chicken
7. Roll Set
8. Spring Rolls

### Drinks

9. Milk Tea
10. Matcha Drink
11. Lemon Tea

### Dessert

12. Bingsu / signature dessert

### Ingredients

13. Fresh Meat
14. Fresh Seafood
15. Fresh Vegetables
16. Korean Ingredients
17. Hot Pot Ingredients
18. Add-on Ingredients

---

# 39. IMAGE GENERATION MASTER STYLE

All Leonardo AI prompts must use a shared style block.

MASTER STYLE:

Premium Korean casual dining restaurant photography, modern Seoul restaurant aesthetic, dark charcoal stone tabletop, matte black ceramic tableware, subtle stainless steel accents, warm cinematic restaurant lighting, sophisticated dark atmosphere, natural food textures, realistic commercial food photography, 45-degree camera angle, shallow depth of field, controlled highlights, realistic shadows, premium editorial food photography, photorealistic, authentic Korean dining atmosphere, clean composition, elegant restrained styling, no text, no logos, no packaging.

Negative:

cartoon, illustration, CGI, 3D render, plastic food, oversaturated colors, fake vegetables, unrealistic ingredients, floating food, excessive props, text, labels, watermark, logo, supermarket packaging.

---

# 40. BRAND FEEL

Desired emotional response:

"That looks delicious."

followed by:

"I want to go there."

Not:

"This is a fancy website."

The restaurant experience must remain the hero.

---

# 41. CONVERSION STRATEGY

Primary CTA:

Xem thực đơn

Secondary:

Chỉ đường

Tertiary:

Gọi ngay

Additional:

Đánh giá chúng tôi

Every major section should have a logical next action.

---

# 42. ANALYTICS

Track:

page_view
menu_view
menu_category_view
menu_item_view
modifier_selected
addon_selected
call_clicked
zalo_clicked
maps_clicked
review_clicked

Optional:

order_started
order_completed

---

# 43. PERFORMANCE

Target:

Lighthouse Performance >90 where practical.

Avoid unnecessary dependencies.

Optimize:

images
fonts
JavaScript
third-party embeds

Google Maps should be lazy-loaded.

---

# 44. ACCESSIBILITY

WCAG AA target.

Requirements:

- sufficient contrast
- keyboard navigation
- visible focus
- semantic buttons
- alt text
- accessible modals
- touch targets >=44px

---

# 45. LANGUAGE ARCHITECTURE

The website supports two interface and content languages:

## 1. Vietnamese (VI)

Primary/default language.

Used for:

- website interface
- navigation
- menu descriptions
- restaurant information
- calls to action
- local SEO content
- metadata

Vietnamese is the primary commercial and SEO language.

---

## 2. English (EN)

Secondary language.

Used for:

- website interface
- navigation
- menu descriptions
- restaurant information
- calls to action
- English SEO content
- metadata

English is intended for:

- international visitors
- tourists
- expats
- English-speaking customers

---

# Korean Dish Names

Korean is NOT a website language.

A Korean name may optionally be displayed underneath the English/Vietnamese dish name in the digital menu.

Example:

김치 라면
Kimchi Ramen
Mì Kimchi

The Korean name is an optional cultural/authenticity element.

Requirements:

- Korean names must come from the actual dish/menu data where available.
- Do not translate or invent Korean names automatically without verification.
- Korean text must not be used as a separate language version of the website.
- Korean does not require a language switcher.
- Korean does not require separate SEO pages.
- Korean does not require separate metadata.

If a verified Korean name is unavailable, simply omit the Korean line.

---

# Language Switcher

The website language switcher must provide only:

VI | EN

Default:

VI

The selected language must persist between visits.

No KO option should be displayed in the language selector.

---

# 46. TECHNICAL ARCHITECTURE

Recommended:

React
TypeScript
Vite
Tailwind CSS

Data-driven menu.

Do NOT hardcode menu items into components.

Menu data:

/src/data/menu/

Images:

/public/images/menu/

Ingredients:

/public/images/ingredients/

---

# 47. DATA MODEL

Example:

{
  "id": "kimchi-ramen",
  "name": "Kimchi Ramen",
  "name_original": "...",
  "description": "...",
  "price": 0,
  "image_reference": "ramen_kimchi.webp",
  "modifiers": []
}

Add-ons:

{
  "id": "extra-beef",
  "name": "Extra Beef",
  "price": 0,
  "image_reference": "addon_beef.webp"
}

---

# 48. DEVELOPMENT RULE

The actual restaurant menu is the source of truth.

Never invent:

- dishes
- ingredients
- prices
- opening hours
- address
- reviews
- restaurant history

If information is missing:

mark it as TODO.

---

# 49. CONTENT RULE

AI-generated content must not invent factual claims.

AI may assist with:

- descriptions
- SEO structure
- translations
- UX copy

Owner-provided facts have priority.

---

# 50. FINAL MVP DEFINITION

The first release is successful when:

[ ] Homepage works
[ ] Menu works
[ ] All real menu categories exist
[ ] Menu modifiers work
[ ] Paid add-ons work
[ ] Fresh Ingredients section exists
[ ] 12–20 consistent images exist
[ ] Mobile UX is excellent
[ ] Vietnamese works
[ ] English works
[ ] Google Maps works
[ ] Phone works
[ ] Zalo works
[ ] Review CTA works
[ ] Local SEO implemented
[ ] Restaurant structured data implemented
[ ] Images optimized
[ ] No broken images
[ ] No console errors
[ ] Lighthouse performance acceptable
[ ] Website deployed