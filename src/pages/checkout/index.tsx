import React from "react";
import CheckoutPage from "@/components/checkout/CheckoutPage";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const CheckoutPageRoute = () => {
  return (
    <>
      <Header />
      <CheckoutPage />
      <Footer />
    </>
  );
};

export default CheckoutPageRoute;
