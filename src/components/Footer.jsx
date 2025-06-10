import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Shield, Cpu, Zap, Twitch, Send } from 'lucide-react'; // Added Twitch & Send for Telegram

const Footer = () => {
  return (
    <footer className="bg-card/60 text-foreground/60 py-16 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-11 h-11 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg filter brightness-110">
                <span className="text-background font-bold text-2xl font-orbitron">C</span>
              </div>
              <span className="text-3xl font-bold gradient-text font-orbitron title-animate">Cryoner</span>
            </div>
            <p className="text-sm text-center md:text-left font-roboto-mono">
              Elite cyber solutions for a decentralized future.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <p className="font-orbitron font-semibold text-foreground/80 mb-4 text-lg">Quick Links</p>
            <ul className="space-y-2 text-sm font-roboto-mono">
              <li><Link to="/services" className="hover:text-primary transition-colors duration-300">Services</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors duration-300">Terms of Service</Link></li>
              <li><Link to="/uptime" className="hover:text-primary transition-colors duration-300">System Status</Link></li>
              <li><Link to="/vouches" className="hover:text-primary transition-colors duration-300">Testimonials</Link></li>
            </ul>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
             <p className="font-orbitron font-semibold text-foreground/80 mb-4 text-lg">Connect</p>
            <ul className="space-y-2 text-sm font-roboto-mono">
              <li>
                <a href="https://t.me/pillowware" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-primary transition-colors duration-300">
                  <Send size={18} />
                  <span>Telegram: @pillowware</span>
                </a>
              </li>
              <li>
                <span className="flex items-center space-x-2 opacity-70 cursor-not-allowed" title="Coming Soon">
                  <Twitch size={18} />
                  <span>Twitch (Soon)</span>
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
             <p className="font-orbitron font-semibold text-foreground/80 mb-4 text-lg">Our Edge</p>
            <div className="flex flex-col space-y-2 text-sm font-roboto-mono">
              <span className="flex items-center space-x-2">
                <Zap size={16} className="text-primary/80" />
                <span>Cutting-Edge Tech</span>
              </span>
              <span className="flex items-center space-x-2">
                <Shield size={16} className="text-primary/80" />
                <span>Stealth & Security</span>
              </span>
              <span className="flex items-center space-x-2">
                <Cpu size={16} className="text-primary/80" />
                <span>High-Performance Solutions</span>
              </span>
              <span className="flex items-center space-x-2">
                <Globe size={16} className="text-primary/80" />
                <span>Global Network Access</span>
              </span>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-10 border-t border-border/30 text-center">
          <p className="text-xs text-foreground/50 font-roboto-mono">
            © {new Date().getFullYear()} Cryoner Project by @pillowware. All rights reserved.
            <br />
            Excellence in cyber innovation. For educational and professional use only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;