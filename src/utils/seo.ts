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
  const fullImageUrl = ogImage.startsWith('http')
    ? ogImage
    : `${base}${import.meta.env.BASE_URL}${ogImage.replace(/^\//, '')}`;

  return {
    type: props.ogType || 'website',
    siteName: 'Geum Cha',
    locale: locale === 'vi' ? 'vi_VN' : 'en_US',
    localeAlternate: locale === 'vi' ? 'en_US' : 'vi_VN',
    title: props.title || (locale === 'vi' ? restaurantInfo.seo.defaultTitle : 'Geum Cha — Premium Korean-Asian Tea House in Vietnam'),
    description: props.description || (locale === 'vi' ? restaurantInfo.seo.defaultDescription : 'Discover Geum Cha — Premium Korean-Asian tea house with Milk Tea, Fresh Milk, Matcha, Roasted Rice, Yogurt. Quality ingredients, calm atmosphere.'),
    url: props.canonical || base,
    image: {
      url: fullImageUrl,
      width: 1200,
      height: 630,
      alt: locale === 'vi'
        ? 'Geum Cha — Trà & Đồ Uống Hàn Quốc Đẳng Cấp: Trà sữa, Matcha, Sữa tươi, Sữa chua'
        : 'Geum Cha — Premium Korean-Asian Tea House: Milk Tea, Matcha, Fresh Milk, Yogurt',
    },
  };
}

export function generateTwitterCard(props: SEOProps, locale: Locale) {
  const base = 'https://seoulkoreancuisine.vn';
  const ogImage = props.ogImage || restaurantInfo.seo.ogImage;
  const fullImageUrl = ogImage.startsWith('http')
    ? ogImage
    : `${base}${import.meta.env.BASE_URL}${ogImage.replace(/^\//, '')}`;

  return {
    card: 'summary_large_image',
    title: props.title || (locale === 'vi' ? restaurantInfo.seo.defaultTitle : 'Geum Cha — Premium Korean-Asian Tea House in Vietnam'),
    description: props.description || (locale === 'vi' ? restaurantInfo.seo.defaultDescription : 'Discover Geum Cha — Premium Korean-Asian tea house with Milk Tea, Matcha, Fresh Milk, Yogurt. Quality ingredients, calm atmosphere.'),
    image: fullImageUrl,
    imageAlt: locale === 'vi'
      ? 'Geum Cha — Trà & Đồ Uống Hàn Quốc Đẳng Cấp'
      : 'Geum Cha — Premium Korean-Asian Tea House',
  };
}

