import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
} from "lucide-react";

// Mock product data
const mockProducts = {
  prod1: {
    id: "prod1",
    name: "Luxury Marble Flooring Tile",
    sku: "MRBL-FLR-001",
    category: "Flooring",
    subcategory: "Marble",
    price: 1299.99,
    compareAtPrice: 1499.99,
    costPrice: 899.99,
    stock: 156,
    status: "Active",
    featured: true,
    weight: 5.2,
    dimensions: {
      length: 60,
      width: 60,
      height: 1,
    },
    description:
      "Elevate your space with our premium marble flooring tiles. These luxurious tiles feature natural veining patterns that make each piece unique. Perfect for entryways, bathrooms, and kitchens, these tiles add a touch of elegance to any room.",
    shortDescription: "Premium marble flooring with natural veining patterns.",
    metaTitle: "Luxury Marble Flooring Tile | Premium Quality | DecorEgypt",
    metaDescription:
      "Transform your space with our premium marble flooring tiles featuring natural veining patterns. Perfect for entryways, bathrooms, and kitchens.",
    metaKeywords: "marble, flooring, tiles, luxury, home decor, premium",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80",
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80",
    ],
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-08-20T14:45:00Z",
    salesCount: 48,
    viewCount: 1250,
  },
  prod2: {
    id: "prod2",
    name: "Premium Wall Paint - Desert Sand",
    sku: "PNT-WLL-002",
    category: "Wall Products",
    subcategory: "Paint",
    price: 349.99,
    compareAtPrice: null,
    costPrice: 199.99,
    stock: 85,
    status: "Active",
    featured: false,
    weight: 4.0,
    dimensions: {
      length: 20,
      width: 20,
      height: 25,
    },
    description:
      "Transform your walls with our premium Desert Sand paint. This high-quality, low-VOC formula provides excellent coverage and a smooth, long-lasting finish. The warm, neutral tone creates a cozy and inviting atmosphere in any room.",
    shortDescription: "Premium low-VOC wall paint in a warm Desert Sand tone.",
    metaTitle: "Premium Wall Paint - Desert Sand | Low VOC | DecorEgypt",
    metaDescription:
      "Transform your walls with our premium Desert Sand paint. Low-VOC formula with excellent coverage and a smooth, long-lasting finish.",
    metaKeywords: "wall paint, interior paint, desert sand, low voc, premium",
    image:
      "https://images.unsplash.com/photo-1562184552-997c461abbe6?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1562184552-997c461abbe6?w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80",
    ],
    createdAt: "2023-06-10T09:15:00Z",
    updatedAt: "2023-08-15T11:30:00Z",
    salesCount: 32,
    viewCount: 980,
  },
};

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
  const { id } = useParams();
  const product = mockProducts[id] || null;

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
        <h2 className="text-2xl font-bold tracking-tight">{product.name}</h2>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/cms/products">Back</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to={`/cms/products/${product.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Link>
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
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
                <div className="border rounded-md overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto"
                  />
                </div>

                {product.gallery && product.gallery.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {product.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="border rounded-md overflow-hidden"
                      >
                        <img
                          src={image}
                          alt={`${product.name} - Gallery ${index + 1}`}
                          className="w-full h-24 object-cover"
                        />
                      </div>
                    ))}
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
              {product.shortDescription && (
                <div className="mb-4 font-medium">
                  {product.shortDescription}
                </div>
              )}
              <div className="whitespace-pre-line">{product.description}</div>
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
                  <div className="text-2xl font-bold">
                    {product.salesCount} units
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-md">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Eye className="h-4 w-4" />
                    <span>Total Views</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {product.viewCount.toLocaleString()}
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
                  className={getStatusColor(product.status)}
                >
                  {product.status}
                </Badge>
                {product.featured && (
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
                <div>{product.sku}</div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Category
                </div>
                <div>
                  {product.category} / {product.subcategory}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Created / Updated
                </div>
                <div className="text-sm">
                  <div>
                    Created: {new Date(product.createdAt).toLocaleString()}
                  </div>
                  <div>
                    Updated: {new Date(product.updatedAt).toLocaleString()}
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

              {product.compareAtPrice && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Compare At Price
                  </div>
                  <div className="text-muted-foreground line-through">
                    {formatPrice(product.compareAtPrice)}
                  </div>
                </div>
              )}

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Cost Price
                </div>
                <div>{formatPrice(product.costPrice)}</div>
              </div>

              {product.compareAtPrice && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Profit Margin
                  </div>
                  <div>
                    {(
                      ((product.price - product.costPrice) / product.price) *
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
                  <span>{product.stock} units available</span>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Weight
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  <span>{product.weight} kg</span>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Dimensions
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {product.dimensions.length} × {product.dimensions.width} ×{" "}
                    {product.dimensions.height} cm
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
                <Link to={`/cms/products/${product.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Product
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link to={`/cms/products/${product.id}/duplicate`}>
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
