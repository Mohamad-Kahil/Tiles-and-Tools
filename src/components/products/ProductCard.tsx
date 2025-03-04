import React from "react";
import { Star, ShoppingCart, Eye, Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/cart/CartContext";
import { useWishlist } from "@/components/wishlist/WishlistContext";
import { useAnalytics } from "@/components/analytics/AnalyticsProvider";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatCurrency, getTranslation } from "@/lib/i18n";

interface ProductCardProps {
  id?: string;
  name?: string;
  price?: number;
  image?: string;
  rating?: number;
  onAddToCart?: () => void;
  onQuickView?: () => void;
  onToggleWishlist?: () => void;
  showWishlistButton?: boolean;
}

const ProductCard = ({
  id = "1",
  name = "Elegant Ceramic Floor Tile",
  price = 299.99,
  image = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80",
  rating = 4.5,
  onAddToCart = () => {},
  onQuickView = () => console.log("Quick view clicked"),
  onToggleWishlist = () => {},
  showWishlistButton = true,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const { addItem } = useCart();
  const {
    addItem: addToWishlist,
    isInWishlist,
    removeItem: removeFromWishlist,
  } = useWishlist();
  const { trackEvent } = useAnalytics();
  const { language } = useLanguage();

  const handleAddToCart = () => {
    addItem(
      {
        id,
        name,
        price,
        image,
      },
      1,
    );

    // Track add to cart event
    trackEvent("ecommerce", "add_to_cart", name, price);

    onAddToCart();
  };

  // Format price to EGP currency
  const formattedPrice = formatCurrency(price, language);

  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="h-4 w-4 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>,
        );
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <Card
      className={cn(
        "w-full max-w-[280px] h-[380px] overflow-hidden transition-all duration-300 bg-white",
        isHovered ? "shadow-lg transform -translate-y-1" : "",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="relative h-[220px] overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />

        {/* Quick actions overlay that appears on hover */}
        <div
          className={cn(
            "absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0",
          )}
        >
          <Button
            variant="secondary"
            size="sm"
            className="w-3/4 gap-2"
            onClick={onQuickView}
            asChild
          >
            <Link to={`/product/${id}`}>
              <Eye className="h-4 w-4" />{" "}
              {language === "en" ? "Quick View" : "عرض سريع"}
            </Link>
          </Button>
          <Button
            variant="default"
            size="sm"
            className="w-3/4 gap-2"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />{" "}
            {getTranslation("addToCart", language)}
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <Link to={`/product/${id}`} className="block">
          <h3 className="font-medium text-sm line-clamp-2 h-10 mb-1 hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          {renderStars()}
          <span className="text-xs text-gray-500 ml-1">({rating})</span>
        </div>
        <p className="font-bold text-lg text-primary">{formattedPrice}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />{" "}
            {getTranslation("addToCart", language)}
          </Button>

          {showWishlistButton && (
            <Button
              variant={isInWishlist(id) ? "default" : "outline"}
              size="icon"
              className="flex-shrink-0"
              onClick={() => {
                if (isInWishlist(id)) {
                  removeFromWishlist(id);
                  // Track remove from wishlist event
                  trackEvent("ecommerce", "remove_from_wishlist", name, price);
                } else {
                  addToWishlist({
                    id,
                    name,
                    price,
                    image,
                  });
                  // Track add to wishlist event
                  trackEvent("ecommerce", "add_to_wishlist", name, price);
                }
                onToggleWishlist();
              }}
            >
              <Heart
                className={`h-4 w-4 ${isInWishlist(id) ? "fill-current" : ""}`}
              />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
