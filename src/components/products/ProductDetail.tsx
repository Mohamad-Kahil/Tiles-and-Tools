import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Check,
  ArrowLeft,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { fetchProductBySlug } = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);

  React.useEffect(() => {
    const loadProduct = async () => {
      if (!slug) return;

      setLoading(true);
      try {
        const productData = await fetchProductBySlug(slug);
        if (!productData) {
          setError("Product not found");
          return;
        }
        setProduct(productData);
        // Set the primary image as selected or the first image
        const primaryImage = productData.images.find(
          (img: any) => img.is_primary,
        );
        setSelectedImage(
          primaryImage?.image_url || productData.images[0]?.image_url,
        );
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug, fetchProductBySlug]);

  const handleAddToCart = async () => {
    if (!product) return;

    setAddingToCart(true);
    try {
      const success = await addToCart(product.id, quantity);
      if (success) {
        toast({
          title: "Added to cart",
          description: `${quantity} × ${product.name} added to your cart`,
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add product to cart",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        variant: "destructive",
      });
    } finally {
      setAddingToCart(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!product) return;

    setAddingToWishlist(true);
    try {
      const success = await addToWishlist(product.id);
      if (success) {
        toast({
          title: "Added to wishlist",
          description: `${product.name} added to your wishlist`,
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add product to wishlist",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    } finally {
      setAddingToWishlist(false);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (product && quantity < product.stock_quantity) {
      setQuantity(quantity + 1);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="h-96 w-full rounded-md" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-20 rounded-md" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4 rounded-md" />
            <Skeleton className="h-6 w-1/4 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-3/4 rounded-md" />
            <div className="pt-4">
              <Skeleton className="h-12 w-full rounded-md" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500 mb-4">{error || "Product not found"}</p>
        <Button onClick={() => navigate(-1)} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  const isProductInWishlist = isInWishlist(product.id);
  const isOutOfStock = product.stock_quantity <= 0;
  const formattedPrice = new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
  }).format(product.price);

  const formattedSalePrice = product.sale_price
    ? new Intl.NumberFormat("en-EG", {
        style: "currency",
        currency: "EGP",
      }).format(product.sale_price)
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-md border bg-muted">
            {selectedImage && (
              <img
                src={selectedImage}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div className="flex gap-2 overflow-auto pb-2">
            {product.images.map((image: any) => (
              <div
                key={image.id}
                className={`cursor-pointer h-20 w-20 rounded-md border overflow-hidden ${selectedImage === image.image_url ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelectedImage(image.image_url)}
              >
                <img
                  src={image.image_url}
                  alt={image.alt_text || product.name}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-2">
            {product.sale_price ? (
              <>
                <span className="text-2xl font-bold">{formattedSalePrice}</span>
                <span className="text-lg text-muted-foreground line-through">
                  {formattedPrice}
                </span>
                <Badge className="ml-2 bg-red-500">
                  {Math.round(
                    ((product.price - product.sale_price) / product.price) *
                      100,
                  )}
                  % OFF
                </Badge>
              </>
            ) : (
              <span className="text-2xl font-bold">{formattedPrice}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={
                isOutOfStock
                  ? "text-red-500 border-red-500"
                  : "text-green-500 border-green-500"
              }
            >
              {isOutOfStock ? "Out of Stock" : "In Stock"}
            </Badge>
            {product.sku && (
              <span className="text-sm text-muted-foreground">
                SKU: {product.sku}
              </span>
            )}
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          {/* Product Attributes */}
          {product.attributes && product.attributes.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Specifications</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.attributes.map((attr: any) => (
                  <div key={attr.id} className="flex gap-2">
                    <span className="font-medium">{attr.attribute.name}:</span>
                    <span>{attr.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator className="my-4" />

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1 || isOutOfStock}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={increaseQuantity}
                disabled={isOutOfStock || quantity >= product.stock_quantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart & Wishlist Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              className="flex-1"
              size="lg"
              onClick={handleAddToCart}
              disabled={isOutOfStock || addingToCart}
            >
              {addingToCart ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Adding...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </span>
              )}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleAddToWishlist}
              disabled={addingToWishlist}
              className={isProductInWishlist ? "bg-primary/10" : ""}
            >
              {addingToWishlist ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Adding...
                </span>
              ) : isProductInWishlist ? (
                <span className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  In Wishlist
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Add to Wishlist
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-4">
            <div className="prose max-w-none">
              <p>{product.description}</p>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="py-4">
            {product.attributes && product.attributes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.attributes.map((attr: any) => (
                  <div key={attr.id} className="flex gap-2 border-b pb-2">
                    <span className="font-medium min-w-32">
                      {attr.attribute.name}:
                    </span>
                    <span>{attr.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                No specifications available for this product.
              </p>
            )}
          </TabsContent>
          <TabsContent value="shipping" className="py-4">
            <div className="prose max-w-none">
              <h3>Shipping Information</h3>
              <p>
                We offer standard shipping across Egypt. Delivery times vary by
                location:
              </p>
              <ul>
                <li>Cairo and Alexandria: 1-3 business days</li>
                <li>Other major cities: 3-5 business days</li>
                <li>Remote areas: 5-7 business days</li>
              </ul>

              <h3 className="mt-4">Return Policy</h3>
              <p>
                If you're not completely satisfied with your purchase, you can
                return it within 14 days of delivery. Please ensure the product
                is in its original condition with all packaging and tags intact.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;
