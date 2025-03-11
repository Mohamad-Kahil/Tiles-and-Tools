import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

interface ChartComponentProps {
  type: "bar" | "line" | "pie" | "doughnut";
  data: any;
  options?: any;
  height?: number;
  width?: number;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  type,
  data,
  options = {},
  height,
  width,
}) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const chartOptions = { ...defaultOptions, ...options };

  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <Bar
            data={data}
            options={chartOptions}
            height={height}
            width={width}
          />
        );
      case "line":
        return (
          <Line
            data={data}
            options={chartOptions}
            height={height}
            width={width}
          />
        );
      case "pie":
        return (
          <Pie
            data={data}
            options={chartOptions}
            height={height}
            width={width}
          />
        );
      case "doughnut":
        return (
          <Doughnut
            data={data}
            options={chartOptions}
            height={height}
            width={width}
          />
        );
      default:
        return (
          <Bar
            data={data}
            options={chartOptions}
            height={height}
            width={width}
          />
        );
    }
  };

  return (
    <div style={{ height: height || "100%", width: width || "100%" }}>
      {renderChart()}
    </div>
  );
};

export default ChartComponent;
