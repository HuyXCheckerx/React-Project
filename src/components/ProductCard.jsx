
    import React from 'react';
    import { motion, useMotionValue, useTransform } from 'framer-motion';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { CheckCircle, ShoppingCart, ExternalLink, Zap, MessageCircle, Users } from 'lucide-react';
    import { useCart } from '@/contexts/CartContext';
    import { cn } from '@/lib/utils';

    const ProductCard = ({ product }) => {
      const { addToCart, isInCart } = useCart();
      const [isAdded, setIsAdded] = React.useState(isInCart(product.id));

      const x = useMotionValue(0);
      const y = useMotionValue(0);

      const rotateX = useTransform(y, [-100, 100], [10, -10]);
      const rotateY = useTransform(x, [-100, 100], [-10, 10]);

      const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
      };

      const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
      };

      const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);
      };

      return (
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, perspective: 1000 }}
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className={cn("product-panel-transparent overflow-hidden shadow-2xl hover:shadow-primary/30 transition-shadow duration-300 h-full flex flex-col", product.accentColor && `border-${product.accentColor.split('-')[1]}-500/50`)}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{product.name}</CardTitle>
                <Zap className={cn("h-8 w-8", product.accentColor ? `text-${product.accentColor.split('-')[1]}-400` : "text-primary")} />
              </div>
              <CardDescription className="text-muted-foreground pt-1">{product.tagline}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <img 
                alt={product.name + " illustration"}
                className="w-full h-48 object-cover rounded-md mb-4 border border-border"
               src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
              <p className="text-sm text-foreground/80 mb-4">{product.description}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold text-md mb-2 text-foreground">Key Features:</h4>
                <ul className="space-y-1">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-foreground/70">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-md mb-2 text-foreground">Pricing:</h4>
                <div className="space-y-2">
                  {product.pricingPlans.map((plan, index) => (
                    <div key={index} className="text-sm p-2 rounded-md bg-background/50 border border-border/50">
                      <span className="font-semibold text-primary">{plan.name}: {plan.price}</span> - <span className="text-foreground/70">{plan.details}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row sm:justify-between items-center gap-2 pt-4 border-t border-border/50">
              {isAdded ? (
                <>
                  <Button variant="outline" className="w-full sm:w-auto bg-green-600/20 border-green-500 text-green-400 hover:bg-green-600/30 hover:text-green-300">
                    <CheckCircle className="mr-2 h-4 w-4" /> Added to Cart
                  </Button>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="secondary" className="flex-1 sm:flex-initial" onClick={() => window.open('https://telegram.org', '_blank')}>
                      <MessageCircle className="mr-2 h-4 w-4" /> Telegram
                    </Button>
                    <Button variant="secondary" className="flex-1 sm:flex-initial" onClick={() => window.open('https://discord.com', '_blank')}>
                      <Users className="mr-2 h-4 w-4" /> Discord
                    </Button>
                  </div>
                </>
              ) : (
                <Button onClick={handleAddToCart} className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity duration-300 text-primary-foreground">
                  <ShoppingCart className="mr-2 h-4 w-4" /> View Details & Add to Cart
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      );
    };

    export default ProductCard;
  