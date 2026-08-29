/**
 * Geum Cha menu item -> beverage photo mapping.
 * All images are beverages only; Seoul food photography excluded.
 * Images live in /public/images/menu/ named by original photo filenames.
 */

const imageMap: Record<string, string> = {
  fresh_milk_black_pearl_brown_sugar: "fresh_milk_white_pearl_brown_sugar.webp",
  fresh_milk_caramel_macchiato: "lucid-origin_Thick_fresh_mango_smoothie_vibrant_natural_golden-yellow_color_creamy_tropical_t-0.webp",
  fresh_milk_cheese_pearl: "fresh_milk_grass_jelly_brown_sugar.webp",
  fresh_milk_chestnut_pearl_brown_sugar: "fresh_milk_choco_lava.webp",
  fresh_milk_choco_lava: "fresh_milk_chocolate_pearl_brown_sugar.webp",
  fresh_milk_chocolate_pearl_brown_sugar: "fresh_milk_chocolate_pearl_brown_sugar.webp",
  fresh_milk_grass_jelly_brown_sugar: "fresh_milk_black_pearl_brown_sugar.webp",
  fresh_milk_matcha_pearl_brown_sugar: "fresh_milk_matcha_pearl_brown_sugar.webp",
  fresh_milk_red_bean_brown_sugar: "fresh_milk_chocolate_pearl_brown_sugar.webp",
  fresh_milk_strawberry_cream_cheese: "lucid-origin_Tropical_creamy_fruit_smoothie_pale_ivory_coconut_base_blended_with_ripe_banana_-0.webp",
  fresh_milk_taro_pearl_brown_sugar: "lucid-origin_Thick_Vietnamese_avocado_smoothie_rich_pale_green_creamy_texture_in_a_clear_eleg-0.webp",
  fresh_milk_white_pearl_brown_sugar: "fresh_milk_matcha_pearl_brown_sugar.webp",
  matcha_latte: "matcha_latte.webp",
  milk_tea_caramel_macchiato: "milk_tea_coffee_cheese.webp",
  milk_tea_chestnut: "milk_tea_chocolate.webp",
  milk_tea_chewy: "milk_tea_jelly_chewy.webp",
  milk_tea_choco_chestnut: "fresh_milk_chocolate_pearl_brown_sugar.webp",
  milk_tea_choco_lava: "milk_tea_choco_chestnut.webp",
  milk_tea_chocolate: "milk_tea_choco_lava.webp",
  milk_tea_coconut_jelly: "milk_tea_pandan_jelly_cheese.webp",
  milk_tea_coffee: "lucid-origin_A_single_shot_of_rich_Vietnamese_espresso_in_a_small_elegant_ceramic_espresso_cu-0.webp",
  milk_tea_coffee_cheese: "lucid-origin_Premium_mulberry_cold_brew_coffee_transparent_glass_filled_with_ice_deep_ruby-pu-0.webp",
  milk_tea_fresh_cream_cheese: "milk_tea_coffee.webp",
  milk_tea_geum: "milk_tea_geum.webp",
  milk_tea_hokkaido: "milk_tea_geum.webp",
  milk_tea_jelly: "milk_tea_jelly.webp",
  milk_tea_jelly_chewy: "milk_tea_jelly_chewy.webp",
  milk_tea_matcha: "milk_tea_matcha_chocolate.webp",
  milk_tea_matcha_chocolate: "fresh_milk_matcha_pearl_brown_sugar.webp",
  milk_tea_matcha_cream: "new_soy_matcha_milk.webp",
  milk_tea_matcha_red_bean: "milk_tea_matcha_red_bean.webp",
  milk_tea_milo: "milk_tea_milo.webp",
  milk_tea_milo_cheese: "milk_tea_milo_cheese.webp",
  milk_tea_pandan_coconut_jelly: "milk_tea_jelly.webp",
  milk_tea_pandan_jelly: "milk_tea_jelly_chewy.webp",
  milk_tea_pandan_jelly_cheese: "milk_tea_coconut_jelly.webp",
  milk_tea_red_bean: "milk_tea_jelly_chewy.webp",
  milk_tea_roasted_rice: "milk_tea_roasted_rice_pandan_cheese.webp",
  milk_tea_roasted_rice_cheese: "milk_tea_roasted_rice_pandan_cheese.webp",
  milk_tea_roasted_rice_pandan: "milk_tea_roasted_rice_pandan_cheese.webp",
  milk_tea_roasted_rice_pandan_cheese: "milk_tea_roasted_rice_pandan_cheese.webp",
  milk_tea_taro: "lucid-origin_Blended_coconut_flan_dessert_drink_creamy_pale_coconut_smoothie_with_caramel_fla-0.webp",
  milk_tea_traditional: "milk_tea_geum.webp",
  new_avocado_milk_tea: "lucid-origin_Pink_avocado_strawberry_smoothie_creamy_pastel_pink_and_pale_green_layers_fresh_-0.webp",
  new_black_tea_milk_tea_shan_tuyet: "lucid-origin_Vietnamese_herbal_hot_tea_served_steaming_in_a_small_elegant_ceramic_cup_with_a_-0.webp",
  new_chewy_milk_tea: "new_soy_corn_milk.webp",
  new_earl_grey_cheese_milk_tea: "lucid-origin_Vietnamese_herbal_hot_tea_served_steaming_in_a_small_elegant_ceramic_cup_with_a_-0.webp",
  new_green_tea_taro_milk_tea: "lucid-origin_Thick_Vietnamese_avocado_smoothie_rich_pale_green_creamy_texture_in_a_clear_eleg-0.webp",
  new_guava_drink: "lucid-origin_Iced_strawberry_tea_transparent_tall_glass_filled_with_golden_red_tea_and_crysta-0.webp",
  new_longan_osmanthus: "lucid-origin_Iced_kumquat_jasmine_tea_clear_golden_jasmine_tea_with_fresh_Vietnamese_kumquats-0.webp",
  new_mango_kumquat: "lucid-origin_Lychee_rose_iced_tea_pale_pink-golden_tea_in_an_elegant_transparent_glass_fresh_-0.webp",
  new_mulberry_yogurt: "new_soy_corn_milk.webp",
  new_peach_kumquat_rose_tea: "lucid-origin_Peach_orange_lemongrass_iced_tea_golden_amber_tea_in_a_transparent_glass_with_ic-0.webp",
  new_soy_chocolate_milk: "new_soy_corn_milk.webp",
  new_soy_corn_milk: "new_soy_corn_milk.webp",
  new_soy_matcha_milk: "new_soy_matcha_milk.webp",
  oolong_sticky_corn: "oolong_sticky_corn.webp",
  oolong_sticky_corn_cheese: "lucid-origin_Iced_oolong_tea_with_thick_creamy_cheese_milk_foam_transparent_glass_golden_ambe-0.webp",
  yogurt_coconut: "new_mulberry_yogurt.webp",
  yogurt_lychee: "yogurt_coconut.webp",
  yogurt_peach: "yogurt_lychee.webp",
  yogurt_pearl: "yogurt_peach.webp",
  yogurt_plain: "yogurt_plain.webp",
};

const menuImageBase = `${import.meta.env.BASE_URL}images/menu/`;

// Fallback when an item has no specific mapping
export const FALLBACK = menuImageBase + "milk_tea_geum.webp";

export function getImageForItem(itemId: string): string {
  const file = imageMap[itemId];
  if (!file) return FALLBACK;
  return menuImageBase + file;
}