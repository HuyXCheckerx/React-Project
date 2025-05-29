import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Copy, Check, ExternalLink, AlertTriangle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

// Placeholder for actual QR code generation library if needed in future
// For now, using a placeholder image
const generateQrCodeUrl = (address) => `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(address)}`;

const cryptoAddresses = {
  usdt: {
    sol: "CF8hdkDE1Xd9LrvNMpuARKDKGTRCngJGHgbPhYQ7Y128",
    erc20: "0xfefa148b29438a890f085c3a5020024d6f0929eb",
    bnb: "0xfefa148b29438a890f085c3a5020024d6f0929eb",
    trc20: "TXR46zUYHpm9KhneZvPjiWQT8DLdtJjH5k",
  },
  btc: "3GiZafrEY9BKXRTTfZffXUf1cvwKiUVYQb",
  eth: "0xfefa148b29438a890f085c3a5020024d6f0929eb",
  ltc: "ltc1qa8urj24lktmpy7kc4v2ftc6slwhftkdt5rjtd2",
  sol: "CF8hdkDE1Xd9LrvNMpuARKDKGTRCngJGHgbPhYQ7Y128",
};

const PaymentDetailsPage = () => {
  const { crypto, chain } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentAddress, setPaymentAddress] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let address = '';
    if (crypto === 'usdt' && chain && cryptoAddresses.usdt[chain]) {
      address = cryptoAddresses.usdt[chain];
    } else if (cryptoAddresses[crypto] && typeof cryptoAddresses[crypto] === 'string') {
      address = cryptoAddresses[crypto];
    } else {
      toast({
        title: "Error",
        description: "Invalid payment method or chain selected.",
        variant: "destructive",
      });
      navigate('/checkout');
      return;
    }
    
    if (address.startsWith("YOUR_")) {
       toast({
        title: "Configuration Needed",
        description: "Payment address not configured. Please contact support.",
        variant: "destructive",
      });
       setPaymentAddress("ADDRESS_NOT_CONFIGURED");
    } else {
      setPaymentAddress(address);
    }

  }, [crypto, chain, navigate, toast]);

  const handleCopyAddress = () => {
    if (paymentAddress && paymentAddress !== "ADDRESS_NOT_CONFIGURED") {
      navigator.clipboard.writeText(paymentAddress).then(() => {
        setCopied(true);
        toast({
          title: "Copied!",
          description: "Payment address copied to clipboard.",
        });
        setTimeout(() => setCopied(false), 2000);
      }).catch(err => {
        toast({
          title: "Error",
          description: "Could not copy address. Please copy manually.",
          variant: "destructive",
        });
      });
    }
  };

  const handleDone = () => {
    // Placeholder: Ideally, verify payment here or provide instructions
    toast({
      title: "Payment Initiated",
      description: "Redirecting to Telegram for confirmation...",
      className: "bg-green-600 text-white border-green-600",
    });
    setTimeout(() => {
      window.location.href = "https://t.me/pillowware"; // Replace with your Telegram link
    }, 2000);
  };

  const cryptoName = crypto.toUpperCase();
  const chainName = chain ? chain.toUpperCase() : '';

  return (
    <div className="container mx-auto px-4 py-32 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full glass-card rounded-xl p-8 text-center"
      >
        <h1 className="text-3xl font-bold mb-2">Complete Your Payment</h1>
        <p className="text-muted-foreground mb-6">
          Send {cryptoName} {chainName && `(${chainName})`} to the address below.
        </p>

        {paymentAddress === "ADDRESS_NOT_CONFIGURED" ? (
           <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-md mb-6 flex items-center gap-3">
            <AlertTriangle className="h-6 w-6" />
            <p className="text-sm">The payment address for this cryptocurrency is not configured yet. Please contact support or try a different payment method.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <img-replace 
                alt={`${cryptoName} ${chainName} QR Code`} 
                className="w-48 h-48 mx-auto rounded-lg border border-border p-1 bg-white" 
                src={generateQrCodeUrl(paymentAddress)} 
              />
            </div>

            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-1">Payment Address:</p>
              <div className="flex items-center justify-center p-3 bg-secondary rounded-md">
                <span className="text-sm font-mono break-all mr-3">{paymentAddress}</span>
                <Button variant="ghost" size="icon" onClick={handleCopyAddress} className="hover:bg-primary/20">
                  {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-primary" />}
                </Button>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/50 text-yellow-300 p-4 rounded-md mb-8 text-sm">
              <p className="font-semibold">Important:</p>
              <ul className="list-disc list-inside text-left mt-2 space-y-1">
                <li>Ensure you are sending {cryptoName} on the {chainName || cryptoName} network.</li>
                <li>Sending any other coin or to a different network may result in loss of funds.</li>
                <li>Transactions are final and cannot be reversed.</li>
                <li>Send the exact amount of {cryptoName} to the address above, then click the Check Payment button.</li>
              </ul>
            </div>

            <Button 
              size="lg" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-4"
              onClick={handleDone}
            >
              Check Payment <ExternalLink className="ml-2 h-4 w-4"/>
            </Button>
          </>
        )}


        <Button 
          variant="outline" 
          onClick={() => navigate('/checkout')}
          className="w-full"
        >
          Choose Different Method
        </Button>
      </motion.div>
    </div>
  );
};

export default PaymentDetailsPage;