import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  XCircle,
  Package,
  DollarSign,
  Truck,
  FileText,
  MessageSquare,
  RotateCcw,
  User,
  Mail,
  Phone,
  Clock,
} from "lucide-react";

// Mock return data
const mockReturns = {
  "RET-2023-001": {
    id: "RET-2023-001",
    orderId: "ORD-2023-1001",
    customer: {
      name: "Ahmed Hassan",
      email: "ahmed.hassan@example.com",
      phone: "+20 123 456 7890",
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
        condition: "Damaged",
        image:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&q=80",
      },
    ],
    total: 1299.99,
    refundStatus: "Completed",
    refundMethod: "Credit Card",
    refundAmount: 1299.99,
    refundDate: "2023-09-10T10:30:00Z",
    returnShipping: {
      method: "Prepaid Label",
      carrier: "Egypt Post",
      trackingNumber: "EGP987654321",
      cost: 0,
    },
    timeline: [
      {
        status: "Return Requested",
        date: "2023-09-05T14:30:00Z",
        note: "Customer requested return due to damaged product",
        user: "Customer",
      },
      {
        status: "Return Approved",
        date: "2023-09-06T09:15:00Z",
        note: "Return request approved",
        user: "Admin",
      },
      {
        status: "Return Label Generated",
        date: "2023-09-06T09:20:00Z",
        note: "Return shipping label sent to customer",
        user: "System",
      },
      {
        status: "Item Shipped Back",
        date: "2023-09-08T11:45:00Z",
        note: "Customer shipped the item back",
        user: "Customer",
      },
      {
        status: "Item Received",
        date: "2023-09-09T14:20:00Z",
        note: "Return package received and inspected",
        user: "Admin",
      },
      {
        status: "Refund Processed",
        date: "2023-09-10T10:30:00Z",
        note: "Full refund processed to original payment method",
        user: "Admin",
      },
    ],
    notes:
      "Customer reported cracks in the tiles upon delivery. Photos verified damage occurred during shipping.",
    customerComments:
      "The box was visibly damaged when I received it, and several tiles inside were cracked.",
  },
  "RET-2023-002": {
    id: "RET-2023-002",
    orderId: "ORD-2023-1002",
    customer: {
      name: "Nour El-Din",
      email: "nour.eldin@example.com",
      phone: "+20 123 456 7891",
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
        condition: "Unopened",
        image:
          "https://images.unsplash.com/photo-1562184552-997c461abbe6?w=300&q=80",
      },
    ],
    total: 699.98,
    refundStatus: "Pending",
    refundMethod: "Store Credit",
    refundAmount: 699.98,
    timeline: [
      {
        status: "Return Requested",
        date: "2023-09-10T10:15:00Z",
        note: "Customer requested return due to wrong color",
        user: "Customer",
      },
    ],
    notes:
      "Customer claims the color doesn't match what was shown on the website.",
    customerComments:
      "The color is much darker than what was shown in the product images.",
  },
};

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

