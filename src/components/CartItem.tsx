
import React from 'react';
import { MinusCircle, PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { CartItemType } from '@/types/product';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  const handleIncreaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(item.id);
  };
  
  // Calculate item subtotal
  const subtotal = item.price * item.quantity;
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start py-4 border-b">
      <div className="flex items-start flex-1">
        <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden mr-4">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.brand}</p>
          <p className="text-sm mt-1 text-gray-700">₹{item.price.toLocaleString()}</p>
          
          <div className="mt-4 flex items-center sm:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={handleDecreaseQuantity}
            >
              <MinusCircle className="h-4 w-4" />
            </Button>
            
            <span className="w-8 text-center">{item.quantity}</span>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={handleIncreaseQuantity}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-red-500"
              onClick={handleRemove}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Quantity controls - desktop */}
      <div className="hidden sm:flex items-center space-x-2 mt-4 sm:mt-0">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={handleDecreaseQuantity}
        >
          <MinusCircle className="h-4 w-4" />
        </Button>
        
        <span className="w-8 text-center">{item.quantity}</span>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={handleIncreaseQuantity}
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Subtotal */}
      <div className="text-right ml-4 mt-4 sm:mt-0">
        <span className="font-semibold text-gray-900">
          ₹{subtotal.toLocaleString()}
        </span>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-red-500 hidden sm:inline-flex ml-2"
          onClick={handleRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
