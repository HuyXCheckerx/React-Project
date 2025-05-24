
    import React from 'react';
    import { Link, NavLink } from 'react-router-dom';
    import { ShoppingCart, Zap } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useCart } from '@/contexts/CartContext';
    import { motion } from 'framer-motion';
    import { cn } from '@/lib/utils';

    const Navbar = () => {
      const { cartCount } = useCart();

      const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/#products' },
        { name: 'Features', path: '/#features' },
        { name: 'Testimonials', path: '/#testimonials' },
      ];

      const handleScrollTo = (e, hash) => {
        if (window.location.pathname === '/') {
          e.preventDefault();
          const element = document.getElementById(hash.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      };


      return (
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-8 bg-background/80 backdrop-blur-md shadow-lg"
        >
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-orbitron font-bold text-primary">
              <Zap className="h-8 w-8 text-primary animate-pulse" />
              <span>Cryoner Project</span>
            </Link>
            <div className="hidden md:flex space-x-6 items-center">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={(e) => item.path.includes('#') && handleScrollTo(e, item.path.substring(item.path.indexOf('#')))}
                  className={({ isActive }) =>
                    cn(
                      "text-foreground/80 hover:text-primary transition-colors duration-300 font-medium",
                      isActive && item.path === '/' ? "text-primary" : ""
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/checkout">
                <Button variant="ghost" size="icon" aria-label="Cart">
                  <ShoppingCart className="h-6 w-6 text-foreground/80 hover:text-primary transition-colors" />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
              {/* Mobile menu button can be added here */}
            </div>
          </div>
        </motion.nav>
      );
    };

    export default Navbar;
  