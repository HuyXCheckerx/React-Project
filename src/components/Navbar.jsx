import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Menu, X, Home, ListTree, FileText, Award, BarChart3, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const { cart, toggleCart } = useCart();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Services', path: '/services', icon: ListTree },
    { name: 'Vouches', path: '/vouches', icon: Award },
    { name: 'Uptime', path: '/uptime', icon: BarChart3 },
    { name: 'Terms', path: '/terms', icon: FileText },
  ];

  const handleContactClick = () => {
    toast({
      title: "Contact Information",
      description: "Reach out via Telegram: @pillowware for premium support and consultation.",
      variant: "default",
      duration: 7000,
    });
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    if (path === '/services' && (location.pathname.startsWith('/services/') || location.pathname === '/services')) {
      return true;
    }
    return location.pathname === path;
  };


  return (
    <nav className="fixed top-0 w-full z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1], delay: 0.1 }}
          >
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg filter brightness-110">
                <span className="text-background font-bold text-xl font-orbitron-specific">C</span> 
              </div>
              <span className="text-3xl font-bold gradient-text font-minecraft title-animate">Cryoner</span>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-7">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 350, damping: 15 }}
              >
                <NavLink
                  to={item.path}
                  className={`text-foreground/80 hover:text-primary transition-colors duration-300 font-medium text-xs pb-1.5 font-orbitron-specific tracking-wider ${isActive(item.path) ? 'nav-link-active' : ''}`}
                >
                  {item.name.toUpperCase()}
                </NavLink>
              </motion.div>
            ))}
            <Button
              onClick={handleContactClick}
              variant="outline"
              className="border-primary/70 text-primary/90 hover:bg-primary/10 hover:text-primary hover:border-primary px-5 py-2.5 rounded-lg shadow-sm transition-all duration-300 font-orbitron-specific text-[0.6rem]"
              size="sm"
            >
              CONTACT
            </Button>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Button
                onClick={toggleCart}
                variant="ghost"
                size="icon"
                className="relative text-foreground/80 hover:text-primary"
              >
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white font-orbitron-specific">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </Button>
            </motion.div>
          </div>

          <button
            className="md:hidden text-foreground/80 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'circOut' }}
            className="md:hidden bg-card/98 backdrop-blur-xl border-t border-border/60 shadow-2xl"
          >
            <div className="px-5 py-6 space-y-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-3.5 px-4 py-3 rounded-lg text-foreground/80 hover:bg-secondary hover:text-primary transition-all duration-200 font-medium font-orbitron-specific text-xs tracking-wider ${isActive(item.path) ? 'bg-secondary text-primary' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon size={22} />
                  <span>{item.name.toUpperCase()}</span>
                </NavLink>
              ))}
              <Button
                onClick={handleContactClick}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground mt-4 py-3.5 rounded-lg shadow-md font-orbitron-specific tracking-wider text-xs"
              >
                CONTACT US
              </Button>
              <Button
                onClick={() => { toggleCart(); setIsMenuOpen(false); }}
                variant="outline"
                className="w-full border-primary/70 text-primary/90 hover:bg-primary/10 hover:text-primary hover:border-primary mt-2 py-3.5 rounded-lg shadow-sm font-orbitron-specific tracking-wider flex items-center justify-center text-xs"
              >
                <ShoppingCart size={20} className="mr-2" />
                VIEW CART ({cart.reduce((acc, item) => acc + item.quantity, 0)})
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;