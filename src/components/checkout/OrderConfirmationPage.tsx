import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle, Package, Truck, Home, ArrowRight } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const { language, direction } = useLanguage();

  // Get order ID from location state or generate a random one
  const orderNumber =
    location.state?.orderId ||
    `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  // Estimated delivery date (5-7 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(
    deliveryDate.getDate() + 5 + Math.floor(Math.random() * 3),
  );
  const formattedDeliveryDate = deliveryDate.toLocaleDateString(
    language === "ar" ? "ar-EG" : "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <div className={`min-h-screen bg-background flex flex-col ${direction}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-card rounded-lg shadow-sm p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          </div>

          <h1 className="text-3xl font-bold mb-2">
            {getTranslation("orderConfirmedTitle", language)}
          </h1>
          <p className="text-muted-foreground mb-6">
            {getTranslation("orderConfirmedMessage", language)}
          </p>

          <div className="bg-muted p-4 rounded-md mb-8">
            <div className="text-sm text-muted-foreground mb-2">
              {getTranslation("orderNumber", language)}
            </div>
            <div className="text-xl font-bold">{orderNumber}</div>
          </div>

          <div className="border rounded-md p-6 mb-8">
            <h2 className="text-xl font-medium mb-4">
              {getTranslation("orderTimeline", language)}
            </h2>

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
                    <h3 className="font-medium">
                      {getTranslation("orderConfirmedStatus", language)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {getTranslation("orderReceivedMessage", language)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date().toLocaleDateString(
                        language === "ar" ? "ar-EG" : "en-US",
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground mr-4">
                    <Package className="h-5 w-5" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-medium">
                      {getTranslation("orderProcessing", language)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {getTranslation("orderPreparingMessage", language)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {getTranslation("estimatedDays", language, {
                        days: "1-2",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground mr-4">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-medium">
                      {getTranslation("orderShipped", language)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {getTranslation("orderShippedMessage", language)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {getTranslation("trackingInformation", language)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground mr-4">
                    <Home className="h-5 w-5" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-medium">
                      {getTranslation("delivery", language)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {getTranslation("deliveryMessage", language)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {getTranslation("estimatedDelivery", language)}:{" "}
                      {formattedDeliveryDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/products">
                {getTranslation("continueShopping", language)}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/account/orders">
                {getTranslation("viewOrderDetails", language)}
              </Link>
            </Button>
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            <p>{getTranslation("orderQuestions", language)}</p>
            <Link
              to="/contact"
              className="text-primary hover:underline inline-flex items-center"
            >
              {getTranslation("contactSupport", language)}{" "}
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
