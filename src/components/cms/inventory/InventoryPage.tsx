import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InventoryDashboard from "./InventoryDashboard";
import InventoryReportsCard from "./InventoryReportsCard";
import StockAdjustmentDialog from "./StockAdjustmentDialog";

const InventoryPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="dashboard"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3 max-w-xl">
          <TabsTrigger
            value="dashboard"
            className="px-4 py-2 whitespace-nowrap"
          >
            Inventory Dashboard
          </TabsTrigger>
          <TabsTrigger value="products" className="px-4 py-2 whitespace-nowrap">
            Product Catalog
          </TabsTrigger>
          <TabsTrigger value="reports" className="px-4 py-2">
            Reports & Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6 pt-4">
          <InventoryDashboard />
        </TabsContent>

        <TabsContent value="products" className="space-y-6 pt-4">
          <div className="flex items-center justify-center h-[400px] border rounded-md bg-muted/20">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Product catalog management will be implemented in the next phase
              </p>
              <StockAdjustmentDialog />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6 pt-4">
          <InventoryReportsCard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryPage;
