import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import TermsOfService from '@/pages/TermsOfService';
import Tools from '@/pages/Tools';
import Services from '@/pages/Services';
import Vouches from '@/pages/Vouches';
import { CartProvider } from '@/context/CartContext';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import PaymentDetailsPage from '@/pages/PaymentDetailsPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tos" element={<TermsOfService />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/services" element={<Services />} />
              <Route path="/vouches" element={<Vouches />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/payment/:crypto/:chain?" element={<PaymentDetailsPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;