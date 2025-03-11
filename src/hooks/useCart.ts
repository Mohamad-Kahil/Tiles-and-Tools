import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthContext";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const useCart = () => {
  const { isAuthenticated, user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate total number of items in cart
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  // Calculate subtotal
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Fetch cart items from database or localStorage
  const fetchCartItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (isAuthenticated && user?.id) {
        // Fetch from database if user is authenticated
        const { data, error } = await supabase
          .from("cart_items")
          .select(
            "*, product:products(id, name, price, sale_price, images:product_images(*))",
          )
          .eq("user_id", user.id);

        if (error) throw error;

        // Transform data to match CartItem interface
        const cartItems: CartItem[] = data.map((item) => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.sale_price || item.product.price,
          quantity: item.quantity,
          image:
            item.product.images.find((img: any) => img.is_primary)?.image_url ||
            item.product.images[0]?.image_url ||
            "",
        }));

        setItems(cartItems);
      } else {
        // Use localStorage for unauthenticated users
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          setItems(JSON.parse(savedCart));
        }
      }
    } catch (err) {
      console.error("Error fetching cart items:", err);
      setError("Failed to load cart items");

      // Fallback to localStorage if database fetch fails
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  // Fetch cart items on component mount and when auth state changes
  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, isAuthenticated]);

  // Add item to cart
  const addItem = async (item: Omit<CartItem, "quantity">, quantity = 1) => {
    try {
      if (isAuthenticated && user?.id) {
        // Check if item already exists in cart
        const { data: existingItem, error: checkError } = await supabase
          .from("cart_items")
          .select("*")
          .eq("user_id", user.id)
          .eq("product_id", item.id)
          .maybeSingle();

        if (checkError) throw checkError;

        if (existingItem) {
          // Update quantity if item exists
          const { error: updateError } = await supabase
            .from("cart_items")
            .update({
              quantity: existingItem.quantity + quantity,
              updated_at: new Date(),
            })
            .eq("id", existingItem.id);

          if (updateError) throw updateError;
        } else {
          // Add new item if it doesn't exist
          const { error: insertError } = await supabase
            .from("cart_items")
            .insert({
              id: `cart-${Date.now()}`,
              user_id: user.id,
              product_id: item.id,
              quantity,
              created_at: new Date(),
              updated_at: new Date(),
            });

          if (insertError) throw insertError;
        }

        // Refresh cart items
        await fetchCartItems();
      } else {
        // Handle localStorage cart
        setItems((prevItems) => {
          const existingItemIndex = prevItems.findIndex(
            (i) => i.id === item.id,
          );

          if (existingItemIndex >= 0) {
            // Item exists, update quantity
            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + quantity,
            };
            return updatedItems;
          } else {
            // Add new item
            return [...prevItems, { ...item, quantity }];
          }
        });
      }
      return true;
    } catch (err) {
      console.error("Error adding item to cart:", err);
      return false;
    }
  };

  // Remove item from cart
  const removeItem = async (id: string) => {
    try {
      if (isAuthenticated && user?.id) {
        const { error } = await supabase
          .from("cart_items")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", id);

        if (error) throw error;

        // Refresh cart items
        await fetchCartItems();
      } else {
        // Handle localStorage cart
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      }
      return true;
    } catch (err) {
      console.error("Error removing item from cart:", err);
      return false;
    }
  };

  // Update item quantity
  const updateQuantity = async (id: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        return removeItem(id);
      }

      if (isAuthenticated && user?.id) {
        const { data, error: fetchError } = await supabase
          .from("cart_items")
          .select("id")
          .eq("user_id", user.id)
          .eq("product_id", id)
          .single();

        if (fetchError) throw fetchError;
        if (!data) throw new Error("Cart item not found");

        const { error: updateError } = await supabase
          .from("cart_items")
          .update({ quantity, updated_at: new Date() })
          .eq("id", data.id);

        if (updateError) throw updateError;

        // Refresh cart items
        await fetchCartItems();
      } else {
        // Handle localStorage cart
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        );
      }
      return true;
    } catch (err) {
      console.error("Error updating cart item quantity:", err);
      return false;
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      if (isAuthenticated && user?.id) {
        const { error } = await supabase
          .from("cart_items")
          .delete()
          .eq("user_id", user.id);

        if (error) throw error;

        // Refresh cart items
        await fetchCartItems();
      } else {
        // Handle localStorage cart
        setItems([]);
      }
      return true;
    } catch (err) {
      console.error("Error clearing cart:", err);
      return false;
    }
  };

  return {
    items,
    loading,
    error,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    refetch: fetchCartItems,
  };
};
