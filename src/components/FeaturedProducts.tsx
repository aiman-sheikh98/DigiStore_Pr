
import React from "react";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { ChevronRight } from "lucide-react";

export function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-16">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
          <Link to="/products" className="flex items-center text-digital-blue hover:underline">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
