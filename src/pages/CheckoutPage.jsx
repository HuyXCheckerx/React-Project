import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { CartContext } from '@/contexts/CartContext';
import { ArrowLeft, Loader2, Send, Mail, CheckCircle, XCircle, Tag, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

import SolanaLogo from '@/assets/solana-logo.svg';
import BitcoinLogo from '@/assets/bitcoin-logo.svg';
import EthereumLogo from '@/assets/ethereum-logo.svg';
import TetherLogo from '@/assets/tether-logo.svg';
import Squares from '@/Squares'; // <<< 1. IMPORT ADDED

const cryptoOptions = [
  { id: 'sol', name: 'Solana', ticker: 'SOL', logo: SolanaLogo, network: 'Solana Network' },
  { id: 'btc', name: 'Bitcoin', ticker: 'BTC', logo: BitcoinLogo, network: 'Bitcoin Network' },
  { id: 'eth', name: 'Ethereum', ticker: 'ETH', logo: EthereumLogo, network: 'Ethereum (ERC20)' },
  { id: 'usdt_trc20', name: 'Tether', ticker: 'USDT', logo: TetherLogo, network: 'Tron (TRC20)' },
];

// Coupon codes database - you can customize this
const COUPON_CODES = {
  'WELCOME10': { discount: 10, type: 'percentage', description: 'Welcome discount' },
  'SAVE20': { discount: 20, type: 'percentage', description: '20% off your order' },
  'FLAT5': { discount: 5, type: 'fixed', description: '$5 off your order' },
  'FLAT10': { discount: 10, type: 'fixed', description: '$10 off your order' },
  'HALF50': { discount: 50, type: 'percentage', description: '50% off your order' },
  'NEWUSER': { discount: 15, type: 'percentage', description: 'New user discount' },
};

const CheckoutPage = ({ variants, transition }) => {
  const { cart, getCartTotalUSD, solPriceUSD } = useContext(CartContext); 
  const [telegramHandle, setTelegramHandle] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  
  // Coupon code states
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const totalUSD = getCartTotalUSD();

  // Calculate discount and final total
  const calculateDiscount = () => {
    if (!appliedCoupon || !totalUSD) return 0;
    
    if (appliedCoupon.type === 'percentage') {
      return (totalUSD * appliedCoupon.discount) / 100;
    } else {
      return Math.min(appliedCoupon.discount, totalUSD); // Fixed amount, but don't go below 0
    }
  };

  const discountAmount = calculateDiscount();
  const finalTotal = totalUSD ? totalUSD - discountAmount : 0;

  const handleTelegramChange = (e) => {
    let value = e.target.value;
    if (value && !value.startsWith('@')) {
      value = '@' + value;
    }
    setTelegramHandle(value);
  };

  const validateTelegramHandle = () => {
    if (!telegramHandle.startsWith('@') || telegramHandle.length < 2) {
      toast({
        title: 'Invalid Telegram Handle',
        description: 'Telegram handle must start with @ and be at least 2 characters long.',
        variant: 'destructive',
      });
      return false;
    }
    if (telegramHandle.length > 33) { 
        toast({
          title: 'Invalid Telegram Handle',
          description: 'Telegram handle is too long.',
          variant: 'destructive',
        });
        return false;
    }
    return true;
  };
  
  const validateEmail = () => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: 'Invalid Email Address',
        description: 'Please enter a valid email address or leave it blank.',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  // Coupon code validation and application
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast({
        title: 'Coupon Code Required',
        description: 'Please enter a coupon code.',
        variant: 'destructive',
      });
      return;
    }

    setIsApplyingCoupon(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const upperCode = couponCode.trim().toUpperCase();
    const coupon = COUPON_CODES[upperCode];

    if (coupon) {
      setAppliedCoupon({
        code: upperCode,
        ...coupon
      });
      toast({
        title: 'Coupon Applied!',
        description: `${coupon.description} - ${coupon.type === 'percentage' ? `${coupon.discount}% off` : `$${coupon.discount} off`}`,
        variant: 'default',
      });
    } else {
      toast({
        title: 'Invalid Coupon Code',
        description: 'The coupon code you entered is not valid.',
        variant: 'destructive',
      });
    }

    setIsApplyingCoupon(false);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    toast({
      title: 'Coupon Removed',
      description: 'Coupon has been removed from your order.',
      variant: 'default',
    });
  };

  const handleProceedToPayment = async () => {
    if (!validateTelegramHandle() || !validateEmail()) {
      return;
    }

    if (!selectedCrypto) {
      toast({
        title: 'Payment Method Required',
        description: 'Please select a cryptocurrency for payment.',
        variant: 'destructive',
      });
      return;
    }

    if (cart.length === 0) {
        toast({
          title: 'Empty Cart',
          description: 'Your cart is empty. Please add items before proceeding.',
          variant: 'destructive',
        });
        return;
    }
    
    if (totalUSD === null && cart.some(item => item.currency === 'SOL')) { 
        toast({
          title: 'Price Error',
          description: 'Could not determine SOL price for checkout. Please try again.',
          variant: 'destructive',
        });
        return;
    }

    setIsProcessing(true);

    const orderDetails = {
      items: cart.map(item => ({ 
        id: item.id, 
        title: item.title, 
        price: item.price, 
        quantity: item.quantity,
        currency: item.currency,
        numericPrice: item.numericPrice
      })),
      totalUSD: totalUSD,
      discountAmount: discountAmount,
      finalTotal: finalTotal,
      appliedCoupon: appliedCoupon,
      telegramHandle,
      email: email || null,
      paymentMethod: selectedCrypto,
      solPriceAtCheckout: solPriceUSD, 
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem('cryonerOrderDetails', JSON.stringify(orderDetails));

    setTimeout(() => {
      setIsProcessing(false);
      navigate('/payment'); 
    }, 1500);
  };

  if (error) {
    return (
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20"
        initial="initial" animate="in" exit="out" variants={variants} transition={transition}
      >
        <XCircle className="text-destructive w-16 h-16 mb-4" />
        <h1 className="text-3xl font-bold text-destructive mb-4 title-animate">Error</h1>
        <p className="text-foreground/80 mb-8">{error}</p>
        <Link to="/">
          <Button variant="outline" className="text-primary border-primary hover:bg-primary/10 font-orbitron-specific">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
      // <<< 2. ADDED `relative` TO MAKE THIS THE POSITIONING CONTEXT
      className="min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 bg-background relative overflow-hidden"
    >
      {/* <<< 3. ADDED SQUARES BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Squares 
          speed={0.5} 
          squareSize={40}
          direction='diagonal'
          borderColor='#fff'
          hoverFillColor='#000'
        />
      </div>

      {/* <<< 4. ADDED `relative z-10` TO PLACE CONTENT ON TOP OF BACKGROUND */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'circOut' }}
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text tracking-tight title-animate">Checkout</h1>
            <p className="text-lg text-foreground/70 mt-2 font-roboto-mono">Finalize your order and select payment method.</p>
          </div>
          
          {/* All the content below will now sit on top of the Squares background */}
          <div className="bg-card/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl border border-border/50 mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6 title-animate">Order Summary</h2>
            {cart.length > 0 ? (
              <div className="space-y-3 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm font-roboto-mono">
                    <span className="text-foreground/90">{item.title} (x{item.quantity})</span>
                    <span className="font-medium text-primary font-minecraft">
                      {item.price}
                      {item.currency === 'SOL' && solPriceUSD && item.numericPrice && (
                        <span className="text-xs text-foreground/60 ml-1">
                          (≈${(item.numericPrice * solPriceUSD).toFixed(2)} USD)
                        </span>
                      )}
                    </span>
                  </div>
                ))}
                
                {/* Coupon Code Section */}
                <div className="border-t border-border/50 pt-4 mt-4">
                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <div className="flex-1">
                      <Label htmlFor="coupon" className="text-foreground/80 mb-1.5 flex items-center font-roboto-mono text-sm">
                        <Tag size={14} className="mr-2 text-primary" /> Coupon Code
                      </Label>
                      <Input
                        id="coupon"
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="bg-input border-border focus:border-primary font-roboto-mono text-sm"
                        disabled={isApplyingCoupon}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleApplyCoupon}
                        disabled={isApplyingCoupon || !couponCode.trim()}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-roboto-mono text-sm"
                        size="sm"
                      >
                        {isApplyingCoupon ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Check className="mr-2 h-4 w-4" />
                        )}
                        Apply
                      </Button>
                      {appliedCoupon && (
                        <Button
                          onClick={handleRemoveCoupon}
                          variant="outline"
                          className="border-destructive text-destructive hover:bg-destructive/10 font-roboto-mono text-sm"
                          size="sm"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Applied Coupon Display */}
                  {appliedCoupon && (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                          <span className="text-green-600 font-medium font-roboto-mono text-sm">
                            {appliedCoupon.code} - {appliedCoupon.description}
                          </span>
                        </div>
                        <span className="text-green-600 font-bold font-minecraft">
                          {appliedCoupon.type === 'percentage' ? `${appliedCoupon.discount}% OFF` : `$${appliedCoupon.discount} OFF`}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-border/50 pt-3 mt-3 space-y-2">
                  <div className="flex justify-between items-center text-sm font-roboto-mono">
                    <span className="text-foreground/80">Subtotal</span>
                    <span className="text-foreground font-minecraft">
                      {totalUSD === null ? 'Calculating...' : `$${totalUSD.toFixed(2)}`}
                    </span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between items-center text-sm font-roboto-mono">
                      <span className="text-green-600">Discount ({appliedCoupon.code})</span>
                      <span className="text-green-600 font-minecraft">
                        -${discountAmount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center font-semibold border-t border-border/30 pt-2">
                    <span className="text-foreground text-lg font-roboto-mono">Final Total (USD)</span>
                    <span className="text-primary text-lg font-minecraft">
                      {totalUSD === null ? 'Calculating...' : `$${finalTotal.toFixed(2)}`}
                    </span>
                  </div>
                  
                  {cart.some(item => item.currency === 'SOL') && solPriceUSD && (
                    <div className="text-xs text-foreground/60 text-right font-roboto-mono">
                        (Using SOL @ ${solPriceUSD.toFixed(2)} USD)
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-foreground/70 text-center py-4 font-roboto-mono">Your cart is empty.</p>
            )}
          </div>
          

          <div className="bg-card/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl border border-border/50">
            <h2 className="text-2xl font-semibold text-foreground mb-6 title-animate">Contact Information</h2>
            <div className="space-y-6 mb-8">
              <div>
                <Label htmlFor="telegram" className="text-foreground/80 mb-1.5 flex items-center font-roboto-mono">
                  <Send size={16} className="mr-2 text-primary" /> Telegram Handle (Required)
                </Label>
                <Input
                  id="telegram"
                  type="text"
                  value={telegramHandle}
                  onChange={handleTelegramChange}
                  placeholder="@your_telegram_handle"
                  className="bg-input border-border focus:border-primary font-roboto-mono"
                  required
                />
                <p className="text-xs text-foreground/60 mt-1.5 font-roboto-mono">For product delivery and support.</p>
              </div>
              <div>
                <Label htmlFor="email" className="text-foreground/80 mb-1.5 flex items-center font-roboto-mono">
                  <Mail size={16} className="mr-2 text-primary" /> Email Address (Optional)
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-input border-border focus:border-primary font-roboto-mono"
                />
                 <p className="text-xs text-foreground/60 mt-1.5 font-roboto-mono">For receipt and backup communication.</p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-foreground mb-6 title-animate">Select Payment Method</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {cryptoOptions.map(crypto => (
                <button
                  key={crypto.id}
                  onClick={() => setSelectedCrypto(crypto)}
                  className={cn(
                    "p-4 rounded-lg border-2 transition-all duration-200 ease-in-out flex flex-col items-center justify-center space-y-2 text-center",
                    selectedCrypto?.id === crypto.id ? 'border-primary bg-primary/10 shadow-lg scale-105' : 'border-border hover:border-primary/70 bg-input hover:bg-primary/5'
                  )}
                >
                  <img src={crypto.logo} alt={crypto.name} className="w-10 h-10 sm:w-12 sm:h-12 mb-1" />
                  <span className="text-xs sm:text-sm font-medium text-foreground/90 font-minecraft">{crypto.name}</span>
                  <span className="text-xs text-primary/80 font-roboto-mono">{crypto.ticker}</span>
                </button>
              ))}
            </div>
            {selectedCrypto && (
                <div className="text-center p-3 bg-secondary/50 rounded-lg mb-6">
                    <p className="text-sm text-foreground/80 font-roboto-mono">You selected: <strong className="text-primary font-minecraft">{selectedCrypto.name} ({selectedCrypto.ticker})</strong></p>
                    <p className="text-xs text-foreground/60 font-roboto-mono">Network: {selectedCrypto.network}</p>
                </div>
            )}

            <Button
              onClick={handleProceedToPayment}
              disabled={isProcessing || !telegramHandle || !selectedCrypto || cart.length === 0 || totalUSD === null}
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground py-3.5 text-base rounded-lg shadow-md font-orbitron-specific tracking-wider"
              size="lg"
            >
              {isProcessing ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <CheckCircle className="mr-2 h-5 w-5" />
              )}
              {isProcessing ? 'Processing...' : 'Proceed to Payment'}
            </Button>
            <Link to="/services" className="block text-center mt-4">
                <Button variant="ghost" className="text-primary/80 hover:text-primary font-orbitron-specific text-sm">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
                </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;