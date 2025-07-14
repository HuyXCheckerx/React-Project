import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, TrendingUp, Settings, Code, Bot, Layers, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceCard from '@/components/ServiceCard'; 
import { serviceCategories } from '@/data/servicesData'; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import Beams from '@/Beams';
import GradientText from '@/GradientText'
import CountUp from '@/CountUp'




const HomePage = ({ variants, transition }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handlePlayOnView = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    };
    const observer = new window.IntersectionObserver(handlePlayOnView, { threshold: 0.5 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = (service) => {
    if (service.price.toLowerCase() === 'contact for quote') {
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
      description: "Your selection is now in the cart.",
      variant: "default",
    });
  };

  const Section = ({ id, title, children, icon: Icon }) => (
    <motion.section
      id={id}
      className="py-16 md:py-24 bg-card/10 backdrop-blur-sm my-8 rounded-xl border border-border/30 shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'circOut' }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          {Icon && <Icon size={48} className="mx-auto mb-4 text-primary" />}
          <h2 className="text-4xl md:text-5xl font-bold mb-3 gradient-text tracking-wide title-animate">{title}</h2>
        </div>
        {children}
      </div>
    </motion.section>
  );

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
      className="pt-20 overflow-x-hidden"
    >
      {/* Hero Section */}
      <section id="home" className="min-h-[80vh] flex items-center justify-center text-center py-24 md:py-32 hero-gradient relative overflow-hidden">
        {/* Background Layer 1: Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
        
        {/* Background Layer 2: Beams (NEWLY ADDED) */}
        <div className="absolute inset-0 z-0 opacity-15">
            <Beams
                beamWidth={3}
                beamHeight={30}
                beamNumber={20}
                lightColor="#fff000"
                speed={2}
                noiseIntensity={3}
                scale={0.2}
                rotation={30}
            />
        </div>
        
        {/* Foreground Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 gradient-text tracking-tighter title-animate"
            initial={{ opacity: 0, y: 50, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0em' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            CRYONER Project
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto font-roboto-mono"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'circOut', delay: 0.4 }}
          >
            Optimized and 
            <br />
            Made with &#60;3 <span className="text-primary font-semibold">@pillowware</span>.
          </motion.p>
          <motion.p
            className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto font-roboto-mono"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'circOut', delay: 0.4 }}
          >
          <GradientText
  colors={["#8b0000","#dc143c"]}
  animationSpeed={2}
  showBorder={false}
  className="custom-class"
>
<CountUp
  from={0}
  to={260}
  separator=","
  direction="up"
  duration={1}
  className="count-up-text"
/>+ </GradientText><GradientText
  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
  animationSpeed={5}
  showBorder={false}
  className="custom-class"
>
Happy customers and still counting
</GradientText>
</motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'circOut', delay: 0.7 }}
          >
            <Link to="/services">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-95 text-primary-foreground px-12 py-8 rounded-lg text-lg pulse-glow shadow-2xl font-orbitron-specific tracking-wider"
              >
                Explore Services <ArrowRight className="ml-3" size={24} />
              </Button>
            </Link>
            <Link to="/uptime" className="flex items-center space-x-2.5 text-green-400 hover:text-green-300 transition-colors font-roboto-mono">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute opacity-75"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full relative"></div>
              <span className="font-semibold text-sm">Uptime ~ 99.9%</span>
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent"></div>
      </section>
      
      {/* Product Demo Video Section */}
      <section className="flex flex-col justify-center items-center py-16 md:py-24 bg-transparent">
        <h2 className="text-4xl md:text-5xl font-bold mb-10 gradient-text tracking-wide title-animate font-orbitron-specific text-center">
          How Things Work
        </h2>
        <div className="relative w-full max-w-[1920px] mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-primary/60 bg-black/80 group" style={{ minHeight: '540px' }}>
          <video
            ref={videoRef}
            className="w-full h-[540px] md:h-[900px] object-cover rounded-3xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-primary/40"
            width="1920"
            height="900"
            src="/demo.mp4"
            loop
            playsInline
            muted
            autoPlay
            poster="/video-poster.jpg"
            style={{ boxShadow: '0 0 40px 0 rgba(0, 183, 255, 0.25)' }}
            onContextMenu={e => e.preventDefault()}
          />
        </div>
      </section>
      
      {/* Summarized Features Section */}
       <Section id="overview" title="OVERVIEW" icon={Layers}>
        <p className="text-center text-lg text-foreground/70 mb-12 max-w-3xl mx-auto font-roboto-mono">
          Fastest and most reliable tools/services in the combolist/sol community.
        </p>
        <Tabs defaultValue={serviceCategories[0].id} className="w-full max-w-100xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 bg-card/50 p-2 rounded-lg border border-border/30 mb-8 h-100">
            {serviceCategories.map(cat => (
              <TabsTrigger key={cat.id} value={cat.id} className="py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-md font-orbitron-specific tracking-wide">
                {cat.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {serviceCategories.map(cat => (
            <TabsContent key={cat.id} value={cat.id}>
              <p className="text-center text-md text-foreground/60 mb-8 font-roboto-mono">{cat.summary}</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cat.data.slice(0, 3).map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: 'circOut' }}
                  >
                    <ServiceCard service={service} onAddToCart={handleAddToCart} isHomepageCard={true}/>
                  </motion.div>
                ))}
              </div>
              {cat.data.length > 3 && (
                 <motion.div
                  className="text-center mt-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                 >
                  <Link to={`/services?category=${cat.id}`}>
                    <Button variant="outline" size="lg" className="text-primary border-primary hover:bg-primary/10 hover:text-primary px-8 py-3 rounded-lg text-sm font-orbitron-specific tracking-wider">
                      View All {cat.title} <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </Link>
                </motion.div>
              )}
              {cat.data.length === 0 && (
                <p className="text-center text-foreground/50 font-roboto-mono py-8">No services in this category yet. Stay tuned!</p>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </Section>


      {/* Why Choose Cryoner Section */}
      <Section id="why-cryoner" title="The Cryoner Advantage" icon={Shield}>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {[
            { icon: Zap, title: 'Unrivaled Performance', description: 'Written and Optimized with Rust, enhanced with the newest 0days, and clean/minimalist webUI is our proudest advantages.' },
            { icon: Eye, title: 'Stealth & Anonymity', description: 'Designed by and for anonymous hackers, every bit of Cryoner Project is anonymous.' },
            { icon: Code, title: 'Cutting-Edge Technology', description: 'Leveraging the latest exploits and 0days, constantly updated to stay ahead of the curve.' },
            { icon: Settings, title: 'Precision Engineering', description: 'Each tool is meticulously crafted for reliability and effectiveness in complex digital environments.' },
            { icon: Bot, title: 'Automated Efficiency', description: 'Speed, scale and persistence is nothing compairing to Cryoner project ghostpump/mev and botnets.' },
            { icon: TrendingUp, title: 'Continuous Evolution', description: 'We are committed to ongoing research and development, ensuring our arsenal remains state-of-the-art.' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="p-6 bg-card rounded-lg shadow-lg border border-border/50 flex items-start space-x-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'circOut' }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-md flex items-center justify-center mt-1 shadow-md">
                <item.icon className="text-background" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-1.5 title-animate">{item.title}</h3>
                <p className="text-foreground/70 text-sm font-roboto-mono">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </motion.div>
  );
};

export default HomePage;