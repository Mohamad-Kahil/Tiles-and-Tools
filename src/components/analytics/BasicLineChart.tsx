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
}

interface BasicLineChartProps {
  title: string;
  description?: string;
  data: DataPoint[];
  className?: string;
  formatValue?: (value: number) => string;
}

const BasicLineChart: React.FC<BasicLineChartProps> = ({
  title,
  description,
  data,
  className = "",
  formatValue = (value) => value.toLocaleString(),
}) => {
  // Find max value for scaling
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div>{formatValue(maxValue)}</div>
            <div>{formatValue(0)}</div>
          </div>

          <div className="flex items-end h-40 gap-1 border-b border-l pt-4 pl-4">
            {data.map((item, index) => {
              const height = (item.value / maxValue) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    style={{
                      width: "40px",
                      height: `${height}px`,
                      minHeight: "4px",
                      backgroundColor: "#3b82f6",
                      borderTopLeftRadius: "2px",
                      borderTopRightRadius: "2px",
                    }}
                  ></div>
                  <div className="text-xs mt-2 -rotate-45 origin-top-left">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left font-medium">Period</th>
                  <th className="text-right font-medium">Value</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{item.label}</td>
                    <td className="py-2 text-right">
                      {formatValue(item.value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicLineChart;
