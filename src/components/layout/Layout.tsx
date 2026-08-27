import { Outlet } from 'react-router-dom';
import { SEOHead } from '../ui/SEOHead';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartWidget } from '../menu/CartWidget';
import heroBg from '../../assets/mainlogo.webp';

interface LayoutProps {
  pageType: 'home' | 'menu' | 'location' | 'about' | 'fresh-ingredients' | 'contact' | 'privacy';
}

/**
 * Single shared layout: one background (Main logo), one Header,
 * one Cart bar. Bottom navigation removed entirely (spec 2).
 */
export function Layout({ pageType }: LayoutProps) {
  return (
    <>
      <SEOHead pageType={pageType} />
      {/* Shared background scene — one Main logo image for ALL pages */}
      <div
        data-hero-bg
        aria-hidden="true"
        className="fixed inset-0 -z-20 bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Local readability overlay — controlled gradient, not a global dark slab */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.55) 100%)' }}
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20 md:pt-24" id="main-content">
          <Outlet />
        </main>
        {pageType !== 'home' && <Footer />}
        <CartWidget />
      </div>
    </>
  );
}
