import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react";

interface SalesChartProps {
  className?: string;
}

const SalesChart: React.FC<SalesChartProps> = ({ className = "" }) => {
  // Mock data for the chart
  const dailyData = [
    { date: "Mon", sales: 2400 },
    { date: "Tue", sales: 1800 },
    { date: "Wed", sales: 3200 },
    { date: "Thu", sales: 4500 },
    { date: "Fri", sales: 5100 },
    { date: "Sat", sales: 6200 },
    { date: "Sun", sales: 4800 },
  ];

  const weeklyData = [
    { date: "Week 1", sales: 18000 },
    { date: "Week 2", sales: 22000 },
    { date: "Week 3", sales: 19500 },
    { date: "Week 4", sales: 26000 },
  ];

  const monthlyData = [
    { date: "Jan", sales: 65000 },
    { date: "Feb", sales: 58000 },
    { date: "Mar", sales: 72000 },
    { date: "Apr", sales: 68000 },
    { date: "May", sales: 79000 },
    { date: "Jun", sales: 85000 },
    { date: "Jul", sales: 92000 },
    { date: "Aug", sales: 88000 },
    { date: "Sep", sales: 94000 },
    { date: "Oct", sales: 99000 },
    { date: "Nov", sales: 105000 },
    { date: "Dec", sales: 118000 },
  ];

  // Format price
  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "EGP",
    });
  };

  // Calculate max value for scaling
  const getMaxValue = (data: { date: string; sales: number }[]) => {
    return Math.max(...data.map((item) => item.sales)) * 1.1; // Add 10% padding
  };

  // Render the chart bars
  const renderBars = (data: { date: string; sales: number }[]) => {
    const maxValue = getMaxValue(data);

    return (
      <div className="flex items-end h-64 gap-2">
        {data.map((item, index) => {
          const height = (item.sales / maxValue) * 100;
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="w-full flex justify-center mb-1">
                <span className="text-xs text-muted-foreground">
                  {formatPrice(item.sales)}
                </span>
              </div>
              <div
                className="w-full bg-primary/80 hover:bg-primary rounded-t-sm transition-all"
                style={{ height: `${height}%` }}
              ></div>
              <div className="w-full text-center mt-2">
                <span className="text-xs font-medium">{item.date}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Calculate total sales and growth
  const calculateTotals = (data: { date: string; sales: number }[]) => {
    const total = data.reduce((sum, item) => sum + item.sales, 0);
    const previousTotal = total * 0.85; // Mock previous period (15% less)
    const growth = ((total - previousTotal) / previousTotal) * 100;

    return { total, growth };
  };

  const dailyTotals = calculateTotals(dailyData);
  const weeklyTotals = calculateTotals(weeklyData);
  const monthlyTotals = calculateTotals(monthlyData);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>View your sales performance over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>

            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 text-primary" />
              <span className="text-sm font-medium">Sales Trend</span>
            </div>
          </div>

          <TabsContent value="daily" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">
                  {formatPrice(dailyTotals.total)}
                </div>
                <div className="text-sm text-muted-foreground">Last 7 days</div>
              </div>

              <div
                className={`flex items-center ${dailyTotals.growth >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {dailyTotals.growth >= 0 ? (
                  <ArrowUp className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 mr-1" />
                )}
                <span className="font-medium">
                  {Math.abs(dailyTotals.growth).toFixed(1)}%
                </span>
                <span className="text-sm ml-1">vs previous period</span>
              </div>
            </div>

            {renderBars(dailyData)}
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">
                  {formatPrice(weeklyTotals.total)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Last 4 weeks
                </div>
              </div>

              <div
                className={`flex items-center ${weeklyTotals.growth >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {weeklyTotals.growth >= 0 ? (
                  <ArrowUp className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 mr-1" />
                )}
                <span className="font-medium">
                  {Math.abs(weeklyTotals.growth).toFixed(1)}%
                </span>
                <span className="text-sm ml-1">vs previous period</span>
              </div>
            </div>

            {renderBars(weeklyData)}
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">
                  {formatPrice(monthlyTotals.total)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Last 12 months
                </div>
              </div>

              <div
                className={`flex items-center ${monthlyTotals.growth >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {monthlyTotals.growth >= 0 ? (
                  <ArrowUp className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 mr-1" />
                )}
                <span className="font-medium">
                  {Math.abs(monthlyTotals.growth).toFixed(1)}%
                </span>
                <span className="text-sm ml-1">vs previous year</span>
              </div>
            </div>

            {renderBars(monthlyData)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
