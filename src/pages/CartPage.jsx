import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CartPage = () => {
  const { cartState, removeItem, updateQuantity, clearCart, getCartTotal } = useCart();
  const cartTotal = getCartTotal();
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartState.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <motion.div {...fadeIn}>
          <ShoppingCart className="h-24 w-24 mx-auto text-muted-foreground mb-8" />
          <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link to="/tools">Explore Tools</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-32">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Shopping Cart</h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {cartState.items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4 flex-grow">
                <img-replace src={item.image || `https://source.unsplash.com/random/100x100/?${item.name.toLowerCase().replace(' ', '-')}`} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    Price: {item.price} {item.currency}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="h-8 w-8 hover:bg-primary/10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-3 text-sm">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-8 w-8 hover:bg-primary/10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-md font-semibold w-24 text-right">
                  {(item.price * item.quantity).toFixed(2)} {item.currency}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card rounded-xl p-6 space-y-6 sticky top-32">
            <h2 className="text-2xl font-bold">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{cartTotal.toFixed(2)} USD</span> {/* Assuming cart total is in USD for now */}
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                <span>Total</span>
                <span>{cartTotal.toFixed(2)} USD</span>
              </div>
            </div>
            <Button 
              size="lg" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
            <Button variant="outline" onClick={clearCart} className="w-full border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive">
              Clear Cart
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CartPage;