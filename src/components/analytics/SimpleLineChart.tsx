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

interface SimpleLineChartProps {
  title: string;
  description?: string;
  data: DataPoint[];
  className?: string;
  formatValue?: (value: number) => string;
}

const SimpleLineChart: React.FC<SimpleLineChartProps> = ({
  title,
  description,
  data,
  className = "",
  formatValue = (value) => value.toLocaleString(),
}) => {
  // Find min and max for scaling
  const values = data.map((item) => item.value);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const range = maxValue - minValue;

  // Add padding to the range
  const paddedMin = Math.max(0, minValue - range * 0.1);
  const paddedMax = maxValue + range * 0.1;
  const paddedRange = paddedMax - paddedMin;

  // Generate points for the polyline
  const points = data
    .map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((item.value - paddedMin) / paddedRange) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="w-full h-64 relative mb-6">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
            <div>{formatValue(paddedMax)}</div>
            <div>{formatValue(paddedMin)}</div>
          </div>

          {/* Chart area */}
          <div className="ml-8 h-full">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Grid lines */}
              <line
                x1="0"
                y1="0"
                x2="100"
                y2="0"
                stroke="#e2e8f0"
                strokeWidth="0.5"
              />
              <line
                x1="0"
                y1="25"
                x2="100"
                y2="25"
                stroke="#e2e8f0"
                strokeWidth="0.5"
              />
              <line
                x1="0"
                y1="50"
                x2="100"
                y2="50"
                stroke="#e2e8f0"
                strokeWidth="0.5"
              />
              <line
                x1="0"
                y1="75"
                x2="100"
                y2="75"
                stroke="#e2e8f0"
                strokeWidth="0.5"
              />
              <line
                x1="0"
                y1="100"
                x2="100"
                y2="100"
                stroke="#e2e8f0"
                strokeWidth="0.5"
              />

              {/* Line */}
              <polyline
                points={points}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
              />

              {/* Data points */}
              {data.map((item, index) => {
                const x = (index / (data.length - 1)) * 100;
                const y = 100 - ((item.value - paddedMin) / paddedRange) * 100;
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="1.5"
                    fill="hsl(var(--primary))"
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between text-xs text-muted-foreground px-8">
          {data.map((item, index) => (
            <div key={index}>{item.label}</div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleLineChart;
