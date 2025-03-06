import React from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController,
  PieController,
} from "chart.js";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController,
  PieController,
);

interface ChartComponentProps {
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
  height?: number;
  width?: number;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  type,
  data,
  options = {},
  height = 300,
  width = 500,
}) => {
  // Default options
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
  };

  // Merge default options with provided options
  const chartOptions = { ...defaultOptions, ...options };

  // Render the appropriate chart based on type
  const renderChart = () => {
    console.log(`Rendering ${type} chart with data:`, data);

    switch (type) {
      case "bar":
        return <Bar data={data} options={chartOptions} />;
      case "line":
        return <Line data={data} options={chartOptions} />;
      case "pie":
        return <Pie data={data} options={chartOptions} />;
      case "doughnut":
        return <Doughnut data={data} options={chartOptions} />;
      default:
        return <div>Invalid chart type</div>;
    }
  };

  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      {renderChart()}
    </div>
  );
};

export default ChartComponent;
