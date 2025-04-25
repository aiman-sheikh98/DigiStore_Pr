
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { getAllProducts, getProductsByCategory } from "@/data/products";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(categoryParam);

  useEffect(() => {
    // Initialize products
    setProducts(getAllProducts());
  }, []);

  useEffect(() => {
    // Update active category when URL parameter changes
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    // Set search query from URL parameter
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParam]);

  useEffect(() => {
    // Filter products based on search and category
    let result = products;
    
    // Filter by category if selected
    if (activeCategory) {
      result = getProductsByCategory(activeCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(result);
  }, [products, searchQuery, activeCategory]);

  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gray-50 py-8">
          <div className="container px-4">
            <h1 className="text-3xl font-bold mb-6">Browse Products</h1>
            
            {/* Search and filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant={!activeCategory ? "default" : "outline"}
                  onClick={() => handleCategoryChange(null)}
                  className={!activeCategory ? "bg-digital-blue hover:bg-digital-darkBlue" : ""}
                >
                  All
                </Button>
                <Button
                  variant={activeCategory === "templates" ? "default" : "outline"}
                  onClick={() => handleCategoryChange("templates")}
                  className={activeCategory === "templates" ? "bg-digital-blue hover:bg-digital-darkBlue" : ""}
                >
                  Templates
                </Button>
                <Button
                  variant={activeCategory === "courses" ? "default" : "outline"}
                  onClick={() => handleCategoryChange("courses")}
                  className={activeCategory === "courses" ? "bg-digital-blue hover:bg-digital-darkBlue" : ""}
                >
                  Courses
                </Button>
                <Button
                  variant={activeCategory === "tools" ? "default" : "outline"}
                  onClick={() => handleCategoryChange("tools")}
                  className={activeCategory === "tools" ? "bg-digital-blue hover:bg-digital-darkBlue" : ""}
                >
                  Tools
                </Button>
              </div>
            </div>
            
            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No products found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory(null);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
