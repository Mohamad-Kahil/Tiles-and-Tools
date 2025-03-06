import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChartComponent from "./ChartComponent";

interface AnalyticsChartDemoProps {
  className?: string;
}

const AnalyticsChartDemo: React.FC<AnalyticsChartDemoProps> = ({
  className = "",
}) => {
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

  // Sample data for line chart
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Revenue",
        data: [65000, 59000, 80000, 81000, 56000, 55000],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  // Sample data for pie chart
  const pieData = {
    labels: ["Flooring", "Wall Products", "Lighting", "Decor"],
    datasets: [
      {
        label: "Sales by Category",
        data: [42, 28, 18, 12],
        backgroundColor: ["#3b82f6", "#22c55e", "#eab308", "#a855f7"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Chart.js Demo</CardTitle>
        <CardDescription>Using Chart.js with React</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Bar Chart</h3>
            <ChartComponent type="bar" data={barData} height={250} />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Line Chart</h3>
            <ChartComponent type="line" data={lineData} height={250} />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Pie Chart</h3>
            <ChartComponent type="pie" data={pieData} height={250} />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Doughnut Chart</h3>
            <ChartComponent type="doughnut" data={pieData} height={250} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChartDemo;
