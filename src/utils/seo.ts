import type { Locale } from '../types/menu';
import restaurantInfo from '../data/restaurant/info.json';

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  noIndex?: boolean;
  noFollow?: boolean;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

export function generateCanonical(path: string): string {
  const base = 'https://seoulkoreancuisine.vn';
  return `${base}${path.startsWith('/') ? path : '/' + path}`;
}

export function generateHreflang(path: string): Array<{ hreflang: string; href: string }> {
  const base = 'https://seoulkoreancuisine.vn';
  const cleanPath = path.startsWith('/') ? path : '/' + path;
  return [
    { hreflang: 'vi', href: `${base}${cleanPath}` },
    { hreflang: 'en', href: `${base}${cleanPath}` },
    { hreflang: 'x-default', href: `${base}${cleanPath}` },
  ];
}

export function generateOpenGraph(props: SEOProps, locale: Locale) {
  const base = 'https://seoulkoreancuisine.vn';
  const ogImage = props.ogImage || restaurantInfo.seo.ogImage;
  const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${base}${ogImage}`;

  return {
    type: props.ogType || 'website',
    siteName: 'Seoul Korean Cuisine',
    locale: locale === 'vi' ? 'vi_VN' : 'en_US',
    localeAlternate: locale === 'vi' ? 'en_US' : 'vi_VN',
    title: props.title || (locale === 'vi' ? restaurantInfo.seo.defaultTitle : 'Seoul Korean Cuisine — Authentic Korean Restaurant in Vietnam'),
    description: props.description || (locale === 'vi' ? restaurantInfo.seo.defaultDescription : 'Discover Seoul Korean Cuisine — Authentic Korean food with Hot Pot, Kimchi Ramen, Tteokbokki, Fried Chicken, Milk Tea. Fresh ingredients, cozy atmosphere.'),
    url: props.canonical || base,
    image: {
      url: fullImageUrl,
      width: 1200,
      height: 630,
      alt: locale === 'vi'
        ? 'Seoul Korean Cuisine — Món Hàn Quốc chính hiệu: Lẩu, Mì Kim Chi, Tokbokki, Gà rán'
        : 'Seoul Korean Cuisine — Authentic Korean food: Hot Pot, Kimchi Ramen, Tteokbokki, Fried Chicken',
    },
  };
}

export function generateTwitterCard(props: SEOProps, locale: Locale) {
  const base = 'https://seoulkoreancuisine.vn';
  const ogImage = props.ogImage || restaurantInfo.seo.ogImage;
  const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${base}${ogImage}`;

  return {
    card: 'summary_large_image',
    title: props.title || (locale === 'vi' ? restaurantInfo.seo.defaultTitle : 'Seoul Korean Cuisine — Authentic Korean Restaurant in Vietnam'),
    description: props.description || (locale === 'vi' ? restaurantInfo.seo.defaultDescription : 'Discover Seoul Korean Cuisine — Authentic Korean food with Hot Pot, Kimchi Ramen, Tteokbokki, Fried Chicken, Milk Tea.'),
    image: fullImageUrl,
    imageAlt: locale === 'vi'
      ? 'Seoul Korean Cuisine — Món Hàn Quốc chính hiệu'
      : 'Seoul Korean Cuisine — Authentic Korean food',
  };
}

