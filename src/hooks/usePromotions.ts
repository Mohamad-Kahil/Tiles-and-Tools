import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Promotion {
  id: string;
  name: string;
  description: string | null;
  discount_type: "percentage" | "fixed_amount" | "free_shipping";
  discount_value: number;
  code: string;
  minimum_order_amount: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export const usePromotions = () => {
  const [activePromotions, setActivePromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch active promotions
  const fetchActivePromotions = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.rpc("get_active_promotions");

      if (error) throw error;
      setActivePromotions(data || []);
    } catch (err) {
      console.error("Error fetching active promotions:", err);
      setError("Failed to load promotions");
    } finally {
      setLoading(false);
    }
  };

  // Validate a promotion code
  const validatePromoCode = async (code: string) => {
    try {
      const { data, error } = await supabase
        .from("promotions")
        .select("*")
        .eq("code", code)
        .eq("is_active", true)
        .gte("end_date", new Date().toISOString())
        .lte("start_date", new Date().toISOString())
        .single();

      if (error) throw error;

      // Check usage limit
      if (data.usage_limit !== null && data.usage_count >= data.usage_limit) {
        return {
          valid: false,
          message: "This promotion code has reached its usage limit",
        };
      }

      return { valid: true, promotion: data };
    } catch (err) {
      console.error("Error validating promotion code:", err);
      return { valid: false, message: "Invalid or expired promotion code" };
    }
  };

  // Initialize promotions on component mount
  useEffect(() => {
    fetchActivePromotions();
  }, []);

  return {
    activePromotions,
    loading,
    error,
    validatePromoCode,
    refetch: fetchActivePromotions,
  };
};
