
    import React from 'react';
    import { useState } from 'react';
    import { Button } from '@/components/ui/button';
    import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
    } from '@/components/ui/dropdown-menu';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { cryptoPaymentOptions } from '@/constants/cryptoAddresses';
    import { Copy, Check, CreditCard, AlertTriangle, ExternalLink } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    import { useCart } from '@/contexts/CartContext';
    import { motion } from 'framer-motion';

    const CryptoCheckoutPage = () => {
      const [selectedCrypto, setSelectedCrypto] = useState(null);
      const [copiedAddress, setCopiedAddress] = useState('');
      const { toast } = useToast();
      const { cartItems, cartCount, clearCart } = useCart();

      const handleCopyAddress = (address, name) => {
        navigator.clipboard.writeText(address);
        setCopiedAddress(address);
        toast({
          title: 'Address Copied!',
          description: `${name} address copied to clipboard.`,
        });
        setTimeout(() => setCopiedAddress(''), 2000);
      };
      
      // Placeholder for total amount. In a real app, this would be calculated from cartItems.
      const totalAmount = cartItems.reduce((sum, item) => {
        // This is a naive sum, real app would need price conversion if items have different currencies
        const priceMatch = item.pricingPlans[0]?.price.match(/(\d+(\.\d+)?)/);
        return sum + (priceMatch ? parseFloat(priceMatch[1]) : 0);
      }, 0).toFixed(2);


      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-gradient-to-br from-background via-card to-background flex flex-col items-center justify-center py-12 px-4 pt-24"
        >
          <Card className="w-full max-w-lg bg-card/80 backdrop-blur-md shadow-2xl border-primary/30">
            <CardHeader className="text-center">
              <CreditCard className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-3xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Crypto Checkout</CardTitle>
              <CardDescription className="text-muted-foreground">
                Complete your purchase by joining telegram or discord with your txid.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {cartCount > 0 ? (
                <div className="p-4 border border-border rounded-lg bg-background/50">
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Order Summary</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground mb-2">
                    {cartItems.map(item => (
                      <li key={item.id} className="flex justify-between">
                        <span></span>
                        {/* This is a placeholder price, real app needs logic */}
                        <span></span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between font-semibold text-foreground border-t border-border pt-2">
                    <span>Total (Approx.)</span>
                    {/* This is a placeholder total, real app needs logic */}
                    <span>Pay the equivalent and create a ticket on Telegram/discord</span> 
                  </div>
                </div>
              ) : (
                <p className="text-center text-muted-foreground">Your cart is empty. Add some tools to proceed!</p>
              )}

              {cartCount > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="lg" className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity">
                      {selectedCrypto ? `Pay with ${selectedCrypto.name}` : 'Select Crypto to Pay'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-[300px] max-h-80 overflow-y-auto bg-popover border-border">
                    <DropdownMenuLabel>Choose a Cryptocurrency</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {cryptoPaymentOptions.map((crypto) => (
                      <DropdownMenuItem
                        key={crypto.symbol}
                        onSelect={() => setSelectedCrypto(crypto)}
                        className="hover:bg-accent/50 focus:bg-accent/50"
                      >
                        <img  alt={crypto.name} className="w-5 h-5 mr-2 rounded-full" src="https://variety.com/wp-content/uploads/2021/12/Bitcoin-Cryptocurrency-Placeholder.jpg?w=1000&h=563&crop=1&resize=910%2C511" />
                        {crypto.name} ({crypto.symbol})
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {selectedCrypto && cartCount > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-6 rounded-lg bg-background/50 border border-primary/50 text-center"
                >
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    Pay with {selectedCrypto.name} ({selectedCrypto.symbol})
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">Network: {selectedCrypto.network}</p>
                  <div className="flex items-center justify-center p-3 my-3 bg-muted rounded-md break-all text-sm font-mono text-accent-foreground">
                    {selectedCrypto.address}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleCopyAddress(selectedCrypto.address, selectedCrypto.name)}
                    className="w-full border-accent text-accent hover:bg-accent/10"
                  >
                    {copiedAddress === selectedCrypto.address ? (
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="mr-2 h-4 w-4" />
                    )}
                    {copiedAddress === selectedCrypto.address ? 'Address Copied!' : 'Copy Address'}
                  </Button>
                  <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-700/50 rounded-md text-xs text-yellow-300/80">
                    <AlertTriangle className="inline h-4 w-4 mr-1 mb-0.5" />
                    Please ensure you send the correct amount of {selectedCrypto.symbol} to this address on the {selectedCrypto.network} network. Transactions are irreversible.
                  </div>
                  <Button 
                    variant="link" 
                    className="mt-2 text-xs text-primary"
                    onClick={() => {
                      clearCart();
                      toast({ title: "Order 'Completed'", description: "Thank you for your 'payment'. Your cart has been cleared."});
                      setSelectedCrypto(null);
                    }}
                  >
                    I've made the payment <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </motion.div>
              )}
            </CardContent>
            <CardFooter className="text-center">
              <p className="text-xs text-muted-foreground">
                For support, please join our Discord or Telegram.
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      );
    };

    export default CryptoCheckoutPage;
  