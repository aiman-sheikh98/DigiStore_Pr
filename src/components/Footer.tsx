
import React from "react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">DigitalStore</h3>
            <p className="text-gray-600 mb-4">
              Your marketplace for premium digital products designed for creators and professionals.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-digital-blue">Home</Link></li>
              <li><Link to="/products" className="text-gray-600 hover:text-digital-blue">Products</Link></li>
              <li><Link to="/cart" className="text-gray-600 hover:text-digital-blue">Cart</Link></li>
              <li><Link to="/account" className="text-gray-600 hover:text-digital-blue">My Account</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/products?category=templates" className="text-gray-600 hover:text-digital-blue">Templates</Link></li>
              <li><Link to="/products?category=courses" className="text-gray-600 hover:text-digital-blue">Courses</Link></li>
              <li><Link to="/products?category=tools" className="text-gray-600 hover:text-digital-blue">Tools</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} DigitalStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
