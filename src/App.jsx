// src/App.jsx

import React, { useEffect } from 'react';
// 1. Import useNavigate from react-router-dom
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import PaymentStatusPage from '@/pages/PaymentStatusPage';
import NotFoundPage from '@/pages/NotFoundPage';
import CartSidebar from '@/components/CartSidebar';

// 2. Import your Dock component and the required icons
import Dock from '@/Dock'; // Assuming your Dock component is here
import { VscHome, VscBriefcase, VscStarFull, VscGraphLine, VscLaw } from 'react-icons/vsc';
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
const App = () => {
  const location = useLocation();
  // 3. Get the navigate function from the hook
  const navigate = useNavigate();

  // Page transition configuration (unchanged)
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

  // Security useEffect (unchanged)
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    const blockDevTools = (e) => {
      if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) || (e.ctrlKey && e.key === 'U')) {
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
  
  // 4. Define the items for the Dock using the navigate function
  const dockItems = [
    {
      icon: <VscHome size={24} />,
      label: 'Home',
      onClick: () => navigate('/'),
    },
    {
      icon: <VscBriefcase size={24} />,
      label: 'Services',
      onClick: () => navigate('/services'),
    },
    {
      icon: <VscStarFull size={24} />,
      label: 'Vouches',
      onClick: () => navigate('/vouches'),
    },
    {
      icon: <VscGraphLine size={24} />,
      label: 'Uptime',
      onClick: () => navigate('/uptime'),
    },
    {
      icon: <VscLaw size={24} />,
      label: 'Terms',
      onClick: () => navigate('/terms'),
    },
    {
      icon: <MdOutlineShoppingCartCheckout size={24} />,
      label: 'Checkout',
      onClick: () => navigate('/checkout'),
    },

    
  ];

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth font-roboto-mono relative">
      <Toaster />
      <Navbar />
      <CartSidebar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* All your routes remain exactly the same */}
          <Route path="/" element={<HomePage variants={pageVariants} transition={pageTransition} />} />
          <Route path="/services" element={<ServicesPage variants={pageVariants} transition={pageTransition} />} />
          <Route path="/services/:serviceId" element={<ServicesPage variants={pageVariants} transition={pageTransition} />} />
          <Route path="/terms" element={<TermsPage variants={pageVariants} transition={pageTransition} />} />
          <Route path="/vouches" element={<VouchesPage variants={pageVariants} transition={pageTransition} />} />
          <Route path="/uptime" element={<UptimePage variants={pageVariants} transition={pageTransition} />} />
          <Route path="/checkout" element={<CheckoutPage variants={pageVariants} transition={pageTransition} />} />
          <Route path="/payment" element={<PaymentPage variants={pageVariants} transition={pageTransition} />} />
          <Route path="/payment-status" element={<PaymentStatusPage variants={pageVariants} transition={pageTransition} />} />
          <Route path="*" element={<NotFoundPage variants={pageVariants} transition={pageTransition} />} />
        </Routes>
      </AnimatePresence>
      <Footer />

      {/* 5. Add the Dock component here */}
      {/* It's outside AnimatePresence so it doesn't animate with the pages */}
      <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center">
        <Dock 
          items={dockItems}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
      </div>
    </div>
  );
};

export default App;