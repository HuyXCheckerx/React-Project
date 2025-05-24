
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { ArrowRight, BarChart, Cpu } from 'lucide-react';

    const HeroSection = () => {
      const scrollToProducts = () => {
        const productsSection = document.getElementById('products');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
        }
      };

      return (
        <section className="relative py-20 md:py-32 min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-animated-gradient bg-400% animate-gradient-flow opacity-30 z-0"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Cpu className="inline-block h-5 w-5 mr-2" />
              Next-Gen Digital Tools
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'backOut' }}
              className="text-5xl md:text-7xl font-orbitron font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary"
            >
              Elevate Your Digital Edge
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
              className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-10"
            >
              Discover powerful SEO scraping tools and lightning-fast crypto bots. Gain an unfair advantage with our suite of innovative solutions designed for peak performance.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Button
                size="lg"
                onClick={scrollToProducts}
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity duration-300 shadow-lg transform hover:scale-105"
              >
                Explore Tools <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10 shadow-lg transform hover:scale-105"
                onClick={() => {
                  const featuresSection = document.getElementById('features');
                  if (featuresSection) featuresSection.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More <BarChart className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
          <style jsx>{`
            .bg-grid-pattern {
              background-image: linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px);
              background-size: 40px 40px;
            }
          `}</style>
        </section>
      );
    };

    export default HeroSection;
  