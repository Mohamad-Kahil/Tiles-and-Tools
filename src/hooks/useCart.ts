import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthContext";

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    sale_price: number | null;
    images: Array<{
      image_url: string;
      is_primary: boolean;
    }>;
  };
}

export const useCart = () => {
  const { user, isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);

  // Get or create a cart
  const getOrCreateCart = async () => {
    try {
      let cart;

      if (isAuthenticated && user) {
        // Try to get existing cart for authenticated user
        const { data: existingCart } = await supabase
          .from("carts")
          .select("id")
          .eq("customer_id", user.id)
          .single();

        if (existingCart) {
          cart = existingCart;
        } else {
          // Create new cart for authenticated user
          const { data: newCart, error } = await supabase
            .from("carts")
            .insert({ customer_id: user.id })
            .select()
            .single();

          if (error) throw error;
          cart = newCart;
        }
      } else {
        // For anonymous users, use session ID
        const sessionId =
          localStorage.getItem("cart_session_id") || `session_${Date.now()}`;
        localStorage.setItem("cart_session_id", sessionId);

        // Try to get existing cart for session
        const { data: existingCart } = await supabase
          .from("carts")
          .select("id")
          .eq("session_id", sessionId)
          .single();

        if (existingCart) {
          cart = existingCart;
        } else {
          // Create new cart for session
          const { data: newCart, error } = await supabase
            .from("carts")
            .insert({ session_id: sessionId })
            .select()
            .single();

          if (error) throw error;
          cart = newCart;
        }
      }

      setCartId(cart.id);
      return cart.id;
    } catch (err) {
      console.error("Error getting or creating cart:", err);
      setError("Failed to initialize cart");
      return null;
    }
  };

  // Fetch cart items
  const fetchCartItems = async () => {
    setLoading(true);
    setError(null);

    try {
      const id = cartId || (await getOrCreateCart());
      if (!id) return;

      const { data, error } = await supabase
        .from("cart_items")
        .select(
          `
          id,
          product_id,
          quantity,
          product:products(id, name, price, sale_price, images:product_images(image_url, is_primary))
        `,
        )
        .eq("cart_id", id);

      if (error) throw error;
      setCartItems(data as CartItem[]);
    } catch (err) {
      console.error("Error fetching cart items:", err);
      setError("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      const id = cartId || (await getOrCreateCart());
      if (!id) return false;

      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("cart_id", id)
        .eq("product_id", productId)
        .single();

      if (existingItem) {
        // Update quantity if item exists
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity: existingItem.quantity + quantity })
          .eq("id", existingItem.id);

        if (error) throw error;
      } else {
        // Add new item if it doesn't exist
        const { error } = await supabase.from("cart_items").insert({
          cart_id: id,
          product_id: productId,
          quantity,
        });

        if (error) throw error;
      }

      await fetchCartItems();
      return true;
    } catch (err) {
      console.error("Error adding item to cart:", err);
      setError("Failed to add item to cart");
      return false;
    }
  };

  // Update cart item quantity
  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        return removeFromCart(itemId);
      }

      const { error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("id", itemId);

      if (error) throw error;
      await fetchCartItems();
      return true;
    } catch (err) {
      console.error("Error updating cart item:", err);
      setError("Failed to update item quantity");
      return false;
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", itemId);

      if (error) throw error;
      await fetchCartItems();
      return true;
    } catch (err) {
      console.error("Error removing item from cart:", err);
      setError("Failed to remove item from cart");
      return false;
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      if (!cartId) return false;

      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("cart_id", cartId);

      if (error) throw error;
      await fetchCartItems();
      return true;
    } catch (err) {
      console.error("Error clearing cart:", err);
      setError("Failed to clear cart");
      return false;
    }
  };

  // Calculate cart totals
  const getCartTotals = () => {
    const subtotal = cartItems.reduce((sum, item) => {
      const price = item.product.sale_price || item.product.price;
      return sum + price * item.quantity;
    }, 0);

    return {
      subtotal,
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      shipping: subtotal > 0 ? 50 : 0, // Default shipping cost
      total: subtotal + (subtotal > 0 ? 50 : 0), // Subtotal + shipping
    };
  };

  // Initialize cart on component mount
  useEffect(() => {
    const initCart = async () => {
      await getOrCreateCart();
      await fetchCartItems();
    };

    initCart();
  }, [isAuthenticated, user]);

  return {
    cartItems,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotals,
    refetch: fetchCartItems,
  };
};
