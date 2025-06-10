import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { CartContext } from '@/contexts/CartContext';
import { ArrowLeft, Copy, CheckCircle, AlertTriangle, Clock, Loader2 } from 'lucide-react';

const PAYMENT_TIMER_DURATION = 10 * 60; // 10 minutes in seconds

const PaymentPage = ({ variants, transition }) => {
  const { clearCart } = useContext(CartContext);
  const [orderDetails, setOrderDetails] = useState(null);
  const [timeLeft, setTimeLeft] = useState(PAYMENT_TIMER_DURATION);
  const [paymentStatus, setPaymentStatus] = useState('waiting'); 
  const [cryptoAmount, setCryptoAmount] = useState(null);
  const [paymentAddress, setPaymentAddress] = useState(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrder = localStorage.getItem('cryonerOrderDetails');
    if (storedOrder) {
      const parsedOrder = JSON.parse(storedOrder);
      setOrderDetails(parsedOrder);
      
      const calculateCryptoAmount = async () => {
        try {
          let amount;
          const paymentMethod = parsedOrder.paymentMethod;
          const totalUSD = parseFloat(parsedOrder.totalUSD);

          if (paymentMethod.ticker === 'SOL') {
            if (parsedOrder.solPriceAtCheckout && totalUSD) {
                 amount = totalUSD / parseFloat(parsedOrder.solPriceAtCheckout);
            } else { 
                const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT');
                if (!response.ok) throw new Error('Failed to fetch SOL price for payment');
                const data = await response.json();
                const currentSolPrice = parseFloat(data.price);
                amount = totalUSD / currentSolPrice;
            }

          } else if (paymentMethod.ticker === 'USDT' && paymentMethod.network === 'Tron (TRC20)') {
            amount = totalUSD; 
          } else {
            const priceSymbol = `${paymentMethod.ticker}USDT`;
            const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${priceSymbol}`);
            if (!response.ok) throw new Error(`Failed to fetch ${paymentMethod.ticker} price`);
            const data = await response.json();
            const cryptoPriceUSD = parseFloat(data.price);
            amount = totalUSD / cryptoPriceUSD;
          }
          
          setCryptoAmount(amount.toFixed(paymentMethod.ticker === 'SOL' ? 4 : 8) ); 
          setPaymentAddress(`CRYONER_UNIQUE_${paymentMethod.ticker}_ADDRESS_${Date.now()}`); 

        } catch (error) {
            console.error("Error calculating crypto amount:", error);
            setPaymentStatus('error');
            toast({
                title: "Payment Calculation Error",
                description: "Could not determine the exact crypto amount. Please restart checkout.",
                variant: "destructive",
            });
        }
      };
      
      calculateCryptoAmount();

    } else {
      navigate('/checkout'); 
    }
  }, [navigate, toast]);

  useEffect(() => {
    if (paymentStatus !== 'waiting' && paymentStatus !== 'processing') return;
    if (timeLeft <= 0) {
      setPaymentStatus('expired');
      toast({
        title: 'Session Expired',
        description: 'Your payment session has expired. Please restart the checkout process.',
        variant: 'destructive',
      });
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, paymentStatus, toast]);

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: 'Copied to Clipboard',
          description: `${fieldName} copied successfully.`,
        });
      })
      .catch(err => {
        toast({
          title: 'Copy Failed',
          description: `Could not copy ${fieldName}. Please copy manually.`,
          variant: 'destructive',
        });
      });
  };

  const handlePaymentConfirmationSimulation = () => {
    setPaymentStatus('processing');
    toast({ title: "Processing Payment", description: "We are checking for your transaction..."});
    setTimeout(() => {
      setPaymentStatus('confirmed');
      toast({
        title: 'Payment Confirmed!',
        description: 'Your order is confirmed. You will be contacted via Telegram shortly.',
        variant: 'default',
        duration: 7000,
      });
      clearCart();
      localStorage.removeItem('cryonerOrderDetails');
      setTimeout(() => navigate('/'), 7000);
    }, 5000);
  };
  
  const restartCheckout = () => {
    localStorage.removeItem('cryonerOrderDetails');
    navigate('/checkout');
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = (timeLeft / PAYMENT_TIMER_DURATION) * 100;

  if (!orderDetails || !cryptoAmount || !paymentAddress) {
    return (
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20"
        initial="initial" animate="in" exit="out" variants={variants} transition={transition}
      >
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-foreground/80 font-roboto-mono">Loading payment details...</p>
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {paymentStatus === 'waiting' && (
            <motion.div
              key="waiting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'circOut' }}
            >
              <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold gradient-text tracking-tight title-animate">Complete Your Payment</h1>
                <p className="text-lg text-foreground/70 mt-2 font-roboto-mono">Send the exact amount to the address below within the time limit.</p>
              </div>

              <div className="flex justify-center mb-10">
                <div className="relative w-36 h-36 sm:w-48 sm:h-48">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-border/50"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <motion.circle
                      className="text-primary"
                      strokeWidth="8"
                      strokeDasharray="251.2" 
                      strokeDashoffset={251.2 - (progress / 100) * 251.2}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                      initial={{ strokeDashoffset: 251.2 }}
                      animate={{ strokeDashoffset: 251.2 - (progress / 100) * 251.2 }}
                      transition={{ duration: 1, ease: "linear" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl sm:text-3xl font-bold text-primary font-minecraft">
                      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-foreground/60 font-roboto-mono">Time Left</span>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 sm:p-8 rounded-2xl shadow-2xl border border-border/50 mb-8">
                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium text-foreground/80 mb-1 block font-roboto-mono">Amount to Send (Exact):</Label>
                    <div className="flex items-center">
                      <Input
                        type="text"
                        value={`${cryptoAmount} ${orderDetails.paymentMethod.ticker}`}
                        readOnly
                        className="bg-input border-border text-lg font-mono !cursor-default"
                      />
                      <Button variant="ghost" size="icon" onClick={() => handleCopy(cryptoAmount, 'Amount')} className="ml-2">
                        <Copy size={18} />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground/80 mb-1 block font-roboto-mono">Payment Address ({orderDetails.paymentMethod.ticker}):</Label>
                    <div className="flex items-center">
                      <Input
                        type="text"
                        value={paymentAddress}
                        readOnly
                        className="bg-input border-border text-sm font-mono !cursor-default"
                      />
                      <Button variant="ghost" size="icon" onClick={() => handleCopy(paymentAddress, 'Address')} className="ml-2">
                        <Copy size={18} />
                      </Button>
                    </div>
                  </div>
                   <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <p className="text-xs text-yellow-300 flex items-start font-roboto-mono">
                            <AlertTriangle size={24} className="mr-2 flex-shrink-0 text-yellow-400" />
                            <span>
                                <strong className="block font-minecraft">Important Network Information:</strong>
                                Ensure you are sending from the <strong className="underline">{orderDetails.paymentMethod.network}</strong>.
                                Sending from a different network may result in loss of funds.
                            </span>
                        </p>
                    </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-border/30">
                    <h3 className="text-lg font-semibold text-foreground mb-3 title-animate">Instructions:</h3>
                    <ul className="space-y-2 text-sm text-foreground/70 font-roboto-mono">
                        <li className="flex items-center"><CheckCircle size={16} className="mr-2 text-green-400" /> Send the exact amount in a single transaction.</li>
                        <li className="flex items-center"><CheckCircle size={16} className="mr-2 text-green-400" /> Include enough to cover your wallet's network/gas fees.</li>
                        <li className="flex items-center"><Clock size={16} className="mr-2 text-primary" /> Once payment is sent, please wait on this page for confirmation.</li>
                    </ul>
                </div>
                <p className="mt-6 text-center text-foreground/80 font-roboto-mono">Status: <span className="font-semibold text-primary font-minecraft">Waiting for payment...</span></p>
                
                <Button onClick={handlePaymentConfirmationSimulation} className="w-full mt-6 bg-primary/20 text-primary hover:bg-primary/30 font-orbitron-specific tracking-wider">
                    Simulate Payment Sent (For Dev)
                </Button>
              </div>
            </motion.div>
          )}

          {paymentStatus === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-semibold text-foreground mb-3 title-animate">Processing Payment...</h2>
              <p className="text-foreground/70 font-roboto-mono">Please wait while we confirm your transaction on the blockchain. This may take a few minutes.</p>
            </motion.div>
          )}

          {paymentStatus === 'confirmed' && (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-20"
            >
              <CheckCircle className="h-20 w-20 text-green-400 mx-auto mb-6" />
              <h2 className="text-3xl font-semibold text-green-400 mb-3 title-animate">Payment Confirmed!</h2>
              <p className="text-foreground/80 mb-2 font-roboto-mono">Your order for <strong className="text-primary font-minecraft">{orderDetails.items.map(i => i.title).join(', ')}</strong> is successful.</p>
              <p className="text-foreground/70 mb-6 font-roboto-mono">You will be contacted on Telegram (<strong className="text-primary font-minecraft">{orderDetails.telegramHandle}</strong>) shortly with delivery details.</p>
              <Link to="/">
                <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-orbitron-specific tracking-wider">Back to Homepage</Button>
              </Link>
            </motion.div>
          )}

          {(paymentStatus === 'expired' || paymentStatus === 'error') && (
            <motion.div
              key="expired-error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <AlertTriangle className="h-20 w-20 text-destructive mx-auto mb-6" />
              <h2 className="text-3xl font-semibold text-destructive mb-3 title-animate">
                {paymentStatus === 'expired' ? 'Session Expired' : 'Payment Error'}
              </h2>
              <p className="text-foreground/70 mb-6 font-roboto-mono">
                {paymentStatus === 'expired' 
                  ? 'Your payment session has timed out. Please restart the checkout process to get a new payment address and rate.' 
                  : 'An error occurred while processing your payment. Please try again or contact support.'}
              </p>
              <Button onClick={restartCheckout} className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-orbitron-specific tracking-wider">
                Restart Checkout
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        {paymentStatus === 'waiting' && (
            <div className="mt-6 text-center">
                <Button variant="ghost" onClick={() => navigate('/checkout')} className="text-sm text-foreground/60 hover:text-foreground font-orbitron-specific">
                    <ArrowLeft size={16} className="mr-1.5" /> Back to Checkout Details
                </Button>
            </div>
        )}
      </div>
    </motion.div>
  );
};

export default PaymentPage;