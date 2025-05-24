
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Zap, ShieldCheck, BarChartBig, Settings2, BrainCircuit } from 'lucide-react';

    const features = [
      {
        icon: <Zap className="h-10 w-10 text-primary mb-4" />,
        title: 'Blazing Fast Performance',
        description: 'Our tools are optimized for speed, written mostly in Rust, ensuring you get data and execute actions in record time.',
      },
      {
        icon: <ShieldCheck className="h-10 w-10 text-green-500 mb-4" />,
        title: 'Robust Security',
        description: 'All HIWD, IPs, and sensitive data are encrypted and stored securely, protecting your privacy and assets.',
      },
      {
        icon: <BarChartBig className="h-10 w-10 text-blue-500 mb-4" />,
        title: 'Actionable Analytics',
        description: 'Detailed Antipublic data.',
      },
      {
        icon: <Settings2 className="h-10 w-10 text-purple-500 mb-4" />,
        title: 'Highly Customizable',
        description: 'Tailor tools to your specific needs with flexible settings and configurations.',
      },
     
    ];

    const FeaturesSection = () => {
      return (
        <section id="features" className="py-16 md:py-24 bg-card/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y:20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <Settings2 className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Why Choose The Cryoner Project?</h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                We're committed to providing Anonymous Cutting edge tools for our community.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-background/70 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                    <CardHeader>
                      {feature.icon}
                      <CardTitle className="text-xl font-semibold text-foreground">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      );
    };

    export default FeaturesSection;
  