export function generateStructuredData(props: SEOProps, locale: Locale, pageType: 'home' | 'menu' | 'location' | 'about' | 'fresh-ingredients' | 'contact' | 'privacy') {
  const base = 'https://seoulkoreancuisine.vn';
  const schemas: Record<string, unknown>[] = [];

  // Always add BreadcrumbList
  schemas.push(generateBreadcrumbSchema(pageType, locale));

  // Page-specific schemas
  switch (pageType) {
    case 'home':
      schemas.push(generateRestaurantSchema(locale));
      break;
    case 'menu':
      schemas.push(generateMenuSchema(locale));
      break;
    case 'location':
      schemas.push(generateLocationSchema(locale));
      break;
    case 'fresh-ingredients':
      schemas.push(generateFreshIngredientsSchema(locale));
      break;
    case 'about':
      schemas.push(generateAboutSchema(locale));
      break;
    case 'contact':
      schemas.push(generateContactSchema(locale));
      break;
  }

  // Add custom structured data if provided
  if (props.structuredData) {
    const custom = Array.isArray(props.structuredData) ? props.structuredData : [props.structuredData];
    schemas.push(...custom);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
}

function generateBreadcrumbSchema(pageType: string, locale: Locale) {
  const base = 'https://seoulkoreancuisine.vn';
  const breadcrumbs = [
    { name: locale === 'vi' ? 'Trang chủ' : 'Home', url: base },
  ];

  const pageNames: Record<string, { vi: string; en: string }> = {
    menu: { vi: 'Thực đơn', en: 'Menu' },
    about: { vi: 'Giới thiệu', en: 'About' },
    'fresh-ingredients': { vi: 'Nguyên liệu tươi', en: 'Fresh Ingredients' },
    contact: { vi: 'Liên hệ', en: 'Contact' },
    location: { vi: 'Địa chỉ', en: 'Location' },
    privacy: { vi: 'Chính sách bảo mật', en: 'Privacy Policy' },
  };

  if (pageType !== 'home' && pageNames[pageType]) {
    breadcrumbs.push({
      name: pageNames[pageType][locale],
      url: `${base}/${pageType}`,
    });
  }

  return {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function generateRestaurantSchema(locale: Locale) {
  const info = restaurantInfo;
  const coords = info.coordinates;

  return {
    '@type': ['Restaurant', 'LocalBusiness', 'FoodEstablishment'],
    name: 'Seoul Korean Cuisine',
    description: locale === 'vi'
      ? 'Nhà hàng Hàn Quốc chính hiệu tại Việt Nam với Lẩu, Mì Kim Chi, Tokbokki, Gà rán, Trà sữa. Nguyên liệu tươi, không gian ấm cúng.'
      : 'Authentic Korean restaurant in Vietnam with Hot Pot, Kimchi Ramen, Tteokbokki, Fried Chicken, Milk Tea. Fresh ingredients, cozy atmosphere.',
    url: 'https://seoulkoreancuisine.vn',
    telephone: info.phone !== 'TODO: Phone number from owner' ? info.phone : undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: info.address.street !== 'TODO: Exact street address from owner' ? info.address.street : undefined,
      addressLocality: info.address.city !== 'TODO: City/Province' ? info.address.city : undefined,
      addressRegion: info.address.district !== 'TODO: District' ? info.address.district : undefined,
      postalCode: info.address.postalCode !== 'TODO: Postal code' ? info.address.postalCode : undefined,
      addressCountry: 'VN',
    },
    geo: coords.latitude !== 0 ? {
      '@type': 'GeoCoordinates',
      latitude: coords.latitude,
      longitude: coords.longitude,
    } : undefined,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '10:00',
        closes: '22:00',
      },
    ],
    servesCuisine: 'Korean',
    priceRange: '₫₫',
    currenciesAccepted: 'VND',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    hasMenu: 'https://seoulkoreancuisine.vn/menu',
    image: [
      'https://seoulkoreancuisine.vn/images/menu/kimchi-ramen.webp',
      'https://seoulkoreancuisine.vn/images/menu/korean-hot-pot.webp',
    ],
    sameAs: [
      info.social.facebook !== 'TODO: Facebook page URL' ? info.social.facebook : undefined,
      info.social.instagram !== 'TODO: Instagram URL' ? info.social.instagram : undefined,
      info.social.tiktok !== 'TODO: TikTok URL' ? info.social.tiktok : undefined,
      info.social.youtube !== 'TODO: YouTube URL' ? info.social.youtube : undefined,
      info.googleMapsPlaceId !== 'TODO: Google Maps Place ID' ? `https://maps.google.com/?cid=${info.googleMapsCid}` : undefined,
    ].filter(Boolean),
  };
}

function generateMenuSchema(locale: Locale) {
  // This would be populated with actual menu data
  return {
    '@type': 'Menu',
    name: locale === 'vi' ? 'Thực đơn Seoul Korean Cuisine' : 'Seoul Korean Cuisine Menu',
    description: locale === 'vi'
      ? 'Thực đơn đầy đủ: Lẩu, Mì Kim Chi, Tokbokki, Bibimbap, Gà Seoul, Trà sữa, Yogurt.'
      : 'Complete menu: Hot Pot, Kimchi Ramen, Tteokbokki, Bibimbap, Seoul Chicken, Milk Tea, Yogurt.',
    url: 'https://seoulkoreancuisine.vn/menu',
    hasMenuSection: [], // Would be populated dynamically
  };
}

