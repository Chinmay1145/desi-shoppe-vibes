
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Menu, 
  X, 
  User, 
  Search,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems } = useCart();
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality will be implemented later
    console.log('Searching for:', searchQuery);
  };
  
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-brand-purple">Desi<span className="text-black">Vibes</span></span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-brand-purple transition-colors">Home</Link>
            <Link to="/products" className="font-medium hover:text-brand-purple transition-colors">All Products</Link>
            <Link to="/category/shoes" className="font-medium hover:text-brand-purple transition-colors">Shoes</Link>
            <Link to="/category/watches" className="font-medium hover:text-brand-purple transition-colors">Watches</Link>
            <Link to="/category/headphones" className="font-medium hover:text-brand-purple transition-colors">Headphones</Link>
            <Link to="/category/earbuds" className="font-medium hover:text-brand-purple transition-colors">Earbuds</Link>
          </nav>
          
          {/* Search, Cart, and User Icons */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block relative">
              <form onSubmit={handleSearch} className="flex">
                <Input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-64 pr-10" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </form>
            </div>
            
            <Link to="/wishlist" className="hidden md:flex">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/account" className="hidden md:flex">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* Mobile menu button */}
            <Button onClick={toggleMenu} variant="ghost" size="icon" className="md:hidden">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearch} className="flex">
            <Input 
              type="text" 
              placeholder="Search products..." 
              className="w-full" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="ml-2">
              Search
            </Button>
          </form>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 py-3 border-t">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="font-medium px-2 py-1" onClick={toggleMenu}>Home</Link>
              <Link to="/products" className="font-medium px-2 py-1" onClick={toggleMenu}>All Products</Link>
              <Link to="/category/shoes" className="font-medium px-2 py-1" onClick={toggleMenu}>Shoes</Link>
              <Link to="/category/watches" className="font-medium px-2 py-1" onClick={toggleMenu}>Watches</Link>
              <Link to="/category/headphones" className="font-medium px-2 py-1" onClick={toggleMenu}>Headphones</Link>
              <Link to="/category/earbuds" className="font-medium px-2 py-1" onClick={toggleMenu}>Earbuds</Link>
              <Link to="/wishlist" className="font-medium px-2 py-1" onClick={toggleMenu}>Wishlist</Link>
              <Link to="/account" className="font-medium px-2 py-1" onClick={toggleMenu}>My Account</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
