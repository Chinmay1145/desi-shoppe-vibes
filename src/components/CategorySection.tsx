
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'shoes',
    name: 'Shoes',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    description: 'Step up your style with premium footwear'
  },
  {
    id: 'watches',
    name: 'Watches',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    description: 'Timepieces that make a statement'
  },
  {
    id: 'headphones',
    name: 'Headphones',
    image: 'https://images.unsplash.com/photo-1599669454699-248893623440?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    description: 'Immersive audio experiences'
  },
  {
    id: 'earbuds',
    name: 'Earbuds',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    description: 'Wireless convenience, exceptional sound'
  }
];

const CategorySection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Shop By Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our curated collection of premium products, each selected for quality and style
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              to={`/category/${category.id}`} 
              key={category.id}
              className="category-card group"
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="category-overlay flex flex-col items-center justify-center text-center p-4">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white opacity-90 mb-4">
                    {category.description}
                  </p>
                  <span className="inline-block bg-white text-brand-purple px-4 py-2 rounded-full text-sm font-medium">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
