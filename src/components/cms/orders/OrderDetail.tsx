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
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  FileText,
  Truck,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  Package,
  Clock,
  RotateCcw,
} from "lucide-react";

// Mock order data
const mockOrders = {
  "ORD-2023-1001": {
    id: "ORD-2023-1001",
    customer: {
      name: "Ahmed Hassan",
      email: "ahmed.hassan@example.com",
      phone: "+20 123 456 7890",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
    },
    date: "2023-08-15T14:30:00Z",
    status: "Delivered",
    total: 3499.97,
    subtotal: 3399.97,
    shipping: 100.0,
    tax: 0,
    discount: 0,
    items: [
      {
        id: "prod1",
        name: "Luxury Marble Flooring Tile",
        price: 1299.99,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&q=80",
      },
      {
        id: "prod3",
        name: "Modern Pendant Light Fixture",
        price: 899.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=300&q=80",
      },
    ],
    paymentMethod: "Credit Card",
    paymentDetails: {
      cardType: "Mastercard",
      lastFour: "4242",
      status: "Paid",
      transactionId: "txn_1234567890",
    },
    shippingMethod: "Standard Delivery",
    shippingAddress: {
      street: "123 Nile View Apartments",
      city: "Cairo",
      state: "Cairo Governorate",
      postalCode: "12345",
      country: "Egypt",
    },
    billingAddress: {
      street: "123 Nile View Apartments",
      city: "Cairo",
      state: "Cairo Governorate",
      postalCode: "12345",
      country: "Egypt",
    },
    timeline: [
      {
        status: "Order Placed",
        date: "2023-08-15T14:30:00Z",
        note: "Order was placed by customer",
      },
      {
        status: "Payment Confirmed",
        date: "2023-08-15T14:35:00Z",
        note: "Payment was confirmed via Credit Card",
      },
      {
        status: "Processing",
        date: "2023-08-16T09:15:00Z",
        note: "Order is being processed",
      },
      {
        status: "Shipped",
        date: "2023-08-17T11:30:00Z",
        note: "Order has been shipped via Standard Delivery",
        trackingNumber: "EGY123456789",
        carrier: "Egypt Post",
      },
      {
        status: "Delivered",
        date: "2023-08-20T13:45:00Z",
        note: "Order was delivered successfully",
      },
    ],
    notes: "Customer requested delivery in the afternoon.",
  },
  "ORD-2023-1002": {
    id: "ORD-2023-1002",
    customer: {
      name: "Nour El-Din",
      email: "nour.eldin@example.com",
      phone: "+20 123 456 7891",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nour",
    },
    date: "2023-08-14T10:15:00Z",
    status: "Processing",
    total: 1899.5,
    subtotal: 1799.5,
    shipping: 100.0,
    tax: 0,
    discount: 0,
    items: [
      {
        id: "prod2",
        name: "Premium Wall Paint - Desert Sand",
        price: 349.99,
        quantity: 3,
        image:
          "https://images.unsplash.com/photo-1562184552-997c461abbe6?w=300&q=80",
      },
      {
        id: "prod4",
        name: "Handcrafted Ceramic Vase",
        price: 499.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?w=300&q=80",
      },
    ],
    paymentMethod: "Cash on Delivery",
    paymentDetails: {
      status: "Pending",
    },
    shippingMethod: "Express Delivery",
    shippingAddress: {
      street: "456 Alexandria Corniche",
      city: "Alexandria",
      state: "Alexandria Governorate",
      postalCode: "23456",
      country: "Egypt",
    },
    billingAddress: {
      street: "456 Alexandria Corniche",
      city: "Alexandria",
      state: "Alexandria Governorate",
      postalCode: "23456",
      country: "Egypt",
    },
    timeline: [
      {
        status: "Order Placed",
        date: "2023-08-14T10:15:00Z",
        note: "Order was placed by customer",
      },
      {
        status: "Processing",
        date: "2023-08-15T09:30:00Z",
        note: "Order is being processed",
      },
    ],
    notes: "Customer requested to call before delivery.",
  },
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

// Format price
const formatPrice = (price: number) => {
  return price.toLocaleString("ar-EG", {
    style: "currency",
    currency: "EGP",
  });
};

const OrderDetail = () => {
  const { id } = useParams();
  const order = mockOrders[id] || null;

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The order you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/cms/orders">Back to Orders</Link>
        </Button>
      </div>
    );
  }

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
            Order: {order.id}
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {order.status === "Processing" && (
            <Button variant="outline">
              <Truck className="mr-2 h-4 w-4" /> Mark as Shipped
            </Button>
          )}
          {order.status === "Shipped" && (
            <Button variant="outline">
              <CheckCircle className="mr-2 h-4 w-4" /> Mark as Delivered
            </Button>
          )}
          <Button variant="outline" asChild>
            <Link to={`/cms/orders/${order.id}/invoice`}>
              <FileText className="mr-2 h-4 w-4" /> Generate Invoice
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => alert(`Create return for order ${order.id}`)}
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Create Return
          </Button>
          {(order.status === "Processing" ||
            order.status === "Pending Payment") && (
            <Button variant="destructive">
              <AlertTriangle className="mr-2 h-4 w-4" /> Cancel Order
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Badge variant="secondary" className={getStatusColor(order.status)}>
          {order.status}
        </Badge>
        <span className="text-muted-foreground">
          Placed on {new Date(order.date).toLocaleDateString()} at{" "}
          {new Date(order.date).toLocaleTimeString()}
        </span>
      </div>

      <Separator />

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Order Details</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="customer">Customer</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Items */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                  <CardDescription>
                    {order.items.length} items in this order
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item) => (
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

              {/* Shipping & Billing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <div className="font-medium">{order.customer.name}</div>
                      <div>{order.shippingAddress.street}</div>
                      <div>
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}{" "}
                        {order.shippingAddress.postalCode}
                      </div>
                      <div>{order.shippingAddress.country}</div>
                      <div className="pt-2 flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{order.customer.phone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Billing Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <div className="font-medium">{order.customer.name}</div>
                      <div>{order.billingAddress.street}</div>
                      <div>
                        {order.billingAddress.city},{" "}
                        {order.billingAddress.state}{" "}
                        {order.billingAddress.postalCode}
                      </div>
                      <div>{order.billingAddress.country}</div>
                      <div className="pt-2 flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{order.customer.email}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Notes */}
              {order.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle>Order Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{order.notes}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{formatPrice(order.shipping)}</span>
                  </div>
                  {order.tax > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>{formatPrice(order.tax)}</span>
                    </div>
                  )}
                  {order.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discount</span>
                      <span>-{formatPrice(order.discount)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Payment Method
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span>{order.paymentMethod}</span>
                    </div>
                  </div>

                  {order.paymentMethod === "Credit Card" && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Card Details
                      </div>
                      <div>
                        {order.paymentDetails.cardType} ending in{" "}
                        {order.paymentDetails.lastFour}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Payment Status
                    </div>
                    <Badge
                      variant="secondary"
                      className={
                        order.paymentDetails.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {order.paymentDetails.status}
                    </Badge>
                  </div>

                  {order.paymentDetails.transactionId && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Transaction ID
                      </div>
                      <div className="font-mono text-sm">
                        {order.paymentDetails.transactionId}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Shipping Method
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <span>{order.shippingMethod}</span>
                    </div>
                  </div>

                  {order.timeline.find((item) => item.status === "Shipped")
                    ?.trackingNumber && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Tracking Number
                      </div>
                      <div className="font-mono text-sm">
                        {
                          order.timeline.find(
                            (item) => item.status === "Shipped",
                          ).trackingNumber
                        }
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Carrier:{" "}
                        {
                          order.timeline.find(
                            (item) => item.status === "Shipped",
                          ).carrier
                        }
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
              <CardDescription>Complete history of this order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-0">
                {order.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4 pb-8 relative">
                    {/* Timeline connector */}
                    {index < order.timeline.length - 1 && (
                      <div className="absolute left-[19px] top-7 bottom-0 w-0.5 bg-muted-foreground/20"></div>
                    )}

                    {/* Status icon */}
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 z-10">
                      {event.status === "Order Placed" && (
                        <Package className="h-5 w-5 text-primary" />
                      )}
                      {event.status === "Payment Confirmed" && (
                        <CreditCard className="h-5 w-5 text-primary" />
                      )}
                      {event.status === "Processing" && (
                        <Clock className="h-5 w-5 text-primary" />
                      )}
                      {event.status === "Shipped" && (
                        <Truck className="h-5 w-5 text-primary" />
                      )}
                      {event.status === "Delivered" && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>

                    {/* Event details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <h4 className="font-medium">{event.status}</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {new Date(event.date).toLocaleString()}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {event.note}
                      </p>

                      {/* Tracking info */}
                      {event.trackingNumber && (
                        <div className="mt-2 p-3 bg-muted/50 rounded-md">
                          <div className="text-sm">
                            <span className="font-medium">
                              Tracking Number:
                            </span>{" "}
                            {event.trackingNumber}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Carrier:</span>{" "}
                            {event.carrier}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customer" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-full overflow-hidden bg-muted">
                    <img
                      src={order.customer.avatar}
                      alt={order.customer.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">
                      {order.customer.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3.5 w-3.5" />
                      <span>{order.customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-3.5 w-3.5" />
                      <span>{order.customer.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">
                      Shipping Address
                    </h4>
                    <div className="text-sm space-y-1">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-3.5 w-3.5 mt-0.5 text-muted-foreground" />
                        <div>
                          <div>{order.shippingAddress.street}</div>
                          <div>
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.state}{" "}
                            {order.shippingAddress.postalCode}
                          </div>
                          <div>{order.shippingAddress.country}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">
                      Billing Address
                    </h4>
                    <div className="text-sm space-y-1">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-3.5 w-3.5 mt-0.5 text-muted-foreground" />
                        <div>
                          <div>{order.billingAddress.street}</div>
                          <div>
                            {order.billingAddress.city},{" "}
                            {order.billingAddress.state}{" "}
                            {order.billingAddress.postalCode}
                          </div>
                          <div>{order.billingAddress.country}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Orders</CardTitle>
                <CardDescription>
                  Order history for this customer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* This would typically be fetched from the backend */}
                  {[order.id, "ORD-2023-0985", "ORD-2023-0872"].map(
                    (orderId, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center pb-3 border-b last:border-0 last:pb-0"
                      >
                        <div>
                          <div className="font-medium">{orderId}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(
                              new Date(order.date).setDate(
                                new Date(order.date).getDate() - index * 30,
                              ),
                            ).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="secondary"
                            className={
                              index === 0
                                ? getStatusColor(order.status)
                                : "bg-green-100 text-green-800"
                            }
                          >
                            {index === 0 ? order.status : "Delivered"}
                          </Badge>
                          <div className="text-sm font-medium mt-1">
                            {formatPrice(
                              index === 0 ? order.total : 1500 + index * 500,
                            )}
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>

                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/cms/customers/1">View Customer Profile</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderDetail;
