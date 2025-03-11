import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}

interface FeaturedProductsProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
  categories?: string[];
  onViewAll?: () => void;
  onAddToCart?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
}

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Luxury Marble Flooring Tile",
    price: 1299.99,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80",
    rating: 4.8,
    category: "Flooring",
  },
  {
    id: "2",
    name: "Premium Wall Paint - Desert Sand",
    price: 349.99,
    image:
      "https://images.unsplash.com/photo-1562184552-997c461abbe6?w=500&q=80",
    rating: 4.6,
    category: "Wall Products",
  },
  {
    id: "3",
    name: "Modern Pendant Light Fixture",
    price: 899.99,
    image:
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80",
    rating: 4.7,
    category: "Lighting",
  },
  {
    id: "4",
    name: "Handcrafted Ceramic Vase",
    price: 499.99,
    image:
      "https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?w=500&q=80",
    rating: 4.5,
    category: "Decor",
  },
  {
    id: "5",
    name: "Engineered Hardwood Flooring",
    price: 1599.99,
    image:
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=500&q=80",
    rating: 4.9,
    category: "Flooring",
  },
  {
    id: "6",
    name: "Minimalist Wall Sconce",
    price: 459.99,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80",
    rating: 4.4,
    category: "Lighting",
  },
  {
    id: "7",
    name: "Decorative Wallpaper - Floral Pattern",
    price: 799.99,
    image:
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=500&q=80",
    rating: 4.3,
    category: "Wall Products",
  },
  {
    id: "8",
    name: "Handwoven Egyptian Cotton Rug",
    price: 2499.99,
    image:
      "https://images.unsplash.com/photo-1600166898405-da9535204843?w=500&q=80",
    rating: 4.9,
    category: "Decor",
  },
];

const defaultCategories = [
  "All",
  "Flooring",
  "Wall Products",
  "Lighting",
  "Decor",
];

const FeaturedProducts = ({
  title = "Featured Products",
  subtitle = "Discover our most popular home decoration and finishing products",
  products = defaultProducts,
  categories = defaultCategories,
  onViewAll = () => console.log("View all clicked"),
  onAddToCart = (id) => console.log(`Add to cart: ${id}`),
  onQuickView = (id) => console.log(`Quick view: ${id}`),
}: FeaturedProductsProps) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 4;

  // Filter products by category
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Get current page products
  const currentProducts = filteredProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage,
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground mt-2">{subtitle}</p>
          </div>
          <Button
            variant="outline"
            className="mt-4 md:mt-0"
            onClick={onViewAll}
          >
            View All Products
          </Button>
        </div>

        <Tabs
          defaultValue="All"
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevPage}
                disabled={totalPages <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextPage}
                disabled={totalPages <= 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      id: product.id,
                      name: product.name,
                      slug: product.id,
                      price: product.price,
                      imageUrl: product.image,
                    }}
                  />
                ))}
              </div>

              {currentProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No products found in this category.
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <p className="text-sm text-muted-foreground">
              Page {currentPage + 1} of {totalPages}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
