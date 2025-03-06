import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart2,
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  Package,
  Calendar,
  Download,
  Filter,
  Megaphone,
} from "lucide-react";
import BasicBarChart from "@/components/analytics/BasicBarChart";
import BasicPieChart from "@/components/analytics/BasicPieChart";
import BasicLineChart from "@/components/analytics/BasicLineChart";
import AnalyticsChartDemo from "@/components/analytics/AnalyticsChartDemo";
import SimpleAnalyticsDemo from "@/components/analytics/SimpleAnalyticsDemo";
import ChartDemoButton from "@/components/analytics/ChartDemoButton";
import ChartDemoLink from "@/components/analytics/ChartDemoLink";

import VersionInfo from "@/components/analytics/VersionInfo";

const AnalyticsPage = () => {
  // Mock summary data
  const summaryData = {
    totalRevenue: 1245678.99,
    totalOrders: 3256,
    averageOrderValue: 382.58,
    conversionRate: 3.8,
  };

  const [dateRange, setDateRange] = useState("30days");

  // Format price
  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "EGP",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your store's performance and insights
          </p>
        </div>
        <div className="flex gap-2">
          <Tabs
            value={dateRange}
            onValueChange={setDateRange}
            className="hidden sm:block"
          >
            <TabsList>
              <TabsTrigger value="7days">7 Days</TabsTrigger>
              <TabsTrigger value="30days">30 Days</TabsTrigger>
              <TabsTrigger value="90days">90 Days</TabsTrigger>
            </TabsList>
          </Tabs>
          <ChartDemoButton />
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {formatPrice(summaryData.totalRevenue)}
                </h3>
                <div className="flex items-center mt-1 text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-xs">+12.5% from last month</span>
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
                  Total Orders
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {summaryData.totalOrders.toLocaleString()}
                </h3>
                <div className="flex items-center mt-1 text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-xs">+8.2% from last month</span>
                </div>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <ShoppingBag className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Average Order Value
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {formatPrice(summaryData.averageOrderValue)}
                </h3>
                <div className="flex items-center mt-1 text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-xs">+3.7% from last month</span>
                </div>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <BarChart2 className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Conversion Rate
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {summaryData.conversionRate}%
                </h3>
                <div className="flex items-center mt-1 text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-xs">+0.5% from last month</span>
                </div>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
          </TabsList>

          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <VersionInfo />
          <SimpleAnalyticsDemo className="mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BasicPieChart
              title="Sales by Category"
              description="Distribution of sales across product categories"
              data={[
                { label: "Flooring", value: 42, color: "#3b82f6" },
                { label: "Wall Products", value: 28, color: "#22c55e" },
                { label: "Lighting", value: 18, color: "#eab308" },
                { label: "Decor", value: 12, color: "#a855f7" },
              ]}
            />

            <BasicBarChart
              title="Top Selling Products"
              description="Best performing products by revenue"
              data={[
                {
                  label: "Luxury Marble Flooring",
                  value: 54599,
                  color: "bg-blue-500",
                },
                {
                  label: "Premium Wall Paint",
                  value: 27299,
                  color: "bg-green-500",
                },
                {
                  label: "Modern Pendant Light",
                  value: 32399,
                  color: "bg-yellow-500",
                },
                { label: "Ceramic Vase", value: 26999, color: "bg-purple-500" },
                {
                  label: "Decorative Wall Panel",
                  value: 23199,
                  color: "bg-pink-500",
                },
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <BasicLineChart
            title="Sales Trend"
            description="Daily sales for the past 30 days"
            data={[
              { label: "1", value: 2400 },
              { label: "5", value: 1800 },
              { label: "10", value: 3200 },
              { label: "15", value: 4500 },
              { label: "20", value: 5100 },
              { label: "25", value: 6200 },
              { label: "30", value: 4800 },
            ]}
            formatValue={formatPrice}
            className="mb-6"
          />
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="border rounded-md p-4">
                  <div className="text-sm text-muted-foreground mb-1">
                    Revenue by Category
                  </div>
                  <div className="space-y-2 mt-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Flooring</span>
                        <span>42%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          style={{
                            height: "8px",
                            width: "42%",
                            backgroundColor: "#3b82f6",
                            borderRadius: "9999px",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Wall Products</span>
                        <span>28%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          style={{
                            height: "8px",
                            width: "28%",
                            backgroundColor: "#22c55e",
                            borderRadius: "9999px",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Lighting</span>
                        <span>18%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          style={{
                            height: "8px",
                            width: "18%",
                            backgroundColor: "#eab308",
                            borderRadius: "9999px",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="text-sm text-muted-foreground mb-1">
                    Sales by Time
                  </div>
                  <div className="space-y-2 mt-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Morning (6AM-12PM)</span>
                        <span>25%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          style={{
                            height: "8px",
                            width: "25%",
                            backgroundColor: "#f97316",
                            borderRadius: "9999px",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Afternoon (12PM-6PM)</span>
                        <span>45%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          style={{
                            height: "8px",
                            width: "45%",
                            backgroundColor: "#ef4444",
                            borderRadius: "9999px",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Evening (6PM-12AM)</span>
                        <span>30%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          style={{
                            height: "8px",
                            width: "30%",
                            backgroundColor: "#a855f7",
                            borderRadius: "9999px",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="text-sm text-muted-foreground mb-1">
                    Payment Methods
                  </div>
                  <div className="space-y-2 mt-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Credit Card</span>
                        <span>55%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          style={{
                            height: "8px",
                            width: "55%",
                            backgroundColor: "#3b82f6",
                            borderRadius: "9999px",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Cash on Delivery</span>
                        <span>35%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          style={{
                            height: "8px",
                            width: "35%",
                            backgroundColor: "rgba(59, 130, 246, 0.7)",
                            borderRadius: "9999px",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Other</span>
                        <span>10%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          style={{
                            height: "8px",
                            width: "10%",
                            backgroundColor: "rgba(59, 130, 246, 0.4)",
                            borderRadius: "9999px",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <BasicBarChart
            title="Customer Segments"
            description="Distribution of customers by segment"
            data={[
              {
                label: "One-time Customers",
                value: 1245,
                color: "bg-blue-500",
              },
              { label: "Repeat Customers", value: 876, color: "bg-green-500" },
              { label: "Loyal Customers", value: 337, color: "bg-yellow-500" },
            ]}
            className="mb-6"
          />

          <BasicLineChart
            title="New Customers"
            description="New customer acquisition over time"
            data={[
              { label: "Jan", value: 120 },
              { label: "Feb", value: 145 },
              { label: "Mar", value: 132 },
              { label: "Apr", value: 156 },
              { label: "May", value: 168 },
              { label: "Jun", value: 172 },
            ]}
            className="mb-6"
          />
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-md p-4">
                  <div className="text-lg font-medium mb-4">
                    Customer Lifetime Value
                  </div>
                  <div className="flex items-center justify-center h-40">
                    <div className="relative w-40 h-40">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="10"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="10"
                          strokeDasharray="283"
                          strokeDashoffset="70"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold">
                          {formatPrice(4250)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Avg. CLV
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-green-500">+15% increase</span>
                      <span>from last year</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="text-lg font-medium mb-4">
                    Customer Retention
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">First-time Customers</span>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <div
                          style={{
                            height: "12px",
                            width: "65%",
                            backgroundColor: "#3b82f6",
                            borderRadius: "9999px",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">Returning Customers</span>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <div
                          style={{
                            height: "12px",
                            width: "35%",
                            backgroundColor: "#22c55e",
                            borderRadius: "9999px",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="text-sm font-medium mb-2">
                        Retention Rate by Month
                      </div>
                      <div className="flex items-end h-20 gap-1">
                        {[30, 32, 28, 35, 40, 38, 42, 45, 48, 50, 52, 55].map(
                          (value, i) => (
                            <div
                              key={i}
                              className="flex-1 flex flex-col items-center"
                            >
                              <div
                                style={{
                                  width: "100%",
                                  height: `${value}%`,
                                  backgroundColor: "#3b82f6",
                                  borderTopLeftRadius: "2px",
                                  borderTopRightRadius: "2px",
                                }}
                              ></div>
                              <div className="text-xs mt-1">{i + 1}</div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <BasicBarChart
            title="Top Products by Views"
            description="Most viewed products on your store"
            data={[
              {
                label: "Luxury Marble Flooring",
                value: 1200,
                color: "bg-blue-500",
              },
              {
                label: "Premium Wall Paint",
                value: 980,
                color: "bg-green-500",
              },
              {
                label: "Modern Pendant Light",
                value: 850,
                color: "bg-yellow-500",
              },
              { label: "Ceramic Vase", value: 720, color: "bg-purple-500" },
              {
                label: "Decorative Wall Panel",
                value: 650,
                color: "bg-pink-500",
              },
            ]}
            className="mb-6"
          />

          <BasicPieChart
            title="Inventory Distribution"
            description="Current inventory levels by category"
            data={[
              { label: "Flooring", value: 156, color: "#3b82f6" },
              { label: "Wall Products", value: 85, color: "#22c55e" },
              { label: "Lighting", value: 28, color: "#eab308" },
              { label: "Decor", value: 42, color: "#a855f7" },
            ]}
          />
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-md p-4">
                  <div className="text-lg font-medium mb-4">
                    Product Views vs. Purchases
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Luxury Marble Flooring",
                        views: 1200,
                        purchases: 42,
                        ratio: 3.5,
                      },
                      {
                        name: "Premium Wall Paint",
                        views: 980,
                        purchases: 78,
                        ratio: 8.0,
                      },
                      {
                        name: "Modern Pendant Light",
                        views: 850,
                        purchases: 36,
                        ratio: 4.2,
                      },
                      {
                        name: "Ceramic Vase",
                        views: 720,
                        purchases: 54,
                        ratio: 7.5,
                      },
                    ].map((product, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            {product.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {product.ratio}% conversion
                          </span>
                        </div>
                        <div className="relative h-6 bg-muted rounded-full overflow-hidden">
                          <div
                            style={{
                              position: "absolute",
                              inset: "0 0 0 0",
                              height: "100%",
                              width: "100%",
                              backgroundColor: "rgba(59, 130, 246, 0.2)",
                            }}
                          ></div>
                          <div
                            style={{
                              position: "absolute",
                              inset: "0 0 0 0",
                              height: "100%",
                              width: `${product.ratio}%`,
                              backgroundColor: "#3b82f6",
                            }}
                          ></div>
                          <div className="absolute inset-0 flex items-center justify-between px-3">
                            <span className="text-xs font-medium text-blue-900">
                              {product.purchases} purchases
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {product.views} views
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="text-lg font-medium mb-4">
                    Inventory Status
                  </div>
                  <div className="relative pt-10">
                    <div className="absolute top-0 left-0 w-full flex justify-between text-xs text-muted-foreground">
                      <span>Low Stock</span>
                      <span>Medium</span>
                      <span>Well Stocked</span>
                    </div>
                    <div className="h-4 w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"></div>
                    <div className="mt-6 space-y-4">
                      {[
                        {
                          name: "Luxury Marble Flooring",
                          stock: 156,
                          percentage: 78,
                        },
                        {
                          name: "Premium Wall Paint",
                          stock: 85,
                          percentage: 42,
                        },
                        {
                          name: "Modern Pendant Light",
                          stock: 28,
                          percentage: 14,
                        },
                        { name: "Ceramic Vase", stock: 42, percentage: 21 },
                        {
                          name: "Decorative Wall Panel",
                          stock: 15,
                          percentage: 7,
                        },
                      ].map((product, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm">{product.name}</span>
                            <span className="text-sm">
                              {product.stock} units
                            </span>
                          </div>
                          <div className="relative">
                            <div className="h-2 w-full bg-muted rounded-full"></div>
                            <div
                              style={{
                                position: "absolute",
                                inset: "0 auto 0 0",
                                height: "8px",
                                width: `${product.percentage}%`,
                                backgroundColor: "#3b82f6",
                                borderRadius: "9999px",
                              }}
                            ></div>
                            <div
                              style={{
                                position: "absolute",
                                top: "50%",
                                transform: "translateY(-50%)",
                                left: `${product.percentage}%`,
                                height: "16px",
                                width: "4px",
                                backgroundColor: "black",
                                borderRadius: "9999px",
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketing" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-64">
                <Badge variant="outline" className="text-muted-foreground">
                  Marketing analytics coming soon
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
