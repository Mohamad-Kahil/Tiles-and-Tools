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
  Filter,
  Download,
  Upload,
  MoreVertical,
  Edit,
  Trash,
  Eye,
  Copy,
  Tag,
  Star,
  StarOff,
  Plus,
  ImagePlus,
  Layers,
  ArrowUpDown,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Mock products data
  const products = [
    {
      id: "PRD001",
      name: "Luxury Marble Flooring Tile",
      sku: "FLR-MRB-001",
      category: "Flooring",
      price: 1200,
      status: "Active",
      featured: true,
      stock: 124,
      images: 4,
      variants: 3,
      rating: 4.8,
      sales: 256,
    },
    {
      id: "PRD002",
      name: "Premium Ceramic Floor Tile",
      sku: "FLR-CRM-002",
      category: "Flooring",
      price: 850,
      status: "Active",
      featured: false,
      stock: 87,
      images: 3,
      variants: 5,
      rating: 4.5,
      sales: 189,
    },
    {
      id: "PRD003",
      name: "Engineered Hardwood Flooring",
      sku: "FLR-WD-003",
      category: "Flooring",
      price: 1500,
      status: "Active",
      featured: true,
      stock: 56,
      images: 5,
      variants: 4,
      rating: 4.7,
      sales: 142,
    },
    {
      id: "PRD004",
      name: "Porcelain Floor Tile",
      sku: "FLR-PRC-004",
      category: "Flooring",
      price: 950,
      status: "Active",
      featured: false,
      stock: 32,
      images: 3,
      variants: 2,
      rating: 4.3,
      sales: 98,
    },
    {
      id: "PRD005",
      name: "Natural Stone Flooring",
      sku: "FLR-STN-005",
      category: "Flooring",
      price: 1800,
      status: "Active",
      featured: false,
      stock: 18,
      images: 6,
      variants: 3,
      rating: 4.9,
      sales: 76,
    },
    {
      id: "PRD006",
      name: "Modern Pendant Light",
      sku: "LGT-PND-001",
      category: "Lighting",
      price: 750,
      status: "Active",
      featured: true,
      stock: 65,
      images: 4,
      variants: 2,
      rating: 4.6,
      sales: 210,
    },
    {
      id: "PRD007",
      name: "Ceiling Chandelier",
      sku: "LGT-CHN-002",
      category: "Lighting",
      price: 2500,
      status: "Active",
      featured: true,
      stock: 28,
      images: 5,
      variants: 1,
      rating: 4.8,
      sales: 87,
    },
    {
      id: "PRD008",
      name: "Wall Mounted Sconce",
      sku: "LGT-SCN-003",
      category: "Lighting",
      price: 450,
      status: "Draft",
      featured: false,
      stock: 0,
      images: 2,
      variants: 3,
      rating: 0,
      sales: 0,
    },
    {
      id: "PRD009",
      name: "Decorative Wallpaper",
      sku: "WLL-PPR-001",
      category: "Wall Products",
      price: 350,
      status: "Active",
      featured: false,
      stock: 150,
      images: 8,
      variants: 12,
      rating: 4.4,
      sales: 320,
    },
    {
      id: "PRD010",
      name: "Textured Wall Panels",
      sku: "WLL-PNL-002",
      category: "Wall Products",
      price: 1200,
      status: "Active",
      featured: true,
      stock: 45,
      images: 6,
      variants: 4,
      rating: 4.7,
      sales: 156,
    },
    {
      id: "PRD011",
      name: "Decorative Wall Paint",
      sku: "WLL-PNT-003",
      category: "Wall Products",
      price: 280,
      status: "Active",
      featured: false,
      stock: 200,
      images: 4,
      variants: 20,
      rating: 4.5,
      sales: 430,
    },
    {
      id: "PRD012",
      name: "Luxury Sofa Set",
      sku: "FRN-SOF-001",
      category: "Furniture",
      price: 12000,
      status: "Active",
      featured: true,
      stock: 8,
      images: 10,
      variants: 5,
      rating: 4.9,
      sales: 42,
    },
    {
      id: "PRD013",
      name: "Dining Table Set",
      sku: "FRN-TBL-002",
      category: "Furniture",
      price: 8500,
      status: "Active",
      featured: false,
      stock: 12,
      images: 8,
      variants: 3,
      rating: 4.7,
      sales: 56,
    },
    {
      id: "PRD014",
      name: "Bedroom Wardrobe",
      sku: "FRN-WRD-003",
      category: "Furniture",
      price: 9500,
      status: "Draft",
      featured: false,
      stock: 0,
      images: 6,
      variants: 4,
      rating: 0,
      sales: 0,
    },
    {
      id: "PRD015",
      name: "Bathroom Vanity",
      sku: "BTH-VNT-001",
      category: "Bathroom",
      price: 4500,
      status: "Active",
      featured: false,
      stock: 18,
      images: 5,
      variants: 3,
      rating: 4.6,
      sales: 78,
    },
  ];

  // Filter products based on search term, category, and status
  const filteredProducts = products
    .filter((product) => {
      // Filter by tab
      if (activeTab === "featured" && !product.featured) return false;
      if (activeTab === "draft" && product.status !== "Draft") return false;

      // Filter by search term
      const matchesSearch =
        searchTerm === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by category
      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;

      // Filter by status
      const matchesStatus =
        statusFilter === "all" || product.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      // Sort by selected field
      let comparison = 0;
      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "price":
          comparison = a.price - b.price;
          break;
        case "stock":
          comparison = a.stock - b.stock;
          break;
        case "sales":
          comparison = a.sales - b.sales;
          break;
        case "rating":
          comparison = a.rating - b.rating;
          break;
        default:
          comparison = 0;
      }

      // Apply sort direction
      return sortDirection === "asc" ? comparison : -comparison;
    });

  // Handle select all checkbox
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map((product) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  // Handle individual product selection
  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  // Handle sort change
  const handleSort = (field: string) => {
    if (field === sortField) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      case "Archived":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Product Catalog</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => alert("Import products functionality")}
          >
            <Upload className="mr-2 h-4 w-4" /> Import
          </Button>
          <Button
            variant="outline"
            onClick={() => alert("Export products functionality")}
          >
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button
            onClick={() => {
              alert(
                "Add Product functionality will be implemented in the next phase",
              );
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="all" className="px-4 py-2">
            All Products
          </TabsTrigger>
          <TabsTrigger value="featured" className="px-4 py-2">
            Featured
          </TabsTrigger>
          <TabsTrigger value="draft" className="px-4 py-2">
            Drafts
          </TabsTrigger>
        </TabsList>
      </Tabs>

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
              <SelectItem value="Flooring">Flooring</SelectItem>
              <SelectItem value="Lighting">Lighting</SelectItem>
              <SelectItem value="Wall Products">Wall Products</SelectItem>
              <SelectItem value="Furniture">Furniture</SelectItem>
              <SelectItem value="Bathroom">Bathroom</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {selectedProducts.length > 0 && (
          <div className="flex gap-2 items-center">
            <span className="text-sm text-muted-foreground">
              {selectedProducts.length} selected
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert("Bulk edit selected products")}
            >
              <Tag className="mr-2 h-4 w-4" /> Bulk Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600"
              onClick={() => alert("Delete selected products")}
            >
              <Trash className="mr-2 h-4 w-4" /> Delete
            </Button>
          </div>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={
                      filteredProducts.length > 0 &&
                      selectedProducts.length === filteredProducts.length
                    }
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Product
                    {sortField === "name" && (
                      <ArrowUpDown
                        className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`}
                      />
                    )}
                  </div>
                </TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => handleSort("price")}
                >
                  <div className="flex items-center justify-end">
                    Price
                    {sortField === "price" && (
                      <ArrowUpDown
                        className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`}
                      />
                    )}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => handleSort("stock")}
                >
                  <div className="flex items-center justify-end">
                    Stock
                    {sortField === "stock" && (
                      <ArrowUpDown
                        className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`}
                      />
                    )}
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => handleSort("sales")}
                >
                  <div className="flex items-center justify-end">
                    Sales
                    {sortField === "sales" && (
                      <ArrowUpDown
                        className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`}
                      />
                    )}
                  </div>
                </TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center py-4 text-muted-foreground"
                  >
                    No products found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={(checked) =>
                          handleSelectProduct(product.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md overflow-hidden bg-muted">
                          <img
                            src={`https://images.unsplash.com/photo-1600607686527-6fb886090705?w=200&q=80&random=${product.id}`}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <ImagePlus className="h-3 w-3 mr-1" />
                              {product.images}
                            </div>
                            <span className="mx-1">•</span>
                            <div className="flex items-center">
                              <Layers className="h-3 w-3 mr-1" />
                              {product.variants}
                            </div>
                            {product.featured && (
                              <>
                                <span className="mx-1">•</span>
                                <div className="flex items-center text-yellow-500">
                                  <Star className="h-3 w-3 mr-1 fill-yellow-500" />
                                  Featured
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {product.sku}
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">
                      EGP {product.price.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {product.stock}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusBadgeColor(product.status)}
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {product.sales.toLocaleString()}
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
                          <DropdownMenuItem
                            onClick={() => alert("View product details")}
                          >
                            <Eye className="mr-2 h-4 w-4" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => alert("Edit product details")}
                          >
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => alert("Duplicate product")}
                          >
                            <Copy className="mr-2 h-4 w-4" /> Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              alert(
                                product.featured
                                  ? "Product removed from featured"
                                  : "Product marked as featured",
                              )
                            }
                          >
                            {product.featured ? (
                              <>
                                <StarOff className="mr-2 h-4 w-4" /> Remove
                                Featured
                              </>
                            ) : (
                              <>
                                <Star className="mr-2 h-4 w-4" /> Mark as
                                Featured
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => alert("Delete product")}
                          >
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

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredProducts.length} of {products.length} products
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => alert("Next page")}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
