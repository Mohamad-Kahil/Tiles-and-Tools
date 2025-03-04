import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "@/components/cart/CartContext";
import { useWishlist } from "@/components/wishlist/WishlistContext";
import { useAnalytics } from "@/components/analytics/AnalyticsProvider";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatCurrency } from "@/lib/i18n";
import {
  ChevronRight,
  Heart,
  Share2,
  Star,
  ShoppingCart,
  Check,
  Info,
} from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/components/products/ProductGrid";

// Mock product data
const mockProducts: Record<
  string,
  Product & {
    description: string;
    features: string[];
    specifications: Record<string, string>;
    stock: number;
    discount?: number;
    images: string[];
    reviews: {
      id: string;
      user: string;
      avatar: string;
      rating: number;
      date: string;
      comment: string;
    }[];
  }
> = {
  "1": {
    id: "1",
    name: "Luxury Marble Flooring Tile",
    price: 1299.99,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80",
    rating: 4.8,
    category: "flooring",
    subcategory: "marble",
    description:
      "Elevate your space with our premium marble flooring tiles. These luxurious tiles feature natural veining patterns that make each piece unique. Perfect for entryways, bathrooms, and kitchens, these tiles add a touch of elegance to any room.",
    features: [
      "Natural marble material",
      "Polished finish for a glossy appearance",
      "Resistant to scratches and stains",
      "Easy to clean and maintain",
      "Suitable for indoor use",
    ],
    specifications: {
      Material: "Natural Marble",
      Dimensions: "60 x 60 cm",
      Thickness: "10 mm",
      Finish: "Polished",
      Color: "White with Gray Veining",
      Weight: "5.2 kg per tile",
      Coverage: "2.78 tiles per square meter",
      Origin: "Egypt",
    },
    stock: 156,
    discount: 15,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80",
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80",
    ],
    reviews: [
      {
        id: "r1",
        user: "Ahmed Hassan",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
        rating: 5,
        date: "2023-10-15",
        comment:
          "The quality of these marble tiles exceeded my expectations. They look absolutely stunning in my entryway and have completely transformed the space. Installation was straightforward and the result is magnificent.",
      },
      {
        id: "r2",
        user: "Laila Mahmoud",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laila",
        rating: 4,
        date: "2023-09-28",
        comment:
          "Beautiful tiles with elegant veining patterns. They're a bit heavy to handle during installation, but the end result is worth it. I've received many compliments on my new bathroom floor.",
      },
      {
        id: "r3",
        user: "Omar Farouk",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar",
        rating: 5,
        date: "2023-08-12",
        comment:
          "Exceptional quality for the price. These tiles have transformed my kitchen floor completely. The marble is easy to clean and maintains its shine even with heavy foot traffic.",
      },
    ],
  },
  "3": {
    id: "3",
    name: "Modern Pendant Light Fixture",
    price: 899.99,
    image:
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80",
    rating: 4.7,
    category: "lighting",
    subcategory: "pendant",
    description:
      "Add a touch of modern elegance to your space with our designer pendant light fixture. This contemporary lighting solution features a sleek design with adjustable height, making it perfect for dining areas, kitchen islands, or entryways.",
    features: [
      "Contemporary design with premium materials",
      "Adjustable hanging height",
      "Energy-efficient LED compatible",
      "Dimmable capability",
      "Easy installation with included hardware",
    ],
    specifications: {
      Material: "Brushed Brass and Glass",
      Dimensions: "30 cm diameter",
      "Cord Length": "150 cm (adjustable)",
      "Bulb Type": "E27 socket (bulb not included)",
      "Max Wattage": "60W",
      Voltage: "220-240V",
      Installation: "Ceiling mounted",
      Weight: "2.8 kg",
    },
    stock: 42,
    discount: 10,
    images: [
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    ],
    reviews: [
      {
        id: "r1",
        user: "Nour El-Din",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nour",
        rating: 5,
        date: "2023-11-05",
        comment:
          "This pendant light is absolutely stunning! It has completely transformed my dining area and creates the perfect ambiance for dinner parties. The adjustable height is a great feature.",
      },
      {
        id: "r2",
        user: "Heba Ali",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Heba",
        rating: 4,
        date: "2023-10-18",
        comment:
          "Beautiful design and good quality materials. Installation was a bit tricky but the end result is worth it. The light creates a warm, inviting glow in our kitchen.",
      },
      {
        id: "r3",
        user: "Karim Mostafa",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karim",
        rating: 5,
        date: "2023-09-30",
        comment:
          "Excellent craftsmanship and modern design. This pendant light has become the focal point of our entryway. Highly recommend for anyone looking to upgrade their lighting fixtures.",
      },
    ],
  },
};

