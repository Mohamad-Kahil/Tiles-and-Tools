import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowUpDown,
  Search,
  TrendingUp,
  TrendingDown,
  Eye,
} from "lucide-react";

interface AnimatedProductPerformanceProps {
  className?: string;
}

const AnimatedProductPerformance: React.FC<AnimatedProductPerformanceProps> = ({
  className = "",
}) => {
  // Mock data for top products
  const topProducts = [
    {
      id: "prod1",
      name: "Luxury Marble Flooring Tile",
      category: "Flooring",
      price: 1299.99,
      sales: 42,
      revenue: 54599.58,
      trend: "up",
      stock: 156,
    },
    {
      id: "prod2",
      name: "Premium Wall Paint - Desert Sand",
      category: "Wall Products",
      price: 349.99,
      sales: 78,
      revenue: 27299.22,
      trend: "up",
      stock: 85,
    },
    {
      id: "prod3",
      name: "Modern Pendant Light Fixture",
      category: "Lighting",
      price: 899.99,
      sales: 36,
      revenue: 32399.64,
      trend: "down",
      stock: 28,
    },
    {
      id: "prod4",
      name: "Handcrafted Ceramic Vase",
      category: "Decor",
      price: 499.99,
      sales: 54,
      revenue: 26999.46,
      trend: "up",
      stock: 42,
    },
    {
      id: "prod5",
      name: "Decorative Wall Panel",
      category: "Wall Products",
      price: 799.99,
      sales: 29,
      revenue: 23199.71,
      trend: "down",
      stock: 15,
    },
  ];

  // Animation states
  const [visibleRows, setVisibleRows] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Format price
  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "EGP",
    });
  };

  // Get stock status badge
  const getStockStatusBadge = (stock: number) => {
    if (stock <= 20) {
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800">
          Low Stock
        </Badge>
      );
    } else if (stock <= 50) {
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
          Medium
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800">
          In Stock
        </Badge>
      );
    }
  };

  // Animate rows appearing one by one
  useEffect(() => {
    setVisibleRows([]);
    const animateRows = async () => {
      for (let i = 0; i < topProducts.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setVisibleRows((prev) => [...prev, i]);
      }
    };
    animateRows();
  }, []);

  // Filter products based on search term
  const filteredProducts = topProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <CardTitle>Product Performance</CardTitle>
            <CardDescription>View your top performing products</CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Sales</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product, index) => (
                <TableRow
                  key={product.id}
                  style={{
                    transition: "all 500ms",
                    opacity: visibleRows.includes(index) ? 1 : 0,
                    transform: visibleRows.includes(index)
                      ? "translateY(0)"
                      : "translateY(16px)",
                  }}
                >
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {product.sales}
                      {product.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatPrice(product.revenue)}
                  </TableCell>
                  <TableCell>{getStockStatusBadge(product.stock)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AnimatedProductPerformance;
