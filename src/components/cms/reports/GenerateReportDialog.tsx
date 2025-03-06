import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Download, Calendar } from "lucide-react";

interface GenerateReportDialogProps {
  trigger?: React.ReactNode;
}

const GenerateReportDialog: React.FC<GenerateReportDialogProps> = ({
  trigger,
}) => {
  const [reportType, setReportType] = useState("sales");
  const [dateRange, setDateRange] = useState("last30days");
  const [isGenerating, setIsGenerating] = useState(false);
  const [includeOptions, setIncludeOptions] = useState({
    charts: true,
    tables: true,
    summary: true,
    comparisons: false,
  });

  const handleGenerate = () => {
    setIsGenerating(true);

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, this would trigger a download or open a new tab with the report
      alert("Report generated successfully!");
    }, 2000);
  };

  const defaultTrigger = (
    <Button>
      <FileText className="mr-2 h-4 w-4" />
      Generate Report
    </Button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Generate Report</DialogTitle>
          <DialogDescription>
            Create a customized report for your store data.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="report-type">Report Type</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger id="report-type">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Sales Report</SelectItem>
                <SelectItem value="inventory">Inventory Report</SelectItem>
                <SelectItem value="customers">Customer Report</SelectItem>
                <SelectItem value="marketing">Marketing Performance</SelectItem>
                <SelectItem value="financial">Financial Summary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="date-range">Date Range</Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger id="date-range">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
                <SelectItem value="last30days">Last 30 Days</SelectItem>
                <SelectItem value="thisMonth">This Month</SelectItem>
                <SelectItem value="lastMonth">Last Month</SelectItem>
                <SelectItem value="thisYear">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {dateRange === "custom" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start-date">Start Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="start-date" type="date" className="pl-10" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="end-date">End Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="end-date" type="date" className="pl-10" />
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-2">
            <Label>Include in Report</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="charts"
                  checked={includeOptions.charts}
                  onCheckedChange={(checked) =>
                    setIncludeOptions({ ...includeOptions, charts: !!checked })
                  }
                />
                <label
                  htmlFor="charts"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Charts & Graphs
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="tables"
                  checked={includeOptions.tables}
                  onCheckedChange={(checked) =>
                    setIncludeOptions({ ...includeOptions, tables: !!checked })
                  }
                />
                <label
                  htmlFor="tables"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Data Tables
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="summary"
                  checked={includeOptions.summary}
                  onCheckedChange={(checked) =>
                    setIncludeOptions({ ...includeOptions, summary: !!checked })
                  }
                />
                <label
                  htmlFor="summary"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Executive Summary
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="comparisons"
                  checked={includeOptions.comparisons}
                  onCheckedChange={(checked) =>
                    setIncludeOptions({
                      ...includeOptions,
                      comparisons: !!checked,
                    })
                  }
                />
                <label
                  htmlFor="comparisons"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Period Comparisons
                </label>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="format">Format</Label>
            <Select defaultValue="pdf">
              <SelectTrigger id="format">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                <SelectItem value="csv">CSV File</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="gap-2"
          >
            {isGenerating ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                Generating...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Generate Report
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateReportDialog;
