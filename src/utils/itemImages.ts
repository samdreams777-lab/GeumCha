/**
 * Mapping of menu items to photos in /public/images/menu/.
 * Photos matched by the captions/descriptions baked into each
 * photo file (see D:\HERMES\SEULQRmenu\menu_photos filenames).
 * Items without a dedicated photo get the closest-looking dish.
 */

const exact: Record<string, string> = {
  // Korean Ramen
  kimchi_octopus: 'kimchi-ramen',
  kimchi_beef: 'kimchi-ramen',
  kimchi_chicken: 'kimchi-ramen',
  kimchi_cartilage: 'kimchi-ramen',
  kimchi_fish: 'kimchi-ramen',
  kimchi_usbeef: 'kimchi-ramen',
  kimchi_usbeef_egg: 'kimchi-ramen',
  kimchi_seafood: 'seafood-ramen',
  kimchi_assorted: 'kimchi-ramen',
  kimchi_sausage_fishball: 'kimchi-ramen',
  tom_yum_octopus: 'tomyum-hotpot-ramen',
  tom_yum_beef: 'tomyum-hotpot-ramen',
  tom_yum_chicken: 'tomyum-hotpot-ramen',
  tom_yum_cartilage: 'tomyum-hotpot-ramen',
  tom_yum_fish: 'tomyum-hotpot-ramen',
  tom_yum_usbeef: 'tomyum-hotpot-ramen',
  tom_yum_usbeef_egg: 'tomyum-hotpot-ramen',
  tom_yum_seafood: 'seafood-ramen',
  tom_yum_assorted: 'tomyum-hotpot-ramen',
  tom_yum_sausage_fishball: 'tomyum-hotpot-ramen',

  // Hot Pot
  hotpot_seafood: 'seafood-hotpot',
  hotpot_beef: 'fresh-ingredients',
  hotpot_usbeef: 'fresh-ingredients',
  hotpot_assorted: 'fresh-ingredients',
  hotpot_veg: 'fresh-ingredients',

  // Rice & Noodles
  bibimbap: 'bibimbap',
  bibimbap_beef: 'bibimbap',
  jajangmyeon: 'jajangmyeon',
  fried_rice_beef: 'bibimbap',
  fried_rice_seafood: 'bibimbap',
  fried_rice_assorted: 'bibimbap',
  mixed_noodles_assorted: 'mixed-noodles',
  mixed_noodles_beef: 'mixed-noodles',
  mixed_noodles_seafood: 'mixed-noodles',

  // Korean Street Food
  tteokbokki_assorted: 'tteokbokki',
  tteokbokki_seafood: 'tteokbokki',
  tteokbokki_beef: 'tteokbokki',
  tteokbokki_original: 'tteokbokki',
  tteokbokki_cheese: 'tteokbokki',
  fried_kimbap: 'kimbap-set',
  korean_dumplings: 'roll-platter',
  kimbap: 'kimbap-set',
  golden_ball: 'snack-assortment',
  takoyaki: 'takoyaki',
  korean_pancakes: 'roll-platter',
  fresh_milk_cake: 'yogurt-dessert',

  // Korean Chicken
  spicy_cheese_chicken: 'fried-chicken-glazed',
  seoul_fried_chicken: 'fried-chicken-plain',
  seaweed_chicken_rolls: 'fried-chicken-glazed',

  // Snacks
  assorted_snacks: 'snack-platter',
  french_fries: 'french-fries',
  cheese_shaker_fries: 'french-fries',
  cheese_sticks: 'french-fries',
  fried_sausages: 'snack-assortment',
  shrimp_tempura: 'snack-platter',
  cheese_tofu: 'snack-assortment',
  spring_rolls: 'spring-rolls',
  fried_dumplings: 'roll-platter',
  fried_fish_balls: 'snack-assortment',
  calamari_rings: 'snack-platter',
  lemongrass_chicken_feet: 'fried-chicken-glazed',

  // Desserts & Juices
  blueberry_yogurt: 'yogurt-dessert',
  strawberry_yogurt: 'yogurt-dessert',
  mango_yogurt: 'yogurt-dessert',
  original_yogurt: 'yogurt-dessert',
  pineapple_juice: 'soda-drink',
  watermelon_juice: 'soda-drink',
  orange_juice: 'soda-drink',

  // Drinks
  tropical_fruit_tea: 'lemon-tea',
  seoul_peach_tea: 'lemon-tea',
  peach_black_tea: 'lemon-tea',
  seoul_milk_tea: 'milk-tea',
  bubble_milk_tea: 'milk-tea',
  matcha_milk_tea: 'matcha-milk-tea',
  mineral_water: 'generic-drink-glass',
  coca_cola: 'soda-drink',
  pepsi: 'soda-drink',
  sprite: 'soda-drink',
  sting: 'soda-drink',
  fresh_milk: 'generic-drink-glass',
  cold_towel: 'generic-drink-glass',

};

const menuImageBase = '/images/menu/';

export function getImageForItem(itemId: string): string {
  const file = exact[itemId];
  if (!file) return FALLBACK;
  return menuImageBase + file + '.webp';
}

export const FALLBACK = menuImageBase + 'snack-assortment.webp';
