import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { getTranslation, formatCurrency } from "@/lib/i18n";
import { CartItem } from "@/components/cart/CartContext";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  language: string;
  isSubmitting: boolean;
  onPlaceOrder: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  language,
  isSubmitting,
  onPlaceOrder,
}) => {
  // Calculate shipping cost (free over 5000 EGP)
  const shippingCost = subtotal > 5000 ? 0 : 100;

  // Calculate total
  const total = subtotal + shippingCost;

  return (
    <div className="bg-card rounded-lg shadow-sm p-6 sticky top-4">
      <h2 className="text-xl font-medium mb-4">
        {getTranslation("orderSummary", language)}
      </h2>
      <Separator className="mb-4" />

      {/* Item count */}
      <div className="text-sm text-muted-foreground mb-4">
        {items.length}{" "}
        {items.length === 1
          ? getTranslation("item", language)
          : getTranslation("items", language)}{" "}
        {getTranslation("inCart", language)}
      </div>

      {/* Item list */}
      <div className="max-h-64 overflow-auto mb-4 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium line-clamp-1">
                {item.name}
              </div>
              <div className="text-sm text-muted-foreground">
                {formatCurrency(item.price, language)} × {item.quantity}
              </div>
              <div className="text-sm font-medium">
                {formatCurrency(item.price * item.quantity, language)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Separator className="mb-4" />

      {/* Price calculations */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            {getTranslation("subtotal", language)}
          </span>
          <span className="font-medium">
            {formatCurrency(subtotal, language)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">
            {getTranslation("shipping", language)}
          </span>
          <span className="font-medium">
            {shippingCost === 0
              ? getTranslation("free", language)
              : formatCurrency(shippingCost, language)}
          </span>
        </div>

        {subtotal < 5000 && (
          <div className="text-xs text-muted-foreground">
            {getTranslation("addMore", language)}{" "}
            {formatCurrency(5000 - subtotal, language)}{" "}
            {getTranslation("forFreeShipping", language)}
          </div>
        )}

        <Separator className="my-2" />

        <div className="flex justify-between text-lg font-bold">
          <span>{getTranslation("total", language)}</span>
          <span className="text-primary">
            {formatCurrency(total, language)}
          </span>
        </div>

        {/* Place order button (desktop) */}
        <div className="hidden lg:block mt-6">
          <Button
            onClick={onPlaceOrder}
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? getTranslation("processing", language)
              : getTranslation("placeOrder", language)}
          </Button>
        </div>

        {/* Secure checkout notice */}
        <div className="mt-4 text-xs text-muted-foreground flex items-center justify-center">
          <Check className="h-3 w-3 mr-1" />{" "}
          {getTranslation("secureCheckout", language)}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
