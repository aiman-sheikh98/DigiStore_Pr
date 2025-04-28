import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag, ChevronRight, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const CartPage = () => {
  const { items, addItem, removeItem, clearCart, cartTotal } = useCart();

  const handleCheckout = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { items }
      });

      if (error) throw error;
      
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout Error",
        description: "There was a problem initiating checkout. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <div className="container px-4 py-16 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
            
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
              <Link to="/products">
                <Button className="bg-digital-blue hover:bg-digital-darkBlue">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container px-4 py-8 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="font-semibold">
                    {items.length} {items.length === 1 ? "Product" : "Products"}
                  </h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear Cart
                  </Button>
                </div>
                
                <ul>
                  {items.map((item) => (
                    <li 
                      key={item.product.id} 
                      className="border-b border-gray-100 last:border-0"
                    >
                      <div className="flex p-4">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                          <img 
                            src={item.product.imageSrc} 
                            alt={item.product.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        
                        <div className="ml-4 flex-grow">
                          <div className="flex justify-between">
                            <div>
                              <Link 
                                to={`/products/${item.product.id}`}
                                className="font-medium text-gray-800 hover:text-digital-blue"
                              >
                                {item.product.title}
                              </Link>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.product.category}
                              </p>
                            </div>
                            <p className="font-medium">${item.product.price.toFixed(2)}</p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-7 w-7 rounded-full"
                                onClick={() => removeItem(item.product.id)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="mx-3 text-gray-700">
                                {item.quantity}
                              </span>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-7 w-7 rounded-full"
                                onClick={() => addItem(item.product)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeItem(item.product.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-lg">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-digital-blue hover:bg-digital-darkBlue mb-4"
                  onClick={handleCheckout}
                >
                  Checkout with Stripe <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
                
                <div className="flex items-start text-sm text-gray-500">
                  <AlertCircle className="h-4 w-4 mr-1.5 flex-shrink-0 mt-0.5" />
                  <p>
                    Secure payment powered by Stripe.
                  </p>
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

export default CartPage;
