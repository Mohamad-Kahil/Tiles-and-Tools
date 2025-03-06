import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface BasicBarChartProps {
  title: string;
  description?: string;
  data: DataPoint[];
  className?: string;
}

const BasicBarChart: React.FC<BasicBarChartProps> = ({
  title,
  description,
  data,
  className = "",
}) => {
  // Find the maximum value for scaling
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-sm">{item.value.toLocaleString()}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full ${item.color || "bg-primary"}`}
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicBarChart;
