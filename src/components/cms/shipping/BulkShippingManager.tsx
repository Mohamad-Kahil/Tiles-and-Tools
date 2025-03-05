import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Truck,
  Package,
  Search,
  Filter,
  Download,
  Upload,
  Printer,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const BulkShippingManager = () => {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock orders data
  const orders = [
    {
      id: "ORD-2023-1001",
      customer: "Ahmed Hassan",
      date: "2023-08-15",
      items: 3,
      destination: "Cairo",
      status: "Ready to Ship",
      carrier: "",
    },
    {
      id: "ORD-2023-1002",
      customer: "Laila Mahmoud",
      date: "2023-08-15",
      items: 1,
      destination: "Alexandria",
      status: "Ready to Ship",
      carrier: "",
    },
    {
      id: "ORD-2023-1003",
      customer: "Mohamed Ali",
      date: "2023-08-14",
      items: 2,
      destination: "Giza",
      status: "Ready to Ship",
      carrier: "",
    },
    {
      id: "ORD-2023-1004",
      customer: "Sara Ahmed",
      date: "2023-08-14",
      items: 4,
      destination: "Hurghada",
      status: "Processing",
      carrier: "",
    },
    {
      id: "ORD-2023-1005",
      customer: "Khaled Ibrahim",
      date: "2023-08-13",
      items: 2,
      destination: "Luxor",
      status: "Processing",
      carrier: "",
    },
    {
      id: "ORD-2023-1006",
      customer: "Nour Hassan",
      date: "2023-08-13",
      items: 1,
      destination: "Cairo",
      status: "Shipped",
      carrier: "Aramex",
    },
    {
      id: "ORD-2023-1007",
      customer: "Omar Mahmoud",
      date: "2023-08-12",
      items: 3,
      destination: "Alexandria",
      status: "Shipped",
      carrier: "Egypt Post",
    },
  ];

  // Filter orders based on status and search term
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    const matchesSearch =
      searchTerm === "" ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.destination.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Handle select all checkbox
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(filteredOrders.map((order) => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  // Handle individual order selection
  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    }
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Ready to Ship":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      default:
        return "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" /> Bulk Shipping Manager
        </CardTitle>
        <CardDescription>
          Process multiple shipments at once and generate shipping labels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
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

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Ready to Ship">Ready to Ship</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" /> Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={
                      filteredOrders.length > 0 &&
                      selectedOrders.length === filteredOrders.length
                    }
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Carrier</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-4 text-muted-foreground"
                  >
                    No orders found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedOrders.includes(order.id)}
                        onCheckedChange={(checked) =>
                          handleSelectOrder(order.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>{order.destination}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusBadgeColor(order.status)}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {order.carrier ? (
                        order.carrier
                      ) : (
                        <Select>
                          <SelectTrigger className="w-[120px] h-8">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="aramex">Aramex</SelectItem>
                            <SelectItem value="egypt_post">
                              Egypt Post
                            </SelectItem>
                            <SelectItem value="dhl">DHL</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {selectedOrders.length} of {filteredOrders.length} orders selected
          </div>

          <div className="flex gap-2">
            <Button variant="outline" disabled={selectedOrders.length === 0}>
              <Package className="mr-2 h-4 w-4" /> Generate Packages
            </Button>
            <Button variant="outline" disabled={selectedOrders.length === 0}>
              <Printer className="mr-2 h-4 w-4" /> Print Labels
            </Button>
            <Button disabled={selectedOrders.length === 0}>
              <Truck className="mr-2 h-4 w-4" /> Process Shipments
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-md bg-muted/20">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div>
              <h4 className="font-medium">Bulk Processing Available</h4>
              <p className="text-sm text-muted-foreground">
                You can process up to 50 shipments at once
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            <div>
              <h4 className="font-medium">Carrier API Status</h4>
              <p className="text-sm text-muted-foreground">
                All carrier APIs are operational
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkShippingManager;
