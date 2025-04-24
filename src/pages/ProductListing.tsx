
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { ProductType } from '@/types/product';

// Price ranges for filtering
const priceRanges = [
  { id: 'price-1', label: 'Under ₹1,000', min: 0, max: 1000 },
  { id: 'price-2', label: '₹1,000 - ₹5,000', min: 1000, max: 5000 },
  { id: 'price-3', label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
  { id: 'price-4', label: '₹10,000 - ₹20,000', min: 10000, max: 20000 },
  { id: 'price-5', label: 'Over ₹20,000', min: 20000, max: Infinity }
];

const ProductListing = () => {
  const { category } = useParams<{ category?: string }>();
  const location = useLocation();
  const { products } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<ProductType[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('featured');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  
  // Get unique brands for the filter
  useEffect(() => {
    let productsToFilter = products;
    
    // Filter by category if provided
    if (category) {
      productsToFilter = products.filter(p => p.category === category);
    }
    
    setFilteredProducts(productsToFilter);
    
    // Extract unique brands
    const uniqueBrands = Array.from(new Set(productsToFilter.map(p => p.brand)));
    setBrands(uniqueBrands);
    
  }, [products, category]);
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...filteredProducts];
    
    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter(product => selectedBrands.includes(product.brand));
    }
    
    // Apply price filter
    if (selectedPriceRanges.length > 0) {
      const selectedRanges = priceRanges.filter(range => 
        selectedPriceRanges.includes(range.id)
      );
      
      result = result.filter(product => 
        selectedRanges.some(range => product.price >= range.min && product.price <= range.max)
      );
    }
    
    // Apply sorting
    switch(sortOrder) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // We don't have a date field in our mock data, so we'll sort by ID (assuming higher ID is newer)
        result.sort((a, b) => b.id - a.id);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      // 'featured' is default, no sorting needed
    }
    
    setDisplayedProducts(result);
  }, [filteredProducts, selectedBrands, selectedPriceRanges, sortOrder]);
  
  const toggleBrandFilter = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand) 
        : [...prev, brand]
    );
  };
  
  const togglePriceFilter = (priceRangeId: string) => {
    setSelectedPriceRanges(prev => 
      prev.includes(priceRangeId) 
        ? prev.filter(p => p !== priceRangeId) 
        : [...prev, priceRangeId]
    );
  };
  
  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedPriceRanges([]);
  };
  
  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 capitalize">
              {category || 'All Products'}
            </h1>
            <p className="text-gray-600">
              {displayedProducts.length} products found
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter sidebar - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearAllFilters}
                    className="text-gray-500 text-sm hover:text-gray-800"
                  >
                    Clear All
                  </Button>
                </div>
                
                {/* Brand Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Brands</h3>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <div key={brand} className="flex items-center">
                        <Checkbox 
                          id={`brand-${brand}`} 
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrandFilter(brand)}
                        />
                        <label 
                          htmlFor={`brand-${brand}`} 
                          className="ml-2 text-sm"
                        >
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map(range => (
                      <div key={range.id} className="flex items-center">
                        <Checkbox 
                          id={range.id} 
                          checked={selectedPriceRanges.includes(range.id)}
                          onCheckedChange={() => togglePriceFilter(range.id)}
                        />
                        <label 
                          htmlFor={range.id} 
                          className="ml-2 text-sm"
                        >
                          {range.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile filter button */}
            <div className="lg:hidden flex justify-between items-center mb-4">
              <Button 
                variant="outline" 
                onClick={toggleFilterVisibility}
                className="flex items-center"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest Arrivals</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Mobile filter sidebar */}
            {isFilterVisible && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex lg:hidden">
                <div className="bg-white w-4/5 h-full p-6 overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={toggleFilterVisibility}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  {/* Brand Filter */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Brands</h3>
                    <div className="space-y-2">
                      {brands.map(brand => (
                        <div key={brand} className="flex items-center">
                          <Checkbox 
                            id={`mobile-brand-${brand}`} 
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={() => toggleBrandFilter(brand)}
                          />
                          <label 
                            htmlFor={`mobile-brand-${brand}`} 
                            className="ml-2 text-sm"
                          >
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Filter */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Price Range</h3>
                    <div className="space-y-2">
                      {priceRanges.map(range => (
                        <div key={`mobile-${range.id}`} className="flex items-center">
                          <Checkbox 
                            id={`mobile-${range.id}`} 
                            checked={selectedPriceRanges.includes(range.id)}
                            onCheckedChange={() => togglePriceFilter(range.id)}
                          />
                          <label 
                            htmlFor={`mobile-${range.id}`} 
                            className="ml-2 text-sm"
                          >
                            {range.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-8">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={clearAllFilters}
                    >
                      Clear All
                    </Button>
                    
                    <Button 
                      className="flex-1 bg-brand-purple hover:bg-brand-darkPurple"
                      onClick={toggleFilterVisibility}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Product grid and sort options */}
            <div className="flex-1">
              {/* Sort options - Desktop */}
              <div className="hidden lg:flex justify-between items-center mb-6">
                <p className="text-sm text-gray-600">
                  Showing {displayedProducts.length} results
                </p>
                
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Products grid */}
              {displayedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <SlidersHorizontal className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-gray-500">
                    Try changing your filters or search term
                  </p>
                  <Button 
                    onClick={clearAllFilters} 
                    variant="outline" 
                    className="mt-4"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductListing;
