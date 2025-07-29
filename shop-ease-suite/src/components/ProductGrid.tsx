import { useState } from 'react';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

export function ProductGrid({ products, title = "Featured Products" }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setSelectedProduct(null);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of premium products, carefully chosen for quality and style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={handleProductClick}
            />
          ))}
        </div>

        {/* Product Detail Modal */}
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-2xl">
            {selectedProduct && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">
                    {selectedProduct.name}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-64 md:h-80 object-cover rounded-lg"
                    />
                    {!selectedProduct.inStock && (
                      <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <Badge className="bg-primary text-primary-foreground">
                      {selectedProduct.category}
                    </Badge>
                    
                    <p className="text-muted-foreground">
                      {selectedProduct.description}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(selectedProduct.rating)
                                ? 'fill-accent text-accent'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                      </span>
                    </div>
                    
                    <div className="text-3xl font-bold text-primary">
                      ${selectedProduct.price}
                    </div>
                    
                    <Button
                      onClick={() => handleAddToCart(selectedProduct)}
                      disabled={!selectedProduct.inStock}
                      className="w-full bg-gradient-primary hover:bg-primary-dark"
                      size="lg"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}