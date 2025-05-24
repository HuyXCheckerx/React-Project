
    import React from 'react';
    import HeroSection from '@/components/HeroSection';
    import ProductsSection from '@/components/ProductsSection';
    import FeaturesSection from '@/components/FeaturesSection';
    import TestimonialsSection from '@/components/TestimonialsSection';
    import { motion } from 'framer-motion';

    const HomePage = () => {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HeroSection />
          <ProductsSection />
          <FeaturesSection />
          <TestimonialsSection />
        </motion.div>
      );
    };

    export default HomePage;
  