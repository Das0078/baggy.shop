import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { TopBanner } from './components/layout/TopBanner';
import { Navbar } from './components/layout/Navbar';
import { NewsletterCard } from './components/layout/NewsletterCard';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import { CartToast } from './components/cart/CartToast';
import { SplashScreen } from './components/common/SplashScreen';

// Scroll to top automatically on route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const AppContent: React.FC = () => {
  const [splashKey, setSplashKey] = React.useState(0);

  useEffect(() => {
    window.__replaySplash = () => {
      setSplashKey((prev) => prev + 1);
    };
    const handleReplay = () => setSplashKey((prev) => prev + 1);
    window.addEventListener('replay-splash', handleReplay);
    return () => {
      window.removeEventListener('replay-splash', handleReplay);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-theme-text-main flex flex-col font-sans antialiased selection:bg-theme-primary selection:text-white">
      {/* Brand Splash Screen with Dynamic Progress & Shared Morph Transition */}
      <SplashScreen key={splashKey} />

      <ScrollToTop />

      {/* Top Promotional Announcement */}
      <TopBanner />

      {/* Main Navigation Bar */}
      <Navbar />

      {/* Page Routing */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/casual" element={<ShopPage />} />
          <Route path="/category/*" element={<ShopPage />} />

          {/* Product Detail Page Routes */}
          <Route path="/product" element={<ProductDetailPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/product/id=:id" element={<ProductDetailPage />} />
          <Route path="/prduct/id=:id" element={<ProductDetailPage />} />
          <Route path="/prduct/:id" element={<ProductDetailPage />} />

          {/* Cart Page Route */}
          <Route path="/cart" element={<CartPage />} />

          <Route path="*" element={<HomePage />} />
        </Routes>

        {/* Floating Overlapping Newsletter Banner */}
        <NewsletterCard />
      </main>

      {/* Comprehensive Footer */}
      <Footer />

      {/* Global Toast for Cart Actions & Limit alerts */}
      <CartToast />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
