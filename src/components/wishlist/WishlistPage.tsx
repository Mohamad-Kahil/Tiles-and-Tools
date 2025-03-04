import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { useWishlist } from "./WishlistContext";
import { useCart } from "../cart/CartContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const WishlistPage = () => {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  // Format price
  const formatPrice = (price: number) => {
    return price.toLocaleString("ar-EG", {
      style: "currency",
      currency: "EGP",
    });
  };

  // Handle add to cart
  const handleAddToCart = (item: any) => {
    addItem(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      },
      1,
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-6">
          Your Wishlist
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-muted rounded-lg">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-medium mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any products to your wishlist yet.
            </p>
            <Button asChild>
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">
                {items.length} {items.length === 1 ? "item" : "items"}
              </p>
              <Button variant="outline" size="sm" onClick={clearWishlist}>
                Clear Wishlist
              </Button>
            </div>

            <div className="bg-card rounded-lg shadow-sm p-6">
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4 border-b pb-6 last:border-0 last:pb-0"
                  >
                    <div className="h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col sm:flex-row justify-between">
                      <div className="space-y-1">
                        <Link
                          to={`/product/${item.id}`}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                        <div className="text-lg font-bold text-primary">
                          {formatPrice(item.price)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-4 sm:mt-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Add to Cart
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Button variant="outline" asChild>
                <Link to="/products" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default WishlistPage;
