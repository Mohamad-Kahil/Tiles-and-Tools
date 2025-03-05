import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CMSLayout from "@/components/cms/CMSLayout";
import Dashboard from "@/components/cms/Dashboard";
import AdvertisementList from "@/components/cms/advertisements/AdvertisementList";
import AdvertisementForm from "@/components/cms/advertisements/AdvertisementForm";
import AdvertisementDetail from "@/components/cms/advertisements/AdvertisementDetail";
import AdvertisementAnalytics from "@/components/cms/advertisements/AdvertisementAnalytics";
import ProductList from "@/components/cms/products/ProductList";
import ProductForm from "@/components/cms/products/ProductForm";
import ProductDetail from "@/components/cms/products/ProductDetail";
import OrderList from "@/components/cms/orders/OrderList";
import OrderDetail from "@/components/cms/orders/OrderDetail";
import InvoiceGenerator from "@/components/cms/orders/InvoiceGenerator";
import CustomerList from "@/components/cms/customers/CustomerList";
import CustomerDetail from "@/components/cms/customers/CustomerDetail";
import CustomerForm from "@/components/cms/customers/CustomerForm";
import ContentList from "@/components/cms/content/ContentList";
import ContentForm from "@/components/cms/content/ContentForm";
import ContentDetail from "@/components/cms/content/ContentDetail";
import SettingsPage from "@/components/cms/settings/SettingsPage";
import AnalyticsDashboard from "@/components/cms/analytics/AnalyticsDashboard";
import SupportDashboard from "@/components/cms/support/SupportDashboard";
import PromotionsPage from "@/components/cms/promotions/PromotionsPage";
import ShippingPage from "@/components/cms/shipping/ShippingPage";
import InventoryPage from "@/components/cms/inventory/InventoryPage";

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
        <Route path="products" element={<ProductList />} />
        <Route path="products/new" element={<ProductForm />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="products/:id/edit" element={<ProductForm />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="orders/:id" element={<OrderDetail />} />
        <Route path="orders/:id/invoice" element={<InvoiceGenerator />} />
        <Route path="customers" element={<CustomerList />} />
        <Route path="customers/new" element={<CustomerForm />} />
        <Route path="customers/:id" element={<CustomerDetail />} />
        <Route path="customers/:id/edit" element={<CustomerForm />} />
        <Route path="content" element={<ContentList />} />
        <Route path="content/new" element={<ContentForm />} />
        <Route path="content/:id" element={<ContentDetail />} />
        <Route path="content/:id/edit" element={<ContentForm />} />
        <Route path="promotions" element={<PromotionsPage />} />
        <Route path="shipping" element={<ShippingPage />} />
        <Route
          path="payments"
          element={<ComingSoon module="Payment Gateways" />}
        />
        <Route path="analytics" element={<AnalyticsDashboard />} />
        <Route path="support" element={<SupportDashboard />} />
        <Route
          path="roles"
          element={<ComingSoon module="User Roles & Permissions" />}
        />
        <Route path="settings" element={<SettingsPage />} />

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
