import React from "react";
import { Button } from "@/components/ui/button";
import { BarChart2 } from "lucide-react";

const ChartDemoButton = () => {
  return (
    <Button
      variant="outline"
      className="bg-primary text-white hover:bg-primary/90"
      asChild
    >
      <a
        href="/tempobook/storyboards/661a2bcd-93a3-4978-b4f8-de4972e2132a"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BarChart2 className="mr-2 h-4 w-4" />
        View Chart Demo
      </a>
    </Button>
  );
};

export default ChartDemoButton;
