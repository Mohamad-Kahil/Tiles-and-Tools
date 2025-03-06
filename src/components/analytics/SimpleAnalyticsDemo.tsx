import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SimpleChartComponent from "./SimpleChartComponent";

interface SimpleAnalyticsDemoProps {
  className?: string;
}

const SimpleAnalyticsDemo: React.FC<SimpleAnalyticsDemoProps> = ({
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
      },
    ],
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Simple Charts Demo</CardTitle>
        <CardDescription>
          Custom chart implementation without external libraries
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Bar Chart</h3>
            <SimpleChartComponent type="bar" data={barData} height={250} />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Line Chart</h3>
            <SimpleChartComponent type="line" data={lineData} height={250} />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Pie Chart</h3>
            <SimpleChartComponent type="pie" data={pieData} height={250} />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Data Table</h3>
            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-2">Month</th>
                    <th className="text-right p-2">Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {barData.labels.map((label, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2">{label}</td>
                      <td className="p-2 text-right">
                        {barData.datasets[0].data[index].toLocaleString(
                          "en-US",
                          {
                            style: "currency",
                            currency: "EGP",
                          },
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleAnalyticsDemo;