// Related products
const relatedProducts: Product[] = [
  {
    id: "5",
    name: "Engineered Hardwood Flooring",
    price: 1599.99,
    image:
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=500&q=80",
    rating: 4.9,
  },
  {
    id: "7",
    name: "Decorative Wallpaper - Floral Pattern",
    price: 799.99,
    image:
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=500&q=80",
    rating: 4.3,
  },
  {
    id: "9",
    name: "Porcelain Floor Tiles - Marble Look",
    price: 899.99,
    image:
      "https://images.unsplash.com/photo-1600607687644-c7f34b5063c8?w=500&q=80",
    rating: 4.7,
  },
  {
    id: "6",
    name: "Minimalist Wall Sconce",
    price: 459.99,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80",
    rating: 4.4,
  },
];

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<(typeof mockProducts)[string] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Track product view
  useEffect(() => {
    if (product) {
      try {
        trackEvent("ecommerce", "view_item", product.name, product.price);
      } catch (error) {
        console.error("Error tracking product view:", error);
      }
    }
  }, [product]);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // In a real app, this would be an API call
      if (productId && mockProducts[productId]) {
        setProduct(mockProducts[productId]);
      } else {
        // If product not found, we could redirect or show an error
        console.error(`Product with ID ${productId} not found`);
      }

      setIsLoading(false);
    };

    fetchProduct();
  }, [productId]);

  // Handle quantity changes
  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Import hooks
  const { addItem } = useCart();
  const {
    addItem: addToWishlist,
    isInWishlist,
    removeItem: removeFromWishlist,
  } = useWishlist();
  const { trackEvent } = useAnalytics();

  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      addItem(
        {
          id: product.id,
          name: product.name,
          price: discountedPrice || product.price,
          image: product.image,
        },
        quantity,
      );
      console.log(`Added ${quantity} of ${product.name} to cart`);

      // Track add to cart event with quantity
      try {
        trackEvent(
          "ecommerce",
          "add_to_cart",
          product.name,
          discountedPrice || product.price,
        );
      } catch (error) {
        console.error("Error tracking add to cart:", error);
      }
    }
  };

  // Handle add to wishlist
  const handleAddToWishlist = () => {
    if (product) {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
        // Track remove from wishlist event
        try {
          trackEvent(
            "ecommerce",
            "remove_from_wishlist",
            product.name,
            discountedPrice || product.price,
          );
        } catch (error) {
          console.error("Error tracking wishlist removal:", error);
        }
      } else {
        addToWishlist({
          id: product.id,
          name: product.name,
          price: discountedPrice || product.price,
          image: product.image,
        });
        // Track add to wishlist event
        try {
          trackEvent(
            "ecommerce",
            "add_to_wishlist",
            product.name,
            discountedPrice || product.price,
          );
        } catch (error) {
          console.error("Error tracking wishlist addition:", error);
        }
      }
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-10 bg-gray-200 rounded w-1/2 mt-6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/products">Browse All Products</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculate discounted price if applicable
  const originalPrice = product.price;
  const discountedPrice = product.discount
    ? originalPrice - originalPrice * (product.discount / 100)
    : null;

  // Get language for formatting
  const { language } = useLanguage();

  // Format prices
  const formattedOriginalPrice = formatCurrency(originalPrice, language);

  const formattedDiscountedPrice = discountedPrice
    ? formatCurrency(discountedPrice, language)
    : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb
            items={[
              {
                label: product.category || "Products",
                href: `/category/${product.category}`,
              },
              {
                label: product.subcategory || "All",
                href: `/category/${product.category}/${product.subcategory}`,
              },
              { label: product.name },
            ]}
          />
        </div>

        {/* Product details */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product images */}
            <div className="space-y-4">
              {/* Main image */}
              <div className="aspect-square overflow-hidden rounded-lg border bg-white">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Thumbnail images */}
              <div className="flex space-x-2 overflow-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${selectedImage === index ? "ring-2 ring-primary" : ""}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      className="h-full w-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product info */}
            <div className="space-y-6">
              {/* Title and badges */}
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {product.name}
                </h1>
                <div className="mt-2 flex items-center space-x-2">
                  {/* Rating */}
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({product.rating})
                    </span>
                  </div>

                  {/* Stock status */}
                  {product.stock > 0 ? (
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-600"
                    >
                      <Check className="mr-1 h-3 w-3" /> In Stock
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-red-600 border-red-600"
                    >
                      Out of Stock
                    </Badge>
                  )}
                </div>
              </div>

              {/* Price */}
              <div>
                {discountedPrice ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-primary">
                      {formattedDiscountedPrice}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      {formattedOriginalPrice}
                    </span>
                    <Badge className="bg-red-600">
                      {product.discount}% OFF
                    </Badge>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-primary">
                    {formattedOriginalPrice}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-base text-muted-foreground">
                {product.description}
              </p>

              {/* Quantity selector */}
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-r-none"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <div className="flex h-8 w-12 items-center justify-center border-y border-input bg-background">
                    {quantity}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-l-none"
                    onClick={incrementQuantity}
                    disabled={product.stock <= quantity}
                  >
                    +
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stock} available
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button
                  className="flex-1"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant={isInWishlist(product.id) ? "default" : "outline"}
                  size="lg"
                  onClick={handleAddToWishlist}
                >
                  <Heart
                    className={`mr-2 h-5 w-5 ${isInWishlist(product.id) ? "fill-current" : ""}`}
                  />
                  {isInWishlist(product.id)
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"}
                </Button>
              </div>

              {/* Key features */}
              <div className="border rounded-lg p-4 bg-muted/50">
                <h3 className="font-medium mb-2 flex items-center">
                  <Info className="mr-2 h-4 w-4 text-primary" />
                  Key Features
                </h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-sm flex items-start">
                      <Check className="mr-2 h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Share */}
              <div className="flex items-center space-x-4 pt-2">
                <span className="text-sm text-muted-foreground">Share:</span>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Product details tabs */}
          <div className="mt-12">
            <Tabs defaultValue="specifications">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
                <TabsTrigger
                  value="specifications"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  Reviews ({product.reviews.length})
                </TabsTrigger>
                <TabsTrigger
                  value="shipping"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  Shipping & Returns
                </TabsTrigger>
              </TabsList>

              {/* Specifications tab */}
              <TabsContent value="specifications" className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Product Specifications
                    </h3>
                    <div className="space-y-2">
                      {Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="grid grid-cols-2 py-2 border-b"
                          >
                            <span className="font-medium">{key}</span>
                            <span>{value}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Product Description
                    </h3>
                    <p className="text-muted-foreground">
                      {product.description}
                    </p>

                    <h4 className="font-medium mt-6 mb-2">Features</h4>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              {/* Reviews tab */}
              <TabsContent value="reviews" className="pt-6">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Customer Reviews</h3>
                    <Button>Write a Review</Button>
                  </div>

                  {/* Overall rating summary */}
                  <div className="flex items-center space-x-4 bg-muted p-4 rounded-lg">
                    <div className="text-center">
                      <div className="text-4xl font-bold">{product.rating}</div>
                      <div className="flex justify-center mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Based on {product.reviews.length} reviews
                      </div>
                    </div>

                    <Separator orientation="vertical" className="h-16" />

                    <div className="flex-1">
                      {/* Rating distribution bars would go here */}
                      <div className="space-y-1">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const count = product.reviews.filter(
                            (r) => Math.floor(r.rating) === star,
                          ).length;
                          const percentage =
                            (count / product.reviews.length) * 100;

                          return (
                            <div
                              key={star}
                              className="flex items-center text-sm"
                            >
                              <span className="w-12">{star} stars</span>
                              <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-yellow-400"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="w-8 text-right text-muted-foreground">
                                {count}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Review list */}
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6">
                        <div className="flex items-start">
                          <img
                            src={review.avatar}
                            alt={review.user}
                            className="w-10 h-10 rounded-full mr-4"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{review.user}</h4>
                              <span className="text-sm text-muted-foreground">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex mt-1 mb-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <p className="text-muted-foreground">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Shipping tab */}
              <TabsContent value="shipping" className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Shipping Information
                    </h3>
                    <p className="text-muted-foreground">
                      We offer nationwide shipping across Egypt with the
                      following options:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                      <li>
                        Standard Shipping (3-5 business days): 50-100 EGP
                        depending on location
                      </li>
                      <li>
                        Express Shipping (1-2 business days): 150-200 EGP
                        depending on location
                      </li>
                      <li>Free shipping on orders over 5000 EGP</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Return Policy</h3>
                    <p className="text-muted-foreground">
                      We want you to be completely satisfied with your purchase.
                      If you're not happy with your order, you can return it
                      within 14 days of delivery.
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                      <li>Items must be unused and in original packaging</li>
                      <li>
                        Return shipping costs are the responsibility of the
                        customer unless the item is defective
                      </li>
                      <li>
                        Refunds will be processed within 7 business days of
                        receiving the returned item
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Installation Services
                    </h3>
                    <p className="text-muted-foreground">
                      For flooring, lighting, and certain other products, we
                      offer professional installation services:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                      <li>
                        Installation fees vary based on product type and project
                        size
                      </li>
                      <li>
                        Available in Cairo, Alexandria, and other major cities
                      </li>
                      <li>Contact our customer service for a detailed quote</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  id={relatedProduct.id}
                  name={relatedProduct.name}
                  price={relatedProduct.price}
                  image={relatedProduct.image}
                  rating={relatedProduct.rating}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
