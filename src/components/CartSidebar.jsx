import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { X, ShoppingCart, Trash2, MinusCircle, PlusCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CartSidebar = () => {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, solPriceUSD, getCartTotalUSD, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const totalUSD = getCartTotalUSD();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-card shadow-2xl z-[100] flex flex-col border-l border-border/50"
          >
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <h2 className="text-2xl font-bold gradient-text font-orbitron flex items-center">
                <ShoppingCart size={28} className="mr-3 text-primary" /> Your Arsenal
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)} className="text-foreground/70 hover:text-primary">
                <X size={24} />
              </Button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
                <ShoppingCart size={64} className="text-primary/30 mb-6" />
                <p className="text-xl text-foreground/70 font-semibold mb-2 font-orbitron">Your Cart is Empty</p>
                <p className="text-sm text-foreground/50 mb-6 font-roboto-mono">Add some elite tools to get started.</p>
                <Link to="/services">
                  <Button onClick={() => setIsCartOpen(false)} className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-orbitron tracking-wider">
                    Explore Services
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-grow overflow-y-auto p-6 space-y-5">
                  {cart.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start space-x-4 p-4 bg-secondary/30 rounded-lg border border-border/40"
                    >
                      <img 
                        src={item.image}
                        alt={item.title}
                        class="w-20 h-20 object-cover rounded-md border border-border/50"
                       src="https://images.unsplash.com/photo-1642452222105-b2933e287da4" />
                      <div className="flex-grow">
                        <h3 className="text-md font-semibold text-foreground font-orbitron">{item.title}</h3>
                        <p className="text-sm text-primary font-semibold font-roboto-mono">
                          {item.price}
                          {item.currency === 'SOL' && solPriceUSD && item.numericPrice && (
                            <span className="text-xs text-foreground/60 ml-1">
                              (≈${(item.numericPrice * solPriceUSD).toFixed(2)} USD)
                            </span>
                          )}
                        </p>
                         <div className="flex items-center mt-2">
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-foreground/60 hover:text-primary" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                            <MinusCircle size={16} />
                          </Button>
                          <span className="mx-2 text-sm font-roboto-mono">{item.quantity}</span>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-foreground/60 hover:text-primary" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <PlusCircle size={16} />
                          </Button>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-red-500/70 hover:text-red-500">
                        <Trash2 size={18} />
                      </Button>
                    </motion.div>
                  ))}
                </div>

                <div className="p-6 border-t border-border/50 space-y-4">
                   <div className="flex justify-between items-center">
                    <p className="text-lg text-foreground/80 font-roboto-mono">Subtotal:</p>
                    <p className="text-xl font-semibold text-primary font-orbitron">
                      {totalUSD === null && cart.some(i => i.currency === 'SOL') ? 'Calculating...' : `$${totalUSD !== null ? totalUSD.toFixed(2) : 'N/A'} USD`}
                    </p>
                  </div>
                  <p className="text-xs text-foreground/50 text-center font-roboto-mono">Final crypto amount calculated at checkout based on live rates.</p>
                  <Button 
                    onClick={handleCheckout} 
                    className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground py-3.5 text-md rounded-lg shadow-lg hover:opacity-90 font-orbitron tracking-wider"
                    disabled={cart.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={clearCart}
                    className="w-full text-destructive/80 border-destructive/50 hover:bg-destructive/10 hover:text-destructive font-orbitron text-xs py-2.5"
                    disabled={cart.length === 0}
                  >
                    Clear Cart
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;