
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getProductById } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, ChevronLeft, Download, ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const { addItem, items } = useCart();
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct);
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      const inCart = items.some(item => item.product.id === product.id);
      setIsInCart(inCart);
    }
  }, [items, product]);

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Link to="/products" className="text-digital-blue hover:underline">
              Return to products
            </Link>
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
        <div className="container px-4 py-8">
          <Link to="/products" className="inline-flex items-center text-gray-600 hover:text-digital-blue mb-6">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to products
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src={product.imageSrc}
                alt={product.title}
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Product Info */}
            <div>
              <div className="mb-2">
                <Badge variant="outline" className="text-sm">
                  {product.category}
                </Badge>
                {product.featured && (
                  <Badge variant="secondary" className="ml-2 bg-digital-lightBlue text-white">
                    Featured
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating.toFixed(1)} rating
                </span>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-gray-600">By {product.creator}</span>
              </div>
              
              <p className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</p>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              <div className="flex space-x-4">
                {isInCart ? (
                  <Link to="/cart">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      View in Cart
                    </Button>
                  </Link>
                ) : (
                  <Button
                    className="bg-digital-blue hover:bg-digital-darkBlue"
                    onClick={() => addItem(product)}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                )}
                
                <Button variant="outline">
                  <Download className="h-5 w-5 mr-2" />
                  Preview
                </Button>
              </div>
            </div>
          </div>
          
          {/* Additional Product Details */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Product Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-3">Description</h3>
                <p className="text-gray-700">
                  {product.description}
                </p>
                <p className="text-gray-700 mt-4">
                  This product is designed for professional creators looking to enhance their workflow
                  and productivity. It comes with full documentation and support.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-3">Features</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>High quality digital asset</li>
                  <li>Instant download after purchase</li>
                  <li>Regular updates</li>
                  <li>Compatible with industry-standard tools</li>
                  <li>30-day money-back guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
