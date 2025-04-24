
import React from 'react';
import ProductCard from './ProductCard';
import { ProductType } from '@/types/product';
import { useProducts } from '@/hooks/useProducts';

interface FeaturedProductsProps {
  title?: string;
  subtitle?: string;
  productIds?: number[];
  category?: string;
  limit?: number;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  title = "Featured Products",
  subtitle = "Our hand-picked favorites just for you", 
  productIds,
  category,
  limit = 8
}) => {
  const { products } = useProducts();
  
  // Filter products based on props
  let filteredProducts = [...products];
  
  if (productIds && productIds.length > 0) {
    filteredProducts = products.filter(product => productIds.includes(product.id));
  } else if (category) {
    filteredProducts = products.filter(product => product.category === category);
  }
  
  // Limit the number of products shown
  const displayProducts = filteredProducts.slice(0, limit);
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
