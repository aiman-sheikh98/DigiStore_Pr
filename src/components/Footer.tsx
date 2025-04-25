
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">DigitalStore</h3>
            <p className="text-gray-600 mb-4">
              Your one-stop marketplace for premium digital products. We offer high-quality templates, courses, and tools for creators and professionals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-digital-blue"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-gray-600 hover:text-digital-blue"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-gray-600 hover:text-digital-blue"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-gray-600 hover:text-digital-blue"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-digital-blue flex items-center gap-2">Home</Link></li>
              <li><Link to="/products" className="text-gray-600 hover:text-digital-blue flex items-center gap-2">Products</Link></li>
              <li><Link to="/cart" className="text-gray-600 hover:text-digital-blue flex items-center gap-2">Cart</Link></li>
              <li><Link to="/wishlist" className="text-gray-600 hover:text-digital-blue flex items-center gap-2">Wishlist</Link></li>
              <li><Link to="/support" className="text-gray-600 hover:text-digital-blue flex items-center gap-2">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/products?category=templates" className="text-gray-600 hover:text-digital-blue">Templates</Link></li>
              <li><Link to="/products?category=courses" className="text-gray-600 hover:text-digital-blue">Courses</Link></li>
              <li><Link to="/products?category=tools" className="text-gray-600 hover:text-digital-blue">Tools</Link></li>
              <li><Link to="/products?category=ui" className="text-gray-600 hover:text-digital-blue">UI Elements</Link></li>
              <li><Link to="/products?category=marketing" className="text-gray-600 hover:text-digital-blue">Marketing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-600">
                <Mail className="h-5 w-5" />
                support@digitalstore.com
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <Phone className="h-5 w-5" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-5 w-5" />
                123 Digital Street, Tech City
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} DigitalStore. All rights reserved.
            </div>
            <div className="text-sm text-gray-500 md:text-right">
              <Link to="/privacy" className="hover:text-digital-blue">Privacy Policy</Link>
              <span className="mx-2">|</span>
              <Link to="/terms" className="hover:text-digital-blue">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
