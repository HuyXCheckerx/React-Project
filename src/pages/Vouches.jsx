import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, ThumbsUp, MessageSquare, User, Calendar } from 'lucide-react';

const Vouches = () => {
  const [filter, setFilter] = useState('all');
  
  const testimonials = [
    {
      id: 1,
      name: "KKK",
      date: "May 15, 2025",
      rating: 5,
      category: "tools",
      product: "GhostPump Pro",
      comment: "GOATED"
    },
    {
      id: 2,
      name: "Tbaggger",
      date: "May 10, 2025",
      rating: 5,
      category: "services",
      product: "WP/cPanel Dumping Tutorial",
      comment: "W tutor, i was a complete beginner and im now supplying combos to russians lol."
    },
    {
      id: 3,
      name: "Llamtek",
      date: "May 5, 2025",
      rating: 4,
      category: "tools",
      product: "Cryoner Enterprise",
      comment: "Nice tools"
    },
    {
      id: 4,
      name: "David R.",
      date: "April 28, 2025",
      rating: 5,
      category: "services",
      product: "VPS Setup & Configuration",
      comment: "The VPS setup was flawless. Everything was optimized perfectly, and the rotating proxies work like a charm. Support was responsive and helpful throughout the process."
    },
    {
      id: 5,
      name: "Emma W.",
      date: "April 22, 2025",
      rating: 5,
      category: "tools",
      product: "GhostPump",
      comment: "As a beginner, I was worried about the learning curve, but this tool is incredibly user-friendly while still being powerful. The execution speed is amazing!"
    },
    {
      id: 6,
      name: "James H.",
      date: "April 15, 2025",
      rating: 5,
      category: "services",
      product: "Custom Tool Development",
      comment: "They developed a custom tool exactly to my specifications. The attention to detail was impressive, and the final product exceeded my expectations."
    },
    {
      id: 7,
      name: "Olivia P.",
      date: "April 10, 2025",
      rating: 4,
      category: "tools",
      product: "Cryoner Pro",
      comment: "The database access alone is worth the price. Having access to 380 billion lines is game-changing for my work. The only improvement would be more detailed documentation."
    },
    {
      id: 8,
      name: "Ryan M.",
      date: "April 5, 2025",
      rating: 5,
      category: "services",
      product: "Marketplace Access",
      comment: "Getting introduced to the private marketplace has been invaluable for my business. The connections and opportunities are exactly what I needed."
    }
  ];

  const filteredTestimonials = filter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === filter);

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Customer Vouches</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See what our customers have to say about our tools and services
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            onClick={() => setFilter('all')}
          >
            All Vouches
          </Button>
          <Button 
            variant={filter === 'tools' ? 'default' : 'outline'} 
            onClick={() => setFilter('tools')}
          >
            Tools
          </Button>
          <Button 
            variant={filter === 'services' ? 'default' : 'outline'} 
            onClick={() => setFilter('services')}
          >
            Services
          </Button>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index % 6) }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="bg-primary/20 rounded-full p-2 mr-3">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{testimonial.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <Star key={i + testimonial.rating} className="h-4 w-4 text-muted-foreground" />
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <span className="inline-block bg-secondary/50 text-xs font-medium rounded-full px-2.5 py-1 mb-2">
                  {testimonial.product}
                </span>
                <p className="text-sm">{testimonial.comment}</p>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <div className="flex items-center text-muted-foreground text-sm">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>{Math.floor(Math.random() * 50) + 5}</span>
                </div>
                <div className="flex items-center text-muted-foreground text-sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>{Math.floor(Math.random() * 10)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Submit Vouch CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 glass-card rounded-xl p-8 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-4">Had a great experience?</h2>
          <p className="text-muted-foreground mb-6">
            Submit a vouch on our telegram channel now.
          </p>

        </motion.div>
      </div>
    </div>
  );
};

export default Vouches;