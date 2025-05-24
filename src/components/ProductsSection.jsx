
    import React from 'react';
    import { useState } from 'react';
    import ProductCard from '@/components/ProductCard';
    import { Button } from '@/components/ui/button';
    import { initialProducts, moreProducts } from '@/constants/products';
    import { motion } from 'framer-motion';
    import { PackageSearch, PlusCircle } from 'lucide-react';

    const ProductsSection = () => {
      const [visibleProducts, setVisibleProducts] = useState(initialProducts);
      const [showMoreButton, setShowMoreButton] = useState(moreProducts.length > 0);

      const loadMoreProducts = () => {
        setVisibleProducts(prevProducts => [...prevProducts, ...moreProducts]);
        setShowMoreButton(false);
      };

      return (
        <section id="products" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y:20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <PackageSearch className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Our Arsenal of Tools</h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Explore our curated selection of high-performance tools designed to give you a competitive edge.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {visibleProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
            {showMoreButton && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-12"
              >
                <Button size="lg" onClick={loadMoreProducts} variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Load More Tools
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      );
    };

    export default ProductsSection;
  