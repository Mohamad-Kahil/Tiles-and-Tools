import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, X, ChevronRight, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useCart } from "./CartContext";

interface CartPreviewProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const CartPreview = ({
  isOpen = false,
  onClose = () => {},
}: CartPreviewProps) => {
  const [open, setOpen] = useState(isOpen);
  const { items, removeItem, updateQuantity, itemCount, subtotal } = useCart();

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  // Format price
  const formatPrice = (price: number) => {
    return price.toLocaleString("ar-EG", {
      style: "currency",
      currency: "EGP",
    });
  };

  return (
    <div className="relative bg-white">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {itemCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-medium text-lg">Your Cart</h3>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {items.length === 0 ? (
            <div className="p-6 text-center">
              <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              <ScrollArea className="max-h-[300px]">
                <div className="p-4 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">
                          {item.name}
                        </h4>
                        <div className="flex items-center mt-1 text-sm">
                          <span className="text-gray-500">
                            Qty: {item.quantity}
                          </span>
                          <div className="flex items-center ml-auto">
                            <span className="font-medium">
                              {formatPrice(item.price)}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 ml-1"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-3 w-3 text-gray-400" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Total</span>
                  <span className="font-bold">{formatPrice(subtotal)}</span>
                </div>
                <Button className="w-full" asChild onClick={handleClose}>
                  <Link to="/cart">
                    View Cart <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  className="w-full mt-2"
                  variant="outline"
                  asChild
                  onClick={handleClose}
                >
                  <Link to="/checkout">
                    Checkout <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CartPreview;
