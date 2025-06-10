import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export const CartContext = createContext(); // Exporting CartContext

export const useCart = () => useContext(CartContext);

const BINANCE_API_URL = 'https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem('cryonerCart');
    return localCart ? JSON.parse(localCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [solPriceUSD, setSolPriceUSD] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('cryonerCart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const fetchSolPrice = async () => {
      try {
        const response = await fetch(BINANCE_API_URL);
        if (!response.ok) {
          throw new Error(`Binance API error: ${response.status}`);
        }
        const data = await response.json();
        setSolPriceUSD(parseFloat(data.price));
      } catch (error) {
        console.error("Failed to fetch SOL price:", error);
        toast({
          title: "Crypto Price Error",
          description: "Could not fetch live SOL price. USD estimates may be unavailable.",
          variant: "destructive",
        });
        setSolPriceUSD(150); // Fallback price
      }
    };

    fetchSolPrice();
    const intervalId = setInterval(fetchSolPrice, 60000); // Refresh every minute

    return () => clearInterval(intervalId);
  }, [toast]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
      if (existingProductIndex !== -1) {
        toast({
          title: `${product.title} is already in your cart.`,
          description: "You can adjust details at checkout.",
        });
        return prevCart;
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
    setIsCartOpen(true); 
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    toast({
      title: "Item Removed",
      description: "The item has been removed from your cart.",
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };
  
  const clearCart = () => {
    setCart([]);
     toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const getCartTotalUSD = () => {
    if (!solPriceUSD && cart.some(item => item.currency === 'SOL')) return null; 

    return cart.reduce((total, item) => {
      let itemPriceUSD = 0;
      if (item.currency === 'SOL' && item.numericPrice && solPriceUSD) {
        itemPriceUSD = item.numericPrice * solPriceUSD;
      } else if (item.currency === 'USD' && item.numericPrice) {
        itemPriceUSD = item.numericPrice;
      } else if (typeof item.price === 'string' && item.price.toLowerCase() === 'contact for quote') {
         itemPriceUSD = 0; 
      }
      return total + (itemPriceUSD * item.quantity);
    }, 0);
  };


  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart,
      isCartOpen, 
      setIsCartOpen,
      toggleCart,
      solPriceUSD,
      getCartTotalUSD
    }}>
      {children}
    </CartContext.Provider>
  );
};