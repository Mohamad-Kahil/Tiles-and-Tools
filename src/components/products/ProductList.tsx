import React from "react";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import ProductFilters from "./ProductFilters";
import ProductSort from "./ProductSort";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductListProps {
  categoryId?: string;
  initialFilters?: {
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    isFeatured?: boolean;
  };
}

const ProductList: React.FC<ProductListProps> = ({
  categoryId,
  initialFilters = {},
}) => {
  const { products, loading, error, filters, pagination, updateFilters } =
    useProducts({
      category_id: categoryId,
      search: initialFilters.search,
      min_price: initialFilters.minPrice,
      max_price: initialFilters.maxPrice,
      sort_by: initialFilters.sortBy || "name",
      sort_order: initialFilters.sortOrder || "asc",
      is_featured: initialFilters.isFeatured,
      page: 1,
      limit: 12,
    });

  const handlePageChange = (newPage: number) => {
    updateFilters({ page: newPage });
    // Scroll to top of product list
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (newFilters: any) => {
    updateFilters({
      min_price: newFilters.minPrice,
      max_price: newFilters.maxPrice,
      // Reset to page 1 when filters change
      page: 1,
    });
  };

  const handleSortChange = (sortOption: {
    sortBy: string;
    sortOrder: "asc" | "desc";
  }) => {
    updateFilters({
      sort_by: sortOption.sortBy,
      sort_order: sortOption.sortOrder,
      // Reset to page 1 when sort changes
      page: 1,
    });
  };

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error loading products: {error}</p>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <ProductFilters
          onFilterChange={handleFilterChange}
          initialFilters={{
            minPrice: filters.min_price,
            maxPrice: filters.max_price,
          }}
        />
        <ProductSort
          onSortChange={handleSortChange}
          currentSortBy={filters.sort_by || "name"}
          currentSortOrder={filters.sort_order || "asc"}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-60 w-full rounded-md" />
              <Skeleton className="h-4 w-3/4 rounded-md" />
              <Skeleton className="h-4 w-1/2 rounded-md" />
              <Skeleton className="h-8 w-28 rounded-md" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            No products found. Try adjusting your filters.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  price: product.price,
                  salePrice: product.sale_price,
                  imageUrl:
                    product.images.find((img) => img.is_primary)?.image_url ||
                    product.images[0]?.image_url ||
                    "",
                  category: product.category?.name || "",
                }}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={pagination.page === page ? "default" : "outline"}
                      size="sm"
                      className="w-8 h-8 p-0"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ),
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
