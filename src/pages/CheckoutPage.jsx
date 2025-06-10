import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { CartContext } from '@/contexts/CartContext';
import { ArrowLeft, Loader2, Send, Mail, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

import SolanaLogo from '@/assets/solana-logo.svg';
import BitcoinLogo from '@/assets/bitcoin-logo.svg';
import EthereumLogo from '@/assets/ethereum-logo.svg';
import TetherLogo from '@/assets/tether-logo.svg';

const cryptoOptions = [
  { id: 'sol', name: 'Solana', ticker: 'SOL', logo: SolanaLogo, network: 'Solana Network' },
  { id: 'btc', name: 'Bitcoin', ticker: 'BTC', logo: BitcoinLogo, network: 'Bitcoin Network' },
  { id: 'eth', name: 'Ethereum', ticker: 'ETH', logo: EthereumLogo, network: 'Ethereum (ERC20)' },
  { id: 'usdt_trc20', name: 'Tether', ticker: 'USDT', logo: TetherLogo, network: 'Tron (TRC20)' },
];

const CheckoutPage = ({ variants, transition }) => {
  const { cart, getCartTotalUSD, solPriceUSD } = useContext(CartContext); 
  const [telegramHandle, setTelegramHandle] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const { toast } = useToast();
  const navigate = useNavigate();

  const totalUSD = getCartTotalUSD();

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
      className="min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 bg-background"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'circOut' }}
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text tracking-tight title-animate">Checkout</h1>
            <p className="text-lg text-foreground/70 mt-2 font-roboto-mono">Finalize your order and select payment method.</p>
          </div>

          <div className="bg-card p-6 sm:p-8 rounded-2xl shadow-2xl border border-border/50 mb-8">
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
                <div className="border-t border-border/50 pt-3 mt-3 flex justify-between items-center font-semibold">
                  <span className="text-foreground text-lg font-roboto-mono">Grand Total (USD)</span>
                  <span className="text-primary text-lg font-minecraft">
                    {totalUSD === null ? 'Calculating...' : `~${totalUSD.toFixed(2)}`}
                  </span>
                </div>
                 {cart.some(item => item.currency === 'SOL') && solPriceUSD && (
                    <div className="text-xs text-foreground/60 text-right font-roboto-mono">
                        (Using SOL @ ${solPriceUSD.toFixed(2)} USD)
                    </div>
                )}
              </div>
            ) : (
              <p className="text-foreground/70 text-center py-4 font-roboto-mono">Your cart is empty.</p>
            )}
          </div>
          

          <div className="bg-card p-6 sm:p-8 rounded-2xl shadow-2xl border border-border/50">
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