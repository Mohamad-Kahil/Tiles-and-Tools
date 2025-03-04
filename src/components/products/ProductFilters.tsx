import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  name: string;
  options: FilterOption[];
}

interface PriceRange {
  min: number;
  max: number;
}

interface ProductFiltersProps {
  categories?: FilterGroup;
  filters?: FilterGroup[];
  priceRange?: PriceRange;
  selectedFilters?: Record<string, string[]>;
  selectedPriceRange?: [number, number];
  onFilterChange?: (
    filterId: string,
    optionId: string,
    isChecked: boolean,
  ) => void;
  onPriceChange?: (range: [number, number]) => void;
  onClearFilters?: () => void;
  className?: string;
}

const ProductFilters = ({
  categories = {
    id: "categories",
    name: "Categories",
    options: [
      { id: "flooring", label: "Flooring", count: 24 },
      { id: "wall-products", label: "Wall Products", count: 18 },
      { id: "lighting", label: "Lighting", count: 12 },
      { id: "furniture", label: "Furniture", count: 30 },
      { id: "bathroom", label: "Bathroom", count: 15 },
      { id: "kitchen", label: "Kitchen", count: 20 },
    ],
  },
  filters = [
    {
      id: "material",
      name: "Material",
      options: [
        { id: "ceramic", label: "Ceramic", count: 12 },
        { id: "marble", label: "Marble", count: 8 },
        { id: "wood", label: "Wood", count: 10 },
        { id: "metal", label: "Metal", count: 6 },
        { id: "glass", label: "Glass", count: 4 },
      ],
    },
    {
      id: "color",
      name: "Color",
      options: [
        { id: "white", label: "White", count: 15 },
        { id: "black", label: "Black", count: 10 },
        { id: "brown", label: "Brown", count: 8 },
        { id: "gray", label: "Gray", count: 12 },
        { id: "beige", label: "Beige", count: 6 },
      ],
    },
    {
      id: "brand",
      name: "Brand",
      options: [
        { id: "egyptian-ceramics", label: "Egyptian Ceramics", count: 8 },
        { id: "cairo-marble", label: "Cairo Marble", count: 6 },
        { id: "alexandria-lighting", label: "Alexandria Lighting", count: 4 },
        { id: "luxor-furniture", label: "Luxor Furniture", count: 10 },
        { id: "aswan-decor", label: "Aswan Decor", count: 5 },
      ],
    },
  ],
  priceRange = { min: 0, max: 10000 },
  selectedFilters = {},
  selectedPriceRange = [0, 10000],
  onFilterChange = () => {},
  onPriceChange = () => {},
  onClearFilters = () => {},
  className = "",
}: ProductFiltersProps) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    categories: true,
    price: true,
  });

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Count total active filters
  const activeFilterCount = Object.values(selectedFilters).reduce(
    (count, values) => count + values.length,
    0,
  );

  // Check if price filter is active (not at min/max)
  const isPriceFilterActive =
    selectedPriceRange[0] > priceRange.min ||
    selectedPriceRange[1] < priceRange.max;

  const totalActiveFilters = activeFilterCount + (isPriceFilterActive ? 1 : 0);

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* Filter header with clear button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Filters</h3>
        {totalActiveFilters > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-8 text-sm"
          >
            Clear all
            <X className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Active filters */}
      {totalActiveFilters > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(selectedFilters).map(
            ([filterId, optionIds]) =>
              optionIds.length > 0 &&
              optionIds.map((optionId) => {
                // Find the filter group and option to get the label
                const filterGroup =
                  filterId === "categories"
                    ? categories
                    : filters.find((f) => f.id === filterId);
                const option = filterGroup?.options.find(
                  (o) => o.id === optionId,
                );

                return (
                  <Badge
                    key={`${filterId}-${optionId}`}
                    variant="outline"
                    className="flex items-center gap-1 pl-2 pr-1 py-1"
                  >
                    {option?.label || optionId}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => onFilterChange(filterId, optionId, false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                );
              }),
          )}

          {isPriceFilterActive && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 pl-2 pr-1 py-1"
            >
              Price: {selectedPriceRange[0]} - {selectedPriceRange[1]} EGP
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => onPriceChange([priceRange.min, priceRange.max])}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}

      <Separator />

      {/* Categories section */}
      <Collapsible
        open={openSections.categories}
        onOpenChange={() => toggleSection("categories")}
      >
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer py-2">
            <h4 className="text-sm font-medium">{categories.name}</h4>
            {openSections.categories ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 pb-4 space-y-2">
          {categories.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${option.id}`}
                checked={
                  selectedFilters.categories?.includes(option.id) || false
                }
                onCheckedChange={(checked) =>
                  onFilterChange("categories", option.id, checked as boolean)
                }
              />
              <Label
                htmlFor={`category-${option.id}`}
                className="flex-1 text-sm cursor-pointer flex justify-between"
              >
                <span>{option.label}</span>
                {option.count !== undefined && (
                  <span className="text-muted-foreground">
                    ({option.count})
                  </span>
                )}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Price range section */}
      <Collapsible
        open={openSections.price}
        onOpenChange={() => toggleSection("price")}
      >
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer py-2">
            <h4 className="text-sm font-medium">Price Range</h4>
            {openSections.price ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 pb-4">
          <div className="space-y-4">
            <Slider
              defaultValue={selectedPriceRange}
              min={priceRange.min}
              max={priceRange.max}
              step={100}
              onValueChange={(value) =>
                onPriceChange(value as [number, number])
              }
            />
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-muted-foreground">Min:</span>{" "}
                <span className="font-medium">{selectedPriceRange[0]} EGP</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Max:</span>{" "}
                <span className="font-medium">{selectedPriceRange[1]} EGP</span>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Other filter sections */}
      {filters.map((filter) => (
        <React.Fragment key={filter.id}>
          <Collapsible
            open={openSections[filter.id]}
            onOpenChange={() => toggleSection(filter.id)}
          >
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between cursor-pointer py-2">
                <h4 className="text-sm font-medium">{filter.name}</h4>
                {openSections[filter.id] ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 pb-4 space-y-2">
              {filter.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${filter.id}-${option.id}`}
                    checked={
                      selectedFilters[filter.id]?.includes(option.id) || false
                    }
                    onCheckedChange={(checked) =>
                      onFilterChange(filter.id, option.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`${filter.id}-${option.id}`}
                    className="flex-1 text-sm cursor-pointer flex justify-between"
                  >
                    <span>{option.label}</span>
                    {option.count !== undefined && (
                      <span className="text-muted-foreground">
                        ({option.count})
                      </span>
                    )}
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
          <Separator />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProductFilters;
