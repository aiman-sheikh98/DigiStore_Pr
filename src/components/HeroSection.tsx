
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-r from-digital-blue to-digital-lightBlue py-16 md:py-24 text-center text-white">
      <div className="container px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          Premium Digital Products for Creators
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-90">
          Boost your productivity and creativity with our high-quality digital products. Templates,
          courses, and tools designed for modern professionals.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/products">
            <Button
              size="lg"
              className="bg-white text-digital-blue hover:bg-gray-100 text-base"
            >
              Browse Products
            </Button>
          </Link>
          <Link to="/categories">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 text-base"
            >
              Explore Categories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
