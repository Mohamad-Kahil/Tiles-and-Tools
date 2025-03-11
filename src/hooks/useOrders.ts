import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthContext";

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  product: {
    name: string;
    images: Array<{
      image_url: string;
      is_primary: boolean;
    }>;
  };
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string | null;
  shipping_postal_code: string | null;
  shipping_country: string;
  shipping_method: string;
  shipping_cost: number;
  payment_method: string;
  payment_status: string;
  notes: string | null;
  created_at: string;
  items?: OrderItem[];
}

export const useOrders = () => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user's orders
  const fetchOrders = async () => {
    if (!isAuthenticated || !user) {
      setOrders([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("customer_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single order with items
  const fetchOrderDetails = async (
    orderNumber: string,
  ): Promise<Order | null> => {
    if (!isAuthenticated || !user) {
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      // Get the order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("order_number", orderNumber)
        .eq("customer_id", user.id)
        .single();

      if (orderError) throw orderError;

      // Get the order items
      const { data: items, error: itemsError } = await supabase
        .from("order_items")
        .select(
          `
          id,
          product_id,
          quantity,
          unit_price,
          total_price,
          product:products(name, images:product_images(image_url, is_primary))
        `,
        )
        .eq("order_id", order.id);

      if (itemsError) throw itemsError;

      return { ...order, items };
    } catch (err) {
      console.error("Error fetching order details:", err);
      setError("Failed to load order details");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Initialize orders on component mount or auth state change
  useEffect(() => {
    fetchOrders();
  }, [isAuthenticated, user]);

  return {
    orders,
    loading,
    error,
    fetchOrderDetails,
    refetch: fetchOrders,
  };
};
