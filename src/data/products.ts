
import { Product } from "@/types";

// Mock product data
export const products: Product[] = [
  {
    id: "1",
    title: "UI Templates Pack",
    description: "A comprehensive collection of ready-to-use UI components and layouts for modern web applications.",
    price: 49.99,
    category: "templates",
    imageSrc: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    featured: true,
    creator: "Design Studio Pro",
    rating: 4.8
  },
  {
    id: "2",
    title: "Digital Marketing Course",
    description: "Master the art of digital marketing with this comprehensive course covering SEO, social media, and content marketing strategies.",
    price: 79.99,
    category: "courses",
    imageSrc: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    featured: true,
    creator: "Marketing Experts Inc",
    rating: 4.9
  },
  {
    id: "3",
    title: "Video Editing Toolkit",
    description: "Professional video editing presets, transitions, and effects for creating stunning content quickly.",
    price: 39.99,
    category: "tools",
    imageSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
    featured: true,
    creator: "VideoWizards",
    rating: 4.7
  },
  {
    id: "4",
    title: "E-commerce Website Template",
    description: "Complete e-commerce website template with product listings, cart functionality, and checkout process.",
    price: 59.99,
    category: "templates",
    imageSrc: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    featured: false,
    creator: "Web Templates Co.",
    rating: 4.6
  },
  {
    id: "5",
    title: "Graphic Design Masterclass",
    description: "Learn graphic design principles from basics to advanced techniques for print and digital media.",
    price: 89.99,
    category: "courses",
    imageSrc: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    featured: false,
    creator: "Creative Arts Academy",
    rating: 4.9
  },
  {
    id: "6",
    title: "Social Media Content Pack",
    description: "Ready-to-use templates for Instagram, Facebook, and Twitter to boost your social media presence.",
    price: 29.99,
    category: "tools",
    imageSrc: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    featured: false,
    creator: "Social Media Pros",
    rating: 4.5
  }
];

// Get featured products
export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

// Get all products
export const getAllProducts = () => {
  return products;
};

// Get product by ID
export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

// Get products by category
export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};
