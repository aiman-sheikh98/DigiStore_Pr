
import React from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={product.imageSrc} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pb-1">
        {product.featured && (
          <Badge variant="secondary" className="bg-digital-lightBlue text-white mb-2 self-start">
            Featured
          </Badge>
        )}
        <CardTitle className="text-lg font-semibold">
          <Link to={`/products/${product.id}`} className="hover:text-digital-blue transition-colors">
            {product.title}
          </Link>
        </CardTitle>
        <div className="flex items-center gap-1">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
          <div className="flex items-center ml-auto">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-0.5" />
            <span className="text-xs font-medium">{product.rating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-sm">
          {product.description.length > 120
            ? `${product.description.substring(0, 120)}...`
            : product.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <span className="font-bold text-base">${product.price.toFixed(2)}</span>
        <Button 
          variant="default" 
          size="sm" 
          className="bg-digital-blue hover:bg-digital-darkBlue"
          onClick={() => addItem(product)}
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
