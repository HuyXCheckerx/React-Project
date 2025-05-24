
    import React from 'react';
    import { Zap, Github, Twitter, Linkedin } from 'lucide-react';

    const Footer = () => {
      const currentYear = new Date().getFullYear();
      return (
        <footer className="bg-card/50 border-t border-border py-12">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            <div className="flex justify-center items-center mb-6">
              <Zap className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-orbitron font-bold text-primary">Cryoner Project</span>
            </div>
            <p className="mb-4 text-sm">
              .
            </p>
            <div className="flex justify-center space-x-6 mb-6">
              
              
              
            </div>
            <p className="text-xs">
              &copy; {currentYear} Cryoner Project. All rights reserved.
            </p>
            <p className="text-xs mt-1">
              Built with passion by Pillowware.
            </p>
          </div>
        </footer>
      );
    };

    export default Footer;
  