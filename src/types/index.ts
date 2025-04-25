
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'templates' | 'courses' | 'tools';
  imageSrc: string;
  featured: boolean;
  creator: string;
  rating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
