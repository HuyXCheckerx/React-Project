
    import React from 'react';
    import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
    import { AnimatePresence } from 'framer-motion';
    import Navbar from '@/components/Navbar';
    import Footer from '@/components/Footer';
    import HomePage from '@/pages/HomePage';
    import CryptoCheckoutPage from '@/pages/CryptoCheckoutPage';
    import { Toaster } from '@/components/ui/toaster';
    import { CartProvider } from '@/contexts/CartContext';

    function AnimatedRoutes() {
      const location = useLocation();
      return (
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/checkout" element={<CryptoCheckoutPage />} />
          </Routes>
        </AnimatePresence>
      );
    }

    function App() {
      return (
        <CartProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-background">
              <Navbar />
              <main className="flex-grow pt-16"> {/* pt-16 to offset fixed navbar */}
                <AnimatedRoutes />
              </main>
              <Footer />
              <Toaster />
            </div>
          </Router>
        </CartProvider>
      );
    }

    export default App;
  