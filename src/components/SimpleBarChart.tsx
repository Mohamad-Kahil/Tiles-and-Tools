import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SimpleBarChartProps {
  title: string;
  description?: string;
  className?: string;
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({
  title,
  description,
  className = "",
}) => {
  // Hard-coded data for testing
  const data = [
    { day: "Mon", value: 4500 },
    { day: "Tue", value: 3800 },
    { day: "Wed", value: 5200 },
    { day: "Thu", value: 7500 },
    { day: "Fri", value: 9100 },
    { day: "Sat", value: 8200 },
    { day: "Sun", value: 6800 },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <div className="mt-4 space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <div>EGP 0.00</div>
              <div>EGP 10,000.00</div>
            </div>
            <div className="flex items-end h-[200px] gap-6 border-b border-l pt-6 pl-6">
              {data.map((item, index) => {
                const height = (item.value / 10000) * 100;
                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                  >
                    {/* Explicit div with inline styles for debugging */}
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
                    <div className="text-xs mt-2">{item.day}</div>
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

export default SimpleBarChart;
