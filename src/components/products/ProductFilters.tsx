import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Filter, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

interface ProductFiltersProps {
  onFilterChange: (filters: { minPrice?: number; maxPrice?: number }) => void;
  initialFilters?: {
    minPrice?: number;
    maxPrice?: number;
  };
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  onFilterChange,
  initialFilters = {},
}) => {
  // Price range state
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialFilters.minPrice || 0,
    initialFilters.maxPrice || 5000,
  ]);
  const [minPriceInput, setMinPriceInput] = useState<string>(
    (initialFilters.minPrice || 0).toString(),
  );
  const [maxPriceInput, setMaxPriceInput] = useState<string>(
    (initialFilters.maxPrice || 5000).toString(),
  );

  // Update input fields when price range changes
  useEffect(() => {
    setMinPriceInput(priceRange[0].toString());
    setMaxPriceInput(priceRange[1].toString());
  }, [priceRange]);

  // Update price range when input fields change and are valid
  const handlePriceInputChange = () => {
    const min = parseInt(minPriceInput);
    const max = parseInt(maxPriceInput);

    if (!isNaN(min) && !isNaN(max) && min <= max) {
      setPriceRange([min, max]);
    }
  };

  // Apply filters
  const applyFilters = () => {
    onFilterChange({
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  };

  // Reset filters
  const resetFilters = () => {
    setPriceRange([0, 5000]);
    setMinPriceInput("0");
    setMaxPriceInput("5000");
    onFilterChange({
      minPrice: 0,
      maxPrice: 5000,
    });
  };

  // Mobile filter sheet content
  const filterContent = (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Price Range</h3>
        <Slider
          value={priceRange}
          min={0}
          max={5000}
          step={100}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          className="py-4"
        />
        <div className="flex items-center gap-4">
          <div className="grid gap-2 flex-1">
            <Label htmlFor="min-price">Min Price</Label>
            <Input
              id="min-price"
              type="number"
              min="0"
              value={minPriceInput}
              onChange={(e) => setMinPriceInput(e.target.value)}
              onBlur={handlePriceInputChange}
            />
          </div>
          <div className="grid gap-2 flex-1">
            <Label htmlFor="max-price">Max Price</Label>
            <Input
              id="max-price"
              type="number"
              min="0"
              value={maxPriceInput}
              onChange={(e) => setMaxPriceInput(e.target.value)}
              onBlur={handlePriceInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filters */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>
                Refine your product search with filters
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">{filterContent}</div>
            <SheetFooter className="flex flex-row gap-2 justify-between sm:justify-between">
              <Button variant="outline" onClick={resetFilters}>
                <X className="mr-2 h-4 w-4" /> Reset
              </Button>
              <SheetClose asChild>
                <Button onClick={applyFilters}>Apply Filters</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:block w-full max-w-xs">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg">Filters</h3>
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Reset
            </Button>
          </div>
          {filterContent}
          <Button onClick={applyFilters} className="w-full">
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductFilters;
