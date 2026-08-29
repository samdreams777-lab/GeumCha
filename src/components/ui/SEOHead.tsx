import { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { generatePageSEO, type SEOProps } from '../../utils/seo';

interface SEOHeadProps extends SEOProps {
  pageType: 'home' | 'menu' | 'location' | 'about' | 'new-recommended' | 'contact' | 'privacy';
}

export function SEOHead({ pageType, ...customProps }: SEOHeadProps) {
  const { locale } = useLanguage();
  const seo = generatePageSEO(pageType, locale, customProps);

  useEffect(() => {
    document.title = seo.title;
  }, [seo.title]);

  // Update meta tags
  useEffect(() => {
    const updateMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        if (property) meta.setAttribute('property', name);
        else meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMeta('description', seo.description);
    updateMeta('robots', seo.robots);

    // Open Graph
    updateMeta('og:type', seo.openGraph.type, true);
    updateMeta('og:site_name', seo.openGraph.siteName, true);
    updateMeta('og:locale', seo.openGraph.locale, true);
    updateMeta('og:locale:alternate', seo.openGraph.localeAlternate, true);
    updateMeta('og:title', seo.openGraph.title, true);
    updateMeta('og:description', seo.openGraph.description, true);
    updateMeta('og:url', seo.openGraph.url, true);
    updateMeta('og:image', seo.openGraph.image.url, true);
    updateMeta('og:image:width', seo.openGraph.image.width.toString(), true);
    updateMeta('og:image:height', seo.openGraph.image.height.toString(), true);
    updateMeta('og:image:alt', seo.openGraph.image.alt, true);

    // Twitter
    updateMeta('twitter:card', seo.twitterCard.card);
    updateMeta('twitter:title', seo.twitterCard.title);
    updateMeta('twitter:description', seo.twitterCard.description);
    updateMeta('twitter:image', seo.twitterCard.image);
    updateMeta('twitter:image:alt', seo.twitterCard.imageAlt);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', seo.canonical);

    // Hreflang
    seo.hreflang.forEach((hl, index) => {
      let link = document.querySelector(`link[rel="alternate"][hreflang="${hl.hreflang}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', hl.hreflang);
        document.head.appendChild(link);
      }
      link.setAttribute('href', hl.href);
    });

    // Structured Data
    let script = document.querySelector('script[type="application/ld+json"][data-seo]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-seo', 'true');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(seo.structuredData);
  }, [seo]);

  return null; // This component doesn't render anything visible
}