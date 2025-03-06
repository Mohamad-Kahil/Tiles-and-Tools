import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  ShoppingBag,
  CreditCard,
  Map,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
} from "lucide-react";

interface CustomerInsightsProps {
  className?: string;
}

const CustomerInsights: React.FC<CustomerInsightsProps> = ({
  className = "",
}) => {
  // Mock data
  const customerStats = {
    totalCustomers: 2458,
    newCustomers: 156,
    returningCustomers: 68,
    churnRate: 3.2,
    averageOrderValue: 1250,
    topLocations: [
      { name: "Cairo", percentage: 42 },
      { name: "Alexandria", percentage: 28 },
      { name: "Giza", percentage: 15 },
      { name: "Luxor", percentage: 8 },
      { name: "Other", percentage: 7 },
    ],
    customerSegments: [
      { name: "One-time", count: 1245, percentage: 50.6 },
      { name: "Repeat", count: 876, percentage: 35.6 },
      { name: "Loyal", count: 337, percentage: 13.8 },
    ],
    acquisitionChannels: [
      { name: "Organic Search", percentage: 35 },
      { name: "Direct", percentage: 25 },
      { name: "Social Media", percentage: 20 },
      { name: "Referral", percentage: 12 },
      { name: "Email", percentage: 8 },
    ],
  };

  // Format price
  const formatPrice = (price: number) => {
    return price.toLocaleString("ar-EG", {
      style: "currency",
      currency: "EGP",
    });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Customer Insights</CardTitle>
        <CardDescription>Understand your customer base</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="segments">Segments</TabsTrigger>
            <TabsTrigger value="acquisition">Acquisition</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-muted/50 p-4 rounded-md">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Users className="h-4 w-4" />
                  <span>Total Customers</span>
                </div>
                <div className="text-2xl font-bold">
                  {customerStats.totalCustomers.toLocaleString()}
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-md">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Users className="h-4 w-4" />
                  <span>New Customers</span>
                </div>
                <div className="text-2xl font-bold">
                  {customerStats.newCustomers.toLocaleString()}
                </div>
                <div className="flex items-center text-green-600 text-sm mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>12% increase</span>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-md">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <ShoppingBag className="h-4 w-4" />
                  <span>Average Order Value</span>
                </div>
                <div className="text-2xl font-bold">
                  {formatPrice(customerStats.averageOrderValue)}
                </div>
                <div className="flex items-center text-green-600 text-sm mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>5.3% increase</span>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-md">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Percent className="h-4 w-4" />
                  <span>Churn Rate</span>
                </div>
                <div className="text-2xl font-bold">
                  {customerStats.churnRate}%
                </div>
                <div className="flex items-center text-red-600 text-sm mt-1">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  <span>0.5% decrease</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Map className="h-4 w-4 text-muted-foreground" />
                <span>Top Customer Locations</span>
              </h3>
              <div className="space-y-3">
                {customerStats.topLocations.map((location, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{location.name}</span>
                      <span className="text-sm">{location.percentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2"
                        style={{ width: `${location.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="segments" className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {customerStats.customerSegments.map((segment, index) => (
                <div key={index} className="border rounded-md p-4">
                  <div className="font-medium mb-1">
                    {segment.name} Customers
                  </div>
                  <div className="text-2xl font-bold">
                    {segment.count.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">
                    {segment.percentage}% of total customers
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2"
                      style={{ width: `${segment.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-4">Customer Behavior</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Purchase Frequency</div>
                    <div className="text-sm text-muted-foreground">
                      Average time between orders
                    </div>
                  </div>
                  <Badge variant="outline" className="text-primary">
                    45 days
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Repeat Purchase Rate</div>
                    <div className="text-sm text-muted-foreground">
                      Customers who made more than one purchase
                    </div>
                  </div>
                  <Badge variant="outline" className="text-primary">
                    28.5%
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Average Items Per Order</div>
                    <div className="text-sm text-muted-foreground">
                      Number of products in each order
                    </div>
                  </div>
                  <Badge variant="outline" className="text-primary">
                    2.7 items
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="acquisition" className="pt-6 space-y-6">
            <div>
              <h3 className="font-medium mb-4">
                Customer Acquisition Channels
              </h3>
              <div className="space-y-3">
                {customerStats.acquisitionChannels.map((channel, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{channel.name}</span>
                      <span className="text-sm">{channel.percentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2"
                        style={{ width: `${channel.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-4">Acquisition Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <div className="text-sm text-muted-foreground mb-1">
                    Customer Acquisition Cost
                  </div>
                  <div className="text-xl font-bold">{formatPrice(250)}</div>
                  <div className="flex items-center text-green-600 text-sm mt-1">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    <span>8% decrease</span>
                  </div>
                </div>
                <div className="border rounded-md p-4">
                  <div className="text-sm text-muted-foreground mb-1">
                    Conversion Rate
                  </div>
                  <div className="text-xl font-bold">3.8%</div>
                  <div className="flex items-center text-green-600 text-sm mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>0.5% increase</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CustomerInsights;
