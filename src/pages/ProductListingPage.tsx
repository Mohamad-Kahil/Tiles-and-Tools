import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Filter, Grid3X3, LayoutGrid, SlidersHorizontal } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilters from "@/components/products/ProductFilters";
import ProductSort from "@/components/products/ProductSort";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Product } from "@/components/products/ProductGrid";

// Mock data for products
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Luxury Marble Flooring Tile",
    price: 1299.99,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Premium Wall Paint - Desert Sand",
    price: 349.99,
    image:
      "https://images.unsplash.com/photo-1562184552-997c461abbe6?w=500&q=80",
    rating: 4.6,
  },
  {
    id: "3",
    name: "Modern Pendant Light Fixture",
    price: 899.99,
    image:
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Handcrafted Ceramic Vase",
    price: 499.99,
    image:
      "https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?w=500&q=80",
    rating: 4.5,
  },
  {
    id: "5",
    name: "Engineered Hardwood Flooring",
    price: 1599.99,
    image:
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=500&q=80",
    rating: 4.9,
  },
  {
    id: "6",
    name: "Minimalist Wall Sconce",
    price: 459.99,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80",
    rating: 4.4,
  },
  {
    id: "7",
    name: "Decorative Wallpaper - Floral Pattern",
    price: 799.99,
    image:
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=500&q=80",
    rating: 4.3,
  },
  {
    id: "8",
    name: "Handwoven Egyptian Cotton Rug",
    price: 2499.99,
    image:
      "https://images.unsplash.com/photo-1600166898405-da9535204843?w=500&q=80",
    rating: 4.9,
  },
  {
    id: "9",
    name: "Porcelain Floor Tiles - Marble Look",
    price: 899.99,
    image:
      "https://images.unsplash.com/photo-1600607687644-c7f34b5063c8?w=500&q=80",
    rating: 4.7,
  },
  {
    id: "10",
    name: "Bathroom Vanity with Marble Top",
    price: 3499.99,
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80",
    rating: 4.8,
  },
  {
    id: "11",
    name: "Kitchen Backsplash Mosaic Tiles",
    price: 599.99,
    image:
      "https://images.unsplash.com/photo-1576698483491-8c43f0862543?w=500&q=80",
    rating: 4.5,
  },
  {
    id: "12",
    name: "Wooden Dining Table - Handcrafted",
    price: 4999.99,
    image:
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500&q=80",
    rating: 4.9,
  },
];

// Category name mapping
const categoryNames: Record<string, string> = {
  flooring: "Flooring",
  "wall-products": "Wall Products",
  lighting: "Lighting",
  furniture: "Furniture",
  bathroom: "Bathroom",
  kitchen: "Kitchen",
};

const ProductListingPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // State for filters, sorting, and pagination
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({
    categories: categoryId ? [categoryId] : [],
  });
  const [selectedPriceRange, setSelectedPriceRange] = useState<
    [number, number]
  >([0, 10000]);
  const [currentSort, setCurrentSort] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Get category name for breadcrumb
  const categoryName = categoryId
    ? categoryNames[categoryId] || categoryId
    : "";

  // Effect to load products based on filters, sorting, and pagination
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);

      // In a real app, this would be an API call with filter parameters
      // For now, we'll simulate filtering and sorting with the mock data

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Filter products (in a real app, this would be done on the server)
      let filteredProducts = [...mockProducts];

      // Apply category filter if present
      if (selectedFilters.categories?.length > 0) {
        // In a real app, this would be part of the API query
        // This is just for demonstration
        console.log(
          `Filtering by categories: ${selectedFilters.categories.join(", ")}`,
        );
      }

      // Apply price filter
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.price >= selectedPriceRange[0] &&
          product.price <= selectedPriceRange[1],
      );

      // Apply sorting
      switch (currentSort) {
        case "price-asc":
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case "rating-desc":
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          // In a real app, would sort by date added
          // For mock data, we'll just use the reverse of the current order
          filteredProducts.reverse();
          break;
        default: // "featured"
          // Keep default order for featured
          break;
      }

      // Calculate pagination
      const productsPerPage = 8;
      const totalFilteredProducts = filteredProducts.length;
      const calculatedTotalPages = Math.ceil(
        totalFilteredProducts / productsPerPage,
      );

      // Adjust current page if it exceeds the new total pages
      const adjustedCurrentPage = Math.min(
        currentPage,
        calculatedTotalPages || 1,
      );

      // Apply pagination
      const startIndex = (adjustedCurrentPage - 1) * productsPerPage;
      const paginatedProducts = filteredProducts.slice(
        startIndex,
        startIndex + productsPerPage,
      );

      setProducts(paginatedProducts);
      setTotalPages(calculatedTotalPages);
      setCurrentPage(adjustedCurrentPage);
      setIsLoading(false);
    };

    loadProducts();

    // Update URL search params
    const newSearchParams = new URLSearchParams();

    // Add sort parameter
    if (currentSort !== "featured") {
      newSearchParams.set("sort", currentSort);
    }

    // Add page parameter
    if (currentPage > 1) {
      newSearchParams.set("page", currentPage.toString());
    }

    // Add price range if not default
    if (selectedPriceRange[0] > 0 || selectedPriceRange[1] < 10000) {
      newSearchParams.set(
        "price",
        `${selectedPriceRange[0]}-${selectedPriceRange[1]}`,
      );
    }

    // Add other filters
    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (key !== "categories" && values.length > 0) {
        newSearchParams.set(key, values.join(","));
      }
    });

    setSearchParams(newSearchParams, { replace: true });
  }, [
    selectedFilters,
    selectedPriceRange,
    currentSort,
    currentPage,
    categoryId,
  ]);

  // Handle filter changes
  const handleFilterChange = (
    filterId: string,
    optionId: string,
    isChecked: boolean,
  ) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };

      if (!newFilters[filterId]) {
        newFilters[filterId] = [];
      }

      if (isChecked) {
        // Add the filter
        newFilters[filterId] = [...newFilters[filterId], optionId];
      } else {
        // Remove the filter
        newFilters[filterId] = newFilters[filterId].filter(
          (id) => id !== optionId,
        );
      }

      return newFilters;
    });

    // Reset to first page when filters change
    setCurrentPage(1);
  };

  // Handle price range changes
  const handlePriceChange = (range: [number, number]) => {
    setSelectedPriceRange(range);
    setCurrentPage(1);
  };

  // Handle sort changes
  const handleSortChange = (value: string) => {
    setCurrentSort(value);
    setCurrentPage(1);
  };

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of product grid
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedFilters({
      categories: categoryId ? [categoryId] : [],
    });
    setSelectedPriceRange([0, 10000]);
    setCurrentPage(1);
  };

  // Handle add to cart
  const handleAddToCart = (productId: string) => {
    console.log(`Add to cart: ${productId}`);
    // In a real app, this would add the product to the cart
  };

  // Handle quick view
  const handleQuickView = (productId: string) => {
    console.log(`Quick view: ${productId}`);
    // In a real app, this would open a quick view modal
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb
            items={[
              ...(categoryId
                ? [{ label: categoryName, href: `/category/${categoryId}` }]
                : []),
              { label: "Products" },
            ]}
          />
        </div>

        {/* Page header */}
        <div className="bg-muted py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold tracking-tight">
              {categoryId ? categoryName : "All Products"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {categoryId
                ? `Explore our collection of ${categoryName.toLowerCase()} products for your home`
                : "Browse our complete collection of home decoration and finishing products"}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <ProductFilters
                selectedFilters={selectedFilters}
                selectedPriceRange={selectedPriceRange}
                onFilterChange={handleFilterChange}
                onPriceChange={handlePriceChange}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Product grid and controls */}
            <div className="flex-1">
              {/* Mobile filter button and sort controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <Button
                  variant="outline"
                  className="lg:hidden flex items-center gap-2"
                  onClick={() => setIsMobileFiltersOpen(true)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>

                <div className="flex items-center gap-4 ml-auto">
                  <ProductSort
                    currentSort={currentSort}
                    onSortChange={handleSortChange}
                  />
                </div>
              </div>

              {/* Product grid */}
              <ProductGrid
                products={products}
                isLoading={isLoading}
                onAddToCart={handleAddToCart}
                onQuickView={handleQuickView}
                emptyMessage="No products match your selected filters. Try adjusting your filters or browse all products."
              />

              {/* Pagination */}
              {!isLoading && totalPages > 1 && (
                <Pagination className="my-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }).map((_, index) => {
                      const page = index + 1;

                      // Show first page, last page, and pages around current page
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              isActive={page === currentPage}
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }

                      // Show ellipsis for gaps
                      if (
                        (page === 2 && currentPage > 3) ||
                        (page === totalPages - 1 &&
                          currentPage < totalPages - 2)
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }

                      return null;
                    })}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile filters sheet */}
      <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
        <SheetContent side="left" className="w-full sm:w-[350px] overflow-auto">
          <div className="py-4">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <ProductFilters
              selectedFilters={selectedFilters}
              selectedPriceRange={selectedPriceRange}
              onFilterChange={handleFilterChange}
              onPriceChange={handlePriceChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        </SheetContent>
      </Sheet>

      <Footer />
    </div>
  );
};

export default ProductListingPage;
