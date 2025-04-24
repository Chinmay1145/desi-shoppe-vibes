
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, IndianRupee, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedProducts from '@/components/FeaturedProducts';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const product = products.find(p => p.id === Number(id));
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Get related products (same category)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };
  
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist`,
    });
  };
  
  const nextImage = () => {
    if (product.images) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images!.length);
    }
  };
  
  const prevImage = () => {
    if (product.images) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images!.length) % product.images!.length);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex text-sm text-gray-500">
              <li><Link to="/" className="hover:text-brand-purple">Home</Link></li>
              <li><span className="mx-2">/</span></li>
              <li><Link to={`/category/${product.category}`} className="hover:text-brand-purple capitalize">{product.category}</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="text-gray-900">{product.name}</li>
            </ol>
          </nav>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Product Images */}
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                <img 
                  src={product.images ? product.images[currentImageIndex] : product.image} 
                  alt={product.name}
                  className="object-contain h-full w-full"
                />
                
                {product.images && product.images.length > 1 && (
                  <>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </>
                )}
              </div>
              
              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div className="flex mt-4 space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button 
                      key={index} 
                      className={`w-16 h-16 rounded border-2 flex-shrink-0 ${index === currentImageIndex ? 'border-brand-purple' : 'border-transparent'}`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} - view ${index + 1}`}
                        className="w-full h-full object-cover rounded"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm">{product.rating} ({product.reviewCount} reviews)</span>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center text-2xl font-bold">
                  <IndianRupee className="h-5 w-5" />
                  <span>{product.price.toLocaleString()}</span>
                </div>
                
                {product.originalPrice && (
                  <>
                    <span className="ml-3 text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="ml-3 bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              {/* Features */}
              {product.features && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Key Features</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-700">{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Stock Status */}
              <div className="mb-6">
                <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <div className="flex items-center w-32 border border-gray-300 rounded">
                  <button 
                    className="px-3 py-2 border-r border-gray-300" 
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    -
                  </button>
                  <input 
                    type="number"
                    className="w-full text-center border-none focus:ring-0 py-2"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  />
                  <button 
                    className="px-3 py-2 border-l border-gray-300" 
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Button 
                  className="flex-1 bg-brand-purple hover:bg-brand-darkPurple"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> 
                  Add to Cart
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-12 w-12"
                  onClick={toggleWishlist}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-12 w-12"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Brand */}
              <div className="border-t pt-4 text-sm text-gray-600">
                <span className="font-semibold">Brand:</span> {product.brand}
              </div>
              
              <div className="border-t pt-4 text-sm text-gray-600">
                <span className="font-semibold">Category:</span> {product.category}
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <Tabs defaultValue="details" className="mb-16">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 mb-8">
              <TabsTrigger value="details">Details & Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="p-6 bg-gray-50 rounded-lg">
              {product.specifications && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b">
                        <span className="font-medium">{key}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="reviews" className="p-6 bg-gray-50 rounded-lg">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span>{product.rating} out of 5</span>
                </div>
                <p className="mb-6">Based on {product.reviewCount} reviews</p>
                <Button className="bg-brand-purple hover:bg-brand-darkPurple">
                  Write a Review
                </Button>
              </div>
              
              <div className="border-t pt-6">
                <p className="text-gray-500 italic text-center py-8">
                  Be the first to review this product!
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="p-6 bg-gray-50 rounded-lg">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Shipping Information</h3>
                  <p className="text-gray-700">
                    We offer free shipping on orders above ₹1000. Standard shipping typically takes 3-5 business days, depending on your location. Express shipping options are available at checkout for an additional fee.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Return Policy</h3>
                  <p className="text-gray-700">
                    We accept returns within 15 days of delivery. Items must be unused, unworn, and in their original packaging with tags attached. Please note that certain products like earbuds and headphones may have different return policies for hygiene reasons.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Warranty</h3>
                  <p className="text-gray-700">
                    All products come with standard manufacturer warranty. Watches typically have a 1-year warranty against manufacturing defects, while electronics like headphones and earbuds come with a 6-month to 1-year warranty depending on the brand.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="product-card">
                    <Link to={`/product/${relatedProduct.id}`} className="block">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name} 
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-1 truncate">{relatedProduct.name}</h3>
                        <div className="flex items-center">
                          <span className="price">
                            ₹{relatedProduct.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
