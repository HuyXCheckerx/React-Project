import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service, onAddToCart, isHomepageCard = false }) => {
  
  const cardContent = (
    <>
      <div className="relative mb-5 overflow-hidden rounded-lg aspect-[16/10] group-hover:shadow-2xl group-hover:shadow-primary/20 transition-shadow duration-400">
        <img  
          src={service.image} 
          alt={service.title}
          class="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
         src="https://images.unsplash.com/photo-1690721606848-ac5bdcde45ea" />
        <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient || 'from-primary/50 to-accent/50'} opacity-20 group-hover:opacity-10 transition-opacity duration-400`}></div>
        {service.tag && (
          <span className="absolute top-3 right-3 bg-accent/80 text-accent-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow-md font-orbitron-specific tracking-wider">
            {service.tag}
          </span>
        )}
      </div>
      
      <div className="px-1 pb-1 flex flex-col flex-grow">
        <h3 className="text-xl lg:text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300 tracking-wide title-animate">{service.title}</h3>
        <p className="text-foreground/70 mb-4 text-xs lg:text-sm flex-grow font-roboto-mono leading-relaxed">{service.description}</p>
        
        {!isHomepageCard && service.features.slice(0, 2).map((feature, idx) => (
            <div key={idx} className="flex items-center space-x-2 mb-1.5">
              <CheckCircle className="text-green-400 flex-shrink-0" size={14} />
              <span className="text-xs text-foreground/60 font-roboto-mono">{feature}</span>
            </div>
          ))}
        
        {isHomepageCard && service.features.slice(0, 1).map((feature, idx) => ( 
            <div key={idx} className="flex items-center space-x-2 mb-3">
              <CheckCircle className="text-green-400 flex-shrink-0" size={14} />
              <span className="text-xs text-foreground/60 font-roboto-mono">{feature}</span>
            </div>
          ))}

        <div className="mt-auto pt-3 flex justify-between items-center">
          <span className={`text-lg lg:text-xl font-bold bg-gradient-to-r ${service.gradient || 'from-primary to-accent'} bg-clip-text text-transparent font-minecraft`}>
            {service.price}
          </span>
          {onAddToCart && !isHomepageCard && (
            <Button 
              variant="outline"
              size="sm"
              onClick={(e) => { e.preventDefault(); onAddToCart(service); }}
              className="text-primary border-primary/70 hover:bg-primary/10 hover:text-primary group-hover:border-primary font-orbitron-specific text-xs px-3 py-2"
            >
              <ShoppingCart className="mr-1.5" size={14} /> ADD
            </Button>
          )}
        </div>
      </div>
    </>
  );

  return (
    <motion.div
      className="service-card bg-card rounded-xl p-5 shadow-lg border border-border/40 flex flex-col h-full group cursor-pointer"
      whileHover={{ y: -10, scale: 1.03, boxShadow: "0px 15px 30px hsla(var(--primary)/0.25)" }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
    >
      <Link to={`/services/${service.id}`} className="flex flex-col flex-grow">
        {cardContent}
      </Link>
      {isHomepageCard && onAddToCart && (
         <Button 
            variant="ghost"
            size="sm"
            onClick={(e) => { e.preventDefault(); onAddToCart(service); }}
            className="w-full mt-3 text-primary hover:bg-primary/10 hover:text-primary font-orbitron-specific text-xs py-2.5"
          >
            <ShoppingCart className="mr-2" size={16} /> QUICK ADD
          </Button>
      )}
    </motion.div>
  );
};

export default ServiceCard;