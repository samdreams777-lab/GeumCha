import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { MenuProvider } from './context/MenuContext';
import { ItemOptionsProvider } from './context/ItemOptionsContext';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { AboutPage } from './pages/AboutPage';
import { NewRecommendedPage } from './pages/NewRecommendedPage';
import { LocationPage } from './pages/LocationPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';

export default function App() {
  return (
    <LanguageProvider>
      <MenuProvider>
        <ItemOptionsProvider>
        <CartProvider>
<BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<Layout pageType="home" />}>
              <Route index element={<HomePage />} />
            </Route>
            <Route path="/menu" element={<Layout pageType="menu" />}>
              <Route index element={<MenuPage />} />
            </Route>
            <Route path="/about" element={<Layout pageType="about" />}>
              <Route index element={<AboutPage />} />
            </Route>
            <Route path="/new-recommended" element={<Layout pageType="about" />}>
              <Route index element={<NewRecommendedPage />} />
            </Route>
            <Route path="/location" element={<Layout pageType="location" />}>
              <Route index element={<LocationPage />} />
            </Route>
            <Route path="/contact" element={<Layout pageType="contact" />}>
              <Route index element={<ContactPage />} />
            </Route>
            <Route path="/privacy" element={<Layout pageType="privacy" />}>
              <Route index element={<PrivacyPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        </CartProvider>
        </ItemOptionsProvider>
      </MenuProvider>
    </LanguageProvider>
  );
}

