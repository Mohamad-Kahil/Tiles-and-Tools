import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Edit,
  Trash2,
  Package,
  Tag,
  ShoppingCart,
  Truck,
  Copy,
  ArrowUpDown,
  Eye,
  ArrowLeft,
} from "lucide-react";

// Get status badge color
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "draft":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    case "archived":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    default:
      return "";
  }
};

// Format price
const formatPrice = (price: number | null) => {
  if (price === null) return "";
  return price.toLocaleString("ar-EG", {
    style: "currency",
    currency: "EGP",
  });
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [salesCount, setSalesCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*, category:categories(id, name), product_images(*)")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProduct(data);

        // Set mock analytics data
        setSalesCount(Math.floor(Math.random() * 100));
        setViewCount(Math.floor(Math.random() * 2000));
      } catch (error) {
        console.error("Error fetching product:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load product details.",
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, toast]);

  const handleDelete = async () => {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Product deleted",
        description: "The product has been successfully deleted.",
      });

      navigate("/cms/products");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete product.",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/cms/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link to="/cms/products">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">{product.name}</h2>
          <Badge
            variant="outline"
            className={`ml-2 ${product.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {product.is_active ? "Active" : "Inactive"}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to={`/cms/products/edit/${product.id}`}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to={`/cms/products/new?duplicate=${product.id}`}>
              <Copy className="mr-2 h-4 w-4" /> Duplicate
            </Link>
          </Button>
          <AlertDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Product</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this product? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Product Images */}
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {product.product_images && product.product_images.length > 0 ? (
                  <>
                    <div className="border rounded-md overflow-hidden">
                      <img
                        src={
                          product.product_images.find((img) => img.is_primary)
                            ?.url || product.product_images[0].url
                        }
                        alt={product.name}
                        className="w-full h-auto"
                      />
                    </div>

                    {product.product_images.length > 1 && (
                      <div className="grid grid-cols-4 gap-4">
                        {product.product_images.map((image, index) => (
                          <div
                            key={image.id}
                            className="border rounded-md overflow-hidden"
                          >
                            <img
                              src={image.url}
                              alt={`${product.name} - Gallery ${index + 1}`}
                              className="w-full h-24 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8 bg-muted rounded-md">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      No product images available
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Product Description */}
          <Card>
            <CardHeader>
              <CardTitle>Product Description</CardTitle>
            </CardHeader>
            <CardContent>
              {product.short_description && (
                <div className="mb-4 font-medium">
                  {product.short_description}
                </div>
              )}
              <div className="whitespace-pre-line">
                {product.description || "No description provided."}
              </div>
            </CardContent>
          </Card>

          {/* Product Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>
                Sales and viewing statistics for this product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-md">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <ShoppingCart className="h-4 w-4" />
                    <span>Total Sales</span>
                  </div>
                  <div className="text-2xl font-bold">{salesCount} units</div>
                </div>

                <div className="bg-muted/30 p-4 rounded-md">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Eye className="h-4 w-4" />
                    <span>Total Views</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {viewCount.toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Status
                </div>
                <Badge
                  variant="secondary"
                  className={getStatusColor(
                    product.is_active ? "active" : "inactive",
                  )}
                >
                  {product.is_active ? "Active" : "Inactive"}
                </Badge>
                {product.is_featured && (
                  <Badge
                    variant="outline"
                    className="ml-2 bg-yellow-100 text-yellow-800"
                  >
                    Featured
                  </Badge>
                )}
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  SKU
                </div>
                <div>{product.sku || "—"}</div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Category
                </div>
                <div>{product.category?.name || "Uncategorized"}</div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Created / Updated
                </div>
                <div className="text-sm">
                  <div>
                    Created: {new Date(product.created_at).toLocaleString()}
                  </div>
                  <div>
                    Updated: {new Date(product.updated_at).toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Selling Price
                </div>
                <div className="text-xl font-bold text-primary">
                  {formatPrice(product.price)}
                </div>
              </div>

              {product.compare_at_price && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Compare At Price
                  </div>
                  <div className="text-muted-foreground line-through">
                    {formatPrice(product.compare_at_price)}
                  </div>
                </div>
              )}

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Cost Price
                </div>
                <div>{formatPrice(product.cost_price || 0)}</div>
              </div>

              {product.cost_price && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Profit Margin
                  </div>
                  <div>
                    {(
                      ((product.price - product.cost_price) / product.price) *
                      100
                    ).toFixed(2)}
                    %
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Inventory & Shipping */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory & Shipping</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Stock
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span>{product.inventory_quantity || 0} units available</span>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Weight
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  <span>{product.weight || 0} kg</span>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Dimensions
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {product.dimensions?.length || "—"} ×{" "}
                    {product.dimensions?.width || "—"} ×{" "}
                    {product.dimensions?.height || "—"} cm
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link to={`/cms/products/edit/${product.id}`}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Product
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link to={`/cms/products/new?duplicate=${product.id}`}>
                  <Copy className="mr-2 h-4 w-4" /> Duplicate Product
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link to={`/cms/products/${product.id}/pricing`}>
                  <Tag className="mr-2 h-4 w-4" /> Manage Pricing
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete Product
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
