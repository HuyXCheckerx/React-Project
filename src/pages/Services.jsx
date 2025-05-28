import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Shield, Zap, BookOpen, Users, Server, ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';


const Services = () => {
  const { addItem } = useCart();
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const servicesList = [
    {
      id: "private-tutoring",
      name: "Private Tutoring Services",
      icon: <BookOpen className="h-10 w-10" />,
      description: "One-on-one personalized training sessions to help you master cyber tools and techniques.",
      features: [
        "12 VC sessions via Discord or Telegram",
        "Hands-on practical training",
        "Access to private demonstration videos"
      ],
      price: 0, // Custom
      currency: "USD",
      image: "https://images.unsplash.com/photo-1666014214619-b0a572963b88",
      actionText: "Book a Session"
    },
    {
      id: "wpcpanel-dumping-tutorial",
      name: "WP/cPanel Dumping Tutorial",
      icon: <BookOpen className="h-10 w-10" />,
      description: "Comprehensive training on WordPress and cPanel exploitation techniques for data extraction.",
      features: [
        "Complete guide to WP/cPanel dorking",
        "Private demonstration videos",
        "12 VC sessions (Discord/Telegram)",
        "License to starter tools necessary for basics"
      ],
      price: 0, // Custom
      currency: "USD",
      actionText: "Get Quote"
    },
    {
      id: "vps-setup",
      name: "VPS Setup & Configuration",
      icon: <Server className="h-10 w-10" />,
      description: "Professional setup and configuration of high-performance VPS for optimal tool operation.",
      features: [
        "16/128GB RAM/CPU VPS setup",
        "Rotating proxies configuration",
        "Tool installation and optimization",
        "Security hardening"
      ],
      price: 199,
      currency: "USD",
      actionText: "Purchase Service"
    },
    {
      id: "custom-tool-dev",
      name: "Custom Tool Development",
      icon: <Shield className="h-10 w-10" />,
      description: "Bespoke development of specialized tools tailored to your specific requirements.",
      features: [
        "Custom coded checkers/tools/configs",
        "Optimization for your specific use case",
        "Ongoing support and updates",
        "Full documentation"
      ],
      price: 0, // Custom
      currency: "USD",
      actionText: "Get Quote"
    },
    {
      id: "marketplace-access",
      name: "Marketplace Access",
      icon: <Users className="h-10 w-10" />,
      description: "Exclusive access to private marketplaces for buying and selling combolist and other resources.",
      features: [
        "Introduction to private marketplace",
        "Verified seller status",
        "Access to exclusive listings",
        "Networking opportunities"
      ],
      price: 299,
      currency: "USD",
      actionText: "Purchase Access"
    }
  ];


  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional cyber services tailored to your specific needs
          </p>
        </motion.div>

        {/* Featured Service */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="p-8 md:p-12 bg-gradient-to-r from-blue-900/10 to-indigo-900/10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">{servicesList[0].name}</h2>
                  <p className="text-lg mb-6 text-muted-foreground">
                    {servicesList[0].description}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {servicesList[0].features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => addItem({ id: servicesList[0].id, name: servicesList[0].name, price: servicesList[0].price, currency: servicesList[0].currency, image: servicesList[0].image })}
                  >
                     <ShoppingCartIcon className="mr-2 h-5 w-5" /> {servicesList[0].actionText}
                  </Button>
                </div>
                <div>
                  <img-replace alt={servicesList[0].name} className="rounded-lg shadow-xl" src={servicesList[0].image} />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Services Grid */}
        <motion.section 
          {...fadeIn}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">All Available Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicesList.slice(1).map((service) => (
              <div key={service.id} className="glass-card rounded-xl p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="feature-icon mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.name}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {service.description}
                  </p>
                  
                  <h4 className="font-semibold mb-2 text-sm">What's included:</h4>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
                  <span className="text-xl font-bold gradient-text">
                    {service.price > 0 ? `${service.price} ${service.currency}` : 'Custom Pricing'}
                  </span>
                  {service.price > 0 ? (
                    <Button 
                      className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => addItem({ id: service.id, name: service.name, price: service.price, currency: service.currency, image: `https://source.unsplash.com/random/400x300/?${service.name.toLowerCase().replace(/\s+/g, '-')}` })}
                    >
                      <ShoppingCartIcon className="mr-2 h-4 w-4" /> {service.actionText}
                    </Button>
                  ) : (
                    <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Link to="/contact">{service.actionText}</Link>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Service Process */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Initial Consultation",
                description: "We begin with a detailed discussion to understand your specific needs and requirements."
              },
              {
                step: "02",
                title: "Service Delivery",
                description: "Our team of experts delivers the service according to the agreed specifications and timeline."
              },
              {
                step: "03",
                title: "Ongoing Support",
                description: "We provide continuous support and assistance to ensure you get the most out of our services."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="glass-card rounded-xl p-8 relative overflow-hidden text-center"
              >
                <span className="absolute -top-4 -left-4 text-8xl font-bold text-primary/5 opacity-50">
                  {item.step}
                </span>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-card rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Contact us today to discuss your requirements and how our services can help you achieve your goals.
            </p>
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Services;