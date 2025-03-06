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

interface SimplePieChartProps {
  title: string;
  description?: string;
  data: DataPoint[];
  className?: string;
}

const SimplePieChart: React.FC<SimplePieChartProps> = ({
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
        <div className="flex justify-center mb-6">
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {data.map((item, index) => {
                // Calculate percentage
                const percentage = (item.value / total) * 100;

                // Calculate the slice
                let cumulativePercentage = 0;
                for (let i = 0; i < index; i++) {
                  cumulativePercentage += (data[i].value / total) * 100;
                }

                // Convert percentage to coordinates on the circle
                const startAngle = (cumulativePercentage / 100) * 360;
                const endAngle =
                  ((cumulativePercentage + percentage) / 100) * 360;

                // Convert angles to radians
                const startRad = ((startAngle - 90) * Math.PI) / 180;
                const endRad = ((endAngle - 90) * Math.PI) / 180;

                // Calculate points
                const x1 = 50 + 40 * Math.cos(startRad);
                const y1 = 50 + 40 * Math.sin(startRad);
                const x2 = 50 + 40 * Math.cos(endRad);
                const y2 = 50 + 40 * Math.sin(endRad);

                // Determine if the arc should be drawn as a large arc
                const largeArcFlag = percentage > 50 ? 1 : 0;

                // Create the SVG path
                const path = [
                  `M 50 50`,
                  `L ${x1} ${y1}`,
                  `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                  `Z`,
                ].join(" ");

                return <path key={index} d={path} fill={item.color} />;
              })}
            </svg>
          </div>
        </div>

        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm">{item.label}</span>
              </div>
              <div className="text-sm font-medium">
                {((item.value / total) * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SimplePieChart;
