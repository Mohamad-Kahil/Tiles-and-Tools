import React from "react";
import SalesChart from "@/components/analytics/SalesChart";
import CustomerInsights from "@/components/analytics/CustomerInsights";
import ProductPerformance from "@/components/analytics/ProductPerformance";
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
} from "lucide-react";

const AnalyticsPage = () => {
  // Mock summary data
  const summaryData = {
    totalRevenue: 1245678.99,
    totalOrders: 3256,
    averageOrderValue: 382.58,
    conversionRate: 3.8,
  };

  // Format price
  const formatPrice = (price: number) => {
    return price.toLocaleString("ar-EG", {
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
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
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
          <SalesChart className="mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CustomerInsights />
            <ProductPerformance />
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <SalesChart className="mb-6" />
          {/* Additional sales-specific components would go here */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-64">
                <Badge variant="outline" className="text-muted-foreground">
                  More detailed sales analytics coming soon
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <CustomerInsights />
          {/* Additional customer-specific components would go here */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-64">
                <Badge variant="outline" className="text-muted-foreground">
                  More detailed customer analytics coming soon
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <ProductPerformance />
          {/* Additional product-specific components would go here */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-64">
                <Badge variant="outline" className="text-muted-foreground">
                  More detailed product analytics coming soon
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
