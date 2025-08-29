import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, ExternalLink, ArrowLeft, Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Squares from '@/Squares';

const PaymentStatusPage = ({ variants, transition }) => {
  const location = useLocation();
  const orderDetails = location.state?.orderDetails;
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const openPaymentTab = async () => {
    try {
      // Import and use the same redirect function as checkout
      const { redirectToPaymentSite } = await import('@/utils/orderUtils');
      await redirectToPaymentSite('https://pay.cryoner.store/process', orderDetails);
    } catch (error) {
      console.error('Error opening payment tab:', error);
      // Fallback to basic URL
      const params = new URLSearchParams({
        orderId: orderDetails.orderId,
        amount: orderDetails.finalTotal,
        currency: orderDetails.paymentMethod.ticker,
        network: orderDetails.paymentMethod.network,
        address: orderDetails.paymentMethod.address,
        email: orderDetails.email || '',
        telegram: orderDetails.telegramHandle,
        timestamp: orderDetails.timestamp
      });

      const redirectUrl = `https://pay.cryoner.store/process?${params.toString()}`;
      window.open(redirectUrl, '_blank');
    }
  };

  if (!orderDetails) {
    return (
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20"
        initial="initial" animate="in" exit="out" variants={variants} transition={transition}
      >
        <h1 className="text-3xl font-bold text-foreground mb-4 title-animate">No Order Found</h1>
        <p className="text-foreground/80 mb-8">No order details were found. Please start a new checkout.</p>
        <Link to="/services">
          <Button variant="outline" className="text-primary border-primary hover:bg-primary/10 font-orbitron-specific">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
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
      className="min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 bg-background relative overflow-hidden"
    >
      {/* Squares Background Layer */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Squares 
          speed={0.5} 
          squareSize={40}
          direction='diagonal'
          borderColor='#fff'
          hoverFillColor='#000'
        />
      </div>

      {/* Content on top of background */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'circOut' }}
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text tracking-tight title-animate">Payment Status</h1>
            <p className="text-lg text-foreground/70 mt-2 font-roboto-mono">Complete your payment in the new tab</p>
          </div>

          <div className="bg-card/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl border border-border/50 mb-8">
            {/* Order Summary */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2 title-animate">Payment Window Opened</h2>
              <p className="text-foreground/70 font-roboto-mono">
                A new tab has been opened for you to complete your payment.
              </p>
            </div>

            {/* Order Details */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3 font-minecraft">Order Details</h3>
              <div className="space-y-2 text-sm font-roboto-mono">
                <div className="flex justify-between">
                  <span className="text-foreground/80">Order ID:</span>
                  <span className="text-primary font-medium">{orderDetails.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/80">Amount:</span>
                  <span className="text-foreground">${orderDetails.finalTotal.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/80">Payment Method:</span>
                  <span className="text-foreground">{orderDetails.paymentMethod.name} ({orderDetails.paymentMethod.ticker})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/80">Network:</span>
                  <span className="text-foreground">{orderDetails.paymentMethod.network}</span>
                </div>
              </div>
            </div>

            {/* Timer */}
            <div className="text-center mb-6">
              <div className="text-2xl font-mono text-primary mb-2">{formatTime(timeElapsed)}</div>
              <p className="text-sm text-foreground/60 font-roboto-mono">Time since payment window opened</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={openPaymentTab}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-base rounded-lg shadow-md font-orbitron-specific tracking-wider"
                size="lg"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Open Payment Tab Again
              </Button>

              <div className="grid grid-cols-2 gap-4">
                <Link to="/services">
                  <Button variant="outline" className="w-full text-primary border-primary hover:bg-primary/10 font-orbitron-specific">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Button>
                </Link>
                
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="w-full border-border hover:bg-card/50 font-orbitron-specific"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh Status
                </Button>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <h4 className="text-yellow-400 font-medium mb-2 font-minecraft">Payment Instructions</h4>
              <ul className="text-sm text-foreground/80 space-y-1 font-roboto-mono">
                <li>• Complete your payment in the opened tab</li>
                <li>• Keep this tab open to monitor your order</li>
                <li>• You will receive confirmation via Telegram once payment is processed</li>
                <li>• If you closed the payment tab, click "Open Payment Tab Again" above</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PaymentStatusPage;
