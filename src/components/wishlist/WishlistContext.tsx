import React, { createContext, useContext, useState, useEffect } from "react";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize wishlist from localStorage if available
  const [items, setItems] = useState<WishlistItem[]>(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items));
  }, [items]);

  // Calculate total number of items in wishlist
  const itemCount = items.length;

  // Add item to wishlist
  const addItem = (item: WishlistItem) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);

      if (existingItemIndex >= 0) {
        // Item already exists, don't add it again
        return prevItems;
      } else {
        // Item doesn't exist, add new item
        return [...prevItems, item];
      }
    });
  };

  // Remove item from wishlist
  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Check if item is in wishlist
  const isInWishlist = (id: string) => {
    return items.some((item) => item.id === id);
  };

  // Clear wishlist
  const clearWishlist = () => {
    setItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        clearWishlist,
        itemCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
