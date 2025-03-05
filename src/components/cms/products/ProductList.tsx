import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Copy,
  Tag,
} from "lucide-react";

// Mock product data
const mockProducts = [
  {
    id: "prod1",
    name: "Luxury Marble Flooring Tile",
    category: "Flooring",
    subcategory: "Marble",
    price: 1299.99,
    stock: 156,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&q=80",
  },
  {
    id: "prod2",
    name: "Premium Wall Paint - Desert Sand",
    category: "Wall Products",
    subcategory: "Paint",
    price: 349.99,
    stock: 85,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1562184552-997c461abbe6?w=300&q=80",
  },
  {
    id: "prod3",
    name: "Modern Pendant Light Fixture",
    category: "Lighting",
    subcategory: "Pendant",
    price: 899.99,
    stock: 42,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=300&q=80",
  },
  {
    id: "prod4",
    name: "Handcrafted Ceramic Vase",
    category: "Decor",
    subcategory: "Vases",
    price: 499.99,
    stock: 28,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?w=300&q=80",
  },
  {
    id: "prod5",
    name: "Engineered Hardwood Flooring",
    category: "Flooring",
    subcategory: "Wood",
    price: 1599.99,
    stock: 65,
    status: "Low Stock",
    image:
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=300&q=80",
  },
  {
    id: "prod6",
    name: "Minimalist Wall Sconce",
    category: "Lighting",
    subcategory: "Wall Lights",
    price: 459.99,
    stock: 0,
    status: "Out of Stock",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&q=80",
  },
];

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter products based on search term and filters
  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" ||
      product.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesStatus =
      statusFilter === "all" ||
      product.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Format price
  const formatPrice = (price: number) => {
    return price.toLocaleString("ar-EG", {
      style: "currency",
      currency: "EGP",
    });
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "low stock":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "out of stock":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "draft":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
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

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="flooring">Flooring</SelectItem>
              <SelectItem value="wall products">Wall Products</SelectItem>
              <SelectItem value="lighting">Lighting</SelectItem>
              <SelectItem value="decor">Decor</SelectItem>
              <SelectItem value="furniture">Furniture</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="low stock">Low Stock</SelectItem>
              <SelectItem value="out of stock">Out of Stock</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full sm:w-auto" asChild>
          <Link to="/cms/products/new">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Link>
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded overflow-hidden bg-muted">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {product.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>{product.category}</div>
                    <div className="text-sm text-muted-foreground">
                      {product.subcategory}
                    </div>
                  </TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(product.status)}
                    >
                      {product.status}
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
                        <DropdownMenuItem asChild>
                          <Link to={`/cms/products/${product.id}`}>
                            <Eye className="mr-2 h-4 w-4" /> View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/cms/products/${product.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/cms/products/${product.id}/duplicate`}>
                            <Copy className="mr-2 h-4 w-4" /> Duplicate
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/cms/products/${product.id}/pricing`}>
                            <Tag className="mr-2 h-4 w-4" /> Pricing
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductList;
