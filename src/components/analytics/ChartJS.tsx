import React, { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ChartJSProps {
  title: string;
  description?: string;
  type: "bar" | "line" | "pie" | "doughnut";
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
      fill?: boolean;
    }>;
  };
  options?: any;
  className?: string;
}

const ChartJS: React.FC<ChartJSProps> = ({
  title,
  description,
  type,
  data,
  options = {},
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Load Chart.js dynamically
    const loadChartJS = async () => {
      try {
        // Create a script element
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/chart.js";
        script.async = true;

        // Append to document
        document.body.appendChild(script);

        // Wait for script to load
        await new Promise((resolve) => {
          script.onload = resolve;
        });

        // Now Chart.js is loaded, we can create our chart
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            // @ts-ignore - Chart is now available globally
            if (chartInstanceRef.current) {
              chartInstanceRef.current.destroy();
            }

            // @ts-ignore - Chart is now available globally
            chartInstanceRef.current = new window.Chart(ctx, {
              type,
              data,
              options: {
                responsive: true,
                maintainAspectRatio: false,
                ...options,
              },
            });
          }
        }
      } catch (error) {
        console.error("Failed to load Chart.js", error);
      }
    };

    loadChartJS();

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [type, data, options]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ height: "300px", width: "100%" }}>
          <canvas ref={canvasRef}></canvas>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartJS;
