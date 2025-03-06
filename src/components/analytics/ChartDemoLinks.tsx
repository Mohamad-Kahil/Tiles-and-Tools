import React from "react";
import { Button } from "@/components/ui/button";
import { BarChart2, ExternalLink } from "lucide-react";

const ChartDemoLinks = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <Button
        variant="default"
        className="bg-red-600 hover:bg-red-700 text-white font-bold w-full"
        onClick={() =>
          window.open(
            "/tempobook/storyboards/661a2bcd-93a3-4978-b4f8-de4972e2132a",
            "_blank",
          )
        }
      >
        <ExternalLink className="mr-2 h-4 w-4" />
        Simple Charts Demo
      </Button>
      <Button
        variant="default"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold w-full"
        onClick={() =>
          window.open(
            "/tempobook/storyboards/7ef36234-b73c-426c-bff7-26360e4e76de",
            "_blank",
          )
        }
      >
        <ExternalLink className="mr-2 h-4 w-4" />
        Chart.js Demo
      </Button>
    </div>
  );
};

export default ChartDemoLinks;
