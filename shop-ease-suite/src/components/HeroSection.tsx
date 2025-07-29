import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.jpg';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-black/20" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center py-16 lg:py-24">
          {/* Content */}
          <div className="text-white space-y-6">
            <div className="flex items-center space-x-2 text-accent-light">
              <Star className="h-5 w-5 fill-current" />
              <span className="text-sm font-medium">Trusted by 50,000+ customers</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Discover
              <span className="block text-accent">Amazing Products</span>
              at Great Prices
            </h1>
            
            <p className="text-lg text-white/80 max-w-md">
              Shop the latest trends in electronics, fashion, and home decor. 
              Fast shipping, easy returns, and unbeatable customer service.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Browse Categories
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-white/60">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm text-white/60">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-sm text-white/60">Rating</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <img
              src={heroBanner}
              alt="Featured products"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}