function generateLocationSchema(locale: Locale) {
  const info = restaurantInfo;
  return {
    '@type': 'LocalBusiness',
    name: 'Seoul Korean Cuisine',
    description: locale === 'vi'
      ? 'Địa chỉ và chỉ đường đến Seoul Korean Cuisine — Nhà hàng Hàn Quốc tại Việt Nam.'
      : 'Location and directions to Seoul Korean Cuisine — Korean Restaurant in Vietnam.',
    url: 'https://seoulkoreancuisine.vn/location',
    telephone: info.phone !== 'TODO: Phone number from owner' ? info.phone : undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: info.address.street !== 'TODO: Exact street address from owner' ? info.address.street : undefined,
      addressLocality: info.address.city !== 'TODO: City/Province' ? info.address.city : undefined,
      addressRegion: info.address.district !== 'TODO: District' ? info.address.district : undefined,
      postalCode: info.address.postalCode !== 'TODO: Postal code' ? info.address.postalCode : undefined,
      addressCountry: 'VN',
    },
    geo: info.coordinates.latitude !== 0 ? {
      '@type': 'GeoCoordinates',
      latitude: info.coordinates.latitude,
      longitude: info.coordinates.longitude,
    } : undefined,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '10:00',
        closes: '22:00',
      },
    ],
    hasMap: info.googleMapsPlaceId !== 'TODO: Google Maps Place ID'
      ? `https://maps.google.com/?cid=${info.googleMapsCid}`
      : undefined,
  };
}

function generateFreshIngredientsSchema(locale: Locale) {
  return {
    '@type': 'ItemList',
    name: locale === 'vi' ? 'Nguyên liệu tươi tại Seoul Korean Cuisine' : 'Fresh Ingredients at Seoul Korean Cuisine',
    description: locale === 'vi'
      ? 'Thịt, hải sản, rau củ, nấm, đậu hũ, kimchi, mì, bánh gạo tươi cho lẩu, nướng, chiên.'
      : 'Fresh meat, seafood, vegetables, mushrooms, tofu, kimchi, noodles, rice cakes for hot pot, BBQ, frying.',
    url: 'https://seoulkoreancuisine.vn/fresh-ingredients',
    itemListElement: [], // Would be populated dynamically
  };
}

function generateAboutSchema(locale: Locale) {
  return {
    '@type': 'AboutPage',
    name: locale === 'vi' ? 'Về Seoul Korean Cuisine' : 'About Seoul Korean Cuisine',
    description: locale === 'vi'
      ? 'Câu chuyện và triết lý ẩm thực của Seoul Korean Cuisine — Nhà hàng Hàn Quốc chính hiệu tại Việt Nam.'
      : 'The story and culinary philosophy of Seoul Korean Cuisine — Authentic Korean Restaurant in Vietnam.',
    url: 'https://seoulkoreancuisine.vn/about',
    mainEntity: {
      '@type': 'Restaurant',
      name: 'Seoul Korean Cuisine',
    },
  };
}

function generateContactSchema(locale: Locale) {
  const info = restaurantInfo;
  return {
    '@type': 'ContactPage',
    name: locale === 'vi' ? 'Liên hệ Seoul Korean Cuisine' : 'Contact Seoul Korean Cuisine',
    description: locale === 'vi'
      ? 'Liên hệ đặt bàn, Gọi điện, Zalo, Messenger, Google Maps.'
      : 'Contact for reservation, Call, Zalo, Messenger, Google Maps.',
    url: 'https://seoulkoreancuisine.vn/contact',
    mainEntity: {
      '@type': 'Restaurant',
      name: 'Seoul Korean Cuisine',
      telephone: info.phone !== 'TODO: Phone number from owner' ? info.phone : undefined,
      email: info.email !== 'TODO: Email from owner' ? info.email : undefined,
    },
  };
}

