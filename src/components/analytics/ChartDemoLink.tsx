import React from "react";
import { Button } from "@/components/ui/button";
import { BarChart2 } from "lucide-react";

const ChartDemoLink = () => {
  return (
    <Button
      variant="default"
      className="bg-red-600 hover:bg-red-700 text-white font-bold"
      onClick={() =>
        window.open(
          "/tempobook/storyboards/661a2bcd-93a3-4978-b4f8-de4972e2132a",
          "_blank",
        )
      }
    >
      <BarChart2 className="mr-2 h-4 w-4" />
      OPEN CHART DEMO
    </Button>
  );
};

export default ChartDemoLink;