export function generateStructuredData(props: SEOProps, locale: Locale, pageType: 'home' | 'menu' | 'location' | 'about' | 'new-recommended' | 'contact' | 'privacy') {
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
    case 'new-recommended':
      schemas.push(generateNewRecommendedSchema(locale));
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
    'new-recommended': { vi: 'Món mới & Đặc trưng', en: 'Signature & New' },
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
    name: 'Geum Cha',
    description: locale === 'vi'
      ? 'Trà & đồ uống Hàn Quốc chính hiệu tại Việt Nam với Trà sữa, Sữa tươi, Matcha, Gạo rang, Sữa chua. Nguyên liệu tươi, không gian yên tĩnh.'
      : 'Premium Korean-Asian tea house in Vietnam with Milk Tea, Fresh Milk, Matcha, Roasted Rice, Yogurt. Quality ingredients, calm atmosphere.',
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
    servesCuisine: 'Korean-Asian Tea',
    priceRange: '₫₫',
    currenciesAccepted: 'VND',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    hasMenu: `${import.meta.env.BASE_URL}menu`,
    image: [
      `${import.meta.env.BASE_URL}images/menu/milk_tea_traditional.jpg`,
      `${import.meta.env.BASE_URL}images/menu/matcha_latte.webp`,
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
  return {
    '@type': 'Menu',
    name: locale === 'vi' ? 'Thực đơn Geum Cha' : 'Geum Cha Menu',
    description: locale === 'vi'
      ? 'Thực đơn đầy đủ: Trà sữa, Sữa tươi, Matcha, Gạo rang, Lá nếp, Chocolate, Trái cây, Sữa chua.'
      : 'Complete menu: Milk Tea, Fresh Milk, Matcha, Roasted Rice, Pandan, Chocolate, Fruit, Yogurt.',
    url: 'https://seoulkoreancuisine.vn/menu',
    hasMenuSection: [],
  };
}

function generateLocationSchema(locale: Locale) {
  const info = restaurantInfo;
  return {
    '@type': 'LocalBusiness',
    name: 'Geum Cha',
    description: locale === 'vi'
      ? 'Địa chỉ và chỉ đường đến Geum Cha — Trà & Đồ Uống Hàn Quốc tại Việt Nam.'
      : 'Location and directions to Geum Cha — Premium Korean-Asian Tea House in Vietnam.',
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

function generateNewRecommendedSchema(locale: Locale) {
  return {
    '@type': 'ItemList',
    name: locale === 'vi' ? 'Món mới & Đề xuất tại Geum Cha' : 'New & Recommended at Geum Cha',
    description: locale === 'vi'
      ? 'Những thức uống mới và được đề xuất nhất tại Geum Cha — Trà sữa, Matcha, Sữa tươi, Sữa chua.'
      : 'New and recommended drinks at Geum Cha — Milk tea, Matcha, Fresh Milk, Yogurt.',
    url: 'https://seoulkoreancuisine.vn/new-recommended',
    itemListElement: [],
  };
}

function generateAboutSchema(locale: Locale) {
  return {
    '@type': 'AboutPage',
    name: locale === 'vi' ? 'Về Geum Cha' : 'About Geum Cha',
    description: locale === 'vi'
      ? 'Câu chuyện và triết lý ẩm thực của Geum Cha — Trà & Đồ Uống Hàn Quốc Đẳng Cấp Tại Việt Nam.'
      : 'The story and philosophy of Geum Cha — Premium Korean-Asian Tea House in Vietnam.',
    url: 'https://seoulkoreancuisine.vn/about',
    mainEntity: {
      '@type': 'Restaurant',
      name: 'Geum Cha',
    },
  };
}

function generateContactSchema(locale: Locale) {
  const info = restaurantInfo;
  return {
    '@type': 'ContactPage',
    name: locale === 'vi' ? 'Liên hệ Geum Cha' : 'Contact Geum Cha',
    description: locale === 'vi'
      ? 'Liên hệ đặt bàn, Gọi điện, Zalo, Messenger, Google Maps.'
      : 'Contact for reservation, Call, Zalo, Messenger, Google Maps.',
    url: 'https://seoulkoreancuisine.vn/contact',
    mainEntity: {
      '@type': 'Restaurant',
      name: 'Geum Cha',
      telephone: info.phone !== 'TODO: Phone number from owner' ? info.phone : undefined,
      email: info.email !== 'TODO: Email from owner' ? info.email : undefined,
    },
  };
}

export function generatePageSEO(
  pageType: 'home' | 'menu' | 'location' | 'about' | 'new-recommended' | 'contact' | 'privacy',
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
  const path = pageType === 'home' ? '/' : `/${pageType === 'new-recommended' ? 'new-recommended' : pageType}`;
  const canonical = customProps.canonical || generateCanonical(path);

  const pageTitles: Record<string, { vi: string; en: string }> = {
    home: {
      vi: 'Trà & Đồ Uống Hàn Quốc Geum Cha — Matcha, Trà Sữa, Sữa Tươi, Sữa Chua',
      en: 'Geum Cha — Premium Korean-Asian Tea House | Milk Tea, Matcha, Fresh Milk',
    },
    menu: {
      vi: 'Thực Đơn Geum Cha — Trà Sữa, Matcha, Sữa Tươi, Gạo Rang, Sữa Chua',
      en: 'Geum Cha Menu — Milk Tea, Matcha, Fresh Milk, Roasted Rice, Yogurt',
    },
    about: {
      vi: 'Về Geum Cha — Câu Chuyện Trà & Đồ Uống Hàn Quốc Tại Việt Nam',
      en: 'About Geum Cha — Our Korean-Asian Tea House Story in Vietnam',
    },
    'fresh-ingredients': {
      vi: 'Món Mới & Đặc Trưng Geum Cha — Trà Sữa, Matcha, Sữa Tươi, Sữa Chua',
      en: 'Signature & New — Milk Tea, Matcha, Fresh Milk, Yogurt',
    },
    'new-recommended': {
      vi: 'Món Mới & Đặc Trưng Geum Cha — Trà Sữa, Matcha, Sữa Tươi, Sữa Chua',
      en: 'Signature & New — Milk Tea, Matcha, Fresh Milk, Yogurt',
    },
    location: {
      vi: 'Địa Chỉ & Chỉ Đường Geum Cha — Google Maps, Giờ Mở Cửa',
      en: 'Location & Directions — Google Maps, Opening Hours',
    },
    contact: {
      vi: 'Liên Hệ Geum Cha — Đặt Bàn, Gọi, Zalo, Google Maps',
      en: 'Contact — Reservation, Call, Zalo, Google Maps',
    },
    privacy: {
      vi: 'Chính Sách Bảo Mật — Geum Cha',
      en: 'Privacy Policy — Geum Cha',
    },
  };

  const pageDescriptions: Record<string, { vi: string; en: string }> = {
    home: {
      vi: 'Khám phá Geum Cha — Trà & Đồ Uống Hàn Quốc với Trà sữa, Matcha, Sữa tươi, Sữa chua. Nguyên liệu tươi, không gian yên tĩnh. Xem menu & chỉ đường ngay!',
      en: 'Discover Geum Cha — Premium Korean-Asian Tea House with Milk Tea, Matcha, Fresh Milk, Yogurt. Quality ingredients, calm atmosphere. View menu & get directions!',
    },
    menu: {
      vi: 'Xem thực đơn đầy đủ: Trà sữa truyền thống, Matcha, Gạo rang, Lá nếp, Chocolate, Sữa chua. Giá công khai, tùy chọn topping.',
      en: 'Full menu: Milk Tea, Matcha, Roasted Rice, Pandan, Chocolate, Yogurt. Transparent pricing, customizable toppings.',
    },
    about: {
      vi: 'Geum Cha mang trà & đồ uống Hàn Quốc đích thực đến Việt Nam. Cam kết nguyên liệu tươi, chế biến tinh tế, phục vụ tận tâm.',
      en: 'Geum Cha brings premium Korean-Asian beverages to Vietnam. Committed to fresh ingredients, refined preparation, warm hospitality.',
    },
    'fresh-ingredients': {
      vi: 'Khám phá Món mới & Đặc trưng tại Geum Cha: Trà sữa, Matcha, Sữa tươi, Sữa chua. Đồ uống cao cấp, chuẩn bị hoàn hảo.',
      en: 'Explore Signature & New at Geum Cha: Milk tea, Matcha, Fresh Milk, Yogurt. Premium quality for perfect beverages.',
    },
    location: {
      vi: 'Tìm đường đến Geum Cha: Địa chỉ chi tiết, Google Maps, giờ mở cửa, số điện thoại, Zalo. Dễ dàng đến quán trà Hàn Quốc ngon.',
      en: 'Find Geum Cha: Full address, Google Maps, opening hours, phone, Zalo. Easy directions to your Korean tea house.',
    },
    contact: {
      vi: 'Liên hệ Geum Cha: Gọi đặt bàn, nhắn Zalo, Messenger, xem Google Maps. Phục vụ nhanh, nhiệt tình.',
      en: 'Contact Geum Cha: Call for reservation, Zalo, Messenger, Google Maps. Fast, friendly service.',
    },
    privacy: {
      vi: 'Chính sách bảo mật dữ liệu khách hàng tại Geum Cha. Cam kết an toàn thông tin cá nhân.',
      en: 'Customer data privacy policy at Geum Cha. Committed to protecting personal information.',
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