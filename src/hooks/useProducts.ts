import { useState, useEffect } from "react";
import { supabase, invokeFunction } from "@/lib/supabase";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  sale_price: number | null;
  stock_quantity: number;
  sku: string;
  is_featured: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  images: Array<{
    id: string;
    image_url: string;
    alt_text: string | null;
    is_primary: boolean;
  }>;
  attributes: Array<{
    id: string;
    value: string;
    attribute: {
      id: string;
      name: string;
    };
  }>;
}

interface ProductsResponse {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

interface ProductFilters {
  category_id?: string;
  search?: string;
  sort_by?: string;
  sort_order?: "asc" | "desc";
  page?: number;
  limit?: number;
  min_price?: number;
  max_price?: number;
  is_featured?: boolean;
}

export const useProducts = (initialFilters: ProductFilters = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const [pagination, setPagination] = useState({
    total: 0,
    page: initialFilters.page || 1,
    limit: initialFilters.limit || 12,
    pages: 0,
  });

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await invokeFunction<ProductsResponse>(
        "get-products",
        filters,
      );

      setProducts(response.products);
      setPagination(response.pagination);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single product by slug
  const fetchProductBySlug = async (slug: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("products")
        .select(
          `
          *,
          category:categories(id, name, slug),
          images:product_images(id, image_url, alt_text, is_primary, display_order),
          attributes:product_attribute_values(id, value, attribute:product_attributes(id, name))
        `,
        )
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

      if (error) throw error;
      return data as Product;
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Failed to fetch product. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update filters and fetch products
  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      // Reset to page 1 when filters change (except when explicitly changing page)
      page: newFilters.page || 1,
    }));
  };

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [filters]);

  return {
    products,
    loading,
    error,
    filters,
    pagination,
    updateFilters,
    fetchProductBySlug,
    refetch: fetchProducts,
  };
};
