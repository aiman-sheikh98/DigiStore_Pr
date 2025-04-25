
import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { getAllProducts } from "@/data/products";

const categories = [
  {
    name: "Templates",
    description: "Professional UI templates and layouts",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80",
    slug: "templates"
  },
  {
    name: "Courses",
    description: "Educational content and tutorials",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    slug: "courses"
  },
  {
    name: "Tools",
    description: "Digital tools and resources",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80",
    slug: "tools"
  }
];

const CategoriesPage = () => {
  const productCounts = getAllProducts().reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gray-50 py-12">
          <div className="container px-4">
            <h1 className="text-3xl font-bold mb-8">Product Categories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Link 
                  key={category.slug}
                  to={`/products?category=${category.slug}`}
                  className="block"
                >
                  <Card className="group overflow-hidden hover:shadow-lg transition-all">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="text-center text-white p-4">
                          <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                          <p className="text-sm opacity-90 mb-2">{category.description}</p>
                          <span className="text-sm font-medium">
                            {productCounts[category.slug] || 0} Products
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
