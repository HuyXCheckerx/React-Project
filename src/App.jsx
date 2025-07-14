import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import TermsPage from '@/pages/TermsPage';
import VouchesPage from '@/pages/VouchesPage';
import UptimePage from '@/pages/UptimePage';
import CheckoutPage from '@/pages/CheckoutPage';
import PaymentPage from '@/pages/PaymentPage';
import NotFoundPage from '@/pages/NotFoundPage';
import CartSidebar from '@/components/CartSidebar';
import Beams from './Beams';



const App = () => {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, filter: 'blur(4px)', y: 30 },
    in: { opacity: 1, filter: 'blur(0px)', y: 0 },
    out: { opacity: 0, filter: 'blur(4px)', y: -30 },
  };

  const pageTransition = {
    type: 'spring',
    stiffness: 120,
    damping: 20,
    duration: 0.7,
  };

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);

    const blockDevTools = (e) => {
      // F12
      if (e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
      }
      // Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J
      if ((e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) ||
          // Ctrl+U
          (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    document.addEventListener('keydown', blockDevTools);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', blockDevTools);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth font-roboto-mono relative">
      
      <Toaster />
      <Navbar />
      <CartSidebar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <HomePage
                variants={pageVariants}
                transition={pageTransition}
              />
            }
          />
          <Route
            path="/services"
            element={
              <ServicesPage
                variants={pageVariants}
                transition={pageTransition}
              />
            }
          />
           <Route
            path="/services/:serviceId" 
            element={
              <ServicesPage
                variants={pageVariants}
                transition={pageTransition}
              />
            }
          />
          <Route
            path="/terms"
            element={
              <TermsPage
                variants={pageVariants}
                transition={pageTransition}
              />
            }
          />
          <Route
            path="/vouches"
            element={
              <VouchesPage
                variants={pageVariants}
                transition={pageTransition}
              />
            }
          />
          <Route
            path="/uptime"
            element={
              <UptimePage
                variants={pageVariants}
                transition={pageTransition}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <CheckoutPage
                variants={pageVariants}
                transition={pageTransition}
              />
            }
          />
          <Route
            path="/payment"
            element={
              <PaymentPage
                variants={pageVariants}
                transition={pageTransition}
              />
            }
          />
          <Route 
            path="*" 
            element={
              <NotFoundPage
                variants={pageVariants}
                transition={pageTransition}
              />
            } 
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default App;