import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Star, ShoppingCart, ArrowLeft, Heart } from 'lucide-react';
import productService from '@/services/productService';
import { Product as UIProduct } from '@/types/product';
import { useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<UIProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    productService.getProduct(id)
      .then((res) => {
        let apiProduct: any = res.data;
        if (apiProduct && typeof apiProduct === 'object' && 'product' in apiProduct) {
          apiProduct = apiProduct.product;
        }
        setProduct({
          id: apiProduct._id,
          name: apiProduct.name,
          description: apiProduct.description,
          price: apiProduct.price,
          image: apiProduct.images && apiProduct.images.length > 0 ? apiProduct.images[0].url : '/placeholder.svg',
          category: apiProduct.category,
          rating: apiProduct.rating?.average || 0,
          reviews: apiProduct.rating?.count || 0,
          inStock: apiProduct.inStock,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError('Product not found');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }
  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header onSearch={() => {}} onCategoryFilter={() => {}} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Button onClick={() => navigate('/products')}>
              Back to Products
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: "Added to cart",
      description: `${quantity} ${product.name}(s) added to your cart.`,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={() => {}} onCategoryFilter={() => {}} />
      
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Cart', href: '/cart' },
            { label: product.name }
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Placeholder for additional images */}
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer border-2 ${
                    selectedImage === i ? 'border-primary' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img
                    src={product.image}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <p className="text-3xl font-bold text-primary mb-4">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label htmlFor="quantity" className="font-semibold">
                  Quantity:
                </label>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>

              {product.inStock && (
                <p className="text-sm text-green-600">✓ In stock and ready to ship</p>
              )}
            </div>

            <Separator />

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Product Features</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• High-quality materials</li>
                  <li>• 1-year warranty included</li>
                  <li>• Free shipping on orders over $50</li>
                  <li>• 30-day return policy</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
