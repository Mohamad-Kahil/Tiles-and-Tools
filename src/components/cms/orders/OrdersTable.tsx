import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  date: string;
  status: string;
  total: number;
  paymentMethod: string;
  items: number;
}

interface OrdersTableProps {
  orders: Order[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  // Format price with English locale
  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            {status}
          </Badge>
        );
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            {status}
          </Badge>
        );
      case "pending":
      case "pending payment":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            {status}
          </Badge>
        );
      case "shipped":
        return (
          <Badge variant="outline" className="bg-indigo-100 text-indigo-800">
            {status}
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            {status}
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
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b text-sm">
            <th className="text-left font-medium py-3 px-2">Order ID</th>
            <th className="text-left font-medium py-3 px-2">Customer</th>
            <th className="text-left font-medium py-3 px-2">Date</th>
            <th className="text-left font-medium py-3 px-2">Status</th>
            <th className="text-right font-medium py-3 px-2">Total</th>
            <th className="text-left font-medium py-3 px-2">Payment Method</th>
            <th className="text-right font-medium py-3 px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b hover:bg-muted/50">
              <td className="py-3 px-2">
                <Link
                  to={`/cms/orders/${order.id}`}
                  className="font-medium text-primary hover:underline"
                >
                  {order.id}
                </Link>
              </td>
              <td className="py-3 px-2">
                <div className="flex items-center gap-2">
                  {order.customer.avatar ? (
                    <img
                      src={order.customer.avatar}
                      alt={order.customer.name}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                      {order.customer.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{order.customer.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {order.customer.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-2">
                <div className="text-sm">
                  {new Date(order.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(order.date).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </td>
              <td className="py-3 px-2">{getStatusBadge(order.status)}</td>
              <td className="py-3 px-2 text-right">
                <div className="font-medium">{formatPrice(order.total)}</div>
                <div className="text-xs text-muted-foreground">
                  {order.items} items
                </div>
              </td>
              <td className="py-3 px-2">{order.paymentMethod}</td>
              <td className="py-3 px-2 text-right">
                <div className="flex justify-end items-center gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/cms/orders/${order.id}`}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link to={`/cms/orders/${order.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Update Status</DropdownMenuItem>
                      <DropdownMenuItem>Send Invoice</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        Cancel Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
