
import React from 'react';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategorySection from '@/components/CategorySection';
import FeaturedProducts from '@/components/FeaturedProducts';
import PromoBanner from '@/components/PromoBanner';
import Newsletter from '@/components/Newsletter';
import Testimonials from '@/components/Testimonials';
import { useProducts } from '@/hooks/useProducts';

const Index = () => {
  const { products } = useProducts();
  
  // Get featured product IDs for each category
  const shoesIds = products
    .filter(p => p.category === 'shoes')
    .slice(0, 4)
    .map(p => p.id);
  
  const watchesIds = products
    .filter(p => p.category === 'watches')
    .slice(0, 4)
    .map(p => p.id);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <CategorySection />
        
        <FeaturedProducts 
          title="Featured Products" 
          subtitle="Handpicked selections from our latest collections"
          limit={8}
        />
        
        <PromoBanner 
          title="Premium Watches Collection"
          description="Discover our curated selection of elegant timepieces from world-renowned brands. From classic designs to modern smartwatches, find the perfect companion for your wrist."
          buttonText="Shop Watches"
          buttonLink="/category/watches"
          imageSrc="https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          direction="right"
        />
        
        <FeaturedProducts 
          title="Trending Shoes" 
          subtitle="Step into style with our most popular footwear"
          productIds={shoesIds}
          limit={4}
        />
        
        <PromoBanner 
          title="Superior Sound Experience"
          description="Immerse yourself in premium audio quality with our range of headphones and earbuds. Whether you're a music enthusiast or gaming professional, we have the perfect audio solution for you."
          buttonText="Shop Audio"
          buttonLink="/category/headphones"
          imageSrc="https://images.unsplash.com/photo-1599669454699-248893623440?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          direction="left"
        />
        
        <FeaturedProducts 
          title="Elegant Timepieces" 
          subtitle="Make a statement with our premium watch collection"
          productIds={watchesIds}
          limit={4}
        />
        
        <Testimonials />
        <Newsletter />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