const ReturnDetail = () => {
  const { id } = useParams();
  const returnData = mockReturns[id] || null;
  const [adminNote, setAdminNote] = React.useState("");

  if (!returnData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Return Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The return you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/cms/orders/return-management">Back to Returns</Link>
        </Button>
      </div>
    );
  }

  const handleAddNote = () => {
    if (adminNote.trim()) {
      alert(`Note added: ${adminNote}`);
      setAdminNote("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="-ml-2">
              <Link to="/cms/orders/return-management">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Returns
              </Link>
            </Button>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            Return: {returnData.id}
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {returnData.status === "Pending" && (
            <>
              <Button
                variant="outline"
                onClick={() => alert(`Approve return ${returnData.id}`)}
              >
                <CheckCircle className="mr-2 h-4 w-4" /> Approve
              </Button>
              <Button
                variant="outline"
                onClick={() => alert(`Reject return ${returnData.id}`)}
              >
                <XCircle className="mr-2 h-4 w-4" /> Reject
              </Button>
            </>
          )}
          {returnData.status === "Approved" && (
            <Button
              variant="outline"
              onClick={() => alert(`Mark return ${returnData.id} as received`)}
            >
              <Package className="mr-2 h-4 w-4" /> Mark as Received
            </Button>
          )}
          {returnData.status === "Received" &&
            returnData.refundStatus === "Processing" && (
              <Button
                variant="outline"
                onClick={() => alert(`Process refund for ${returnData.id}`)}
              >
                <DollarSign className="mr-2 h-4 w-4" /> Process Refund
              </Button>
            )}
          <Button
            variant="outline"
            onClick={() => alert(`Generate return label for ${returnData.id}`)}
          >
            <Truck className="mr-2 h-4 w-4" /> Generate Return Label
          </Button>
          <Button
            variant="outline"
            onClick={() => alert(`Print return form for ${returnData.id}`)}
          >
            <FileText className="mr-2 h-4 w-4" /> Print Return Form
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Badge
          variant="secondary"
          className={getStatusBadgeColor(returnData.status)}
        >
          {returnData.status}
        </Badge>
        <span className="text-muted-foreground">
          Requested on {new Date(returnData.date).toLocaleDateString()} at{" "}
          {new Date(returnData.date).toLocaleTimeString()}
        </span>
      </div>

      <Separator />

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Return Details</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="customer">Customer</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Return Items */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Return Items</CardTitle>
                  <CardDescription>
                    {returnData.items.length} items in this return
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {returnData.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 pb-4 border-b last:border-0 last:pb-0"
                      >
                        <div className="h-16 w-16 rounded overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatPrice(item.price)} × {item.quantity}
                          </div>
                          <div className="mt-1">
                            <Badge variant="outline" className="mr-2">
                              {item.reason}
                            </Badge>
                            <Badge variant="outline">
                              Condition: {item.condition}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Original Order */}
              <Card>
                <CardHeader>
                  <CardTitle>Original Order</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Order ID
                        </div>
                        <Link
                          to={`/cms/orders/${returnData.orderId}`}
                          className="text-blue-600 hover:underline"
                        >
                          {returnData.orderId}
                        </Link>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Order Date
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>
                            {new Date(returnData.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Comments */}
              {returnData.customerComments && (
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Comments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{returnData.customerComments}</p>
                  </CardContent>
                </Card>
              )}

              {/* Admin Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Admin Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Add a note about this return..."
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      rows={4}
                    />
                    <Button
                      onClick={handleAddNote}
                      disabled={!adminNote.trim()}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" /> Add Note
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Previous Notes</h4>
                    {returnData.notes ? (
                      <div className="p-4 border rounded-md">
                        <div className="flex justify-between items-start">
                          <div className="font-medium">Admin</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date().toLocaleString()}
                          </div>
                        </div>
                        <p className="text-sm mt-1">{returnData.notes}</p>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No notes have been added to this return yet</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Return Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Return Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Return Status
                    </div>
                    <Badge
                      variant="secondary"
                      className={getStatusBadgeColor(returnData.status)}
                    >
                      {returnData.status}
                    </Badge>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Return Date
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(returnData.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Refund Status
                    </div>
                    <Badge
                      variant="secondary"
                      className={getRefundStatusBadgeColor(
                        returnData.refundStatus,
                      )}
                    >
                      {returnData.refundStatus}
                    </Badge>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Refund Method
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>{returnData.refundMethod}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Refund Amount
                    </div>
                    <div className="font-bold">
                      {formatPrice(returnData.refundAmount)}
                    </div>
                  </div>

                  {returnData.refundDate && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Refund Date
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {new Date(returnData.refundDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  )}

                  <Separator />

                  {returnData.returnShipping && (
                    <>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Return Shipping Method
                        </div>
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-muted-foreground" />
                          <span>{returnData.returnShipping.method}</span>
                        </div>
                      </div>

                      {returnData.returnShipping.carrier && (
                        <div>
                          <div className="text-sm font-medium text-muted-foreground mb-1">
                            Carrier
                          </div>
                          <div>{returnData.returnShipping.carrier}</div>
                        </div>
                      )}

                      {returnData.returnShipping.trackingNumber && (
                        <div>
                          <div className="text-sm font-medium text-muted-foreground mb-1">
                            Tracking Number
                          </div>
                          <div className="font-mono text-sm">
                            {returnData.returnShipping.trackingNumber}
                          </div>
                        </div>
                      )}

                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Shipping Cost
                        </div>
                        <div>
                          {returnData.returnShipping.cost === 0
                            ? "Free"
                            : formatPrice(returnData.returnShipping.cost)}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Return Policy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Return Window:</span> 30 days
                    from delivery
                  </p>
                  <p>
                    <span className="font-medium">Restocking Fee:</span> 10% for
                    non-defective returns
                  </p>
                  <p>
                    <span className="font-medium">Return Shipping:</span> Free
                    for defective items
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => alert("View full return policy")}
                  >
                    View Full Policy
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Return Timeline</CardTitle>
              <CardDescription>Complete history of this return</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-0">
                {returnData.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4 pb-8 relative">
                    {/* Timeline connector */}
                    {index < returnData.timeline.length - 1 && (
                      <div className="absolute left-[19px] top-7 bottom-0 w-0.5 bg-muted-foreground/20"></div>
                    )}

                    {/* Status icon */}
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 z-10">
                      {event.status.includes("Requested") && (
                        <RotateCcw className="h-5 w-5 text-primary" />
                      )}
                      {event.status.includes("Approved") && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                      {event.status.includes("Label") && (
                        <Truck className="h-5 w-5 text-primary" />
                      )}
                      {event.status.includes("Shipped") && (
                        <Package className="h-5 w-5 text-primary" />
                      )}
                      {event.status.includes("Received") && (
                        <Package className="h-5 w-5 text-primary" />
                      )}
                      {event.status.includes("Refund") && (
                        <DollarSign className="h-5 w-5 text-primary" />
                      )}
                    </div>

                    {/* Event details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <h4 className="font-medium">{event.status}</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {new Date(event.date).toLocaleString()}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {event.note}
                      </p>
                      <div className="text-xs text-muted-foreground mt-1">
                        By: {event.user}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customer" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full overflow-hidden bg-muted">
                  <img
                    src={returnData.customer.avatar}
                    alt={returnData.customer.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium">
                    {returnData.customer.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" />
                    <span>{returnData.customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-3.5 w-3.5" />
                    <span>{returnData.customer.phone}</span>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h4 className="font-medium">Return History</h4>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{returnData.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(returnData.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant="secondary"
                          className={getStatusBadgeColor(returnData.status)}
                        >
                          {returnData.status}
                        </Badge>
                        <div className="text-sm font-medium mt-1">
                          {formatPrice(returnData.refundAmount)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">RET-2023-000</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date("2023-07-15").toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          Completed
                        </Badge>
                        <div className="text-sm font-medium mt-1">
                          {formatPrice(899.99)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-muted-foreground">
                    Total Returns: 2
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/cms/customers/1">
                      <User className="mr-2 h-4 w-4" /> View Customer Profile
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReturnDetail;
