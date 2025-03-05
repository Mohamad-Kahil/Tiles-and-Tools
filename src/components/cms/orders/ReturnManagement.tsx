import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  ArrowLeft,
  RotateCcw,
  DollarSign,
  CheckCircle,
  XCircle,
  Calendar,
  Package,
  Truck,
  FileText,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

const ReturnManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  // Mock returns data
  const returns = [
    {
      id: "RET-2023-001",
      orderId: "ORD-2023-1001",
      customer: {
        name: "Ahmed Hassan",
        email: "ahmed.hassan@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
      },
      date: "2023-09-05T14:30:00Z",
      status: "Approved",
      items: [
        {
          id: "prod1",
          name: "Luxury Marble Flooring Tile",
          price: 1299.99,
          quantity: 1,
          reason: "Damaged during shipping",
          image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&q=80",
        },
      ],
      total: 1299.99,
      refundStatus: "Completed",
      refundMethod: "Credit Card",
      refundAmount: 1299.99,
      notes: "Customer reported cracks in the tiles upon delivery.",
    },
    {
      id: "RET-2023-002",
      orderId: "ORD-2023-1002",
      customer: {
        name: "Nour El-Din",
        email: "nour.eldin@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nour",
      },
      date: "2023-09-10T10:15:00Z",
      status: "Pending",
      items: [
        {
          id: "prod2",
          name: "Premium Wall Paint - Desert Sand",
          price: 349.99,
          quantity: 2,
          reason: "Wrong color",
          image:
            "https://images.unsplash.com/photo-1562184552-997c461abbe6?w=300&q=80",
        },
      ],
      total: 699.98,
      refundStatus: "Pending",
      refundMethod: "Store Credit",
      refundAmount: 699.98,
      notes: "Customer received a different shade than what was ordered.",
    },
    {
      id: "RET-2023-003",
      orderId: "ORD-2023-1003",
      customer: {
        name: "Laila Mahmoud",
        email: "laila.mahmoud@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laila",
      },
      date: "2023-09-12T16:45:00Z",
      status: "Received",
      items: [
        {
          id: "prod3",
          name: "Modern Pendant Light Fixture",
          price: 899.99,
          quantity: 1,
          reason: "Changed mind",
          image:
            "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=300&q=80",
        },
      ],
      total: 899.99,
      refundStatus: "Processing",
      refundMethod: "Original Payment",
      refundAmount: 809.99, // 10% restocking fee
      notes: "Customer changed their mind. 10% restocking fee applied.",
    },
    {
      id: "RET-2023-004",
      orderId: "ORD-2023-1004",
      customer: {
        name: "Mohamed Ali",
        email: "mohamed.ali@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamed",
      },
      date: "2023-09-15T09:20:00Z",
      status: "Rejected",
      items: [
        {
          id: "prod4",
          name: "Handcrafted Ceramic Vase",
          price: 499.99,
          quantity: 1,
          reason: "No longer needed",
          image:
            "https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?w=300&q=80",
        },
      ],
      total: 499.99,
      refundStatus: "Declined",
      refundMethod: "N/A",
      refundAmount: 0,
      notes:
        "Return request rejected as it was made after the 30-day return window.",
    },
    {
      id: "RET-2023-005",
      orderId: "ORD-2023-1005",
      customer: {
        name: "Sara Ahmed",
        email: "sara.ahmed@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
      },
      date: "2023-09-18T13:10:00Z",
      status: "Approved",
      items: [
        {
          id: "prod5",
          name: "Decorative Wall Panel",
          price: 799.99,
          quantity: 1,
          reason: "Defective product",
          image:
            "https://images.unsplash.com/photo-1620626576474-aad9a5a3e854?w=300&q=80",
        },
      ],
      total: 799.99,
      refundStatus: "Completed",
      refundMethod: "Original Payment",
      refundAmount: 799.99,
      notes: "Product had manufacturing defects. Full refund issued.",
    },
  ];

  // Filter returns based on search term, status, and active tab
  const filteredReturns = returns.filter((returnItem) => {
    // Filter by search term
    const matchesSearch =
      searchTerm === "" ||
      returnItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnItem.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnItem.customer.name.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by status
    const matchesStatus =
      statusFilter === "all" || returnItem.status === statusFilter;

    // Filter by tab
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && returnItem.status === "Pending") ||
      (activeTab === "approved" && returnItem.status === "Approved") ||
      (activeTab === "received" && returnItem.status === "Received") ||
      (activeTab === "rejected" && returnItem.status === "Rejected");

    return matchesSearch && matchesStatus && matchesTab;
  });

  // Format price
  const formatPrice = (price: number) => {
    return price.toLocaleString("ar-EG", {
      style: "currency",
      currency: "EGP",
    });
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Received":
        return "bg-blue-100 text-blue-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  // Get refund status badge color
  const getRefundStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Declined":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="-ml-2">
              <Link to="/cms/orders">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Orders
              </Link>
            </Button>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            Return Management
          </h2>
        </div>
        <Button onClick={() => alert("Create new return request")}>
          <RotateCcw className="mr-2 h-4 w-4" /> New Return Request
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 max-w-2xl">
          <TabsTrigger value="all" className="px-4 py-2">
            All Returns
          </TabsTrigger>
          <TabsTrigger value="pending" className="px-4 py-2">
            Pending
          </TabsTrigger>
          <TabsTrigger value="approved" className="px-4 py-2">
            Approved
          </TabsTrigger>
          <TabsTrigger value="received" className="px-4 py-2">
            Received
          </TabsTrigger>
          <TabsTrigger value="rejected" className="px-4 py-2">
            Rejected
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search returns..."
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
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Received">Received</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Return ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Refund Amount</TableHead>
                <TableHead>Refund Status</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReturns.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center py-4 text-muted-foreground"
                  >
                    No returns found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredReturns.map((returnItem) => (
                  <TableRow key={returnItem.id}>
                    <TableCell className="font-medium">
                      {returnItem.id}
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/cms/orders/${returnItem.orderId}`}
                        className="text-blue-600 hover:underline"
                      >
                        {returnItem.orderId}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full overflow-hidden bg-muted">
                          <img
                            src={returnItem.customer.avatar}
                            alt={returnItem.customer.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">
                            {returnItem.customer.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {returnItem.customer.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>
                          {new Date(returnItem.date).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusBadgeColor(returnItem.status)}
                      >
                        {returnItem.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {returnItem.items.reduce(
                        (total, item) => total + item.quantity,
                        0,
                      )}{" "}
                      items
                    </TableCell>
                    <TableCell>
                      {formatPrice(returnItem.refundAmount)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getRefundStatusBadgeColor(
                          returnItem.refundStatus,
                        )}
                      >
                        {returnItem.refundStatus}
                      </Badge>
                    </TableCell>
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
                            <Link
                              to={`/cms/orders/return-detail/${returnItem.id}`}
                            >
                              <Eye className="mr-2 h-4 w-4" /> View Details
                            </Link>
                          </DropdownMenuItem>
                          {returnItem.status === "Pending" && (
                            <>
                              <DropdownMenuItem
                                onClick={() =>
                                  alert(`Approve return ${returnItem.id}`)
                                }
                              >
                                <CheckCircle className="mr-2 h-4 w-4" /> Approve
                                Return
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  alert(`Reject return ${returnItem.id}`)
                                }
                              >
                                <XCircle className="mr-2 h-4 w-4" /> Reject
                                Return
                              </DropdownMenuItem>
                            </>
                          )}
                          {returnItem.status === "Approved" && (
                            <DropdownMenuItem
                              onClick={() =>
                                alert(
                                  `Mark return ${returnItem.id} as received`,
                                )
                              }
                            >
                              <Package className="mr-2 h-4 w-4" /> Mark as
                              Received
                            </DropdownMenuItem>
                          )}
                          {returnItem.status === "Received" &&
                            returnItem.refundStatus === "Processing" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  alert(`Process refund for ${returnItem.id}`)
                                }
                              >
                                <DollarSign className="mr-2 h-4 w-4" /> Process
                                Refund
                              </DropdownMenuItem>
                            )}
                          <DropdownMenuItem
                            onClick={() =>
                              alert(
                                `Generate return label for ${returnItem.id}`,
                              )
                            }
                          >
                            <Truck className="mr-2 h-4 w-4" /> Generate Return
                            Label
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              alert(`Print return form for ${returnItem.id}`)
                            }
                          >
                            <FileText className="mr-2 h-4 w-4" /> Print Return
                            Form
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Return Statistics</CardTitle>
            <CardDescription>Overview of return metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  Total Returns
                </div>
                <div className="text-2xl font-bold">{returns.length}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  Pending Returns
                </div>
                <div className="text-2xl font-bold">
                  {returns.filter((r) => r.status === "Pending").length}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Return Rate</div>
                <div className="text-2xl font-bold">3.2%</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  Avg. Processing Time
                </div>
                <div className="text-2xl font-bold">2.4 days</div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div className="text-sm font-medium">Top Return Reasons</div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Damaged during shipping</span>
                  <span className="text-sm font-medium">32%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "32%" }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Wrong item received</span>
                  <span className="text-sm font-medium">24%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "24%" }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Defective product</span>
                  <span className="text-sm font-medium">18%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "18%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Return Policy</CardTitle>
            <CardDescription>Current return policy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Return Window</div>
              <div className="flex items-center justify-between">
                <span>30 days from delivery date</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert("Edit return window")}
                >
                  Edit
                </Button>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="text-sm font-medium">Restocking Fee</div>
              <div className="flex items-center justify-between">
                <span>10% for non-defective returns</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert("Edit restocking fee")}
                >
                  Edit
                </Button>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="text-sm font-medium">Return Shipping</div>
              <div className="flex items-center justify-between">
                <span>
                  Free for defective items, customer pays for other reasons
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert("Edit return shipping policy")}
                >
                  Edit
                </Button>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="text-sm font-medium">Refund Methods</div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Checkbox id="original" checked={true} />
                    <label htmlFor="original" className="text-sm">
                      Original payment method
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="store-credit" checked={true} />
                    <label htmlFor="store-credit" className="text-sm">
                      Store credit
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="exchange" checked={true} />
                    <label htmlFor="exchange" className="text-sm">
                      Product exchange
                    </label>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert("Edit refund methods")}
                >
                  Edit
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => alert("View full return policy")}
            >
              View Full Return Policy
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ReturnManagement;
