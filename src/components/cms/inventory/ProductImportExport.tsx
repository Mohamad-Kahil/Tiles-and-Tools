import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  Upload,
  FileText,
  CheckCircle,
  AlertTriangle,
  X,
  HelpCircle,
  FileUp,
  FileDown,
} from "lucide-react";

const ProductImportExport = () => {
  const [activeTab, setActiveTab] = useState("import");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importFormat, setImportFormat] = useState("csv");
  const [exportFormat, setExportFormat] = useState("csv");
  const [exportSelection, setExportSelection] = useState("all");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setValidationErrors([]);
    }
  };

  const handleValidate = () => {
    if (!selectedFile) return;

    setIsValidating(true);
    // Simulate validation process
    setTimeout(() => {
      // Mock validation errors
      setValidationErrors([
        "Row 5: Missing required field 'Price'",
        "Row 12: Invalid category 'Outdoor'",
        "Row 18: Duplicate SKU 'FLR-MRB-001'",
      ]);
      setIsValidating(false);
    }, 1500);
  };

  const handleImport = () => {
    if (!selectedFile) return;

    setIsImporting(true);
    // Simulate import process
    setTimeout(() => {
      setIsImporting(false);
      setSelectedFile(null);
      setValidationErrors([]);
      // Show success message or redirect
    }, 2000);
  };

  const handleExport = () => {
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      // In a real app, this would trigger a file download
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Import & Export Products
        </h2>
      </div>

      <Tabs
        defaultValue="import"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="import" className="px-4 py-2">
            Import Products
          </TabsTrigger>
          <TabsTrigger value="export" className="px-4 py-2">
            Export Products
          </TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Import Products</CardTitle>
              <CardDescription>
                Upload a file to import products into your inventory
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="importFormat">File Format</Label>
                  <Select value={importFormat} onValueChange={setImportFormat}>
                    <SelectTrigger id="importFormat">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Choose the format of your import file
                  </p>
                </div>

                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                  {selectedFile ? (
                    <div className="space-y-2 text-center">
                      <div className="flex items-center justify-center bg-primary/10 rounded-full p-2 mx-auto">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div className="font-medium">{selectedFile.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedFile(null)}
                      >
                        <X className="mr-2 h-4 w-4" /> Remove File
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-center bg-primary/10 rounded-full p-4 mb-4">
                        <Upload className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-medium text-center mb-1">
                        Drag and drop your file here
                      </h3>
                      <p className="text-sm text-muted-foreground text-center mb-4">
                        or click to browse files
                      </p>
                      <Input
                        id="fileUpload"
                        type="file"
                        className="hidden"
                        accept=".csv,.xlsx,.json"
                        onChange={handleFileChange}
                      />
                      <Button
                        variant="outline"
                        onClick={() =>
                          document.getElementById("fileUpload")?.click()
                        }
                      >
                        <Upload className="mr-2 h-4 w-4" /> Select File
                      </Button>
                    </>
                  )}
                </div>

                {validationErrors.length > 0 && (
                  <div className="border rounded-md p-4 bg-red-50">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <h4 className="font-medium text-red-600">
                        Validation Errors
                      </h4>
                    </div>
                    <ul className="space-y-1 text-sm text-red-600">
                      {validationErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <Separator />

                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  {selectedFile && (
                    <Button
                      variant="outline"
                      onClick={handleValidate}
                      disabled={isValidating}
                    >
                      {isValidating ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>{" "}
                          Validating
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" /> Validate File
                        </>
                      )}
                    </Button>
                  )}
                  <Button
                    onClick={handleImport}
                    disabled={
                      !selectedFile ||
                      isImporting ||
                      validationErrors.length > 0
                    }
                  >
                    {isImporting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span> Importing
                      </>
                    ) : (
                      <>
                        <FileUp className="mr-2 h-4 w-4" /> Import Products
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="border rounded-md p-4 bg-muted/20">
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  <h4 className="font-medium">Import Guidelines</h4>
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
                  <li>Make sure your file follows our template format</li>
                  <li>
                    Required fields: SKU, Name, Price, Category, and Stock
                    Quantity
                  </li>
                  <li>
                    For bulk updates, include the SKU of existing products
                  </li>
                  <li>
                    Maximum file size: 10MB (up to 5,000 products per import)
                  </li>
                </ul>
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm mt-2"
                  onClick={() => {}}
                >
                  Download Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Export Products</CardTitle>
              <CardDescription>
                Export your product inventory to a file
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="exportFormat">Export Format</Label>
                  <Select value={exportFormat} onValueChange={setExportFormat}>
                    <SelectTrigger id="exportFormat">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Choose the format for your exported file
                  </p>
                </div>

                <div>
                  <Label htmlFor="exportSelection">Products to Export</Label>
                  <Select
                    value={exportSelection}
                    onValueChange={setExportSelection}
                  >
                    <SelectTrigger id="exportSelection">
                      <SelectValue placeholder="Select products" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Products</SelectItem>
                      <SelectItem value="inStock">In Stock Only</SelectItem>
                      <SelectItem value="lowStock">Low Stock Only</SelectItem>
                      <SelectItem value="outOfStock">
                        Out of Stock Only
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Select which products to include in the export
                  </p>
                </div>

                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Export Options</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="includeImages"
                        className="rounded"
                      />
                      <label htmlFor="includeImages" className="text-sm">
                        Include image URLs
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="includeInventory"
                        className="rounded"
                        checked
                        readOnly
                      />
                      <label htmlFor="includeInventory" className="text-sm">
                        Include inventory data
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="includePricing"
                        className="rounded"
                        checked
                        readOnly
                      />
                      <label htmlFor="includePricing" className="text-sm">
                        Include pricing data
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="includeMetadata"
                        className="rounded"
                      />
                      <label htmlFor="includeMetadata" className="text-sm">
                        Include metadata (SEO, tags, etc.)
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleExport} disabled={isExporting}>
                    {isExporting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span> Exporting
                      </>
                    ) : (
                      <>
                        <FileDown className="mr-2 h-4 w-4" /> Export Products
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="border rounded-md p-4 bg-muted/20">
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  <h4 className="font-medium">Export Information</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Your export will include the following information:
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Product SKU</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Product Name</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Category</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Price</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Stock Quantity</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Warehouse Location</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductImportExport;
