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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calculator, MapPin, Package, Truck } from "lucide-react";

const ShippingRatesCalculator = () => {
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [dimensions, setDimensions] = useState({
    length: "",
    width: "",
    height: "",
  });
  const [calculatedRates, setCalculatedRates] = useState<any[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    setIsCalculating(true);

    // Simulate API call delay
    setTimeout(() => {
      // Mock shipping rates calculation
      const mockRates = [
        {
          carrier: "Aramex",
          service: "Express",
          deliveryTime: "1-2 business days",
          price: "EGP 120",
        },
        {
          carrier: "Egypt Post",
          service: "Standard",
          deliveryTime: "3-5 business days",
          price: "EGP 50",
        },
        {
          carrier: "DHL",
          service: "Express",
          deliveryTime: "1-3 business days",
          price: "EGP 150",
        },
      ];

      // If destination is Cairo, add a special rate
      if (destination === "cairo") {
        mockRates.push({
          carrier: "Local Delivery",
          service: "Same Day",
          deliveryTime: "Today",
          price: "EGP 80",
        });
      }

      setCalculatedRates(mockRates);
      setIsCalculating(false);
    }, 1000);
  };

  const handleClear = () => {
    setDestination("");
    setWeight("");
    setDimensions({ length: "", width: "", height: "" });
    setCalculatedRates([]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" /> Shipping Rates Calculator
        </CardTitle>
        <CardDescription>
          Calculate shipping rates for different destinations and package sizes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="destination">Destination</Label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger id="destination" className="w-full">
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cairo">Cairo</SelectItem>
                  <SelectItem value="giza">Giza</SelectItem>
                  <SelectItem value="alexandria">Alexandria</SelectItem>
                  <SelectItem value="luxor">Luxor</SelectItem>
                  <SelectItem value="aswan">Aswan</SelectItem>
                  <SelectItem value="hurghada">Hurghada</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" /> Shipping zone will be
                automatically determined
              </div>
            </div>

            <div>
              <Label htmlFor="weight">Package Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="Enter weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Package Dimensions (cm)</Label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Input
                    placeholder="Length"
                    type="number"
                    value={dimensions.length}
                    onChange={(e) =>
                      setDimensions({ ...dimensions, length: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Input
                    placeholder="Width"
                    type="number"
                    value={dimensions.width}
                    onChange={(e) =>
                      setDimensions({ ...dimensions, width: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Input
                    placeholder="Height"
                    type="number"
                    value={dimensions.height}
                    onChange={(e) =>
                      setDimensions({ ...dimensions, height: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <Package className="h-3 w-3 mr-1" /> Volumetric weight may apply
                for large packages
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleCalculate}
                disabled={!destination || !weight}
                className="flex-1"
              >
                Calculate Rates
              </Button>
              <Button
                variant="outline"
                onClick={handleClear}
                className="flex-1"
              >
                Clear
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Available Shipping Rates</h3>
            {isCalculating ? (
              <div className="flex items-center justify-center h-[200px] border rounded-md">
                <div className="text-center">
                  <Truck className="h-8 w-8 text-muted-foreground mx-auto animate-pulse mb-2" />
                  <p className="text-muted-foreground">Calculating rates...</p>
                </div>
              </div>
            ) : calculatedRates.length > 0 ? (
              <div className="space-y-3">
                {calculatedRates.map((rate, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50"
                  >
                    <div>
                      <div className="font-medium">{rate.carrier}</div>
                      <div className="text-sm text-muted-foreground">
                        {rate.service} • {rate.deliveryTime}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-medium">
                        {rate.price}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Select
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[200px] border rounded-md">
                <div className="text-center">
                  <Truck className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    Enter destination and package details to calculate shipping
                    rates
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div className="text-sm text-muted-foreground">
          <p>
            Note: Calculated rates are estimates and may vary based on actual
            package characteristics, carrier promotions, and other factors.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShippingRatesCalculator;
