
    import React from 'react';
    import { createContext, useContext, useState, useEffect } from 'react';
    import { useToast } from '@/components/ui/use-toast';

    const CartContext = createContext();

    export const useCart = () => useContext(CartContext);

    export const CartProvider = ({ children }) => {
      const [cartItems, setCartItems] = useState([]);
      const { toast } = useToast();

      useEffect(() => {
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      }, []);

      useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }, [cartItems]);

      const addToCart = (product) => {
        setCartItems((prevItems) => {
          const existingItem = prevItems.find((item) => item.id === product.id);
          if (existingItem) {
            toast({
              title: "Already in Cart",
              description: `${product.name} is already in your cart.`,
              variant: "default",
            });
            return prevItems;
          }
          toast({
            title: "Added to Cart!",
            description: `${product.name} has been added to your cart.`,
            variant: "default",
          });
          return [...prevItems, { ...product, quantity: 1 }];
        });
      };

      const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
        const product = cartItems.find(item => item.id === productId);
        if (product) {
          toast({
            title: "Removed from Cart",
            description: `${product.name} has been removed from your cart.`,
            variant: "destructive",
          });
        }
      };

      const clearCart = () => {
        setCartItems([]);
        toast({
          title: "Cart Cleared",
          description: "All items have been removed from your cart.",
        });
      };

      const isInCart = (productId) => {
        return cartItems.some(item => item.id === productId);
      };

      const value = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        cartCount: cartItems.length,
      };

      return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
    };
  