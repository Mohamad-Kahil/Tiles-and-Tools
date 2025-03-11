import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug?: string;
    price: number;
    salePrice?: number;
    imageUrl: string;
    category?: string;
  };
  onAddToCart?: () => void;
  onAddToWishlist?: () => void;
  onQuickView?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product = {
    id: "default",
    name: "Sample Product",
    price: 0,
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80",
  },
  onAddToCart,
  onAddToWishlist,
  onQuickView,
}) => {
  // Default to English language
  const language = "en";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) onAddToCart();
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToWishlist) onAddToWishlist();
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView();
  };

  // Use product ID as fallback if slug is not available
  const productUrl = `/product/${product.slug || product.id}`;

  return (
    <div className="group relative bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      {/* Product Image */}
      <Link to={productUrl} className="block">
        <div className="aspect-square w-full overflow-hidden bg-gray-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className={cn(
              "h-full w-full object-cover transition-transform duration-500",
              "group-hover:scale-110",
            )}
          />
        </div>

        {/* Quick action buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-white text-gray-700 hover:text-primary shadow-sm"
            onClick={handleAddToWishlist}
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-white text-gray-700 hover:text-primary shadow-sm"
            onClick={handleQuickView}
          >
            <Eye className="h-4 w-4" />
            <span className="sr-only">Quick view</span>
          </Button>
        </div>

        {/* Sale badge */}
        {product.salePrice && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            Sale
          </Badge>
        )}

        {/* Product Info */}
        <div className="p-4">
          {product.category && (
            <div className="text-xs text-muted-foreground mb-1">
              {product.category}
            </div>
          )}
          <h3 className="font-medium text-sm sm:text-base line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center">
            {product.salePrice ? (
              <>
                <span className="font-bold text-primary">
                  {formatCurrency(product.salePrice, language)}
                </span>
                <span className="ml-2 text-sm text-muted-foreground line-through">
                  {formatCurrency(product.price, language)}
                </span>
              </>
            ) : (
              <span className="font-bold text-primary">
                {formatCurrency(product.price, language)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to cart button */}
      <div className="p-4 pt-0">
        <Button
          variant="outline"
          className="w-full transition-all group-hover:bg-primary group-hover:text-primary-foreground"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
