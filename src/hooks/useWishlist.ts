import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthContext";

interface WishlistItem {
  id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    sale_price: number | null;
    stock_quantity: number;
    images: Array<{
      image_url: string;
      is_primary: boolean;
    }>;
  };
}

export const useWishlist = () => {
  const { user, isAuthenticated } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch wishlist items
  const fetchWishlistItems = async () => {
    if (!isAuthenticated || !user) {
      setWishlistItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("wishlists")
        .select(
          `
          id,
          product_id,
          product:products(id, name, slug, price, sale_price, stock_quantity, images:product_images(image_url, is_primary))
        `,
        )
        .eq("customer_id", user.id);

      if (error) throw error;
      setWishlistItems(data as WishlistItem[]);
    } catch (err) {
      console.error("Error fetching wishlist items:", err);
      setError("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  // Add item to wishlist
  const addToWishlist = async (productId: string) => {
    if (!isAuthenticated || !user) {
      setError("You must be logged in to add items to your wishlist");
      return false;
    }

    try {
      // Check if item already exists in wishlist
      const { data: existingItem } = await supabase
        .from("wishlists")
        .select("id")
        .eq("customer_id", user.id)
        .eq("product_id", productId)
        .single();

      if (existingItem) {
        // Item already in wishlist
        return true;
      }

      // Add new item to wishlist
      const { error } = await supabase.from("wishlists").insert({
        customer_id: user.id,
        product_id: productId,
      });

      if (error) throw error;
      await fetchWishlistItems();
      return true;
    } catch (err) {
      console.error("Error adding item to wishlist:", err);
      setError("Failed to add item to wishlist");
      return false;
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = async (itemId: string) => {
    if (!isAuthenticated || !user) {
      return false;
    }

    try {
      const { error } = await supabase
        .from("wishlists")
        .delete()
        .eq("id", itemId)
        .eq("customer_id", user.id);

      if (error) throw error;
      await fetchWishlistItems();
      return true;
    } catch (err) {
      console.error("Error removing item from wishlist:", err);
      setError("Failed to remove item from wishlist");
      return false;
    }
  };

  // Check if a product is in the wishlist
  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.product_id === productId);
  };

  // Initialize wishlist on component mount or auth state change
  useEffect(() => {
    fetchWishlistItems();
  }, [isAuthenticated, user]);

  return {
    wishlistItems,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    refetch: fetchWishlistItems,
  };
};
