
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    text: 'The quality of the shoes I purchased is exceptional. The comfort level is beyond what I expected. Quick delivery and great packaging too!',
    product: 'Running Shoes'
  },
  {
    id: 2,
    name: 'Rahul Verma',
    location: 'Delhi',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    text: 'Amazing sound quality on the headphones. They arrived earlier than expected and the noise cancellation is fantastic for the price.',
    product: 'Wireless Headphones'
  },
  {
    id: 3,
    name: 'Ananya Patel',
    location: 'Bangalore',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 4,
    text: 'The watch looks even better in person than in the photos. Battery life is impressive and the features are easy to use.',
    product: 'Smart Watch'
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what customers are saying about their shopping experience with us.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex mb-3" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}
                  />
                ))}
              </div>
              
              <p className="text-gray-700 mb-3">{testimonial.text}</p>
              
              <p className="text-sm text-brand-purple font-medium">
                Purchased: {testimonial.product}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
