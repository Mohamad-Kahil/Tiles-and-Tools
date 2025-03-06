import React from "react";

interface SimpleChartComponentProps {
  type: "bar" | "line" | "pie" | "doughnut";
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
    }>;
  };
  height?: number;
  width?: number;
}

const SimpleChartComponent: React.FC<SimpleChartComponentProps> = ({
  type,
  data,
  height = 300,
  width = 500,
}) => {
  // Simple bar chart implementation
  const renderBarChart = () => {
    const maxValue = Math.max(...data.datasets[0].data);
    return (
      <div className="flex items-end h-full gap-2 pt-4">
        {data.labels.map((label, index) => {
          const value = data.datasets[0].data[index];
          const barHeight = (value / maxValue) * (height - 40); // Leave space for labels
          const bgColor = Array.isArray(data.datasets[0].backgroundColor)
            ? data.datasets[0].backgroundColor[index]
            : data.datasets[0].backgroundColor || "#3b82f6";

          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                style={{
                  height: `${barHeight}px`,
                  width: "40px",
                  backgroundColor: bgColor,
                  borderRadius: "2px 2px 0 0",
                }}
              />
              <div className="text-xs mt-2">{label}</div>
            </div>
          );
        })}
      </div>
    );
  };

  // Simple line chart implementation
  const renderLineChart = () => {
    const maxValue = Math.max(...data.datasets[0].data);
    const points = data.datasets[0].data
      .map((value, index) => {
        const x = (index / (data.labels.length - 1)) * 100;
        const y = 100 - (value / maxValue) * 90; // Leave 10% padding
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <div className="h-full w-full pt-4">
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
            stroke={data.datasets[0].borderColor || "#3b82f6"}
            strokeWidth="2"
          />

          {/* Data points */}
          {data.datasets[0].data.map((value, index) => {
            const x = (index / (data.labels.length - 1)) * 100;
            const y = 100 - (value / maxValue) * 90;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="1.5"
                fill={data.datasets[0].borderColor || "#3b82f6"}
              />
            );
          })}
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          {data.labels.map((label, index) => (
            <div key={index}>{label}</div>
          ))}
        </div>
      </div>
    );
  };

  // Simple pie chart implementation
  const renderPieChart = () => {
    const total = data.datasets[0].data.reduce((sum, value) => sum + value, 0);

    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="relative w-48 h-48 mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {data.datasets[0].data.map((value, index) => {
              // Calculate percentage and angles for the slice
              const percentage = (value / total) * 100;
              let cumulativePercentage = 0;
              for (let i = 0; i < index; i++) {
                cumulativePercentage +=
                  (data.datasets[0].data[i] / total) * 100;
              }

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

              const bgColor = Array.isArray(data.datasets[0].backgroundColor)
                ? data.datasets[0].backgroundColor[index]
                : data.datasets[0].backgroundColor || "#3b82f6";

              return <path key={index} d={path} fill={bgColor} />;
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2">
          {data.labels.map((label, index) => {
            const bgColor = Array.isArray(data.datasets[0].backgroundColor)
              ? data.datasets[0].backgroundColor[index]
              : data.datasets[0].backgroundColor || "#3b82f6";

            return (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 mr-2 rounded-full"
                  style={{ backgroundColor: bgColor }}
                />
                <span className="text-xs">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render the appropriate chart based on type
  const renderChart = () => {
    switch (type) {
      case "bar":
        return renderBarChart();
      case "line":
        return renderLineChart();
      case "pie":
      case "doughnut": // Treat doughnut as pie for simplicity
        return renderPieChart();
      default:
        return <div>Invalid chart type</div>;
    }
  };

  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className="bg-white"
    >
      {renderChart()}
    </div>
  );
};

export default SimpleChartComponent;
