import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChartComponent from "../analytics/ChartComponent";

const ChartJSDemo = () => {
  // Sample data for bar chart
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Sales",
        data: [65000, 59000, 80000, 81000, 56000, 55000],
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 bg-white">
      <Card>
        <CardHeader>
          <CardTitle>Chart.js Demo</CardTitle>
          <CardDescription>Using Chart.js with React</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <h3 className="text-lg font-medium mb-4">Bar Chart</h3>
            <ChartComponent type="bar" data={barData} height={300} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartJSDemo;
