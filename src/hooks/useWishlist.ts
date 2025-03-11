import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthContext";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export const useWishlist = () => {
  const { isAuthenticated, user } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate total number of items in wishlist
  const itemCount = items.length;

  // Fetch wishlist items from database or localStorage
  const fetchWishlistItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (isAuthenticated && user?.id) {
        // Fetch from database if user is authenticated
        const { data, error } = await supabase
          .from("wishlist_items")
          .select(
            "*, product:products(id, name, price, sale_price, images:product_images(*))",
          )
          .eq("user_id", user.id);

        if (error) throw error;

        // Transform data to match WishlistItem interface
        const wishlistItems: WishlistItem[] = data.map((item) => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.sale_price || item.product.price,
          image:
            item.product.images.find((img: any) => img.is_primary)?.image_url ||
            item.product.images[0]?.image_url ||
            "",
        }));

        setItems(wishlistItems);
      } else {
        // Use localStorage for unauthenticated users
        const savedWishlist = localStorage.getItem("wishlist");
        if (savedWishlist) {
          setItems(JSON.parse(savedWishlist));
        }
      }
    } catch (err) {
      console.error("Error fetching wishlist items:", err);
      setError("Failed to load wishlist items");

      // Fallback to localStorage if database fetch fails
      const savedWishlist = localStorage.getItem("wishlist");
      if (savedWishlist) {
        setItems(JSON.parse(savedWishlist));
      }
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  // Fetch wishlist items on component mount and when auth state changes
  useEffect(() => {
    fetchWishlistItems();
  }, [fetchWishlistItems]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("wishlist", JSON.stringify(items));
    }
  }, [items, isAuthenticated]);

  // Add item to wishlist
  const addItem = async (item: WishlistItem) => {
    try {
      // Check if item is already in wishlist
      if (items.some((i) => i.id === item.id)) {
        return true; // Item already exists
      }

      if (isAuthenticated && user?.id) {
        // Add to database if user is authenticated
        const { error } = await supabase.from("wishlist_items").insert({
          id: `wish-${Date.now()}`,
          user_id: user.id,
          product_id: item.id,
          created_at: new Date(),
          updated_at: new Date(),
        });

        if (error) throw error;

        // Refresh wishlist items
        await fetchWishlistItems();
      } else {
        // Handle localStorage wishlist
        setItems((prevItems) => [...prevItems, item]);
      }
      return true;
    } catch (err) {
      console.error("Error adding item to wishlist:", err);
      return false;
    }
  };

  // Remove item from wishlist
  const removeItem = async (id: string) => {
    try {
      if (isAuthenticated && user?.id) {
        const { error } = await supabase
          .from("wishlist_items")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", id);

        if (error) throw error;

        // Refresh wishlist items
        await fetchWishlistItems();
      } else {
        // Handle localStorage wishlist
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      }
      return true;
    } catch (err) {
      console.error("Error removing item from wishlist:", err);
      return false;
    }
  };

  // Check if item is in wishlist
  const isInWishlist = (id: string) => {
    return items.some((item) => item.id === id);
  };

  // Clear wishlist
  const clearWishlist = async () => {
    try {
      if (isAuthenticated && user?.id) {
        const { error } = await supabase
          .from("wishlist_items")
          .delete()
          .eq("user_id", user.id);

        if (error) throw error;

        // Refresh wishlist items
        await fetchWishlistItems();
      } else {
        // Handle localStorage wishlist
        setItems([]);
      }
      return true;
    } catch (err) {
      console.error("Error clearing wishlist:", err);
      return false;
    }
  };

  return {
    items,
    loading,
    error,
    itemCount,
    addItem,
    removeItem,
    isInWishlist,
    clearWishlist,
    refetch: fetchWishlistItems,
  };
};
