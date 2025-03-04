import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, ChevronRight, ArrowLeft } from "lucide-react";
import { useCart } from "./CartContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const CartPage = () => {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  // Handle quantity changes
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  // Format price
  const formatPrice = (price: number) => {
    return price.toLocaleString("ar-EG", {
      style: "currency",
      currency: "EGP",
    });
  };

  // Calculate shipping cost (free over 5000 EGP)
  const shippingCost = subtotal > 5000 ? 0 : 100;

  // Calculate total
  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-6">
          Your Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-muted rounded-lg">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild>
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-card rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-medium">
                    Cart Items ({itemCount})
                  </h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/products" className="flex items-center gap-1">
                      <ArrowLeft className="h-4 w-4" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>

                <Separator className="mb-4" />

                {/* Cart item list */}
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row gap-4"
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

                        <div className="flex items-center justify-between sm:flex-col sm:items-end mt-2 sm:mt-0">
                          <div className="flex items-center border rounded-md">
                            <button
                              className="px-3 py-1 border-r"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="px-4 py-1">{item.quantity}</span>
                            <button
                              className="px-3 py-1 border-l"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>

                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-muted-foreground">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                <Separator className="mb-4" />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                    </span>
                  </div>

                  {subtotal < 5000 && (
                    <div className="text-xs text-muted-foreground">
                      Add {formatPrice(5000 - subtotal)} more to qualify for
                      free shipping
                    </div>
                  )}

                  <Separator className="my-2" />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>

                  <Button className="w-full mt-4" size="lg" asChild>
                    <Link to="/checkout">
                      Proceed to Checkout{" "}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>We accept:</p>
                    <div className="flex gap-2 mt-2">
                      <div className="bg-white rounded p-1 h-6 w-10 flex items-center justify-center border">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png"
                          alt="Mastercard"
                          className="h-full w-auto object-contain"
                        />
                      </div>
                      <div className="bg-white rounded p-1 h-6 w-10 flex items-center justify-center border">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png"
                          alt="Visa"
                          className="h-full w-auto object-contain"
                        />
                      </div>
                      <div className="bg-white rounded p-1 h-6 w-10 flex items-center justify-center border">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Fawry_logo.svg/200px-Fawry_logo.svg.png"
                          alt="Fawry"
                          className="h-full w-auto object-contain"
                        />
                      </div>
                      <div className="bg-white rounded p-1 h-6 w-10 flex items-center justify-center border">
                        <span className="text-[8px] font-bold text-slate-900">
                          Cash on Delivery
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
