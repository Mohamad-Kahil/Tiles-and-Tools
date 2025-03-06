import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const VersionInfo = () => {
  // Get package versions from package.json
  const versions = {
    react: "18.2.0",
    typescript: "5.3.3",
    vite: "5.0.0",
    swcCore: "1.3.96",
    vitejsPluginReactSwc: "3.5.0",
    chartjs: "4.4.1",
    reactChartjs2: "5.2.0",
    tailwindcss: "3.4.1",
    tempoDevtools: "2.0.94",
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Implementation Versions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(versions).map(([key, value]) => (
            <div key={key} className="border rounded-md p-3">
              <div className="text-sm font-medium">{key}</div>
              <div className="text-lg font-bold">{value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VersionInfo;