export function generatePageSEO(
  pageType: 'home' | 'menu' | 'location' | 'about' | 'fresh-ingredients' | 'contact' | 'privacy',
  locale: Locale,
  customProps: SEOProps = {}
): {
  title: string;
  description: string;
  canonical: string;
  hreflang: Array<{ hreflang: string; href: string }>;
  openGraph: ReturnType<typeof generateOpenGraph>;
  twitterCard: ReturnType<typeof generateTwitterCard>;
  structuredData: ReturnType<typeof generateStructuredData>;
  robots: string;
} {
  const path = pageType === 'home' ? '/' : `/${pageType}`;
  const canonical = customProps.canonical || generateCanonical(path);

  const pageTitles: Record<string, { vi: string; en: string }> = {
    home: {
      vi: 'Nhà hàng Hàn Quốc Seoul Korean Cuisine — Món Hàn Đích Thực, Lẩu, Mì, Tokbokki',
      en: 'Seoul Korean Cuisine Vietnam — Authentic Korean Food, Hot Pot, Ramen, Tteokbokki',
    },
    menu: {
      vi: 'Thực đơn Seoul Korean Cuisine — Lẩu, Mì Kim Chi, Tokbokki, Gà, Trà Sữa',
      en: 'Menu — Hot Pot, Kimchi Ramen, Tteokbokki, Fried Chicken, Milk Tea',
    },
    about: {
      vi: 'Về Seoul Korean Cuisine — Câu Chuyện Ẩm Thực Hàn Quốc Tại Việt Nam',
      en: 'About Seoul Korean Cuisine — Our Korean Culinary Story in Vietnam',
    },
    'fresh-ingredients': {
      vi: 'Nguyên Liệu Tươi Sống Seoul Korean Cuisine — Thịt, Hải Sản, Rau, Kim Chi',
      en: 'Fresh Ingredients — Meat, Seafood, Vegetables, Kimchi',
    },
    location: {
      vi: 'Địa Chỉ & Chỉ Đường Seoul Korean Cuisine — Google Maps, Giờ Mở Cửa',
      en: 'Location & Directions — Google Maps, Opening Hours',
    },
    contact: {
      vi: 'Liên Hệ Seoul Korean Cuisine — Đặt Bàn, Gọi, Zalo, Google Maps',
      en: 'Contact — Reservation, Call, Zalo, Google Maps',
    },
    privacy: {
      vi: 'Chính Sách Bảo Mật — Seoul Korean Cuisine',
      en: 'Privacy Policy — Seoul Korean Cuisine',
    },
  };

  const pageDescriptions: Record<string, { vi: string; en: string }> = {
    home: {
      vi: 'Khám phá Seoul Korean Cuisine — Nhà hàng Hàn Quốc chính hiệu với Lẩu, Mì Kim Chi, Tokbokki, Gà rán, Trà sữa. Nguyên liệu tươi, không gian ấm cúng. Xem menu & chỉ đường ngay!',
      en: 'Discover Seoul Korean Cuisine — Authentic Korean restaurant with Hot Pot, Kimchi Ramen, Tteokbokki, Fried Chicken, Milk Tea. Fresh ingredients, cozy atmosphere. View menu & get directions!',
    },
    menu: {
      vi: 'Xem thực đơn đầy đủ: Lẩu hải sản/bò, Mì Kim Chi, Tokbokki thập cẩm, Bibimbap, Gà Seoul, Trà sữa Matcha, Yogurt. Giá công khai, tùy chọn topping.',
      en: 'Full menu: Seafood/Beef Hot Pot, Kimchi Ramen, Assorted Tteokbokki, Bibimbap, Seoul Fried Chicken, Matcha Milk Tea, Yogurt. Transparent pricing, customizable toppings.',
    },
    about: {
      vi: 'Seoul Korean Cuisine mang hương vị Hàn Quốc đích thực đến Việt Nam. Cam kết nguyên liệu tươi, nấu ăn truyền thống, phục vụ tận tâm.',
      en: 'Seoul Korean Cuisine brings authentic Korean flavors to Vietnam. Committed to fresh ingredients, traditional cooking, warm hospitality.',
    },
    'fresh-ingredients': {
      vi: 'Khám phá nguyên liệu tươi tại Seoul Korean Cuisine: Thịt bò/tôm/mực, rau củ, kimchi, nấm, mì, bánh gạo. Chất lượng cao, chuẩn bị cho lẩu, nướng, chiên.',
      en: 'Explore fresh ingredients at Seoul Korean Cuisine: Beef/shrimp/squid, vegetables, kimchi, mushrooms, noodles, rice cakes. Premium quality for hot pot, BBQ, frying.',
    },
    location: {
      vi: 'Tìm đường đến Seoul Korean Cuisine: Địa chỉ chi tiết, Google Maps, giờ mở cửa, số điện thoại, Zalo. Dễ dàng đến quán ăn Hàn Quốc ngon.',
      en: 'Find Seoul Korean Cuisine: Full address, Google Maps, opening hours, phone, Zalo. Easy directions to your Korean restaurant.',
    },
    contact: {
      vi: 'Liên hệ Seoul Korean Cuisine: Gọi đặt bàn, nhắn Zalo, Messenger, xem Google Maps. Phục vụ nhanh, nhiệt tình.',
      en: 'Contact Seoul Korean Cuisine: Call for reservation, Zalo, Messenger, Google Maps. Fast, friendly service.',
    },
    privacy: {
      vi: 'Chính sách bảo mật dữ liệu khách hàng tại Seoul Korean Cuisine. Cam kết an toàn thông tin cá nhân.',
      en: 'Customer data privacy policy at Seoul Korean Cuisine. Committed to protecting personal information.',
    },
  };

  const title = customProps.title || pageTitles[pageType]?.[locale] || pageTitles.home[locale];
  const description = customProps.description || pageDescriptions[pageType]?.[locale] || pageDescriptions.home[locale];

  return {
    title,
    description,
    canonical,
    hreflang: generateHreflang(path),
    openGraph: generateOpenGraph({ ...customProps, title, description, canonical }, locale),
    twitterCard: generateTwitterCard({ ...customProps, title, description, canonical }, locale),
    structuredData: generateStructuredData(customProps, locale, pageType),
    robots: customProps.noIndex ? 'noindex, nofollow' : 'index, follow',
  };
}