import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Bitcoin, DollarSign, RefreshCw, ExternalLink, QrCode } from 'lucide-react'; // Assuming Ethereum, Litecoin, Solana icons available or use generic
import { useToast } from "@/components/ui/use-toast";

const cryptoOptions = [
  { id: 'usdt', name: 'USDT', icon: <DollarSign className="h-5 w-5 mr-2" />, chains: [
    { id: 'sol', name: 'Solana (SOL)', shortName: 'SOL' },
    { id: 'erc20', name: 'Ethereum (ERC20)', shortName: 'ERC20' },
    { id: 'bnb', name: 'BNB Smart Chain (BEP20)', shortName: 'BNB' },
  ]},
  { id: 'btc', name: 'Bitcoin', icon: <Bitcoin className="h-5 w-5 mr-2" /> },
  { id: 'eth', name: 'Ethereum', icon: <RefreshCw className="h-5 w-5 mr-2" /> }, // Placeholder icon
  { id: 'ltc', name: 'Litecoin', icon: <RefreshCw className="h-5 w-5 mr-2" /> }, // Placeholder icon
  { id: 'sol', name: 'Solana', icon: <RefreshCw className="h-5 w-5 mr-2" /> }, // Placeholder icon
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoOptions[0].id);
  const [selectedUsdtChain, setSelectedUsdtChain] = useState(cryptoOptions[0].chains ? cryptoOptions[0].chains[0].id : null);

  const handlePayment = () => {
    if (selectedCrypto === 'usdt' && !selectedUsdtChain) {
      toast({
        title: "Selection Missing",
        description: "Please select a USDT chain.",
        variant: "destructive",
      });
      return;
    }
    const chain = selectedCrypto === 'usdt' ? selectedUsdtChain : undefined;
    navigate(`/payment/${selectedCrypto}${chain ? `/${chain}` : ''}`);
  };

  return (
    <div className="container mx-auto px-4 py-32 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Payment Method</h1>
        <p className="text-lg text-muted-foreground">Select your preferred cryptocurrency to proceed.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-2xl mx-auto glass-card rounded-xl p-8"
      >
        <Tabs defaultValue={cryptoOptions[0].id} onValueChange={setSelectedCrypto} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 gap-2 mb-6">
            {cryptoOptions.map(crypto => (
              <TabsTrigger key={crypto.id} value={crypto.id} className="py-3 text-xs sm:text-sm flex-col sm:flex-row h-auto">
                {React.cloneElement(crypto.icon, { className: "h-5 w-5 mb-1 sm:mb-0 sm:mr-2"})}
                {crypto.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {cryptoOptions.map(crypto => (
            <TabsContent key={crypto.id} value={crypto.id}>
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-center">Pay with {crypto.name}</h2>
                {crypto.id === 'usdt' && crypto.chains && (
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-center">Select USDT Network:</p>
                    <RadioGroup 
                      defaultValue={selectedUsdtChain || crypto.chains[0].id} 
                      onValueChange={setSelectedUsdtChain}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                    >
                      {crypto.chains.map(chain => (
                        <Label 
                          key={chain.id} 
                          htmlFor={`usdt-${chain.id}`} 
                          className={`flex flex-col items-center justify-center rounded-md border-2 p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer ${selectedUsdtChain === chain.id ? 'border-primary bg-primary/10' : 'border-muted'}`}
                        >
                           <RadioGroupItem value={chain.id} id={`usdt-${chain.id}`} className="sr-only" />
                          <span className="font-semibold">{chain.shortName}</span>
                          <span className="text-xs text-muted-foreground">{chain.name.split('(')[1].replace(')','')}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>
                )}
                <Button 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-6"
                  onClick={handlePayment}
                >
                  Proceed to Pay with {crypto.name} {selectedCrypto === 'usdt' && selectedUsdtChain ? `(${cryptoOptions[0].chains.find(c=>c.id === selectedUsdtChain)?.shortName})` : ''}
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <p className="text-xs text-muted-foreground mt-8 text-center">
          Ensure you send the correct cryptocurrency to the correct network. Transactions are irreversible.
        </p>
      </motion.div>
    </div>
  );
};

export default CheckoutPage;