import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BarChart2, Download, TrendingUp, TrendingDown } from "lucide-react";

const InventoryReportsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5" /> Inventory Analytics
        </CardTitle>
        <CardDescription>
          Key metrics and insights about your inventory performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border rounded-md">
            <div className="text-sm text-muted-foreground mb-1">
              Inventory Turnover
            </div>
            <div className="text-2xl font-bold">4.2x</div>
            <div className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> +0.3 from last quarter
            </div>
          </div>

          <div className="p-4 border rounded-md">
            <div className="text-sm text-muted-foreground mb-1">
              Days of Supply
            </div>
            <div className="text-2xl font-bold">32 days</div>
            <div className="text-xs text-green-600 flex items-center mt-1">
              <TrendingDown className="h-3 w-3 mr-1" /> -5 days from last
              quarter
            </div>
          </div>

          <div className="p-4 border rounded-md">
            <div className="text-sm text-muted-foreground mb-1">
              Stock Accuracy
            </div>
            <div className="text-2xl font-bold">98.5%</div>
            <div className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> +1.2% from last count
            </div>
          </div>

          <div className="p-4 border rounded-md">
            <div className="text-sm text-muted-foreground mb-1">
              Stockout Rate
            </div>
            <div className="text-2xl font-bold">3.2%</div>
            <div className="text-xs text-red-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> +0.5% this month
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Top Moving Products</h3>
          <div className="space-y-3">
            {[
              {
                name: "Luxury Marble Flooring Tile",
                category: "Flooring",
                turnover: 6.8,
                percentage: 100,
              },
              {
                name: "Premium Ceramic Floor Tile",
                category: "Flooring",
                turnover: 5.9,
                percentage: 87,
              },
              {
                name: "Decorative Wallpaper",
                category: "Wall Products",
                turnover: 5.2,
                percentage: 76,
              },
              {
                name: "Modern Pendant Light",
                category: "Lighting",
                turnover: 4.7,
                percentage: 69,
              },
              {
                name: "Engineered Hardwood Flooring",
                category: "Flooring",
                turnover: 4.1,
                percentage: 60,
              },
            ].map((product, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-full max-w-md">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{product.name}</span>
                    <span className="text-sm">
                      {product.turnover}x turnover
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${product.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <Badge variant="outline">{product.category}</Badge>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Inventory Health</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">
                Inventory by Category
              </h4>
              <div className="space-y-2">
                {[
                  { name: "Flooring", value: "EGP 580,000", percentage: 48 },
                  { name: "Lighting", value: "EGP 320,000", percentage: 27 },
                  {
                    name: "Wall Products",
                    value: "EGP 180,000",
                    percentage: 15,
                  },
                  { name: "Furniture", value: "EGP 120,000", percentage: 10 },
                ].map((category, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm">{category.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {category.value}
                      </span>
                      <Badge variant="outline">{category.percentage}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Inventory Age</h4>
              <div className="space-y-2">
                {[
                  {
                    name: "0-30 days",
                    value: "EGP 480,000",
                    status: "Healthy",
                    color: "bg-green-100 text-green-800",
                  },
                  {
                    name: "31-60 days",
                    value: "EGP 350,000",
                    status: "Healthy",
                    color: "bg-green-100 text-green-800",
                  },
                  {
                    name: "61-90 days",
                    value: "EGP 220,000",
                    status: "Warning",
                    color: "bg-yellow-100 text-yellow-800",
                  },
                  {
                    name: "90+ days",
                    value: "EGP 150,000",
                    status: "At Risk",
                    color: "bg-red-100 text-red-800",
                  },
                ].map((age, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm">{age.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {age.value}
                      </span>
                      <Badge variant="outline" className={age.color}>
                        {age.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
          <Button size="sm">
            <BarChart2 className="mr-2 h-4 w-4" /> View Detailed Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryReportsCard;
