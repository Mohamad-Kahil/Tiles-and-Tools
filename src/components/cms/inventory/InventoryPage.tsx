import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InventoryDashboard from "./InventoryDashboard";
import InventoryReportsCard from "./InventoryReportsCard";
import StockAdjustmentDialog from "./StockAdjustmentDialog";
import ProductCatalog from "@/components/cms/products/ProductCatalog";
import ProductAttributesManager from "@/components/cms/products/ProductAttributesManager";
import ProductCategoriesManager from "@/components/cms/products/ProductCategoriesManager";

const InventoryPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="dashboard"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-5 max-w-3xl">
          <TabsTrigger
            value="dashboard"
            className="px-4 py-2 whitespace-nowrap"
          >
            Inventory Dashboard
          </TabsTrigger>
          <TabsTrigger value="products" className="px-4 py-2 whitespace-nowrap">
            Product Catalog
          </TabsTrigger>
          <TabsTrigger
            value="attributes"
            className="px-4 py-2 whitespace-nowrap"
          >
            Attributes
          </TabsTrigger>
          <TabsTrigger
            value="categories"
            className="px-4 py-2 whitespace-nowrap"
          >
            Categories
          </TabsTrigger>
          <TabsTrigger value="reports" className="px-4 py-2">
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6 pt-4">
          <InventoryDashboard />
        </TabsContent>

        <TabsContent value="products" className="space-y-6 pt-4">
          <ProductCatalog />
        </TabsContent>

        <TabsContent value="attributes" className="space-y-6 pt-4">
          <ProductAttributesManager />
        </TabsContent>

        <TabsContent value="categories" className="space-y-6 pt-4">
          <ProductCategoriesManager />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6 pt-4">
          <InventoryReportsCard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryPage;
