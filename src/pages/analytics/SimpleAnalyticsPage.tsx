import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BarChart2,
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  Download,
  Filter,
} from "lucide-react";
import SimpleBarChart from "@/components/analytics/SimpleBarChart";
import SimplePieChart from "@/components/analytics/SimplePieChart";
import SimpleLineChart from "@/components/analytics/SimpleLineChart";

const SimpleAnalyticsPage = () => {
  // Mock summary data
  const summaryData = {
    totalRevenue: 1245678.99,
    totalOrders: 3256,
    averageOrderValue: 382.58,
    conversionRate: 3.8,
  };

  // Format price
  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "EGP",
    });
  };

  // Sample data for charts
  const monthlySalesData = [
    { label: "Jan", value: 65000 },
    { label: "Feb", value: 58000 },
    { label: "Mar", value: 72000 },
    { label: "Apr", value: 68000 },
    { label: "May", value: 79000 },
    { label: "Jun", value: 85000 },
    { label: "Jul", value: 92000 },
    { label: "Aug", value: 88000 },
    { label: "Sep", value: 94000 },
    { label: "Oct", value: 99000 },
    { label: "Nov", value: 105000 },
    { label: "Dec", value: 118000 },
  ];

  const categoryData = [
    { label: "Flooring", value: 42, color: "bg-blue-500" },
    { label: "Wall Products", value: 28, color: "bg-green-500" },
    { label: "Lighting", value: 18, color: "bg-yellow-500" },
    { label: "Decor", value: 12, color: "bg-purple-500" },
  ];

  const pieChartData = [
    { label: "Flooring", value: 42, color: "#3b82f6" },
    { label: "Wall Products", value: 28, color: "#22c55e" },
    { label: "Lighting", value: 18, color: "#eab308" },
    { label: "Decor", value: 12, color: "#a855f7" },
  ];

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
          </TabsList>

          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <SimpleLineChart
            title="Monthly Sales"
            description="Revenue over the past 12 months"
            data={monthlySalesData}
            formatValue={formatPrice}
            className="mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SimplePieChart
              title="Sales by Category"
              description="Distribution of sales across product categories"
              data={pieChartData}
            />

            <SimpleBarChart
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
          <SimpleLineChart
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

          <SimpleBarChart
            title="Revenue by Category"
            description="Sales distribution across product categories"
            data={categoryData}
            className="mb-6"
          />
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <SimpleBarChart
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

          <SimpleLineChart
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
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <SimpleBarChart
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

          <SimplePieChart
            title="Inventory Distribution"
            description="Current inventory levels by category"
            data={[
              { label: "Flooring", value: 156, color: "#3b82f6" },
              { label: "Wall Products", value: 85, color: "#22c55e" },
              { label: "Lighting", value: 28, color: "#eab308" },
              { label: "Decor", value: 42, color: "#a855f7" },
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimpleAnalyticsPage;
