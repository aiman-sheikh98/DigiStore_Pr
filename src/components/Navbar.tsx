
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { Search, ShoppingCart, User, Heart, Home, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Navbar() {
  const { cartCount } = useCart();
  const { user, signOut } = useAuth();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-0">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-bold text-2xl text-digital-blue">
            DigitalStore
          </Link>
          
          <form onSubmit={handleSearch} className="hidden md:flex relative max-w-md w-full">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0"
            >
              <Search className="h-4 w-4 text-gray-400" />
            </Button>
          </form>
        </div>
        
        <div className="flex items-center space-x-2">
          <Link to="/">
            <Button variant="ghost" size="icon" className="relative">
              <Home className="h-5 w-5" />
            </Button>
          </Link>

          <Link to="/support">
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
          </Link>

          <Link to="/wishlist">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-digital-blue text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                  {wishlist.length}
                </span>
              )}
            </Button>
          </Link>

          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-digital-blue text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
          
          {user ? (
            <Button variant="ghost" size="icon" onClick={() => signOut()}>
              <User className="h-5 w-5" />
            </Button>
          ) : (
            <Link to="/auth">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
