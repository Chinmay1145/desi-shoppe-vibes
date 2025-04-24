
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-brand-purple to-brand-darkPurple text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute h-56 w-56 rounded-full bg-white top-20 -left-20"></div>
        <div className="absolute h-64 w-64 rounded-full bg-white bottom-20 -right-20"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Elevate Your Style & Sound Experience
            </h1>
            <p className="text-lg mb-8 opacity-90 max-w-md">
              Discover premium shoes, watches, headphones, and earbuds at competitive prices with authentic quality.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-brand-purple hover:bg-gray-100">
                <Link to="/products">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-purple">
                <Link to="/new-arrivals">
                  New Arrivals
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Hero image collage */}
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Premium Shoes" 
                className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Luxury Watch" 
                className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1599669454699-248893623440?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Premium Headphones" 
                className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Wireless Earbuds" 
                className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
