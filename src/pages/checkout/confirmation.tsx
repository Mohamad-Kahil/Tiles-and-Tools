import React from "react";
import OrderConfirmationPage from "@/components/checkout/OrderConfirmationPage";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const OrderConfirmationRoute = () => {
  return (
    <>
      <Header />
      <OrderConfirmationPage />
      <Footer />
    </>
  );
};

export default OrderConfirmationRoute;
