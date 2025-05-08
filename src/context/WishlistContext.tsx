
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { Product } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { getProductById } from '@/data/products';

interface WishlistContextProps {
  wishlist: Product[];
  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchWishlist();
      
      // Subscribe to realtime updates
      const channel = supabase
        .channel('wishlist_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'wishlist_items',
            filter: `user_id=eq.${user.id}`
          },
          () => {
            fetchWishlist();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      setWishlist([]);
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      if (!user) return;
      
      const { data: wishlistItems, error } = await supabase
        .from('wishlist_items')
        .select('product_id')
        .eq('user_id', user.id);

      if (error) throw error;

      const productIds = wishlistItems.map(item => item.product_id);
      // Get products by IDs from your products data
      const products = productIds.map(id => {
        const product = getProductById(id);
        return product;
      }).filter(Boolean) as Product[];

      setWishlist(products);
    } catch (error: any) {
      console.error("Failed to fetch wishlist:", error.message);
    }
  };

  const addToWishlist = async (product: Product) => {
    if (!user) {
      toast({ 
        title: "Please sign in", 
        description: "You need to be signed in to add items to your wishlist",
        variant: "destructive" 
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('wishlist_items')
        .insert({ user_id: user.id, product_id: product.id });

      if (error) throw error;

      toast({ 
        title: "Added to wishlist", 
        description: `${product.title} has been added to your wishlist` 
      });
    } catch (error: any) {
      console.error("Failed to add to wishlist:", error.message);
      toast({ 
        title: "Error", 
        description: "Failed to add item to wishlist", 
        variant: "destructive" 
      });
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      toast({ 
        title: "Removed from wishlist", 
        description: "Item has been removed from your wishlist" 
      });
    } catch (error: any) {
      console.error("Failed to remove from wishlist:", error.message);
      toast({ 
        title: "Error", 
        description: "Failed to remove item from wishlist", 
        variant: "destructive" 
      });
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(product => product.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
