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

const ShippingReportsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5" /> Shipping Analytics
        </CardTitle>
        <CardDescription>
          Key metrics and insights about your shipping operations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border rounded-md">
            <div className="text-sm text-muted-foreground mb-1">
              Total Orders Shipped
            </div>
            <div className="text-2xl font-bold">1,248</div>
            <div className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> +12% this month
            </div>
          </div>

          <div className="p-4 border rounded-md">
            <div className="text-sm text-muted-foreground mb-1">
              Average Shipping Cost
            </div>
            <div className="text-2xl font-bold">EGP 75.40</div>
            <div className="text-xs text-red-600 flex items-center mt-1">
              <TrendingDown className="h-3 w-3 mr-1" /> +5% this month
            </div>
          </div>

          <div className="p-4 border rounded-md">
            <div className="text-sm text-muted-foreground mb-1">
              On-Time Delivery
            </div>
            <div className="text-2xl font-bold">94.2%</div>
            <div className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> +2.1% this month
            </div>
          </div>

          <div className="p-4 border rounded-md">
            <div className="text-sm text-muted-foreground mb-1">
              Shipping Issues
            </div>
            <div className="text-2xl font-bold">3.8%</div>
            <div className="text-xs text-green-600 flex items-center mt-1">
              <TrendingDown className="h-3 w-3 mr-1" /> -1.2% this month
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Top Shipping Methods</h3>
          <div className="space-y-3">
            {[
              {
                name: "Standard Delivery",
                zone: "Cairo & Giza",
                orders: 485,
                percentage: 38.9,
              },
              {
                name: "Express Delivery",
                zone: "Cairo & Giza",
                orders: 312,
                percentage: 25.0,
              },
              {
                name: "Standard Delivery",
                zone: "Alexandria",
                orders: 187,
                percentage: 15.0,
              },
              {
                name: "Free Shipping",
                zone: "Cairo & Giza",
                orders: 156,
                percentage: 12.5,
              },
              {
                name: "Weight-based Shipping",
                zone: "Delta Region",
                orders: 108,
                percentage: 8.6,
              },
            ].map((method, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-full max-w-md">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{method.name}</span>
                    <span className="text-sm">{method.orders} orders</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${method.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <Badge variant="outline">{method.percentage}%</Badge>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Shipping by Destination</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Top Destinations</h4>
              <div className="space-y-2">
                {[
                  { name: "Cairo", orders: 412, percentage: 33.0 },
                  { name: "Giza", orders: 287, percentage: 23.0 },
                  { name: "Alexandria", orders: 187, percentage: 15.0 },
                  { name: "Hurghada", orders: 98, percentage: 7.9 },
                  { name: "Luxor", orders: 76, percentage: 6.1 },
                ].map((destination, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm">{destination.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {destination.orders} orders
                      </span>
                      <Badge variant="outline">{destination.percentage}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">
                Shipping Zones Performance
              </h4>
              <div className="space-y-2">
                {[
                  {
                    name: "Cairo & Giza",
                    status: "Excellent",
                    color: "bg-green-100 text-green-800",
                  },
                  {
                    name: "Alexandria",
                    status: "Good",
                    color: "bg-blue-100 text-blue-800",
                  },
                  {
                    name: "Delta Region",
                    status: "Average",
                    color: "bg-yellow-100 text-yellow-800",
                  },
                  {
                    name: "Upper Egypt",
                    status: "Good",
                    color: "bg-blue-100 text-blue-800",
                  },
                  {
                    name: "Red Sea",
                    status: "Excellent",
                    color: "bg-green-100 text-green-800",
                  },
                ].map((zone, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm">{zone.name}</span>
                    <Badge variant="outline" className={zone.color}>
                      {zone.status}
                    </Badge>
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

export default ShippingReportsCard;
