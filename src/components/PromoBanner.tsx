
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface PromoBannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  direction?: 'left' | 'right';
}

const PromoBanner: React.FC<PromoBannerProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  imageSrc,
  direction = 'right'
}) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${direction === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
          <div className="md:w-1/2 mb-8 md:mb-0 md:px-8">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-gray-600 mb-6">
              {description}
            </p>
            <Button asChild className="bg-brand-purple hover:bg-brand-darkPurple">
              <Link to={buttonLink}>
                {buttonText}
              </Link>
            </Button>
          </div>
          
          <div className="md:w-1/2">
            <img 
              src={imageSrc} 
              alt={title} 
              className="rounded-lg shadow-lg w-full h-auto max-h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
