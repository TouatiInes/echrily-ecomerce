import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProductGrid } from '@/components/ProductGrid';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import productService from '@/services/productService';
import { Product } from '@/types/product';

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch featured products
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        const response = await productService.getFeaturedProducts(8);
        if (response.success) {
          setFeaturedProducts(response.data.products);
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      // Navigate to products page with search
      navigate(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    if (category !== 'All') {
      // Navigate to products page with category filter
      navigate(`/products?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onSearch={handleSearch}
        onCategoryFilter={handleCategoryFilter}
      />
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-lg">Loading featured products...</div>
          </div>
        ) : (
          <>
            <ProductGrid
              products={featuredProducts}
              title="Featured Products"
            />
            <div className="text-center mt-8">
              <Button
                onClick={() => navigate('/products')}
                size="lg"
                className="bg-gradient-primary hover:bg-primary-dark"
              >
                View All Products
              </Button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Index;
