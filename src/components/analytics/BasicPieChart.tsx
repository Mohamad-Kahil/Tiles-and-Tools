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
  color: string;
}

interface BasicPieChartProps {
  title: string;
  description?: string;
  data: DataPoint[];
  className?: string;
}

const BasicPieChart: React.FC<BasicPieChartProps> = ({
  title,
  description,
  data,
  className = "",
}) => {
  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-6">
          <div className="w-full max-w-xs">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {data.map((item, index) => {
                const percentage = ((item.value / total) * 100).toFixed(1);
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 border rounded-md"
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div>
                      <div className="text-sm font-medium">{item.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {percentage}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col space-y-1">
              {data.map((item, index) => {
                const percentage = (item.value / total) * 100;
                return (
                  <div key={index} className="w-full">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{item.label}</span>
                      <span>{((item.value / total) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        style={{
                          height: "8px",
                          width: `${percentage}%`,
                          backgroundColor: item.color,
                          minWidth: "4px",
                          borderRadius: "9999px",
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicPieChart;
