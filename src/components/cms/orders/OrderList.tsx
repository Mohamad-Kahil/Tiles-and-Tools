import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MoreVertical,
  Eye,
  FileText,
  Truck,
  AlertTriangle,
  CheckCircle,
  RotateCcw,
} from "lucide-react";

// Mock order data
const mockOrders = [
  {
    id: "ORD-2023-1001",
    customer: {
      name: "Ahmed Hassan",
      email: "ahmed.hassan@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
    },
    date: "2023-08-15T14:30:00Z",
    status: "Delivered",
    total: 3499.97,
    items: 5,
    paymentMethod: "Credit Card",
    shippingMethod: "Standard Delivery",
  },
  {
    id: "ORD-2023-1002",
    customer: {
      name: "Nour El-Din",
      email: "nour.eldin@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nour",
    },
    date: "2023-08-14T10:15:00Z",
    status: "Processing",
    total: 1899.5,
    items: 2,
    paymentMethod: "Cash on Delivery",
    shippingMethod: "Express Delivery",
  },
  {
    id: "ORD-2023-1003",
    customer: {
      name: "Laila Mahmoud",
      email: "laila.mahmoud@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laila",
    },
    date: "2023-08-13T16:45:00Z",
    status: "Shipped",
    total: 5299.99,
    items: 7,
    paymentMethod: "Credit Card",
    shippingMethod: "Standard Delivery",
  },
  {
    id: "ORD-2023-1004",
    customer: {
      name: "Mohamed Ali",
      email: "mohamed.ali@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamed",
    },
    date: "2023-08-12T09:20:00Z",
    status: "Pending Payment",
    total: 2499.75,
    items: 3,
    paymentMethod: "Bank Transfer",
    shippingMethod: "Standard Delivery",
  },
  {
    id: "ORD-2023-1005",
    customer: {
      name: "Sara Ahmed",
      email: "sara.ahmed@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
    },
    date: "2023-08-11T13:10:00Z",
    status: "Cancelled",
    total: 1299.99,
    items: 2,
    paymentMethod: "Credit Card",
    shippingMethod: "Express Delivery",
  },
  {
    id: "ORD-2023-1006",
    customer: {
      name: "Khaled Ibrahim",
      email: "khaled.ibrahim@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khaled",
    },
    date: "2023-08-10T11:30:00Z",
    status: "Delivered",
    total: 4799.5,
    items: 6,
    paymentMethod: "Fawry",
    shippingMethod: "Standard Delivery",
  },
];

const OrderList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Filter orders based on search term and filters
  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      order.status.toLowerCase() === statusFilter.toLowerCase();

    // Date filtering logic
    const orderDate = new Date(order.date);
    const now = new Date();
    const oneDayAgo = new Date(now.setDate(now.getDate() - 1));
    const oneWeekAgo = new Date(now.setDate(now.getDate() - 6)); // -7 days total
    const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));

    let matchesDate = true;
    if (dateFilter === "today") {
      matchesDate = orderDate >= oneDayAgo;
    } else if (dateFilter === "week") {
      matchesDate = orderDate >= oneWeekAgo;
    } else if (dateFilter === "month") {
      matchesDate = orderDate >= oneMonthAgo;
    }

    return matchesSearch && matchesStatus && matchesDate;
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
      case "pending payment":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
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
              <SelectItem value="pending payment">Pending Payment</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Last 24 Hours</SelectItem>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button className="w-full sm:w-auto" variant="outline" asChild>
            <Link to="/cms/orders/export">
              <FileText className="mr-2 h-4 w-4" /> Export Orders
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" variant="outline" asChild>
            <Link to="/cms/orders/return-management">
              <RotateCcw className="mr-2 h-4 w-4" /> Manage Returns
            </Link>
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
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
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full overflow-hidden bg-muted">
                        <img
                          src={order.customer.avatar}
                          alt={order.customer.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{order.customer.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {order.customer.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(order.date).toLocaleDateString()}
                    <div className="text-xs text-muted-foreground">
                      {new Date(order.date).toLocaleTimeString()}
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
                  <TableCell>
                    <div>{formatPrice(order.total)}</div>
                    <div className="text-xs text-muted-foreground">
                      {order.items} items
                    </div>
                  </TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/cms/orders/${order.id}`}>
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/cms/orders/${order.id}/invoice`}>
                            <FileText className="mr-2 h-4 w-4" /> Generate
                            Invoice
                          </Link>
                        </DropdownMenuItem>
                        {order.status === "Processing" && (
                          <DropdownMenuItem asChild>
                            <Link to={`/cms/orders/${order.id}/ship`}>
                              <Truck className="mr-2 h-4 w-4" /> Mark as Shipped
                            </Link>
                          </DropdownMenuItem>
                        )}
                        {(order.status === "Processing" ||
                          order.status === "Pending Payment") && (
                          <DropdownMenuItem className="text-red-600">
                            <AlertTriangle className="mr-2 h-4 w-4" /> Cancel
                            Order
                          </DropdownMenuItem>
                        )}
                        {order.status === "Shipped" && (
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" /> Mark as
                            Delivered
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrderList;
