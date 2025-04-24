
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartItem from '@/components/CartItem';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  // Calculate shipping cost (free for orders over ₹1000)
  const shippingCost = cartTotal > 1000 ? 0 : 150;
  
  // Calculate tax (18% GST)
  const taxRate = 0.18;
  const taxAmount = cartTotal * taxRate;
  
  // Calculate order total
  const orderTotal = cartTotal + shippingCost + taxAmount;
  
  const handleCheckout = () => {
    // For now, just navigate to checkout
    navigate('/checkout');
  };
  
  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow flex items-center justify-center py-16">
          <div className="text-center px-4">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet. 
              Explore our catalog to discover amazing products!
            </p>
            <Button asChild className="bg-brand-purple hover:bg-brand-darkPurple">
              <Link to="/products">
                Start Shopping
              </Link>
            </Button>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    Cart Items ({cartItems.length})
                  </h2>
                  
                  <Button 
                    variant="ghost" 
                    className="text-red-500 hover:bg-red-50 text-sm"
                    onClick={clearCart}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
                
                <div className="mt-8">
                  <Button 
                    variant="outline" 
                    asChild 
                    className="text-sm"
                  >
                    <Link to="/products">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-80">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>
                      {shippingCost === 0 
                        ? 'Free' 
                        : `₹${shippingCost.toLocaleString()}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (18% GST)</span>
                    <span>₹{taxAmount.toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{orderTotal.toLocaleString()}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 bg-brand-purple hover:bg-brand-darkPurple"
                  onClick={handleCheckout}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Proceed to Checkout
                </Button>
                
                <div className="mt-4 text-xs text-gray-500 text-center">
                  Prices inclusive of all taxes. Shipping will be calculated at checkout.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
