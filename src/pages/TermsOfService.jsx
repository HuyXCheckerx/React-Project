import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

const TermsOfService = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service (TOS)</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            READ CAREFULLY BEFORE DEALING WITH US, EITHER PAID COMBOLIST OR TUTOR OR CC
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Products Section */}
          <motion.div 
            {...fadeIn}
            className="glass-card rounded-xl p-6 h-full"
          >
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <p className="text-muted-foreground mb-4">What type of accounts do I offer?</p>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>Combolist any target (only bulk purchases)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>Logs (mailaccess/cc/hits/etc)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>Solana blockchain related bots</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>Palhitter paypal checker + hitter</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>SMTP checker with 1 million+ domains</span>
              </li>
            </ul>
          </motion.div>

          {/* Warranty Section */}
          <motion.div 
            {...fadeIn}
            className="glass-card rounded-xl p-6 h-full relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 bg-primary rounded-full p-2">
              <CheckCircle className="h-6 w-6" />
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Warranty and Others</h2>
            <p className="text-lg font-semibold mb-4 text-yellow-300 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              IMPORTANT: I'M NOT DEALING WITH ORDERS TOO LOW😕
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-muted-foreground mr-2">—</span>
                <span>Hitrate is determined by 10% Precheck</span>
              </li>
              <li className="flex items-start">
                <span className="text-muted-foreground mr-2">—</span>
                <span>No resold of combolist from my side</span>
              </li>
              <li className="flex items-start">
                <span className="text-muted-foreground mr-2">—</span>
                <span>Refunds/replacements are only available when valid proofs are provided</span>
              </li>
              <li className="flex items-start">
                <span className="text-muted-foreground mr-2">—</span>
                <span>Telegram has delete chat from both sides so please do record while dealing</span>
              </li>
            </ul>
          </motion.div>

          {/* Arrival Section */}
          <motion.div 
            {...fadeIn}
            className="glass-card rounded-xl p-6 h-full"
          >
            <h2 className="text-2xl font-bold mb-4">Arrival of Product</h2>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>Payments are only in crypto currency.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>Some Transactions can be reversible so product can only be delivered after certain amount of confirmations!</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-red-500 font-semibold">I DO NOT OFFER TESTS DUE TO HIGH ORDER VOLUME</span>
              </li>
              <li className="flex items-start">
                <Info className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                <span>There will be warranty!</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Additional Terms */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass-card rounded-xl p-8 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-6">Additional Terms</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Communication</h3>
              <p className="text-muted-foreground">
                All communication must be done through official channels. We are not responsible for any deals made outside our official platforms.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Usage Policy</h3>
              <p className="text-muted-foreground">
                Our tools and services are provided for educational and professional purposes only. Users are responsible for ensuring their usage complies with all applicable laws and regulations.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Intellectual Property</h3>
              <p className="text-muted-foreground">
                All tools, services, and content provided remain the intellectual property of CyberTools. Redistribution, reselling, or sharing of our products is strictly prohibited without explicit permission.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Liability</h3>
              <p className="text-muted-foreground">
                We are not liable for any damages or losses resulting from the use or misuse of our products and services. Users assume all risks associated with usage.
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              By purchasing or using any of our products or services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: May 28, 2025
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;