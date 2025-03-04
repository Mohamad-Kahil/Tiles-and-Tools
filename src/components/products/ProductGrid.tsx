import React from "react";
import ProductCard from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  category?: string;
  subcategory?: string;
}

interface ProductGridProps {
  products?: Product[];
  isLoading?: boolean;
  emptyMessage?: string;
  onAddToCart?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
}

const ProductGrid = ({
  products = [],
  isLoading = false,
  emptyMessage = "No products found",
  onAddToCart = (id) => console.log(`Add to cart: ${id}`),
  onQuickView = (id) => console.log(`Quick view: ${id}`),
}: ProductGridProps) => {
  // Loading skeletons
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="w-full space-y-3">
            <Skeleton className="h-[220px] w-full rounded-md" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  // Product grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          rating={product.rating}
          onAddToCart={() => onAddToCart(product.id)}
          onQuickView={() => onQuickView(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
