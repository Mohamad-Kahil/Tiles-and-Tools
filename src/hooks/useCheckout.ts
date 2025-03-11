import { useState } from "react";
import { invokeFunction } from "@/lib/supabase";
import { useCart } from "./useCart";
import { useNavigate } from "react-router-dom";

interface CheckoutData {
  shipping_address: string;
  shipping_city: string;
  shipping_state?: string;
  shipping_postal_code?: string;
  shipping_country?: string;
  shipping_method: string;
  payment_method: string;
  promotion_code?: string;
  notes?: string;
}

interface OrderResponse {
  success: boolean;
  order?: {
    id: string;
    order_number: string;
    status: string;
    total: number;
    subtotal: number;
    discount: number;
    shipping: number;
  };
  error?: string;
}

export const useCheckout = () => {
  const { cartItems, clearCart, getCartTotals } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const processCheckout = async (checkoutData: CheckoutData) => {
    setLoading(true);
    setError(null);

    try {
      // Validate cart has items
      if (cartItems.length === 0) {
        throw new Error("Your cart is empty");
      }

      // Prepare order items
      const items = cartItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product.sale_price || item.product.price,
      }));

      // Process the order
      const response = await invokeFunction<OrderResponse>("process-order", {
        items,
        ...checkoutData,
      });

      if (!response.success || !response.order) {
        throw new Error(response.error || "Failed to process order");
      }

      // Clear the cart after successful order
      await clearCart();

      // Navigate to order confirmation
      navigate(`/order-confirmation/${response.order.order_number}`, {
        state: { order: response.order },
      });

      return response.order;
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err.message || "An error occurred during checkout");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Calculate order summary with promotion code
  const calculateOrderSummary = async (promotionCode?: string) => {
    try {
      if (cartItems.length === 0) {
        return getCartTotals();
      }

      // Prepare order items
      const items = cartItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product.sale_price || item.product.price,
      }));

      // Calculate totals with promotion
      const response = await invokeFunction<{
        subtotal: number;
        discount: number;
        shipping: number;
        total: number;
      }>("calculate-order-total", {
        items: JSON.stringify(items),
        promotion_code: promotionCode,
      });

      return {
        ...response,
        itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    } catch (err) {
      console.error("Error calculating order summary:", err);
      // Fall back to basic calculation
      return getCartTotals();
    }
  };

  return {
    processCheckout,
    calculateOrderSummary,
    loading,
    error,
  };
};
