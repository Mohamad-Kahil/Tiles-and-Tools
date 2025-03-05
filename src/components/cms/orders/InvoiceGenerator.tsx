import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Download, Printer } from "lucide-react";

// Mock order data (same as in OrderDetail.tsx)
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
  },
};

// Format price
const formatPrice = (price: number) => {
  return price.toLocaleString("ar-EG", {
    style: "currency",
    currency: "EGP",
  });
};

const InvoiceGenerator = () => {
  const { id } = useParams();
  const order = mockOrders[id] || null;
  const invoiceNumber = `INV-${id?.split("-").pop()}-${new Date().getFullYear()}`;
  const invoiceDate = new Date().toISOString().split("T")[0];

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
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild className="-ml-2">
            <Link to={`/cms/orders/${id}`}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Order
            </Link>
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" /> Print Invoice
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice #{invoiceNumber}</CardTitle>
          <CardDescription>
            Generated on {new Date().toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Invoice Preview */}
          <div className="bg-white p-8 border rounded-md">
            {/* Invoice Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <img
                  src="/DELogo.png"
                  alt="DecorEgypt Logo"
                  className="h-12 mb-4"
                />
                <div className="text-sm">
                  <p className="font-bold text-lg">DecorEgypt</p>
                  <p>123 Cairo Business Plaza</p>
                  <p>Cairo, Egypt 12345</p>
                  <p>+20 2 1234 5678</p>
                  <p>info@decoregypt.com</p>
                </div>
              </div>
              <div className="text-right">
                <h1 className="text-2xl font-bold mb-2">INVOICE</h1>
                <div className="text-sm">
                  <p>
                    <span className="font-medium">Invoice Number:</span>{" "}
                    {invoiceNumber}
                  </p>
                  <p>
                    <span className="font-medium">Invoice Date:</span>{" "}
                    {invoiceDate}
                  </p>
                  <p>
                    <span className="font-medium">Order Number:</span>{" "}
                    {order.id}
                  </p>
                  <p>
                    <span className="font-medium">Order Date:</span>{" "}
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="font-bold mb-2 text-gray-700 border-b pb-1">
                  Bill To:
                </h2>
                <div className="text-sm">
                  <p className="font-medium">{order.customer.name}</p>
                  <p>{order.billingAddress.street}</p>
                  <p>
                    {order.billingAddress.city}, {order.billingAddress.state}{" "}
                    {order.billingAddress.postalCode}
                  </p>
                  <p>{order.billingAddress.country}</p>
                  <p>{order.customer.email}</p>
                  <p>{order.customer.phone}</p>
                </div>
              </div>
              <div>
                <h2 className="font-bold mb-2 text-gray-700 border-b pb-1">
                  Ship To:
                </h2>
                <div className="text-sm">
                  <p className="font-medium">{order.customer.name}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    {order.shippingAddress.postalCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="mb-8">
              <h2 className="font-bold mb-2 text-gray-700 border-b pb-1">
                Payment Information:
              </h2>
              <div className="text-sm grid grid-cols-2 gap-8">
                <div>
                  <p>
                    <span className="font-medium">Payment Method:</span>{" "}
                    {order.paymentMethod}
                  </p>
                  {order.paymentMethod === "Credit Card" && (
                    <p>
                      <span className="font-medium">Card:</span>{" "}
                      {order.paymentDetails.cardType} ending in{" "}
                      {order.paymentDetails.lastFour}
                    </p>
                  )}
                  <p>
                    <span className="font-medium">Payment Status:</span>{" "}
                    {order.paymentDetails.status}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-medium">Shipping Method:</span>{" "}
                    {order.shippingMethod}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-8">
              <h2 className="font-bold mb-4 text-gray-700 border-b pb-1">
                Order Items:
              </h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left py-2 px-4">Item</th>
                    <th className="text-right py-2 px-4">Price</th>
                    <th className="text-right py-2 px-4">Quantity</th>
                    <th className="text-right py-2 px-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4">{item.name}</td>
                      <td className="text-right py-2 px-4">
                        {formatPrice(item.price)}
                      </td>
                      <td className="text-right py-2 px-4">{item.quantity}</td>
                      <td className="text-right py-2 px-4">
                        {formatPrice(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Order Summary */}
            <div className="flex justify-end mb-8">
              <div className="w-64">
                <div className="flex justify-between py-1">
                  <span className="font-medium">Subtotal:</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium">Shipping:</span>
                  <span>{formatPrice(order.shipping)}</span>
                </div>
                {order.tax > 0 && (
                  <div className="flex justify-between py-1">
                    <span className="font-medium">Tax:</span>
                    <span>{formatPrice(order.tax)}</span>
                  </div>
                )}
                {order.discount > 0 && (
                  <div className="flex justify-between py-1">
                    <span className="font-medium">Discount:</span>
                    <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-t mt-2 pt-2 font-bold">
                  <span>Total:</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Terms and Notes */}
            <div className="text-sm">
              <h2 className="font-bold mb-2 text-gray-700 border-b pb-1">
                Terms & Conditions:
              </h2>
              <p className="mb-4">
                Payment is due within 15 days. Please make checks payable to
                DecorEgypt or pay online.
              </p>

              <h2 className="font-bold mb-2 text-gray-700 border-b pb-1">
                Return Policy:
              </h2>
              <p className="mb-4">
                Items can be returned within 30 days of delivery. Please contact
                customer service for return authorization.
              </p>

              <div className="text-center mt-8 pt-4 border-t text-gray-500">
                <p>Thank you for your business!</p>
                <p>www.decoregypt.com</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceGenerator;
