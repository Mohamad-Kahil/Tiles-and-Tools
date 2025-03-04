import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Package, Truck, Home, ArrowRight } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const OrderConfirmationPage = () => {
  // Generate a random order number
  const orderNumber = `EGD-${Math.floor(100000 + Math.random() * 900000)}`;

  // Estimated delivery date (5-7 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(
    deliveryDate.getDate() + 5 + Math.floor(Math.random() * 3),
  );
  const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-card rounded-lg shadow-sm p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          </div>

          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your purchase. Your order has been received and is
            being processed.
          </p>

          <div className="bg-muted p-4 rounded-md mb-8">
            <div className="text-sm text-muted-foreground mb-2">
              Order Number
            </div>
            <div className="text-xl font-bold">{orderNumber}</div>
          </div>

          <div className="border rounded-md p-6 mb-8">
            <h2 className="text-xl font-medium mb-4">Order Timeline</h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[19px] top-0 h-full w-0.5 bg-muted-foreground/20"></div>

              {/* Timeline steps */}
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground mr-4">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-medium">Order Confirmed</h3>
                    <p className="text-sm text-muted-foreground">
                      Your order has been received and is being processed.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground mr-4">
                    <Package className="h-5 w-5" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-medium">Order Processing</h3>
                    <p className="text-sm text-muted-foreground">
                      Your order is being prepared for shipping.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Estimated: 1-2 business days
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground mr-4">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-medium">Order Shipped</h3>
                    <p className="text-sm text-muted-foreground">
                      Your order has been shipped and is on its way to you.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Tracking information will be sent to your email.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground mr-4">
                    <Home className="h-5 w-5" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-medium">Delivery</h3>
                    <p className="text-sm text-muted-foreground">
                      Your order will be delivered to your address.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Estimated delivery: {formattedDeliveryDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/account/orders">View Order Details</Link>
            </Button>
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            <p>Have questions about your order?</p>
            <Link
              to="/contact"
              className="text-primary hover:underline inline-flex items-center"
            >
              Contact our support team <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
