import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      {
        const existingItem = state.items.find(item => item.id === action.payload.id);
        if (existingItem) {
          return {
            ...state,
            items: state.items.map(item =>
              item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        }
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: Math.max(1, action.payload.quantity) } : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'LOAD_CART':
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const { toast } = useToast();
  const initialState = { items: [] };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(storedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    toast({
      title: "Added to Cart!",
      description: `${item.name} has been added to your cart.`,
      className: "bg-green-600 text-white border-green-600",
    });
  };

  const removeItem = (id) => {
    const itemToRemove = state.items.find(item => item.id === id);
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    if (itemToRemove) {
      toast({
        title: "Removed from Cart",
        description: `${itemToRemove.name} has been removed from your cart.`,
        variant: "destructive",
      });
    }
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
     toast({
      title: "Cart Updated",
      description: `Quantity updated.`,
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast({
      title: "Cart Cleared",
      description: "Your shopping cart has been emptied.",
    });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => {
        const price = parseFloat(String(item.price).replace(/[^0-9.-]+/g,""));
        return total + price * item.quantity;
    }, 0);
  };
  
  const getCartItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };


  return (
    <CartContext.Provider value={{ cartState: state, addItem, removeItem, updateQuantity, clearCart, getCartTotal, getCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};