import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Truck,
  Package,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const OrderDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>();

  // Mock order data
  const order = {
    id: orderId || "ORD-12345",
    date: "2023-10-15",
    status: "Delivered",
    paymentMethod: "Credit Card (**** 4242)",
    shippingAddress: {
      name: "Ahmed Hassan",
      address: "123 Tahrir Square",
      city: "Cairo",
      governorate: "Cairo",
      postalCode: "11511",
      phone: "+20 123 456 7890",
    },
    items: [
      {
        id: "item1",
        name: "Luxury Marble Flooring Tile",
        price: 1299.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&q=80",
      },
      {
        id: "item2",
        name: "Modern Pendant Light Fixture",
        price: 899.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=200&q=80",
      },
      {
        id: "item3",
        name: "Premium Wall Paint - Desert Sand",
        price: 299.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1562184552-997c461abbe6?w=200&q=80",
      },
    ],
    subtotal: 2499.97,
    shipping: 0,
    total: 2499.97,
    trackingNumber: "EGP123456789",
    estimatedDelivery: "October 20, 2023",
    timeline: [
      {
        status: "Order Placed",
        date: "October 15, 2023",
        description: "Your order has been received and is being processed.",
        completed: true,
      },
      {
        status: "Payment Confirmed",
        date: "October 15, 2023",
        description: "Payment has been successfully processed.",
        completed: true,
      },
      {
        status: "Processing",
        date: "October 16, 2023",
        description: "Your order is being prepared for shipping.",
        completed: true,
      },
      {
        status: "Shipped",
        date: "October 17, 2023",
        description: "Your order has been shipped and is on its way to you.",
        completed: true,
      },
      {
        status: "Delivered",
        date: "October 19, 2023",
        description: "Your order has been delivered.",
        completed: true,
      },
    ],
  };

  // Format price
  const formatPrice = (price: number) => {
    return price.toLocaleString("ar-EG", {
      style: "currency",
      currency: "EGP",
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link to="/account" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Account
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Order Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Header */}
            <div className="bg-card rounded-lg shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center">
                    <h2 className="text-xl font-medium">{order.id}</h2>
                    <Badge
                      variant="secondary"
                      className={`ml-2 ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">
                    Order Total
                  </div>
                  <div className="text-2xl font-bold">
                    {formatPrice(order.total)}
                  </div>
                </div>
              </div>

              {order.status === "Shipped" && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start">
                  <Truck className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-800">
                      Your order is on the way
                    </h3>
                    <p className="text-sm text-blue-700 mt-1">
                      Tracking Number: {order.trackingNumber}
                    </p>
                    <p className="text-sm text-blue-700">
                      Estimated Delivery: {order.estimatedDelivery}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Order Items */}
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-medium mb-4">Order Items</h2>
              <Separator className="mb-4" />

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {formatPrice(item.price)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {order.shipping === 0
                      ? "Free"
                      : formatPrice(order.shipping)}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-medium mb-4">Order Timeline</h2>
              <Separator className="mb-6" />

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[19px] top-0 h-full w-0.5 bg-muted-foreground/20"></div>

                {/* Timeline steps */}
                <div className="space-y-8">
                  {order.timeline.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div
                        className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full mr-4 ${step.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                      >
                        {step.completed ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <AlertCircle className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="font-medium">{step.status}</h3>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {step.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Shipping Information */}
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-medium mb-4">Shipping Information</h2>
              <Separator className="mb-4" />

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Shipping Address
                  </h3>
                  <div className="mt-1">
                    <p className="font-medium">{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.governorate}{" "}
                      {order.shippingAddress.postalCode}
                    </p>
                    <p>{order.shippingAddress.phone}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Shipping Method
                  </h3>
                  <p className="mt-1">Standard Delivery</p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-medium mb-4">Payment Information</h2>
              <Separator className="mb-4" />

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Payment Method
                  </h3>
                  <p className="mt-1">{order.paymentMethod}</p>
                </div>

                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Billing Address
                  </h3>
                  <div className="mt-1">
                    <p className="font-medium">{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.governorate}{" "}
                      {order.shippingAddress.postalCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-medium mb-4">Need Help?</h2>
              <Separator className="mb-4" />

              <div className="space-y-4">
                <Button variant="outline" className="w-full">
                  Return or Exchange
                </Button>
                <Button variant="outline" className="w-full">
                  Report a Problem
                </Button>
                <Button variant="outline" className="w-full">
                  Contact Customer Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderDetailPage;
