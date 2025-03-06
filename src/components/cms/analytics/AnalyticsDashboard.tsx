import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  BarChart2,
  LineChart,
  PieChart,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ExternalLink,
} from "lucide-react";

import ChartComponent from "./ChartComponent";

const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Analytics Dashboard
        </h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Revenue
                </p>
                <h3 className="text-2xl font-bold mt-1">EGP 124,750</h3>
                <div className="flex items-center mt-1 text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-xs">+12.5% from last period</span>
                </div>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Orders
                </p>
                <h3 className="text-2xl font-bold mt-1">352</h3>
                <div className="flex items-center mt-1 text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-xs">+8.2% from last period</span>
                </div>
              </div>
              <div className="bg-orange-100 p-2 rounded-full">
                <ShoppingCart className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Customers
                </p>
                <h3 className="text-2xl font-bold mt-1">1,254</h3>
                <div className="flex items-center mt-1 text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-xs">+5.3% from last period</span>
                </div>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <Users className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Avg. Order Value
                </p>
                <h3 className="text-2xl font-bold mt-1">EGP 354.40</h3>
                <div className="flex items-center mt-1 text-red-600">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  <span className="text-xs">-2.1% from last period</span>
                </div>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <Package className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales">
        <TabsList className="grid w-full grid-cols-4 max-w-md">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6 pt-4">
          {/* Sales Over Time Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Over Time</CardTitle>
              <CardDescription>
                Daily revenue for the selected period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ChartComponent
                  type="line"
                  data={{
                    labels: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                    datasets: [
                      {
                        label: "Revenue",
                        data: [
                          65000, 58000, 72000, 68000, 79000, 85000, 92000,
                          88000, 94000, 99000, 105000, 118000,
                        ],
                        borderColor: "#3b82f6",
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        borderWidth: 2,
                        fill: true,
                      },
                    ],
                  }}
                  height={350}
                  width={800}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Selling Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>
                  Best performing products by revenue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Luxury Marble Flooring Tile",
                      revenue: 12999.9,
                      percentage: 18,
                    },
                    {
                      name: "Modern Pendant Light Fixture",
                      revenue: 8999.9,
                      percentage: 14,
                    },
                    {
                      name: "Premium Wall Paint - Desert Sand",
                      revenue: 6999.8,
                      percentage: 11,
                    },
                    {
                      name: "Handcrafted Ceramic Vase",
                      revenue: 4999.9,
                      percentage: 8,
                    },
                    {
                      name: "Engineered Hardwood Flooring",
                      revenue: 4799.7,
                      percentage: 7,
                    },
                  ].map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          EGP {product.revenue.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-sm font-medium">
                        {product.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sales by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>
                  Revenue distribution across product categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ChartComponent
                    type="pie"
                    data={{
                      labels: [
                        "Flooring",
                        "Lighting",
                        "Wall Products",
                        "Furniture",
                        "Decor",
                      ],
                      datasets: [
                        {
                          label: "Sales by Category",
                          data: [35, 25, 20, 12, 8],
                          backgroundColor: [
                            "#3b82f6",
                            "#22c55e",
                            "#eab308",
                            "#a855f7",
                            "#ef4444",
                          ],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    height={250}
                    width={400}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm">Flooring (35%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Lighting (25%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm">Wall Products (20%)</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-sm">Furniture (12%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm">Decor (8%)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6 pt-4">
          {/* Product Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>
                View and analyze product metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ChartComponent
                  type="bar"
                  data={{
                    labels: [
                      "Luxury Marble",
                      "Modern Pendant Light",
                      "Premium Wall Paint",
                      "Ceramic Vase",
                      "Hardwood Flooring",
                    ],
                    datasets: [
                      {
                        label: "Revenue",
                        data: [12999.9, 8999.9, 6999.8, 4999.9, 4799.7],
                        backgroundColor: [
                          "#3b82f6",
                          "#22c55e",
                          "#eab308",
                          "#a855f7",
                          "#ef4444",
                        ],
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={{
                    indexAxis: "y",
                  }}
                  height={350}
                  width={800}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Most Viewed Products */}
            <Card>
              <CardHeader>
                <CardTitle>Most Viewed Products</CardTitle>
                <CardDescription>
                  Products with highest page views
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Luxury Marble Flooring Tile",
                      views: 3245,
                      conversion: 4.2,
                    },
                    {
                      name: "Modern Pendant Light Fixture",
                      views: 2876,
                      conversion: 3.8,
                    },
                    {
                      name: "Premium Wall Paint - Desert Sand",
                      views: 2540,
                      conversion: 3.1,
                    },
                    {
                      name: "Handcrafted Ceramic Vase",
                      views: 2187,
                      conversion: 2.5,
                    },
                    {
                      name: "Engineered Hardwood Flooring",
                      views: 1954,
                      conversion: 2.8,
                    },
                  ].map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.views.toLocaleString()} views
                        </p>
                      </div>
                      <div className="text-sm font-medium">
                        {product.conversion}% conv.
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Inventory Status */}
            <Card>
              <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
                <CardDescription>
                  Stock levels and inventory alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Luxury Marble Flooring Tile",
                      stock: 124,
                      status: "In Stock",
                    },
                    {
                      name: "Modern Pendant Light Fixture",
                      stock: 56,
                      status: "In Stock",
                    },
                    {
                      name: "Premium Wall Paint - Desert Sand",
                      stock: 12,
                      status: "Low Stock",
                    },
                    {
                      name: "Handcrafted Ceramic Vase",
                      stock: 0,
                      status: "Out of Stock",
                    },
                    {
                      name: "Engineered Hardwood Flooring",
                      stock: 87,
                      status: "In Stock",
                    },
                  ].map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.stock} units
                        </p>
                      </div>
                      <div
                        className={`text-sm font-medium px-2 py-1 rounded-full ${product.status === "In Stock" ? "bg-green-100 text-green-800" : product.status === "Low Stock" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                      >
                        {product.status}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6 pt-4">
          {/* Customer Acquisition */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Acquisition</CardTitle>
              <CardDescription>New customers over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ChartComponent
                  type="line"
                  data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    datasets: [
                      {
                        label: "New Customers",
                        data: [120, 145, 132, 156, 168, 172],
                        borderColor: "#a855f7",
                        backgroundColor: "rgba(168, 85, 247, 0.1)",
                        borderWidth: 2,
                        fill: true,
                      },
                    ],
                  }}
                  height={350}
                  width={800}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Demographics */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Demographics</CardTitle>
                <CardDescription>
                  Customer distribution by location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { location: "Cairo", customers: 542, percentage: 43 },
                    { location: "Alexandria", customers: 287, percentage: 23 },
                    { location: "Giza", customers: 165, percentage: 13 },
                    {
                      location: "Sharm El Sheikh",
                      customers: 98,
                      percentage: 8,
                    },
                    { location: "Other", customers: 162, percentage: 13 },
                  ].map((location, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{location.location}</p>
                        <p className="text-sm text-muted-foreground">
                          {location.customers} customers
                        </p>
                      </div>
                      <div className="text-sm font-medium">
                        {location.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Retention */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Retention</CardTitle>
                <CardDescription>Repeat purchase metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ChartComponent
                    type="doughnut"
                    data={{
                      labels: [
                        "One-time",
                        "2-3 purchases",
                        "4-6 purchases",
                        "7+ purchases",
                      ],
                      datasets: [
                        {
                          label: "Customer Retention",
                          data: [45, 30, 15, 10],
                          backgroundColor: [
                            "#3b82f6",
                            "#22c55e",
                            "#a855f7",
                            "#ef4444",
                          ],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    height={250}
                    width={400}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm">One-time (45%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">2-3 purchases (30%)</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-sm">4-6 purchases (15%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm">7+ purchases (10%)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="marketing" className="space-y-6 pt-4">
          {/* Marketing Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Marketing Performance</CardTitle>
              <CardDescription>Campaign effectiveness and ROI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ChartComponent
                  type="bar"
                  data={{
                    labels: [
                      "Summer Sale",
                      "New Collection",
                      "Ramadan Special",
                      "Back to School",
                      "Holiday Season",
                    ],
                    datasets: [
                      {
                        label: "Revenue",
                        data: [45250, 32150, 28750, 18500, 12350],
                        backgroundColor: "#3b82f6",
                        borderWidth: 0,
                      },
                      {
                        label: "ROI %",
                        data: [320, 280, 250, 210, 180],
                        backgroundColor: "#22c55e",
                        borderWidth: 0,
                      },
                    ],
                  }}
                  height={350}
                  width={800}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traffic Sources */}
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>
                  Where your visitors are coming from
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { source: "Direct", visits: 12450, percentage: 35 },
                    { source: "Organic Search", visits: 8760, percentage: 25 },
                    { source: "Social Media", visits: 5240, percentage: 15 },
                    { source: "Referral", visits: 4320, percentage: 12 },
                    { source: "Email", visits: 3500, percentage: 10 },
                    { source: "Other", visits: 1050, percentage: 3 },
                  ].map((source, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{source.source}</p>
                        <p className="text-sm text-muted-foreground">
                          {source.visits.toLocaleString()} visits
                        </p>
                      </div>
                      <div className="text-sm font-medium">
                        {source.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Campaign Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>
                  Results from marketing campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Summer Sale", revenue: 45250, roi: 320 },
                    { name: "New Collection Launch", revenue: 32150, roi: 280 },
                    { name: "Ramadan Special", revenue: 28750, roi: 250 },
                    { name: "Back to School", revenue: 18500, roi: 210 },
                    { name: "Holiday Season", revenue: 12350, roi: 180 },
                  ].map((campaign, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{campaign.name}</p>
                        <p className="text-sm text-muted-foreground">
                          EGP {campaign.revenue.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-green-600">
                        {campaign.roi}% ROI
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
