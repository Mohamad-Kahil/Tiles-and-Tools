import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownAZ, ArrowUpAZ, ArrowDownUp } from "lucide-react";

interface ProductSortProps {
  onSortChange: (sortOption: {
    sortBy: string;
    sortOrder: "asc" | "desc";
  }) => void;
  currentSortBy?: string;
  currentSortOrder?: "asc" | "desc";
}

const ProductSort: React.FC<ProductSortProps> = ({
  onSortChange,
  currentSortBy = "name",
  currentSortOrder = "asc",
}) => {
  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split("-");
    onSortChange({
      sortBy,
      sortOrder: sortOrder as "asc" | "desc",
    });
  };

  const currentValue = `${currentSortBy}-${currentSortOrder}`;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium hidden md:inline">Sort by:</span>
      <Select value={currentValue} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name-asc" className="flex items-center">
            <div className="flex items-center">
              <ArrowUpAZ className="mr-2 h-4 w-4" />
              Name (A-Z)
            </div>
          </SelectItem>
          <SelectItem value="name-desc">
            <div className="flex items-center">
              <ArrowDownAZ className="mr-2 h-4 w-4" />
              Name (Z-A)
            </div>
          </SelectItem>
          <SelectItem value="price-asc">
            <div className="flex items-center">
              <ArrowDownUp className="mr-2 h-4 w-4" />
              Price (Low to High)
            </div>
          </SelectItem>
          <SelectItem value="price-desc">
            <div className="flex items-center">
              <ArrowDownUp className="mr-2 h-4 w-4" />
              Price (High to Low)
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductSort;
