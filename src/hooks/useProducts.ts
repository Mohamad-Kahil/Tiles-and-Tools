import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

interface ProductFilters {
  category_id?: string;
  search?: string;
  min_price?: number;
  max_price?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
  is_featured?: boolean;
  page?: number;
  limit?: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export const useProducts = (initialFilters: ProductFilters = {}) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>({
    page: 1,
    limit: 12,
    sort_by: "name",
    sort_order: "asc",
    ...initialFilters,
  });
  const [pagination, setPagination] = useState<Pagination>({
    page: filters.page || 1,
    limit: filters.limit || 12,
    total: 0,
    pages: 0,
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Start building the query
      let query = supabase
        .from("products")
        .select("*, category:categories(*), images:product_images(*)", {
          count: "exact",
        })
        .eq("is_active", true);

      // Apply filters
      if (filters.category_id) {
        query = query.eq("category_id", filters.category_id);
      }

      if (filters.search) {
        query = query.ilike("name", `%${filters.search}%`);
      }

      if (filters.min_price !== undefined) {
        query = query.gte("price", filters.min_price);
      }

      if (filters.max_price !== undefined) {
        query = query.lte("price", filters.max_price);
      }

      if (filters.is_featured !== undefined) {
        query = query.eq("is_featured", filters.is_featured);
      }

      // Apply sorting
      if (filters.sort_by) {
        query = query.order(filters.sort_by, {
          ascending: filters.sort_order === "asc",
        });
      }

      // Apply pagination
      const page = filters.page || 1;
      const limit = filters.limit || 12;
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      query = query.range(from, to);

      // Execute the query
      const { data, error, count } = await query;

      if (error) throw error;

      // Update products and pagination
      setProducts(data || []);
      setPagination({
        page,
        limit,
        total: count || 0,
        pages: count ? Math.ceil(count / limit) : 0,
      });
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Update filters
  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Fetch a single product by slug
  const fetchProductBySlug = async (slug: string) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*, category:categories(*), images:product_images(*)")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Error fetching product by slug:", err);
      return null;
    }
  };

  // Fetch featured products
  const fetchFeaturedProducts = async (limit = 4) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*, category:categories(*), images:product_images(*)")
        .eq("is_featured", true)
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Error fetching featured products:", err);
      return [];
    }
  };

  // Fetch related products
  const fetchRelatedProducts = async (
    productId: string,
    categoryId: string,
    limit = 4,
  ) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*, category:categories(*), images:product_images(*)")
        .eq("category_id", categoryId)
        .neq("id", productId)
        .eq("is_active", true)
        .limit(limit);

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Error fetching related products:", err);
      return [];
    }
  };

  return {
    products,
    loading,
    error,
    filters,
    pagination,
    updateFilters,
    fetchProductBySlug,
    fetchFeaturedProducts,
    fetchRelatedProducts,
    refetch: fetchProducts,
  };
};
