import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  Filter,
  Download,
  Upload,
  MoreVertical,
  Edit,
  Trash,
  AlertTriangle,
  CheckCircle,
  Package,
  BarChart2,
  TrendingUp,
  TrendingDown,
  RefreshCw,
} from "lucide-react";

const InventoryDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  // Mock inventory data
  const inventoryItems = [
    {
      id: "SKU-001",
      name: "Luxury Marble Flooring Tile",
      category: "Flooring",
      stock: 124,
      reserved: 12,
      available: 112,
      reorderPoint: 50,
      status: "In Stock",
    },
    {
      id: "SKU-002",
      name: "Premium Ceramic Floor Tile",
      category: "Flooring",
      stock: 87,
      reserved: 15,
      available: 72,
      reorderPoint: 40,
      status: "In Stock",
    },
    {
      id: "SKU-003",
      name: "Engineered Hardwood Flooring",
      category: "Flooring",
      stock: 56,
      reserved: 8,
      available: 48,
      reorderPoint: 30,
      status: "In Stock",
    },
    {
      id: "SKU-004",
      name: "Porcelain Floor Tile",
      category: "Flooring",
      stock: 32,
      reserved: 10,
      available: 22,
      reorderPoint: 40,
      status: "Low Stock",
    },
    {
      id: "SKU-005",
      name: "Natural Stone Flooring",
      category: "Flooring",
      stock: 18,
      reserved: 5,
      available: 13,
      reorderPoint: 25,
      status: "Low Stock",
    },
    {
      id: "SKU-006",
      name: "Modern Pendant Light",
      category: "Lighting",
      stock: 65,
      reserved: 7,
      available: 58,
      reorderPoint: 30,
      status: "In Stock",
    },
    {
      id: "SKU-007",
      name: "Ceiling Chandelier",
      category: "Lighting",
      stock: 28,
      reserved: 6,
      available: 22,
      reorderPoint: 15,
      status: "In Stock",
    },
    {
      id: "SKU-008",
      name: "Wall Mounted Sconce",
      category: "Lighting",
      stock: 0,
      reserved: 0,
      available: 0,
      reorderPoint: 20,
      status: "Out of Stock",
    },
    {
      id: "SKU-009",
      name: "Decorative Wallpaper",
      category: "Wall Products",
      stock: 150,
      reserved: 25,
      available: 125,
      reorderPoint: 50,
      status: "In Stock",
    },
    {
      id: "SKU-010",
      name: "Textured Wall Panels",
      category: "Wall Products",
      stock: 5,
      reserved: 3,
      available: 2,
      reorderPoint: 20,
      status: "Low Stock",
    },
  ];

  // Filter inventory items based on search term, category, and stock status
  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;

    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "in_stock" && item.status === "In Stock") ||
      (stockFilter === "low_stock" && item.status === "Low Stock") ||
      (stockFilter === "out_of_stock" && item.status === "Out of Stock");

    return matchesSearch && matchesCategory && matchesStock;
  });

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Inventory Management
        </h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" /> Import
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Products
                </p>
                <h3 className="text-2xl font-bold mt-1">248</h3>
                <div className="flex items-center mt-1 text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-xs">+12 this month</span>
                </div>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <Package className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Low Stock Items
                </p>
                <h3 className="text-2xl font-bold mt-1">24</h3>
                <div className="flex items-center mt-1 text-yellow-600">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  <span className="text-xs">Needs attention</span>
                </div>
              </div>
              <div className="bg-yellow-100 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Out of Stock
                </p>
                <h3 className="text-2xl font-bold mt-1">8</h3>
                <div className="flex items-center mt-1 text-red-600">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  <span className="text-xs">-3 from last week</span>
                </div>
              </div>
              <div className="bg-red-100 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Inventory Value
                </p>
                <h3 className="text-2xl font-bold mt-1">EGP 1.2M</h3>
                <div className="flex items-center mt-1 text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-xs">+5.4% this month</span>
                </div>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <BarChart2 className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search inventory..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Flooring">Flooring</SelectItem>
              <SelectItem value="Lighting">Lighting</SelectItem>
              <SelectItem value="Wall Products">Wall Products</SelectItem>
            </SelectContent>
          </Select>

          <Select value={stockFilter} onValueChange={setStockFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Stock Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stock Status</SelectItem>
              <SelectItem value="in_stock">In Stock</SelectItem>
              <SelectItem value="low_stock">Low Stock</SelectItem>
              <SelectItem value="out_of_stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" /> Update Stock
          </Button>
          <Button variant="outline">
            <AlertTriangle className="mr-2 h-4 w-4" /> Reorder Items
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">In Stock</TableHead>
                <TableHead className="text-right">Reserved</TableHead>
                <TableHead className="text-right">Available</TableHead>
                <TableHead className="text-right">Reorder Point</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center py-4 text-muted-foreground"
                  >
                    No inventory items found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-xs">
                      {item.id}
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">{item.stock}</TableCell>
                    <TableCell className="text-right">
                      {item.reserved}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.available}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.reorderPoint}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusBadgeColor(item.status)}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCw className="mr-2 h-4 w-4" /> Update Stock
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between p-4 border rounded-md bg-muted/20">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <div>
            <h4 className="font-medium">Inventory Sync Status</h4>
            <p className="text-sm text-muted-foreground">
              Last synchronized 15 minutes ago
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" /> Sync Now
        </Button>
      </div>
    </div>
  );
};

export default InventoryDashboard;
