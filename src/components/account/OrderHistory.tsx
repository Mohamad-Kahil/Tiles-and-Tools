import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Eye,
  Download,
  RotateCcw,
  Calendar,
  Package,
} from "lucide-react";

const OrderHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");

  // Mock orders data
  const orders = [
    {
      id: "ORD-2023-1001",
      date: "2023-08-15T14:30:00Z",
      status: "Delivered",
      total: 3499.97,
      items: 3,
      trackingNumber: "EGY123456789",
    },
    {
      id: "ORD-2023-1002",
      date: "2023-08-01T10:15:00Z",
      status: "Delivered",
      total: 1899.5,
      items: 2,
      trackingNumber: "EGY987654321",
    },
    {
      id: "ORD-2023-1003",
      date: "2023-07-20T16:45:00Z",
      status: "Delivered",
      total: 5299.99,
      items: 7,
      trackingNumber: "EGY456789123",
    },
    {
      id: "ORD-2023-1004",
      date: "2023-09-12T09:20:00Z",
      status: "Processing",
      total: 2499.75,
      items: 3,
      trackingNumber: null,
    },
    {
      id: "ORD-2023-1005",
      date: "2023-09-05T13:10:00Z",
      status: "Shipped",
      total: 1299.99,
      items: 2,
      trackingNumber: "EGY789123456",
    },
    {
      id: "ORD-2023-1006",
      date: "2023-06-10T11:30:00Z",
      status: "Delivered",
      total: 4799.5,
      items: 6,
      trackingNumber: "EGY321654987",
    },
  ];

  // Filter orders based on search term, status, and time
  const filteredOrders = orders.filter((order) => {
    // Search filter
    const matchesSearch = order.id
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus =
      statusFilter === "all" ||
      order.status.toLowerCase() === statusFilter.toLowerCase();

    // Time filter
    const orderDate = new Date(order.date);
    const now = new Date();
    const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3));
    const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 3)); // -6 months total
    const oneYearAgo = new Date(now.setMonth(now.getMonth() - 6)); // -12 months total

    let matchesTime = true;
    if (timeFilter === "3months") {
      matchesTime = orderDate >= threeMonthsAgo;
    } else if (timeFilter === "6months") {
      matchesTime = orderDate >= sixMonthsAgo;
    } else if (timeFilter === "1year") {
      matchesTime = orderDate >= oneYearAgo;
    }

    return matchesSearch && matchesStatus && matchesTime;
  });

  // Format price
  const formatPrice = (price: number) => {
    return price.toLocaleString("ar-EG", {
      style: "currency",
      currency: "EGP",
    });
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "shipped":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "processing":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="hidden md:table-cell">Items</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{new Date(order.date).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={getStatusColor(order.status)}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatPrice(order.total)}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {order.items} items
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/account/orders/${order.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only md:not-sr-only md:ml-2">
                              View
                            </span>
                          </Link>
                        </Button>
                        {order.status === "Delivered" && (
                          <Button variant="outline" size="sm">
                            <RotateCcw className="h-4 w-4" />
                            <span className="sr-only md:not-sr-only md:ml-2">
                              Return
                            </span>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recently Viewed Orders */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Recently Viewed Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.slice(0, 3).map((order) => (
            <Card key={order.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">{order.id}</CardTitle>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(order.status)}
                  >
                    {order.status}
                  </Badge>
                </div>
                <CardDescription>
                  {new Date(order.date).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-medium">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items</span>
                    <span>{order.items} items</span>
                  </div>
                  {order.trackingNumber && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tracking</span>
                      <span className="font-mono text-xs">
                        {order.trackingNumber}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
              <div className="px-6 pb-6">
                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/account/orders/${order.id}`}>
                    <Eye className="mr-2 h-4 w-4" /> View Order Details
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
