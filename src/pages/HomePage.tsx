import { Hero } from '../components/home/Hero';
import { SEOHead } from '../components/ui/SEOHead';

/**
 * Simplified home page per spec 4.1:
 * one compact header screen holds logo, all key actions,
 * language switcher, tagline and quick links.
 * No competing large sections below.
 */
export function HomePage() {
  return (
    <>
      <SEOHead pageType="home" />
      <Hero />
    </>
  );
}