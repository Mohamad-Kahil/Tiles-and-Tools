import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CMSLayout from "@/components/cms/CMSLayout";
import Dashboard from "@/components/cms/Dashboard";
import AdvertisementList from "@/components/cms/advertisements/AdvertisementList";
import AdvertisementForm from "@/components/cms/advertisements/AdvertisementForm";
import AdvertisementDetail from "@/components/cms/advertisements/AdvertisementDetail";
import AdvertisementAnalytics from "@/components/cms/advertisements/AdvertisementAnalytics";

const CMSPage = () => {
  return (
    <Routes>
      <Route path="/" element={<CMSLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="advertisements" element={<AdvertisementList />} />
        <Route path="advertisements/new" element={<AdvertisementForm />} />
        <Route path="advertisements/:id" element={<AdvertisementDetail />} />
        <Route path="advertisements/:id/edit" element={<AdvertisementForm />} />
        <Route
          path="advertisements/:id/analytics"
          element={<AdvertisementAnalytics />}
        />

        {/* Placeholder routes for future phases */}
        <Route
          path="products"
          element={<ComingSoon module="Product Management" />}
        />
        <Route
          path="orders"
          element={<ComingSoon module="Order Management" />}
        />
        <Route
          path="customers"
          element={<ComingSoon module="Customer Management" />}
        />
        <Route
          path="content"
          element={<ComingSoon module="Content Management" />}
        />
        <Route
          path="promotions"
          element={<ComingSoon module="Promotions & Discounts" />}
        />
        <Route
          path="shipping"
          element={<ComingSoon module="Shipping & Logistics" />}
        />
        <Route
          path="payments"
          element={<ComingSoon module="Payment Gateways" />}
        />
        <Route
          path="analytics"
          element={<ComingSoon module="Reports & Analytics" />}
        />
        <Route
          path="support"
          element={<ComingSoon module="Customer Support" />}
        />
        <Route
          path="roles"
          element={<ComingSoon module="User Roles & Permissions" />}
        />
        <Route
          path="settings"
          element={<ComingSoon module="General Settings" />}
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/cms" replace />} />
      </Route>
    </Routes>
  );
};

// Placeholder component for future modules
const ComingSoon = ({ module }: { module: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-primary/10 rounded-full p-6 mb-4">
        <div className="text-4xl font-bold text-primary">Coming Soon</div>
      </div>
      <h2 className="text-2xl font-bold mb-2">{module}</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        This module is currently under development and will be available in a
        future update.
      </p>
      <p className="text-sm text-muted-foreground">
        Part of our phased development approach for the E-commerce CMS
      </p>
    </div>
  );
};

export default CMSPage;
