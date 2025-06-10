import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageCircle, UserCheck, ThumbsUp } from 'lucide-react';
import { vouchesData } from '@/data/vouchesData';

const VouchesPage = ({ variants, transition }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
      className="pt-20"
    >
      <section id="vouches" className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'circOut' }}
            viewport={{ once: true }}
          >
            <ThumbsUp size={48} className="mx-auto mb-4 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text tracking-tight title-animate">Client Testimonials & Vouches</h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-roboto-mono">
              Hear from professionals who trust Cryoner Project for their critical digital needs. Real feedback from verified users.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vouchesData.map((vouch, index) => (
              <motion.div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-xl border border-border/50 flex flex-col h-full transform hover:shadow-primary/20 hover:border-primary/40 transition-all duration-300 ease-out"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: 'circOut' }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-background font-bold text-2xl shadow-lg font-orbitron-specific filter brightness-110">
                    {vouch.name.charAt(0)}
                  </div>
                  <div className="ml-5">
                    <h3 className="text-xl font-semibold text-foreground title-animate">{vouch.name}</h3>
                    <div className="flex mt-1.5">
                      {[...Array(vouch.rating)].map((_, i) => (
                        <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />
                      ))}
                      {[...Array(5 - vouch.rating)].map((_, i) => (
                        <Star key={`empty-${i}`} className="text-foreground/30 fill-foreground/30" size={20} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex-grow mb-6 relative">
                  <MessageCircle className="text-primary/70 absolute -left-1 -top-1 opacity-50" size={28}/>
                  <p className="text-foreground/80 italic leading-relaxed pl-4 font-roboto-mono text-sm">"{vouch.comment}"</p>
                </div>
                {vouch.serviceUsed && (
                  <div className="mt-auto pt-5 border-t border-border/40">
                    <span className="text-xs text-foreground/60 flex items-center font-roboto-mono">
                      <UserCheck size={16} className="mr-2 text-green-400" />
                      Verified User of: <strong className="ml-1.5 text-primary/80 font-semibold font-minecraft">{vouch.serviceUsed}</strong>
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default VouchesPage;