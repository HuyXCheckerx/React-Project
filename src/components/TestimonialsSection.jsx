
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardContent } from '@/components/ui/card';
    import { Star, UserCircle, MessageSquare as MessageSquareQuote } from 'lucide-react';

    const testimonials = [
      {
        name: 'Alex R.',
        role: 'SEO Specialist',
        quote: "The SEO Scraper has revolutionized my workflow. I'm finding insights I never could before!",
        stars: 5,
        imagePlaceholder: "Professional headshot of Alex R."
      },
      {
        name: 'CryptoQueen77',
        role: 'Solana Trader',
        quote: "This sniping bot is insane! Consistently getting into launches early. A game changer for my SOL plays.",
        stars: 5,
        imagePlaceholder: "Avatar of CryptoQueen77"
      },
      {
        name: 'Sarah L.',
        role: 'Digital Marketer',
        quote: "SynthTools offers an incredible suite. The AI Content Generator is my new best friend for blog posts.",
        stars: 4,
        imagePlaceholder: "Friendly photo of Sarah L."
      },
    ];

    const TestimonialsSection = () => {
      return (
        <section id="testimonials" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y:20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <MessageSquareQuote className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Loved by Innovators</h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Hear what our users are saying about their success with SynthTools.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <Card className="h-full bg-card/70 backdrop-blur-sm border-border/50 p-6 flex flex-col items-center text-center hover:shadow-primary/20 transition-shadow duration-300">
                    <img 
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full mb-4 border-2 border-primary object-cover"
                     src="https://images.unsplash.com/photo-1694388001616-1176f534d72f" />
                    <CardContent className="flex-grow p-0">
                      <p className="text-lg font-semibold text-foreground mb-1">{testimonial.name}</p>
                      <p className="text-sm text-primary mb-3">{testimonial.role}</p>
                      <div className="flex justify-center mb-3">
                        {[...Array(testimonial.stars)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ))}
                        {[...Array(5 - testimonial.stars)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400" />
                        ))}
                      </div>
                      <blockquote className="text-muted-foreground italic">"{testimonial.quote}"</blockquote>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      );
    };

    export default TestimonialsSection;
  