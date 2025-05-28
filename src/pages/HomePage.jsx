import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Shield, Zap, Star, ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const HomePage = () => {
  const { addItem } = useCart();
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const products = [
    {
      id: "ghostpump-standard",
      name: "GhostPump",
      price: "4 SOL",
      priceValue: 4,
      currency: "SOL",
      features: [
        "Rust-based, Non-JITO",
        "Anti-Snipe/MEV Shield",
        "Intuitive Interface",
        "Sub-1ms Execution"
      ]
    },
    {
      id: "cryoner-pro",
      name: "Cryoner Pro",
      price: "$129.99",
      priceValue: 129.99,
      currency: "USD",
      popular: true,
      features: [
        "All Tiers Included",
        "Private Customer Access",
        "380B Line Dehasher",
        "Exclusive Custom Tools"
      ]
    },
    {
      id: "wpcpanel-dump",
      name: "WP/cPanel Dump",
      price: "Custom",
      priceValue: 0, // Or handle custom pricing differently
      currency: "USD",
      features: [
        "Starter Tool License",
        "WP/cPanel Dorking Guide",
        "Private Demo Videos",
        "12 VC Sessions"
      ]
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-40 pb-28 overflow-hidden dot-pattern">
        <div className="absolute inset-0 gradient-bg z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold leading-tight gradient-text">
                CyberTools Suite
              </h1>
              <p className="text-xl text-muted-foreground">
                Elevate your digital capabilities with our suite of professional tools and expert services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link to="/tools">Explore Tools</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
                  <Link to="/services">View Services</Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="glass-card rounded-xl p-2">
                <img  alt="Abstract representation of cyber security network" className="rounded-lg w-full h-auto object-cover aspect-video" src="https://images.unsplash.com/photo-1643101807331-21a4a3f081d5" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            {...fadeIn}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Core Advantages</h2>
            <p className="text-lg text-muted-foreground">
              Experience the difference with tools engineered for performance, security, and dedicated support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Robust Security",
                description: "State-of-the-art encryption and security protocols safeguard your operations."
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Peak Performance",
                description: "Optimized for speed, ensuring sub-millisecond execution for critical tasks."
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "Dedicated Support",
                description: "Access private channels and personalized support from our expert team."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="glass-card rounded-xl p-8 text-center"
              >
                <div className="feature-icon mb-6 inline-flex">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products Preview */}
      <section className="py-24 gradient-bg">
        <div className="container mx-auto px-4">
          <motion.div 
            {...fadeIn}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-lg text-muted-foreground">
              Discover our most popular and effective solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`price-card relative rounded-xl overflow-hidden bg-card flex flex-col justify-between ${
                  product.popular ? 'border-2 border-primary' : ''
                }`}
              >
                {product.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-bl-lg">
                    POPULAR
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold gradient-text">{product.price}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 pt-0">
                  {product.price !== "Custom" ? (
                    <Button 
                      onClick={() => addItem({ id: product.id, name: product.name, price: product.priceValue, currency: product.currency, image: `https://source.unsplash.com/random/400x300/?${product.name.toLowerCase().replace(' ', '-')}` })} 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <ShoppingCartIcon className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                  ) : (
                     <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                       <Link to="/contact">Contact for Quote</Link>
                     </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-xl p-10 md:p-16 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Elevate Your Game?</h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join professionals who trust CyberTools. Explore our offerings and transform your capabilities today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/tools">
                  Browse Tools <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;