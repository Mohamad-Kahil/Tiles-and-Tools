import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  viewedAt: Date;
}

interface RecentlyViewedProps {
  maxItems?: number;
  className?: string;
}

const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  maxItems = 4,
  className = "",
}) => {
  // In a real app, this would be fetched from a context or local storage
  const [recentProducts, setRecentProducts] = useState<Product[]>([
    {
      id: "prod1",
      name: "Luxury Marble Flooring Tile",
      price: 1299.99,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&q=80",
      category: "Flooring",
      viewedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: "prod2",
      name: "Premium Wall Paint - Desert Sand",
      price: 349.99,
      image:
        "https://images.unsplash.com/photo-1562184552-997c461abbe6?w=300&q=80",
      category: "Wall Products",
      viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: "prod3",
      name: "Modern Pendant Light Fixture",
      price: 899.99,
      image:
        "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=300&q=80",
      category: "Lighting",
      viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    },
    {
      id: "prod4",
      name: "Handcrafted Ceramic Vase",
      price: 499.99,
      image:
        "https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?w=300&q=80",
      category: "Decor",
      viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
    {
      id: "prod5",
      name: "Decorative Wall Panel",
      price: 799.99,
      image:
        "https://images.unsplash.com/photo-1620626576474-aad9a5a3e854?w=300&q=80",
      category: "Wall Products",
      viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
    },
  ]);

  // Format price
  const formatPrice = (price: number) => {
    return price.toLocaleString("ar-EG", {
      style: "currency",
      currency: "EGP",
    });
  };

  // Format time ago
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000; // seconds in a year
    if (interval > 1) return `${Math.floor(interval)} years ago`;

    interval = seconds / 2592000; // seconds in a month
    if (interval > 1) return `${Math.floor(interval)} months ago`;

    interval = seconds / 86400; // seconds in a day
    if (interval > 1) return `${Math.floor(interval)} days ago`;

    interval = seconds / 3600; // seconds in an hour
    if (interval > 1) return `${Math.floor(interval)} hours ago`;

    interval = seconds / 60; // seconds in a minute
    if (interval > 1) return `${Math.floor(interval)} minutes ago`;

    return `${Math.floor(seconds)} seconds ago`;
  };

  // Sort by most recently viewed
  const sortedProducts = [...recentProducts]
    .sort((a, b) => b.viewedAt.getTime() - a.viewedAt.getTime())
    .slice(0, maxItems);

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Recently Viewed</h2>
        <Link to="/products" className="text-sm text-primary hover:underline">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative h-48 overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
              <div className="absolute top-2 right-2">
                <Badge
                  variant="secondary"
                  className="bg-black/70 text-white hover:bg-black/70"
                >
                  {product.category}
                </Badge>
              </div>
              <div className="absolute bottom-2 left-2 flex items-center gap-1 text-xs bg-black/70 text-white px-2 py-1 rounded-full">
                <Clock className="h-3 w-3" />
                <span>{formatTimeAgo(product.viewedAt)}</span>
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className="font-medium line-clamp-1">{product.name}</h3>
              <div className="mt-1 font-bold text-primary">
                {formatPrice(product.price)}
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button variant="outline" className="w-full" asChild>
                <Link to={`/products/${product.id}`}>
                  <Eye className="mr-2 h-4 w-4" /> View Product
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
