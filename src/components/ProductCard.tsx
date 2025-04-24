
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from "@/hooks/use-toast";
import { ProductType } from '@/types/product';

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist`,
    });
  };
  
  // Calculate discount percentage
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  
  return (
    <div className="product-card group">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-image"
          />
        </Link>
        
        {/* Discount tag */}
        {discountPercentage > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
            {discountPercentage}% OFF
          </span>
        )}
        
        {/* Quick actions */}
        <div className="absolute top-2 right-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white rounded-full h-8 w-8" 
            onClick={toggleWishlist}
          >
            <Heart 
              className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} 
            />
          </Button>
        </div>
        
        {/* Quick add to cart - appears on hover */}
        <div className="absolute bottom-4 left-0 right-0 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            className="w-full bg-brand-purple hover:bg-brand-darkPurple text-white"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
        </Link>
        
        <div className="flex items-center mb-1">
          <span className="price">
            ₹{product.price.toLocaleString()}
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </span>
        </div>
        
        <div className="text-sm text-gray-500 truncate">{product.brand}</div>
      </div>
    </div>
  );
};

export default ProductCard;
