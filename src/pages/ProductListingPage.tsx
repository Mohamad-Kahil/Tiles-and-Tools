import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useCategories } from "@/hooks/useCategories";
import ProductList from "@/components/products/ProductList";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";

const ProductListingPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [searchParams] = useSearchParams();
  const { getCategoryBySlug } = useCategories();
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Get search parameters
  const search = searchParams.get("search") || "";
  const minPrice = searchParams.get("minPrice")
    ? parseInt(searchParams.get("minPrice")!)
    : undefined;
  const maxPrice = searchParams.get("maxPrice")
    ? parseInt(searchParams.get("maxPrice")!)
    : undefined;
  const sortBy = searchParams.get("sortBy") || undefined;
  const sortOrder = searchParams.get("sortOrder") as "asc" | "desc" | undefined;

  useEffect(() => {
    const loadCategory = async () => {
      if (categorySlug) {
        setLoading(true);
        try {
          const categoryData = await getCategoryBySlug(categorySlug);
          setCategory(categoryData);
        } catch (error) {
          console.error("Error loading category:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadCategory();
  }, [categorySlug, getCategoryBySlug]);

  // Determine page title
  const pageTitle = category
    ? category.name
    : search
      ? `Search: ${search}`
      : "All Products";

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          ...(category
            ? [{ label: category.name, href: `/category/${category.slug}` }]
            : []),
          ...(search
            ? [{ label: `Search: ${search}`, href: `/search?q=${search}` }]
            : []),
        ]}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold">{pageTitle}</h1>
        {category && category.description && (
          <p className="mt-2 text-muted-foreground">{category.description}</p>
        )}
      </div>

      <ProductList
        categoryId={category?.id}
        initialFilters={{
          search,
          minPrice,
          maxPrice,
          sortBy,
          sortOrder,
        }}
      />
    </div>
  );
};

export default ProductListingPage;
