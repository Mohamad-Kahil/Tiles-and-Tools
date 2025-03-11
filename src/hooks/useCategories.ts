import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
  subcategories?: Category[];
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch all categories
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) throw error;

      // Organize into hierarchy (parent categories with subcategories)
      const parentCategories = data.filter((cat) => cat.parent_id === null);
      const childCategories = data.filter((cat) => cat.parent_id !== null);

      // Add subcategories to their parents
      const categoriesWithChildren = parentCategories.map((parent) => {
        const children = childCategories.filter(
          (child) => child.parent_id === parent.id,
        );
        return {
          ...parent,
          subcategories: children.length > 0 ? children : undefined,
        };
      });

      setCategories(categoriesWithChildren);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a category by slug
  const getCategoryBySlug = async (slug: string): Promise<Category | null> => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Error fetching category by slug:", err);
      return null;
    }
  };

  // Get subcategories for a parent category
  const getSubcategories = async (parentId: string): Promise<Category[]> => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("parent_id", parentId)
        .order("name");

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Error fetching subcategories:", err);
      return [];
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    getCategoryBySlug,
    getSubcategories,
    refetch: fetchCategories,
  };
};
