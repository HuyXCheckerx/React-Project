import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Shield, Zap, Code, Database, Lock, ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Tools = () => {
  const { addItem } = useCart();
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const toolPackages = {
    wpcpanel: {
      id: "wpcpanel-tutor",
      name: "WP/CPANEL DUMPING TUTOR",
      price: 0, // Custom pricing
      currency: "USD",
      description: "Solution for startup seller/stocker/dumpers!",
      image: "https://images.unsplash.com/photo-1560472354-0088b5dc9d8d",
      pros: [
        "The Newest ever 0day to exploit databases",
        "Super fresh, private databases",
        "Super high Hitrate",
        "Combolist oftentimes comes with full database (Sim swapping, Fishing, Carding)",
        "Perfect for those who plans on becoming a supplier!"
      ],
      expect: [
        "License to starter tools necessary for basics",
        "Complete guide to Wp/cpanel Dorking",
        "1 Paid Tool requested by user(any paid checker)",
        "16/128Gbs RAMCPU VPS (Rotating proxies, Private ebook, Configs, Private demo videos, 12 vc sessions, And all other needed tools)"
      ],
      moreInfo: [
        "FREE TOOLS WONT BE GETTING YOU GOOD RESULTS!",
        "After the tutor: You can start off by working for me to gain experience. After a period of time you'll be good enough to start your own shop.",
        "Get introduced to a private marketplace to start selling combolist",
        "Videos and sources: Currently 7 private demonstration video, plus 12 vc sessions",
        "No hidden fees"
      ]
    },
    ghostpump: [
      {
        id: "ghostpump-standard",
        name: "GHOSTPUMP",
        price: 4,
        currency: "SOL",
        image: "https://images.unsplash.com/photo-1701859080748-74299d1017a9",
        features: [
          "RUST BASED - NONJITO BUNDLER",
          "ANTISNIPE/MEV",
          "BEGINNER FRIENDLY",
          "SUPER FAST EXECUTION - 1MS<"
        ]
      },
      {
        id: "ghostpump-pro",
        name: "GHOSTPUMP PRO",
        price: 7,
        currency: "SOL",
        image: "https://images.unsplash.com/photo-1701859080748-74299d1017a9",
        features: [
          "ALL STANDARD PACK FEATURES",
          "MOONSHOT/RAYDIUM SUPPORT",
          "LIGHTSPEED VOLUME,COMMENT BOT",
          "DETAILED ONE ON ONE GUIDE",
          "COUNTER COIN SNIPERS"
        ]
      }
    ],
    cryoner: [
      {
        id: "cryoner-starter",
        name: "Cryoner Starter*",
        price: 39.99,
        currency: "USD",
        period: "/month",
        features: [
          "Google Multithreaded Proxyless Parser (Google Dev)",
          "Vulnerability Scanner (SQL, XSS, LFI, RFI)",
          "Automatic Multithreadd Dumper Module (Sqli.timebased)",
          "Access to private Customers Channel"
        ]
      },
      {
        id: "cryoner-enterprise",
        name: "Cryoner Enterprise*",
        price: 99.99,
        currency: "USD",
        period: "/2 months",
        popular: true,
        features: [
          "Google Multithreaded Proxyless Parser (Google Dev)",
          "Vulnerability Scanner (SQL, XSS, LFI, RFI, Wordpress, cpanel)",
          "Automatic Multithreadd Dumper Module (SQLI, WORDPRESS, CPANEL, LFI, RFI)"
        ]
      },
      {
        id: "cryoner-pro-tool",
        name: "Cryoner Pro*",
        price: 129.99,
        currency: "USD",
        period: "/Lifetime",
        features: [
          "All Cryoner Enterpise and Start Features",
          "Access to private Customers Channel",
          "Cryoner Dehasher and Antipublic (380 billion lines Database)",
          "Access to private Custom coded and paid Checkers/Tools/Configs"
        ]
      }
    ]
  };


  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Tools</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our premium collection of cyber tools designed for professionals
          </p>
        </motion.div>

        {/* WP/CPANEL Section */}
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
                  <h2 className="text-3xl font-bold mb-4">{toolPackages.wpcpanel.name}</h2>
                  <p className="text-lg mb-6 text-muted-foreground">{toolPackages.wpcpanel.description}</p>
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => addItem({ id: toolPackages.wpcpanel.id, name: toolPackages.wpcpanel.name, price: toolPackages.wpcpanel.price, currency: toolPackages.wpcpanel.currency, image: toolPackages.wpcpanel.image })}
                  >
                    <ShoppingCartIcon className="mr-2 h-5 w-5" /> Get Started
                  </Button>
                </div>
                <div>
                  <img-replace alt={toolPackages.wpcpanel.name} className="rounded-lg shadow-xl" src={toolPackages.wpcpanel.image} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">PROs</h3>
                <ul className="space-y-4">
                  {toolPackages.wpcpanel.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold">WHAT TO EXPECT?</h3>
                <ul className="space-y-4">
                  {toolPackages.wpcpanel.expect.map((item, idx) => (
                     <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold">MORE INFO</h3>
                {toolPackages.wpcpanel.moreInfo.map((info, idx) => (
                  <p key={idx} className={`text-sm ${info.includes("FREE TOOLS") ? "text-red-400 font-semibold" : "text-muted-foreground"}`}>{info}</p>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* GhostPump Section */}
        <motion.section 
          {...fadeIn}
          className="mb-20"
        >
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="p-8 md:p-12 bg-gradient-to-r from-gray-800/10 to-gray-700/10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-2">@TUNATHEGOAT</h2>
                  <h3 className="text-5xl font-bold mb-6 gradient-text">GHOSTPUMP PACKAGES</h3>
                  <p className="text-lg mb-6 text-muted-foreground">Premium Solana blockchain tools for professionals</p>
                </div>
                <div>
                  <img-replace alt="GhostPump package interface" className="rounded-lg shadow-xl" src={toolPackages.ghostpump[0].image} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
              {toolPackages.ghostpump.map(pkg => (
                <div key={pkg.id} className="glass-card rounded-xl p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-3xl font-bold mb-4">{pkg.name}</h3>
                    <div className="flex items-center mb-6">
                      <img-replace alt="Solana logo" className="h-8 w-8 mr-2" src="https://images.unsplash.com/photo-1639825988283-39e5408b75e8" />
                      <span className="text-2xl font-bold gradient-text">{pkg.price} {pkg.currency}</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="bg-secondary/30 rounded-full px-6 py-2 text-center text-sm text-muted-foreground">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => addItem({ id: pkg.id, name: pkg.name, price: pkg.price, currency: pkg.currency, image: pkg.image })}
                  >
                    <ShoppingCartIcon className="mr-2 h-4 w-4" /> Purchase
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Cryoner Section */}
        <motion.section 
          {...fadeIn}
          className="mb-20"
        >
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="p-8 md:p-12 bg-gradient-to-r from-indigo-900/10 to-purple-900/10">
              <h2 className="text-3xl font-bold mb-6 text-center">Cryoner Packages</h2>
              <p className="text-lg mb-10 text-center max-w-3xl mx-auto text-muted-foreground">
                Professional vulnerability scanning and exploitation tools with advanced features
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {toolPackages.cryoner.map(pkg => (
                  <div key={pkg.id} className={`price-card rounded-xl overflow-hidden bg-card flex flex-col justify-between ${pkg.popular ? 'border-2 border-primary' : ''}`}>
                    {pkg.popular && (
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-bl-lg">
                        POPULAR
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                      <div className="flex items-end mb-4">
                        <span className="text-3xl font-bold gradient-text">{pkg.price} {pkg.currency}</span>
                        <span className="text-muted-foreground ml-1 text-sm">{pkg.period}</span>
                      </div>
                      <ul className="space-y-3 mb-6">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-6 pt-0">
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={() => addItem({ id: pkg.id, name: pkg.name, price: pkg.price, currency: pkg.currency, image: `https://source.unsplash.com/random/400x300/?${pkg.name.toLowerCase().replace(' ', '-')}` })}
                      >
                        <ShoppingCartIcon className="mr-2 h-4 w-4" /> Get Started
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-sm text-muted-foreground mt-8">
                *Try out for 7 days and get a full refund if cryoner isn't living up to your expectations!
              </p>
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Shield className="h-10 w-10" />,
                title: "Security First",
                description: "All our tools prioritize security with advanced encryption and protection mechanisms."
              },
              {
                icon: <Zap className="h-10 w-10" />,
                title: "Performance",
                description: "Optimized for speed with execution times under 1ms for critical operations."
              },
              {
                icon: <Code className="h-10 w-10" />,
                title: "Advanced Tech",
                description: "Built with cutting-edge technologies like Rust for maximum efficiency."
              },
              {
                icon: <Database className="h-10 w-10" />,
                title: "Extensive Databases",
                description: "Access to comprehensive databases with billions of entries for effective operations."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="glass-card rounded-xl p-6 text-center"
              >
                <div className="feature-icon mb-4 inline-flex">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Tools;