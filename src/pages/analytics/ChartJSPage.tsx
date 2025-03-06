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
import ChartJS from "@/components/analytics/ChartJS";

const ChartJSPage = () => {
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
          <ChartJS
            title="Monthly Sales"
            description="Revenue over the past 12 months"
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
                    65000, 58000, 72000, 68000, 79000, 85000, 92000, 88000,
                    94000, 99000, 105000, 118000,
                  ],
                  borderColor: "#3b82f6",
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  borderWidth: 2,
                  fill: true,
                },
              ],
            }}
            className="mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartJS
              title="Sales by Category"
              description="Distribution of sales across product categories"
              type="pie"
              data={{
                labels: ["Flooring", "Wall Products", "Lighting", "Decor"],
                datasets: [
                  {
                    label: "Sales by Category",
                    data: [42, 28, 18, 12],
                    backgroundColor: [
                      "#3b82f6",
                      "#22c55e",
                      "#eab308",
                      "#a855f7",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
            />

            <ChartJS
              title="Top Selling Products"
              description="Best performing products by revenue"
              type="bar"
              data={{
                labels: [
                  "Luxury Marble",
                  "Premium Paint",
                  "Pendant Light",
                  "Ceramic Vase",
                  "Wall Panel",
                ],
                datasets: [
                  {
                    label: "Revenue",
                    data: [54599, 27299, 32399, 26999, 23199],
                    backgroundColor: [
                      "#3b82f6",
                      "#22c55e",
                      "#eab308",
                      "#a855f7",
                      "#ec4899",
                    ],
                    borderWidth: 0,
                  },
                ],
              }}
              options={{
                indexAxis: "y",
              }}
            />
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <ChartJS
            title="Sales Trend"
            description="Daily sales for the past 30 days"
            type="line"
            data={{
              labels: ["1", "5", "10", "15", "20", "25", "30"],
              datasets: [
                {
                  label: "Daily Sales",
                  data: [2400, 1800, 3200, 4500, 5100, 6200, 4800],
                  borderColor: "#3b82f6",
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  borderWidth: 2,
                  fill: true,
                },
              ],
            }}
            className="mb-6"
          />

          <ChartJS
            title="Revenue by Category"
            description="Sales distribution across product categories"
            type="bar"
            data={{
              labels: ["Flooring", "Wall Products", "Lighting", "Decor"],
              datasets: [
                {
                  label: "Revenue",
                  data: [42, 28, 18, 12],
                  backgroundColor: ["#3b82f6", "#22c55e", "#eab308", "#a855f7"],
                  borderWidth: 0,
                },
              ],
            }}
            className="mb-6"
          />
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <ChartJS
            title="Customer Segments"
            description="Distribution of customers by segment"
            type="bar"
            data={{
              labels: [
                "One-time Customers",
                "Repeat Customers",
                "Loyal Customers",
              ],
              datasets: [
                {
                  label: "Customers",
                  data: [1245, 876, 337],
                  backgroundColor: ["#3b82f6", "#22c55e", "#eab308"],
                  borderWidth: 0,
                },
              ],
            }}
            className="mb-6"
          />

          <ChartJS
            title="New Customers"
            description="New customer acquisition over time"
            type="line"
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [
                {
                  label: "New Customers",
                  data: [120, 145, 132, 156, 168, 172],
                  borderColor: "#3b82f6",
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  borderWidth: 2,
                  fill: true,
                },
              ],
            }}
            className="mb-6"
          />
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <ChartJS
            title="Top Products by Views"
            description="Most viewed products on your store"
            type="bar"
            data={{
              labels: [
                "Luxury Marble",
                "Premium Paint",
                "Pendant Light",
                "Ceramic Vase",
                "Wall Panel",
              ],
              datasets: [
                {
                  label: "Views",
                  data: [1200, 980, 850, 720, 650],
                  backgroundColor: [
                    "#3b82f6",
                    "#22c55e",
                    "#eab308",
                    "#a855f7",
                    "#ec4899",
                  ],
                  borderWidth: 0,
                },
              ],
            }}
            className="mb-6"
          />

          <ChartJS
            title="Inventory Distribution"
            description="Current inventory levels by category"
            type="doughnut"
            data={{
              labels: ["Flooring", "Wall Products", "Lighting", "Decor"],
              datasets: [
                {
                  label: "Inventory Distribution",
                  data: [156, 85, 28, 42],
                  backgroundColor: ["#3b82f6", "#22c55e", "#eab308", "#a855f7"],
                  borderWidth: 1,
                },
              ],
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChartJSPage;
