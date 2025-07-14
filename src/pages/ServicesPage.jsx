import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useLocation } from 'react-router-dom';
import ServiceCard from '@/components/ServiceCard';
import { allServicesFlat, serviceCategories } from '@/data/servicesData';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, ShoppingCart, MessageSquare, Layers, Code, Bot, Eye, ExternalLink } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';

const ServicesPage = ({ variants, transition }) => {
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get('category');

  const serviceId = params.serviceId;
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleAddToCart = (service) => {
    if (service.price.toLowerCase() === 'contact for quote' || (typeof service.numericPrice !== 'number' && service.price.toLowerCase() !== 'contact for quote') ) {
      toast({
        title: "Inquiry Required",
        description: `Please contact @pillowware on Telegram for ${service.title}.`,
        variant: "default",
      });
      return;
    }
    addToCart(service);
    toast({
      title: `${service.title} Added to Cart!`,
      description: "Proceed to checkout or continue browsing.",
      variant: "default",
    });
  };

  const handleContactRedirect = (service, platform) => {
    if (service.contactInfo && service.contactInfo[platform]) {
      window.open(service.contactInfo[platform], '_blank');
    }
  };

  if (serviceId) {
    const service = allServicesFlat.find(s => s.id === serviceId);
    if (!service) {
      return (
        <motion.div 
          className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-28 pb-12"
          initial="initial" animate="in" exit="out" variants={variants} transition={transition}
        >
          <h1 className="text-4xl font-bold gradient-text mb-4 title-animate">Service Not Found</h1>
          <p className="text-foreground/80 mb-8 font-roboto-mono">The service you are looking for does not exist or has been moved.</p>
          <Link to="/services">
            <Button variant="outline" className="text-primary border-primary hover:bg-primary/10 font-orbitron-specific">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
            </Button>
          </Link>
        </motion.div>
      );
    }
    
    const currentCategoryForBreadcrumb = serviceCategories.find(sc => sc.data.some(s => s.id === serviceId));
    const isContactForPrice = service.price.toLowerCase().includes('contact for price') || service.price.toLowerCase().includes('contact for quote');
    const hasContactInfo = service.contactInfo && (service.contactInfo.discord || service.contactInfo.telegram);

    return (
      <motion.div 
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40"
        initial="initial" animate="in" exit="out" variants={variants} transition={transition}
      >
        <div className="mb-10">
          <Link to={currentCategoryForBreadcrumb ? `/services?category=${currentCategoryForBreadcrumb.id}` : "/services"}>
            <Button variant="ghost" className="text-primary hover:bg-primary/10 font-orbitron-specific tracking-wider">
              <ArrowLeft className="mr-2.5 h-5 w-5" /> 
              {currentCategoryForBreadcrumb ? `BACK TO ${currentCategoryForBreadcrumb.title.toUpperCase()}` : 'ALL SERVICES'}
            </Button>
          </Link>
        </div>
        
        <div className="bg-card p-8 md:p-12 rounded-2xl shadow-2xl border border-border/60">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'circOut' }}
            >
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-auto object-cover rounded-xl shadow-xl aspect-video border border-border/40"
              />
              <img 
                src={service.image2} 
                alt={service.title}
                className="w-full h-auto object-cover rounded-xl shadow-xl aspect-video border border-border/40"
              />
              <img 
                src={service.image3} 
                alt={service.title}
                className="w-30 h-30 object-cover rounded-xl shadow-xl aspect-video border border-border/40"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'circOut', delay: 0.15 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-5 gradient-text tracking-tight title-animate">{service.title}</h1>
              <p className="text-lg text-foreground/80 mb-7 font-roboto-mono leading-relaxed">{service.fullDescription || service.description}</p>
              <span className={`text-3xl font-bold bg-gradient-to-r ${service.gradient || 'from-primary to-accent'} bg-clip-text text-transparent mb-8 block font-minecraft`}>
                {service.price} {service.currency === 'SOL' && service.price.toLowerCase() !== 'contact for quote' && <span className="text-xl"> SOL</span>}
              </span>
              <div className="flex flex-col sm:flex-row gap-4">
                {!isContactForPrice && typeof service.numericPrice === 'number' ? (
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-95 text-primary-foreground px-8 py-7 rounded-lg text-base shadow-lg font-orbitron-specific tracking-wider"
                    onClick={() => handleAddToCart(service)}
                  >
                    <ShoppingCart className="mr-3" size={22} /> Add2Cart
                  </Button>
                ) : isContactForPrice && hasContactInfo ? (
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    {service.contactInfo.discord && (
                      <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-95 text-white px-8 py-7 rounded-lg text-base shadow-lg font-orbitron-specific tracking-wider"
                        onClick={() => handleContactRedirect(service, 'discord')}
                      >
                        <ExternalLink className="mr-3" size={22} /> DISCORD
                      </Button>
                    )}
                    {service.contactInfo.telegram && (
                      <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-95 text-white px-8 py-7 rounded-lg text-base shadow-lg font-orbitron-specific tracking-wider"
                        onClick={() => handleContactRedirect(service, 'telegram')}
                      >
                        <MessageSquare className="mr-3" size={22} /> TELEGRAM
                      </Button>
                    )}
                  </div>
                ) : (
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-95 text-primary-foreground px-8 py-7 rounded-lg text-base shadow-lg font-orbitron-specific tracking-wider"
                    onClick={() => toast({ title: "Inquiry Required", description: `Please contact @pillowware on Telegram for ${service.title}.`})}
                  >
                     <MessageSquare className="mr-3" size={22} /> CONTACT FOR QUOTE
                  </Button>
                )}
                {!isContactForPrice && (
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="text-primary border-primary hover:bg-primary/10 hover:text-primary px-8 py-7 rounded-lg text-base font-orbitron-specific tracking-wider"
                     onClick={() => toast({ title: "Inquiry", description: "Contact @pillowware on Telegram for more details."})}
                  >
                    <MessageSquare className="mr-3" size={22} /> ENQ
                  </Button>
                )}
              </div>
            </motion.div>
          </div>

          <div className="mt-16 pt-10 border-t border-border/40">
            <h2 className="text-3xl font-semibold text-foreground mb-8 title-animate">Key Features & Specifications</h2>
            <ul className="space-y-4 text-lg">
              {service.features.map((feature, idx) => (
                <motion.li 
                  key={idx} 
                  className="flex items-start space-x-3.5"
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: 'circOut' }}
                >
                  <CheckCircle className="text-green-400 mt-1.5 flex-shrink-0" size={22} />
                  <span className="text-foreground/80 font-roboto-mono">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    );
  }
  
  const currentCategory = serviceCategories.find(cat => cat.id === categoryId);
  const displayData = currentCategory ? currentCategory.data : allServicesFlat;
  const displayTitle = currentCategory ? currentCategory.title : "All Services & Tools";
  const DisplayIcon = currentCategory ? currentCategory.icon : Layers;
  
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
      className="pt-20"
    >
      <section id="services" className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'circOut' }}
            viewport={{ once: true }}
          >
            {DisplayIcon && <DisplayIcon size={48} className="mx-auto mb-4 text-primary" />}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text tracking-tight title-animate">{displayTitle}</h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-roboto-mono">
              {currentCategory ? currentCategory.summary : "Explore our full arsenal of professional-grade digital solutions."}
            </p>
            {categoryId && (
              <div className="mt-6">
                <Link to="/services">
                  <Button variant="ghost" className="text-primary hover:bg-primary/10 font-orbitron-specific text-sm">
                    <ArrowLeft className="mr-2 h-4 w-4" /> View All Categories
                  </Button>
                </Link>
              </div>
            )}
            {!categoryId && serviceCategories.length > 0 && (
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {serviceCategories.map(cat => (
                  <Link key={cat.id} to={`/services?category=${cat.id}`}>
                    <Button variant="outline" className="text-sm border-primary/60 text-primary/90 hover:bg-primary/10 hover:text-primary hover:border-primary font-orbitron-specific">
                      {cat.icon && <cat.icon size={16} className="mr-2" />}
                      {cat.title}
                    </Button>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>

          {displayData.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {displayData.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: 'circOut' }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <ServiceCard service={service} onAddToCart={handleAddToCart} />
                </motion.div>
              ))}
            </div>
          ) : (
             <p className="text-center text-xl text-foreground/60 font-roboto-mono py-10">
                No services found in this category yet. Check back soon!
            </p>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default ServicesPage;