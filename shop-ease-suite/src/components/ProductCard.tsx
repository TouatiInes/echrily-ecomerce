import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Get primary image or first image
  const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
  const imageUrl = primaryImage?.url || product.image || '/placeholder-image.jpg';

  // Get product ID (handle both _id and id)
  const productId = product._id || product.id;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleCardClick = () => {
    navigate(`/products/${productId}`);
  };

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-hover hover:-translate-y-1 bg-gradient-card border-0 overflow-hidden"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={primaryImage?.alt || product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {!product.inStock && (
          <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">
            Out of Stock
          </Badge>
        )}
        <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
          {product.category}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating?.average || 0)
                    ? 'fill-accent text-accent'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating?.average?.toFixed(1) || '0.0'} ({product.rating?.count || 0})
          </span>
        </div>
        
        <div className="text-2xl font-bold text-primary">
          ${product.price}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full bg-gradient-primary hover:bg-primary-dark transition-all duration-300"
          size="lg"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
}