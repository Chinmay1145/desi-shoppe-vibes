
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, IndianRupee, ShieldCheck, Truck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

// Indian states list for the form
const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
  'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry'
];

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // Calculate shipping cost (free for orders over ₹1000)
  const shippingCost = cartTotal > 1000 ? 0 : 150;
  
  // Calculate tax (18% GST)
  const taxRate = 0.18;
  const taxAmount = cartTotal * taxRate;
  
  // Calculate order total
  const orderTotal = cartTotal + shippingCost + taxAmount;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleStateChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      state: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate processing payment
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Show success toast
      toast({
        title: "Order placed!",
        description: "Your order has been successfully placed.",
      });
      
      // Clear cart
      clearCart();
      
      // Navigate to success page
      navigate('/order-success');
    }, 1500);
  };
  
  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Shipping and Payment Forms */}
                <div className="md:col-span-3 space-y-8">
                  {/* Shipping Information */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          name="firstName" 
                          value={formData.firstName} 
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          name="lastName" 
                          value={formData.lastName} 
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email} 
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          name="address" 
                          value={formData.address} 
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city" 
                          name="city" 
                          value={formData.city} 
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input 
                          id="pincode" 
                          name="pincode" 
                          value={formData.pincode} 
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="state">State</Label>
                        <Select 
                          value={formData.state} 
                          onValueChange={handleStateChange}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {indianStates.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Information */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                    
                    <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                      <TabsList className="grid grid-cols-3 mb-6">
                        <TabsTrigger value="card">Credit Card</TabsTrigger>
                        <TabsTrigger value="upi">UPI</TabsTrigger>
                        <TabsTrigger value="cod">Cash on Delivery</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="card">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input 
                              id="cardName" 
                              name="cardName" 
                              value={formData.cardName} 
                              onChange={handleInputChange}
                              required={paymentMethod === 'card'} 
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input 
                              id="cardNumber" 
                              name="cardNumber" 
                              value={formData.cardNumber} 
                              onChange={handleInputChange}
                              required={paymentMethod === 'card'} 
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="cardExpiry">Expiry Date</Label>
                              <Input 
                                id="cardExpiry" 
                                name="cardExpiry" 
                                value={formData.cardExpiry} 
                                onChange={handleInputChange}
                                required={paymentMethod === 'card'} 
                                placeholder="MM/YY"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="cardCvv">CVV</Label>
                              <Input 
                                id="cardCvv" 
                                name="cardCvv" 
                                type="password" 
                                value={formData.cardCvv} 
                                onChange={handleInputChange}
                                required={paymentMethod === 'card'} 
                                placeholder="123"
                                maxLength={4}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex items-center text-sm text-gray-500">
                          <ShieldCheck className="h-4 w-4 mr-1" />
                          Your payment information is secure
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="upi">
                        <div className="space-y-4">
                          <p className="text-gray-600">
                            Enter your UPI ID to proceed with the payment
                          </p>
                          
                          <div className="space-y-2">
                            <Label htmlFor="upiId">UPI ID</Label>
                            <Input 
                              id="upiId" 
                              placeholder="username@bank" 
                              required={paymentMethod === 'upi'} 
                            />
                          </div>
                          
                          <div className="mt-4 text-sm text-gray-500">
                            You will receive a payment request on your UPI app
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="cod">
                        <div className="space-y-4">
                          <p className="text-gray-600">
                            Pay with cash upon delivery. Please ensure you have the exact amount.
                          </p>
                          
                          <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 p-3 rounded-md">
                            <Truck className="h-5 w-5" />
                            <span>
                              Additional ₹50 fee applies for Cash on Delivery
                            </span>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
                
                {/* Order Summary */}
                <div className="md:col-span-2">
                  <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    
                    <div className="space-y-4 mb-6">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-gray-500 text-xs">x{item.quantity}</p>
                          </div>
                          <p className="text-sm">₹{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span>₹{cartTotal.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping</span>
                        <span>
                          {shippingCost === 0 
                            ? 'Free' 
                            : `₹${shippingCost.toLocaleString()}`}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax (18% GST)</span>
                        <span>₹{taxAmount.toFixed(2)}</span>
                      </div>
                      
                      {paymentMethod === 'cod' && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">COD Fee</span>
                          <span>₹50.00</span>
                        </div>
                      )}
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <div className="flex items-center">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        <span>
                          {(orderTotal + (paymentMethod === 'cod' ? 50 : 0)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full mt-6 bg-brand-purple hover:bg-brand-darkPurple"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <CreditCard className="h-5 w-5 mr-2" />
                          Place Order
                        </>
                      )}
                    </Button>
                    
                    <div className="mt-4 text-xs text-gray-500 text-center">
                      By placing your order, you agree to our Terms of Service and Privacy Policy.
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
