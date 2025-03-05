import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Package,
  Plus,
  Minus,
  Trash,
  Save,
  RefreshCw,
  Search,
  AlertTriangle,
} from "lucide-react";

const StockAdjustmentForm = () => {
  const [adjustmentType, setAdjustmentType] = useState("add");
  const [reason, setReason] = useState("restock");
  const [notes, setNotes] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  // Mock products data
  const products = [
    {
      id: "PRD001",
      name: "Luxury Marble Flooring Tile",
      sku: "FLR-MRB-001",
      category: "Flooring",
      currentStock: 124,
      location: "Warehouse A",
    },
    {
      id: "PRD002",
      name: "Premium Ceramic Floor Tile",
      sku: "FLR-CRM-002",
      category: "Flooring",
      currentStock: 87,
      location: "Warehouse A",
    },
    {
      id: "PRD003",
      name: "Engineered Hardwood Flooring",
      sku: "FLR-WD-003",
      category: "Flooring",
      currentStock: 12,
      location: "Warehouse B",
    },
    {
      id: "PRD004",
      name: "Modern Pendant Light",
      sku: "LGT-PND-001",
      category: "Lighting",
      currentStock: 45,
      location: "Warehouse C",
    },
    {
      id: "PRD005",
      name: "Ceiling Chandelier",
      sku: "LGT-CHN-002",
      category: "Lighting",
      currentStock: 8,
      location: "Warehouse C",
    },
  ];

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddProduct = (product: any) => {
    if (!selectedProducts.some((p) => p.id === product.id)) {
      setSelectedProducts([
        ...selectedProducts,
        { ...product, adjustmentQuantity: 1 },
      ]);
    }
    setSearchTerm("");
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId));
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelectedProducts(
      selectedProducts.map((p) =>
        p.id === productId ? { ...p, adjustmentQuantity: quantity } : p,
      ),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the adjustment to the backend
    console.log({
      adjustmentType,
      reason,
      notes,
      products: selectedProducts,
    });
    // Reset form or redirect
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Stock Adjustment</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Adjustment Details</CardTitle>
                <CardDescription>
                  Specify the type and reason for this stock adjustment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adjustmentType">Adjustment Type</Label>
                  <Select
                    value={adjustmentType}
                    onValueChange={setAdjustmentType}
                  >
                    <SelectTrigger id="adjustmentType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add">
                        <div className="flex items-center">
                          <Plus className="mr-2 h-4 w-4 text-green-500" />
                          <span>Add Stock</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="remove">
                        <div className="flex items-center">
                          <Minus className="mr-2 h-4 w-4 text-red-500" />
                          <span>Remove Stock</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Select value={reason} onValueChange={setReason}>
                    <SelectTrigger id="reason">
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {adjustmentType === "add" ? (
                        <>
                          <SelectItem value="restock">Restock</SelectItem>
                          <SelectItem value="return">
                            Customer Return
                          </SelectItem>
                          <SelectItem value="correction">
                            Inventory Correction
                          </SelectItem>
                          <SelectItem value="found">Found Items</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="damaged">Damaged</SelectItem>
                          <SelectItem value="lost">Lost/Stolen</SelectItem>
                          <SelectItem value="correction">
                            Inventory Correction
                          </SelectItem>
                          <SelectItem value="expired">Expired</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any additional notes here"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
                <CardDescription>
                  Review your stock adjustment details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Adjustment Type:
                    </span>
                    <span className="font-medium">
                      {adjustmentType === "add" ? "Add Stock" : "Remove Stock"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Reason:
                    </span>
                    <span className="font-medium">
                      {reason.charAt(0).toUpperCase() + reason.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Products:
                    </span>
                    <span className="font-medium">
                      {selectedProducts.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Total Items:
                    </span>
                    <span className="font-medium">
                      {selectedProducts.reduce(
                        (sum, product) => sum + product.adjustmentQuantity,
                        0,
                      )}
                    </span>
                  </div>
                </div>

                {selectedProducts.length === 0 && (
                  <div className="flex items-center justify-center p-4 border rounded-md bg-yellow-50">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                    <span className="text-sm text-yellow-600">
                      No products selected
                    </span>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={selectedProducts.length === 0}
                >
                  <Save className="mr-2 h-4 w-4" /> Save Adjustment
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Products</CardTitle>
                <CardDescription>
                  Search and add products to adjust stock levels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products by name or SKU"
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {searchTerm && (
                  <div className="border rounded-md max-h-[200px] overflow-y-auto">
                    {filteredProducts.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground">
                        No products found matching your search
                      </div>
                    ) : (
                      <Table>
                        <TableBody>
                          {filteredProducts.map((product) => (
                            <TableRow
                              key={product.id}
                              className="cursor-pointer hover:bg-muted/50"
                              onClick={() => handleAddProduct(product)}
                            >
                              <TableCell className="font-medium">
                                {product.name}
                              </TableCell>
                              <TableCell className="font-mono text-xs">
                                {product.sku}
                              </TableCell>
                              <TableCell>{product.category}</TableCell>
                              <TableCell>
                                Current Stock: {product.currentStock}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddProduct(product);
                                  }}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                )}

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Selected Products</h3>
                  {selectedProducts.length === 0 ? (
                    <div className="border rounded-md p-8 text-center">
                      <Package className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">
                        No products selected yet. Search and add products above.
                      </p>
                    </div>
                  ) : (
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead>Current Stock</TableHead>
                            <TableHead>Adjustment</TableHead>
                            <TableHead>New Stock</TableHead>
                            <TableHead className="w-[80px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedProducts.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell className="font-medium">
                                {product.name}
                              </TableCell>
                              <TableCell className="font-mono text-xs">
                                {product.sku}
                              </TableCell>
                              <TableCell>{product.currentStock}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() =>
                                      handleQuantityChange(
                                        product.id,
                                        Math.max(
                                          1,
                                          product.adjustmentQuantity - 1,
                                        ),
                                      )
                                    }
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <Input
                                    type="number"
                                    min="1"
                                    value={product.adjustmentQuantity}
                                    onChange={(e) =>
                                      handleQuantityChange(
                                        product.id,
                                        parseInt(e.target.value) || 1,
                                      )
                                    }
                                    className="w-16 mx-2 text-center"
                                  />
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() =>
                                      handleQuantityChange(
                                        product.id,
                                        product.adjustmentQuantity + 1,
                                      )
                                    }
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </TableCell>
                              <TableCell>
                                <span
                                  className={`font-medium ${adjustmentType === "add" ? "text-green-600" : "text-red-600"}`}
                                >
                                  {adjustmentType === "add"
                                    ? product.currentStock +
                                      product.adjustmentQuantity
                                    : Math.max(
                                        0,
                                        product.currentStock -
                                          product.adjustmentQuantity,
                                      )}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    handleRemoveProduct(product.id)
                                  }
                                >
                                  <Trash className="h-4 w-4 text-red-500" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StockAdjustmentForm;
