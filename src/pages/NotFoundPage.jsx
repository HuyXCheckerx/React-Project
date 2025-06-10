import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home } from 'lucide-react';

const NotFoundPage = ({ variants, transition }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 bg-background"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.42, 0, 0.58, 1] }}
        className="mb-8"
      >
        <AlertTriangle className="text-yellow-400" size={96} />
      </motion.div>
      <motion.h1
        className="text-5xl md:text-7xl font-bold mb-4 gradient-text tracking-tight title-animate"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'circOut' }}
      >
        404 - Page Not Found
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl text-foreground/70 mb-10 max-w-xl font-roboto-mono"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: 'circOut' }}
      >
        Oops! The page you're looking for doesn't exist or has been moved.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: 'circOut' }}
      >
        <Link to="/">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground px-8 py-6 rounded-full text-lg shadow-lg font-orbitron-specific"
          >
            <Home className="mr-2.5" size={20} />
            Go to Homepage
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFoundPage;