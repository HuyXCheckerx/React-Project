
    import React from 'react';
    import { Zap, Github, Twitter, Linkedin } from 'lucide-react';

    const Footer = () => {
      const currentYear = new Date().getFullYear();
      return (
        <footer className="bg-card/50 border-t border-border py-12">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            <div className="flex justify-center items-center mb-6">
              <Zap className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-orbitron font-bold text-primary">SynthTools</span>
            </div>
            <p className="mb-4 text-sm">
              Providing cutting-edge solutions for SEO and Crypto enthusiasts.
            </p>
            <div className="flex justify-center space-x-6 mb-6">
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={24} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
            <p className="text-xs">
              &copy; {currentYear} SynthTools. All rights reserved.
            </p>
            <p className="text-xs mt-1">
              Built with passion by Hostinger Horizons.
            </p>
          </div>
        </footer>
      );
    };

    export default Footer;
  