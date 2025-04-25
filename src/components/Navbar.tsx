
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-0">
        <Link to="/" className="font-bold text-2xl text-digital-blue">
          DigitalStore
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-digital-blue">
            Home
          </Link>
          <Link to="/products" className="hover:text-digital-blue">
            Products
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-digital-blue text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
          
          <Link to="/account">
            <Button variant="ghost" size="icon">
              <User className="h-6 w-6" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
