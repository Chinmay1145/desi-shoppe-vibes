
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const OrderSuccess = () => {
  // Generate a random order ID
  const orderId = `DV${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Random delivery date (5-7 days from now)
  const deliveryDays = Math.floor(5 + Math.random() * 3);
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
  
  const deliveryDateFormatted = deliveryDate.toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              
              <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
              <p className="text-gray-600">
                Thank you for your purchase. We've received your order and will process it soon.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-md p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order Number</p>
                  <p className="font-semibold">{orderId}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-500">Expected Delivery</p>
                  <p className="font-semibold">{deliveryDateFormatted}</p>
                </div>
              </div>
              
              <div className="relative pt-8">
                <div className="absolute top-0 left-0 w-full flex justify-between">
                  <div className="w-1/3 h-1 bg-brand-purple"></div>
                  <div className="w-1/3 h-1 bg-gray-200"></div>
                  <div className="w-1/3 h-1 bg-gray-200"></div>
                </div>
                
                <div className="flex justify-between text-sm pt-4">
                  <div className="text-center flex-1">
                    <div className="flex justify-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <p className="font-medium">Order Confirmed</p>
                  </div>
                  
                  <div className="text-center flex-1">
                    <div className="flex justify-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <Package className="h-5 w-5 text-gray-500" />
                      </div>
                    </div>
                    <p className="text-gray-500">Processing</p>
                  </div>
                  
                  <div className="text-center flex-1">
                    <div className="flex justify-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <Truck className="h-5 w-5 text-gray-500" />
                      </div>
                    </div>
                    <p className="text-gray-500">Shipped</p>
                  </div>
                  
                  <div className="text-center flex-1">
                    <div className="flex justify-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <Home className="h-5 w-5 text-gray-500" />
                      </div>
                    </div>
                    <p className="text-gray-500">Delivered</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <p className="text-sm">
                We've sent a confirmation email with all the details of your order. If you have any questions, please contact our customer support team.
              </p>
              
              <p className="text-sm">
                You can track your order status using the order number above.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="flex-1 bg-brand-purple hover:bg-brand-darkPurple">
                <Link to="/">
                  Continue Shopping
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="flex-1">
                <Link to="/orders">
                  View Orders
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderSuccess;
