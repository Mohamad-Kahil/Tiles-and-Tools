import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: string;
  stock: number;
  image: string;
}

interface ProductSelectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductsSelected: (products: Product[]) => void;
  selectedProductIds?: string[];
}

const ProductSelectorDialog: React.FC<ProductSelectorDialogProps> = ({
  open,
  onOpenChange,
  onProductsSelected,
  selectedProductIds = [],
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedProducts, setSelectedProducts] =
    useState<string[]>(selectedProductIds);

  // Mock products data
  const products: Product[] = [
    {
      id: "prod-1",
      name: "Luxury Marble Flooring Tile",
      sku: "FLR-MRB-001",
      category: "Flooring",
      price: "EGP 1,299.99",
      stock: 124,
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=200&q=80",
    },
    {
      id: "prod-2",
      name: "Premium Ceramic Floor Tile",
      sku: "FLR-CRM-002",
      category: "Flooring",
      price: "EGP 899.99",
      stock: 87,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&q=80",
    },
    {
      id: "prod-3",
      name: "Engineered Hardwood Flooring",
      sku: "FLR-WD-003",
      category: "Flooring",
      price: "EGP 1,499.99",
      stock: 56,
      image:
        "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=200&q=80",
    },
    {
      id: "prod-4",
      name: "Porcelain Floor Tile",
      sku: "FLR-PRC-004",
      category: "Flooring",
      price: "EGP 999.99",
      stock: 102,
      image:
        "https://images.unsplash.com/photo-1600607688066-890987f18a86?w=200&q=80",
    },
    {
      id: "prod-5",
      name: "Natural Stone Flooring",
      sku: "FLR-STN-005",
      category: "Flooring",
      price: "EGP 1,799.99",
      stock: 43,
      image:
        "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=200&q=80",
    },
    {
      id: "prod-6",
      name: "Modern Pendant Light",
      sku: "LGT-PND-001",
      category: "Lighting",
      price: "EGP 799.99",
      stock: 65,
      image:
        "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=200&q=80",
    },
    {
      id: "prod-7",
      name: "Ceiling Chandelier",
      sku: "LGT-CHN-002",
      category: "Lighting",
      price: "EGP 2,499.99",
      stock: 28,
      image:
        "https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=200&q=80",
    },
    {
      id: "prod-8",
      name: "Wall Mounted Sconce",
      sku: "LGT-SCN-003",
      category: "Lighting",
      price: "EGP 599.99",
      stock: 92,
      image:
        "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=200&q=80",
    },
    {
      id: "prod-9",
      name: "Decorative Wallpaper",
      sku: "WLL-PPR-001",
      category: "Wall Products",
      price: "EGP 349.99",
      stock: 150,
      image:
        "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=200&q=80",
    },
    {
      id: "prod-10",
      name: "Textured Wall Panels",
      sku: "WLL-PNL-002",
      category: "Wall Products",
      price: "EGP 899.99",
      stock: 75,
      image:
        "https://images.unsplash.com/photo-1620641622320-21ed6f1503a4?w=200&q=80",
    },
    {
      id: "prod-11",
      name: "Luxury Sofa",
      sku: "FRN-SOF-001",
      category: "Furniture",
      price: "EGP 7,999.99",
      stock: 18,
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80",
    },
    {
      id: "prod-12",
      name: "Dining Table Set",
      sku: "FRN-TBL-002",
      category: "Furniture",
      price: "EGP 5,499.99",
      stock: 24,
      image:
        "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=200&q=80",
    },
    {
      id: "prod-13",
      name: "Bathroom Vanity",
      sku: "BTH-VNT-001",
      category: "Bathroom",
      price: "EGP 3,299.99",
      stock: 32,
      image:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&q=80",
    },
    {
      id: "prod-14",
      name: "Shower System",
      sku: "BTH-SHW-002",
      category: "Bathroom",
      price: "EGP 1,899.99",
      stock: 45,
      image:
        "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=200&q=80",
    },
    {
      id: "prod-15",
      name: "Decorative Vase",
      sku: "DCR-VAS-001",
      category: "Decor",
      price: "EGP 499.99",
      stock: 120,
      image:
        "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=200&q=80",
    },
  ];

  // Get unique categories
  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleProductSelect = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    }
  };

  const handleConfirm = () => {
    const selectedProductObjects = products.filter((p) =>
      selectedProducts.includes(p.id),
    );
    onProductsSelected(selectedProductObjects);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Products for Promotion</DialogTitle>
          <DialogDescription>
            Choose the products you want to apply this promotion to
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-4 my-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products by name or SKU..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="grid" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Checkbox
                id="select-all"
                checked={
                  selectedProducts.length === filteredProducts.length &&
                  filteredProducts.length > 0
                }
                onCheckedChange={handleSelectAll}
              />
              <label htmlFor="select-all" className="text-sm cursor-pointer">
                Select All ({selectedProducts.length}/{filteredProducts.length})
              </label>
            </div>
          </div>

          <ScrollArea className="h-[400px] mt-4 rounded-md border">
            <TabsContent value="grid" className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.length === 0 ? (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    No products found matching your criteria
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="border rounded-md p-3 flex gap-3 hover:bg-muted/50 cursor-pointer"
                      onClick={() => handleProductSelect(product.id)}
                    >
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        className="mt-1"
                        onCheckedChange={() => handleProductSelect(product.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium line-clamp-1">
                          {product.name}
                        </h4>
                        <div className="text-xs text-muted-foreground mb-1">
                          SKU: {product.sku}
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{product.category}</Badge>
                          <span className="font-medium">{product.price}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="list" className="p-0">
              <table className="w-full">
                <thead className="bg-muted/50 sticky top-0">
                  <tr>
                    <th className="w-10 p-3 text-left">
                      <Checkbox
                        checked={
                          selectedProducts.length === filteredProducts.length &&
                          filteredProducts.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="p-3 text-left">Product</th>
                    <th className="p-3 text-left">SKU</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-8 text-muted-foreground"
                      >
                        No products found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b hover:bg-muted/50 cursor-pointer"
                        onClick={() => handleProductSelect(product.id)}
                      >
                        <td className="p-3">
                          <Checkbox
                            checked={selectedProducts.includes(product.id)}
                            onCheckedChange={() =>
                              handleProductSelect(product.id)
                            }
                            onClick={(e) => e.stopPropagation()}
                          />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </td>
                        <td className="p-3 font-mono text-xs">{product.sku}</td>
                        <td className="p-3">
                          <Badge variant="outline">{product.category}</Badge>
                        </td>
                        <td className="p-3 font-medium">{product.price}</td>
                        <td className="p-3">{product.stock} units</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <DialogFooter className="mt-4">
          <div className="flex items-center justify-between w-full">
            <div className="text-sm text-muted-foreground">
              {selectedProducts.length} products selected
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={selectedProducts.length === 0}
              >
                Apply to Selected Products
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductSelectorDialog;
