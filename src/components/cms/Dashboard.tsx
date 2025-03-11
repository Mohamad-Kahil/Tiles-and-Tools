import React from "react";
import ChartComponent from "./analytics/ChartComponent";
import GenerateReportDialog from "./reports/GenerateReportDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import {
  BarChart2,
  ShoppingBag,
  Users,
  Package,
  Truck,
  Tag,
  Settings,
  CreditCard,
  Calendar,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Layers,
  FileText,
  Grid,
  MessageSquare,
  DollarSign,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const Dashboard = () => {
  // Mock data
  const stats = {
    totalRevenue: 1245678.99,
    totalOrders: 3256,
    pendingOrders: 42,
    lowStockItems: 15,
    totalCustomers: 2458,
    newCustomers: 156,
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

  // Recent orders data
  const recentOrders = [
    {
      id: "ORD-5523",
      customer: "Ahmed Hassan",
      date: "2023-08-15",
      status: "completed",
      total: 2499.99,
    },
    {
      id: "ORD-5522",
      customer: "Fatima Ali",
      date: "2023-08-15",
      status: "processing",
      total: 1850.5,
    },
    {
      id: "ORD-5521",
      customer: "Mohamed Ibrahim",
      date: "2023-08-14",
      status: "completed",
      total: 3299.99,
    },
    {
      id: "ORD-5520",
      customer: "Layla Mahmoud",
      date: "2023-08-14",
      status: "pending",
      total: 4750.0,
    },
    {
      id: "ORD-5519",
      customer: "Omar Samir",
      date: "2023-08-13",
      status: "completed",
      total: 1299.99,
    },
  ];

  // Low stock items
  const lowStockItems = [
    { name: "Modern Pendant Light Fixture", stock: 5, category: "Lighting" },
    { name: "Decorative Wall Panel", stock: 8, category: "Wall Products" },
    { name: "Premium Marble Tile - Beige", stock: 12, category: "Flooring" },
    { name: "Handcrafted Ceramic Vase - Large", stock: 3, category: "Decor" },
  ];

  // Sales by category data for chart
  const categoryData = [
    { label: "Flooring", value: 42 },
    { label: "Wall Products", value: 28 },
    { label: "Lighting", value: 18 },
    { label: "Decor", value: 12 },
  ];

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        );
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Processing
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your store management dashboard
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Aug 15, 2023
          </Button>
          <GenerateReportDialog />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {formatPrice(stats.totalRevenue)}
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
                  {stats.totalOrders.toLocaleString()}
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
                  Total Customers
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {stats.totalCustomers.toLocaleString()}
                </h3>
                <div className="flex items-center mt-1 text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-xs">+5.3% from last month</span>
                </div>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <Users className="h-5 w-5 text-primary" />
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
                <h3 className="text-2xl font-bold mt-1">
                  {formatPrice(stats.averageOrderValue)}
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
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Sales Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Daily revenue for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartComponent
                type="bar"
                data={{
                  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                  datasets: [
                    {
                      label: "Daily Revenue",
                      data: [4500, 3800, 5200, 7500, 9100, 8200, 6800],
                      backgroundColor: "#3b82f6",
                      borderWidth: 0,
                    },
                  ],
                }}
                height={300}
                width={800}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>
              Distribution across product categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ChartComponent
                type="pie"
                data={{
                  labels: categoryData.map((cat) => cat.label),
                  datasets: [
                    {
                      label: "Sales by Category",
                      data: categoryData.map((cat) => cat.value),
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
                height={200}
                width={300}
              />
            </div>

            <div className="space-y-4">
              {categoryData.map((category, index) => {
                const colors = [
                  "bg-blue-500",
                  "bg-green-500",
                  "bg-yellow-500",
                  "bg-purple-500",
                ];
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {category.label}
                      </span>
                      <span className="text-sm">{category.value}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${colors[index % colors.length]}`}
                        style={{ width: `${category.value}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t">
              <h4 className="text-sm font-medium mb-4">Top Selling Product</h4>
              <div className="flex items-center gap-4">
                <div className="bg-muted rounded-md w-16 h-16 flex items-center justify-center">
                  <Layers className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h5 className="font-medium">Luxury Marble Flooring Tile</h5>
                  <p className="text-sm text-muted-foreground mt-1">
                    54 units sold this month
                  </p>
                  <p className="text-sm font-medium text-primary mt-1">
                    {formatPrice(1299.99)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer purchases</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/cms/orders">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-sm">
                    <th className="text-left font-medium py-3 px-2">
                      Order ID
                    </th>
                    <th className="text-left font-medium py-3 px-2">
                      Customer
                    </th>
                    <th className="text-left font-medium py-3 px-2">Date</th>
                    <th className="text-left font-medium py-3 px-2">Status</th>
                    <th className="text-right font-medium py-3 px-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2">
                        <Link
                          to={`/cms/orders/${order.id}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {order.id}
                        </Link>
                      </td>
                      <td className="py-3 px-2">{order.customer}</td>
                      <td className="py-3 px-2">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-2">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="py-3 px-2 text-right">
                        {formatPrice(order.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Alerts */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Inventory Alerts</CardTitle>
                <CardDescription>Products with low stock</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/cms/inventory">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 pb-4 border-b last:border-0"
                >
                  <div className="bg-red-100 text-red-800 p-2 rounded-full">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Only{" "}
                        <span className="text-red-600 font-medium">
                          {item.stock}
                        </span>{" "}
                        left in stock
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access */}
      <h2 className="text-xl font-bold mb-4">Quick Access</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <Link to="/cms/products">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Products</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your product catalog
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/cms/orders">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Orders</h3>
              <p className="text-sm text-muted-foreground mt-1">
                View and manage customer orders
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/cms/customers">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Customers</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your customer database
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/cms/promotions">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Tag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Promotions</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Create and manage discounts
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/cms/shipping">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Shipping</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Manage shipping methods and rates
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/cms/payments">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Payments</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Configure payment methods
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/cms/content">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Grid className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Content</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Manage website content
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/cms/settings">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Settings</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Configure store settings
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Activity & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in your store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "New order received",
                  details: "Order #ORD-5523 from Ahmed Hassan",
                  time: "10 minutes ago",
                  icon: <ShoppingBag className="h-4 w-4" />,
                },
                {
                  action: "Product updated",
                  details: "Luxury Marble Flooring Tile price changed",
                  time: "1 hour ago",
                  icon: <Package className="h-4 w-4" />,
                },
                {
                  action: "New customer registered",
                  details: "Layla Mahmoud created an account",
                  time: "2 hours ago",
                  icon: <Users className="h-4 w-4" />,
                },
                {
                  action: "Order status changed",
                  details: "Order #ORD-5520 marked as processing",
                  time: "3 hours ago",
                  icon: <CheckCircle className="h-4 w-4" />,
                },
                {
                  action: "Promotion created",
                  details: "Summer Sale promotion added",
                  time: "5 hours ago",
                  icon: <Tag className="h-4 w-4" />,
                },
              ].map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    {activity.icon}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.details}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support & Help */}
        <Card>
          <CardHeader>
            <CardTitle>Support & Resources</CardTitle>
            <CardDescription>Get help and learn more</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" /> Support
                  Tickets
                </h3>
                <div className="mt-2 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Active tickets
                    </p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                  <Button size="sm" asChild>
                    <Link to="/cms/support">View Tickets</Link>
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Quick Links</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    asChild
                  >
                    <Link to="/cms/analytics">
                      <BarChart2 className="mr-2 h-4 w-4" /> Analytics
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    asChild
                  >
                    <Link to="/cms/inventory">
                      <Package className="mr-2 h-4 w-4" /> Inventory
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    asChild
                  >
                    <Link to="/cms/roles">
                      <Users className="mr-2 h-4 w-4" /> User Roles
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    asChild
                  >
                    <Link to="/cms/settings">
                      <Settings className="mr-2 h-4 w-4" /> Settings
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-primary/5">
                <h3 className="font-medium mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Our support team is available to assist you with any questions
                  or issues.
                </p>
                <Button variant="default" size="sm" className="w-full">
                  Contact Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
