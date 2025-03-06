import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const ChartDemoLinks = () => {
  return (
    <div className="flex gap-2">
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
        <ExternalLink className="mr-2 h-4 w-4" />
        Simple Charts
      </Button>
      <Button
        variant="default"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
        onClick={() =>
          window.open(
            "/tempobook/storyboards/7ef36234-b73c-426c-bff7-26360e4e76de",
            "_blank",
          )
        }
      >
        <ExternalLink className="mr-2 h-4 w-4" />
        Chart.js
      </Button>
    </div>
  );
};

export default ChartDemoLinks;
