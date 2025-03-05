import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Search } from "lucide-react";

interface ViewProductsDialogProps {
  children?: React.ReactNode;
  promotionName: string;
}

const ViewProductsDialog = ({
  children,
  promotionName,
}: ViewProductsDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  // Mock products data
  const products = [
    {
      id: "prod-1",
      name: "Luxury Marble Flooring Tile",
      sku: "FLR-MRB-001",
      category: "Flooring",
      regularPrice: "EGP 1,299.99",
      discountedPrice: "EGP 1,039.99",
      discount: "20%",
      stock: 124,
    },
    {
      id: "prod-2",
      name: "Premium Ceramic Floor Tile",
      sku: "FLR-CRM-002",
      category: "Flooring",
      regularPrice: "EGP 899.99",
      discountedPrice: "EGP 719.99",
      discount: "20%",
      stock: 87,
    },
    {
      id: "prod-3",
      name: "Engineered Hardwood Flooring",
      sku: "FLR-WD-003",
      category: "Flooring",
      regularPrice: "EGP 1,499.99",
      discountedPrice: "EGP 1,199.99",
      discount: "20%",
      stock: 56,
    },
    {
      id: "prod-4",
      name: "Porcelain Floor Tile",
      sku: "FLR-PRC-004",
      category: "Flooring",
      regularPrice: "EGP 999.99",
      discountedPrice: "EGP 799.99",
      discount: "20%",
      stock: 102,
    },
    {
      id: "prod-5",
      name: "Natural Stone Flooring",
      sku: "FLR-STN-005",
      category: "Flooring",
      regularPrice: "EGP 1,799.99",
      discountedPrice: "EGP 1,439.99",
      discount: "20%",
      stock: 43,
    },
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4 mr-2" /> View Products
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Products with "{promotionName}" Discount</DialogTitle>
          <DialogDescription>
            View all products that have this promotion applied
          </DialogDescription>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="border rounded-md max-h-[400px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Regular Price</TableHead>
                <TableHead>Discounted Price</TableHead>
                <TableHead>Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-4 text-muted-foreground"
                  >
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {product.sku}
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="line-through text-muted-foreground">
                      {product.regularPrice}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {product.discountedPrice}
                        </span>
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800"
                        >
                          {product.discount} off
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{product.stock} units</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProductsDialog;
