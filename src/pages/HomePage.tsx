import { Hero } from '../components/home/Hero';
import { NewRecommendedPreview } from '../components/home/NewRecommendedPreview';
import { SEOHead } from '../components/ui/SEOHead';

/**
 * Compact, premium home page:
 *  - Hero (video background + delayed logo + primary actions)
 *  - Signature & New showcase (a few recommended drinks, not the full menu)
 * No competing large sections below.
 */
export function HomePage() {
  return (
    <>
      <SEOHead pageType="home" />
      <Hero />
      <NewRecommendedPreview />
    </>
  );
}