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
import { 
  generateOrderId, 
  getUserIP, 
  getUserCountry, 
  getUserAgent, 
  sendToDiscordWebhook,
  redirectToPaymentSite 
} from '@/utils/orderUtils';

import SolanaLogo from '@/assets/solana-logo.svg';
import BitcoinLogo from '@/assets/bitcoin-logo.svg';
import EthereumLogo from '@/assets/ethereum-logo.svg';
import TetherLogo from '@/assets/tether-logo.svg';
import Squares from '@/Squares'; // <<< 1. IMPORT ADDED

const cryptoOptions = [
  { 
    id: 'sol', 
    name: 'Solana', 
    ticker: 'SOL', 
    logo: SolanaLogo, 
    network: 'Solana Network',
    address: 'CryonerSolWallet123456789abcdefghijk'
  },
  { 
    id: 'btc', 
    name: 'Bitcoin', 
    ticker: 'BTC', 
    logo: BitcoinLogo, 
    network: 'Bitcoin Network',
    address: '1CryonerBtcWallet123456789abcdefghijk'
  },
  { 
    id: 'eth', 
    name: 'Ethereum', 
    ticker: 'ETH', 
    logo: EthereumLogo, 
    network: 'Ethereum (ERC20)',
    address: '0xCryonerEthWallet123456789abcdefghijk'
  },
  { 
    id: 'bnb', 
    name: 'BNB', 
    ticker: 'BNB', 
    logo: EthereumLogo, // Temporary - replace with BNB logo
    network: 'BSC (BEP20)',
    address: '0xCryonerBnbWallet123456789abcdefghijk'
  },
  { 
    id: 'ltc', 
    name: 'Litecoin', 
    ticker: 'LTC', 
    logo: BitcoinLogo, // Temporary - replace with LTC logo
    network: 'Litecoin Network',
    address: 'LCryonerLtcWallet123456789abcdefghijk'
  },
  { 
    id: 'usdt', 
    name: 'Tether', 
    ticker: 'USDT', 
    logo: TetherLogo, 
    network: 'Multi-Chain',
    hasSubOptions: true,
    subOptions: [
      {
        id: 'usdt_erc20',
        name: 'USDT (ERC20)',
        ticker: 'USDT',
        network: 'Ethereum (ERC20)',
        address: '0xCryonerUsdtErcWallet123456789abcdefghijk'
      },
      {
        id: 'usdt_trc20',
        name: 'USDT (TRC20)',
        ticker: 'USDT',
        network: 'Tron (TRC20)',
        address: 'TCryonerUsdtTrcWallet123456789abcdefghijk'
      },
      {
        id: 'usdt_bep20',
        name: 'USDT (BEP20)',
        ticker: 'USDT',
        network: 'BSC (BEP20)',
        address: '0xCryonerUsdtBepWallet123456789abcdefghijk'
      }
    ]
  },
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
  const [showUsdtDropdown, setShowUsdtDropdown] = useState(false);
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

    try {
      // Generate unique order ID
      const orderId = generateOrderId();
      
      // Get user information
      const userIP = await getUserIP();
      const userCountry = await getUserCountry(userIP);
      const userAgent = getUserAgent();

      const orderDetails = {
        orderId,
        cart: cart.map(item => ({ 
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
        userIP,
        userCountry,
        userAgent
      };

      // Save to localStorage for backup
      localStorage.setItem('cryonerOrderDetails', JSON.stringify(orderDetails));

      // Send to Discord webhook - ADD YOUR WEBHOOK URL HERE
      const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1329064381673377793/Q5KBZs204hhP0h5EWfcQSd_nL0N2KX_UhQPR-gU_MBMWzOZL430c0zyurJQPy0ihQY-7';
      
      if (DISCORD_WEBHOOK_URL !== 'https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN') {
        await sendToDiscordWebhook(DISCORD_WEBHOOK_URL, orderDetails);
      }

      // Redirect to external payment site
      const EXTERNAL_PAYMENT_SITE = 'https://pay.cryoner.store/process';
      
      setTimeout(() => {
        setIsProcessing(false);
        redirectToPaymentSite(EXTERNAL_PAYMENT_SITE, orderDetails);
      }, 1500);

    } catch (error) {
      console.error('Payment processing error:', error);
      setIsProcessing(false);
      toast({
        title: 'Processing Error',
        description: 'There was an error processing your order. Please try again.',
        variant: 'destructive',
      });
    }
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {cryptoOptions.map(crypto => (
                <div key={crypto.id} className="relative group">
                  <button
                    onClick={() => {
                      if (crypto.hasSubOptions) {
                        setShowUsdtDropdown(!showUsdtDropdown);
                        setSelectedCrypto(null);
                      } else {
                        setSelectedCrypto(crypto);
                        setShowUsdtDropdown(false);
                      }
                    }}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 transition-all duration-300 ease-out flex flex-col items-center justify-center space-y-3 text-center relative overflow-hidden",
                      "bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm",
                      "hover:shadow-2xl hover:shadow-primary/20 hover:scale-105 hover:-translate-y-1",
                      "before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/0 before:via-primary/10 before:to-primary/0 before:opacity-0 before:transition-opacity before:duration-300 before:ease-out hover:before:opacity-100",
                      "after:absolute after:inset-0 after:bg-gradient-to-br after:from-transparent after:via-white/5 after:to-transparent after:opacity-0 after:transition-opacity after:duration-300 after:ease-out hover:after:opacity-100",
                      selectedCrypto?.id === crypto.id 
                        ? 'border-primary bg-primary/10 shadow-xl shadow-primary/30 scale-105 -translate-y-1 before:opacity-100 after:opacity-100' 
                        : 'border-border/50 hover:border-primary/80 bg-input/50 hover:bg-primary/5'
                    )}
                  >
                    {/* Glowing background effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out rounded-xl" />
                    
                    {/* Logo with enhanced styling */}
                    <div className="relative z-10">
                      <div className="relative">
                        <img 
                          src={crypto.logo} 
                          alt={crypto.name} 
                          className="w-12 h-12 sm:w-14 sm:h-14 mb-2 transition-all duration-300 ease-out group-hover:scale-110 group-hover:drop-shadow-lg" 
                        />
                        {/* Subtle glow effect around logo */}
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out scale-125" />
                      </div>
                    </div>
                    
                    {/* Text content with better spacing and typography */}
                    <div className="relative z-10 space-y-1">
                      <span className="text-sm sm:text-base font-bold text-foreground/90 font-minecraft tracking-wide group-hover:text-primary transition-colors duration-300">
                        {crypto.name}
                      </span>
                      <span className="text-xs text-primary/70 font-roboto-mono font-medium tracking-wider group-hover:text-primary/90 transition-colors duration-300">
                        {crypto.ticker}
                      </span>
                      {crypto.hasSubOptions && (
                        <span className="text-xs text-muted-foreground/60 group-hover:text-primary/60 transition-colors duration-300">▼</span>
                      )}
                    </div>
                    
                    {/* Animated border effect */}
                    <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
                  </button>
                  
                  {/* USDT Dropdown */}
                  {crypto.hasSubOptions && showUsdtDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-md border border-primary/20 rounded-xl shadow-2xl shadow-primary/20 z-20 overflow-hidden">
                      <div className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5 absolute inset-0" />
                      {crypto.subOptions.map((subOption, index) => (
                        <button
                          key={subOption.id}
                          onClick={() => {
                            setSelectedCrypto(subOption);
                            setShowUsdtDropdown(false);
                          }}
                          className={cn(
                            "w-full p-4 text-left transition-all duration-200 ease-out relative group",
                            "hover:bg-primary/10 hover:scale-[1.02]",
                            "first:rounded-t-xl last:rounded-b-xl",
                            selectedCrypto?.id === subOption.id 
                              ? 'bg-primary/15 text-primary shadow-inner' 
                              : 'hover:text-primary/90'
                          )}
                        >
                          {/* Subtle hover effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out" />
                          
                          <div className="relative z-10">
                            <div className="font-bold text-sm font-minecraft tracking-wide group-hover:text-primary transition-colors duration-200">
                              {subOption.name}
                            </div>
                            <div className="text-xs text-muted-foreground/80 font-roboto-mono group-hover:text-primary/70 transition-colors duration-200">
                              {subOption.network}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {selectedCrypto && (
                <div className="text-center p-4 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 rounded-xl mb-6 border border-primary/20 shadow-lg relative overflow-hidden">
                    {/* Animated background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-50 animate-pulse" />
                    
                    <div className="relative z-10">
                        <div className="flex items-center justify-center mb-2">
                            <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
                            <p className="text-sm text-foreground/80 font-roboto-mono">
                                Selected: <strong className="text-primary font-minecraft tracking-wide">{selectedCrypto.name} ({selectedCrypto.ticker})</strong>
                            </p>
                            <div className="w-2 h-2 bg-primary rounded-full ml-2 animate-pulse" />
                        </div>
                        <p className="text-xs text-foreground/60 font-roboto-mono font-medium">
                            Network: <span className="text-primary/80">{selectedCrypto.network}</span>
                        </p>
                    </div>
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