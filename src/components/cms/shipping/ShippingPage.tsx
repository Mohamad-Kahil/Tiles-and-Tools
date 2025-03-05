import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  Truck,
  MapPin,
  Package,
  MoreVertical,
  Edit,
  Trash,
  Globe,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  DollarSign,
  ShieldCheck,
} from "lucide-react";
import AddShippingZoneDialog from "./AddShippingZoneDialog";
import EditShippingZoneDialog from "./EditShippingZoneDialog";
import AddShippingMethodDialog from "./AddShippingMethodDialog";
import EditShippingMethodDialog from "./EditShippingMethodDialog";
import ManageShippingMethodsDialog from "./ManageShippingMethodsDialog";
import ConnectCarrierDialog from "./ConnectCarrierDialog";
import ConfigureCarrierDialog from "./ConfigureCarrierDialog";
import ShippingRatesCalculator from "./ShippingRatesCalculator";
import ShippingReportsCard from "./ShippingReportsCard";
import BulkShippingManager from "./BulkShippingManager";

const ShippingPage = () => {
  const [activeTab, setActiveTab] = useState("zones");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Shipping & Logistics
        </h2>
        <div className="flex gap-2">
          <AddShippingZoneDialog />
          <AddShippingMethodDialog />
        </div>
      </div>

      <Tabs defaultValue="zones" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 max-w-xl">
          <TabsTrigger value="zones" className="px-4 py-2 whitespace-nowrap">
            Shipping Zones
          </TabsTrigger>
          <TabsTrigger value="methods" className="px-4 py-2 whitespace-nowrap">
            Shipping Methods
          </TabsTrigger>
          <TabsTrigger value="carriers" className="px-4 py-2">
            Carriers
          </TabsTrigger>
          <TabsTrigger value="settings" className="px-4 py-2">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="zones" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search zones..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Zone Name</TableHead>
                    <TableHead>Regions</TableHead>
                    <TableHead>Shipping Methods</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "Cairo & Giza",
                      regions: ["Cairo", "Giza"],
                      methods: 3,
                      status: "Active",
                    },
                    {
                      name: "Alexandria",
                      regions: ["Alexandria"],
                      methods: 2,
                      status: "Active",
                    },
                    {
                      name: "Delta Region",
                      regions: ["Tanta", "Mansoura", "Zagazig", "Damanhur"],
                      methods: 2,
                      status: "Active",
                    },
                    {
                      name: "Upper Egypt",
                      regions: ["Luxor", "Aswan", "Minya", "Asyut"],
                      methods: 1,
                      status: "Active",
                    },
                    {
                      name: "Red Sea",
                      regions: ["Hurghada", "Sharm El Sheikh", "Dahab"],
                      methods: 2,
                      status: "Inactive",
                    },
                  ]
                    .filter((zone) => {
                      // Filter by status
                      if (
                        statusFilter !== "all" &&
                        zone.status.toLowerCase() !== statusFilter.toLowerCase()
                      ) {
                        return false;
                      }
                      // Filter by search term
                      if (
                        searchTerm &&
                        !zone.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) &&
                        !zone.regions.some((region) =>
                          region
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()),
                        )
                      ) {
                        return false;
                      }
                      return true;
                    })
                    .map((zone, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {zone.name}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {zone.regions.map((region, i) => (
                              <Badge key={i} variant="outline" className="mr-1">
                                {region}
                              </Badge>
                            ))}
                            {zone.regions.length > 3 && (
                              <Badge variant="outline">
                                +{zone.regions.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{zone.methods} methods</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              zone.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {zone.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <EditShippingZoneDialog
                                  zone={{
                                    name: zone.name,
                                    regions: zone.regions,
                                    status: zone.status,
                                  }}
                                />
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <ManageShippingMethodsDialog
                                  zoneName={zone.name}
                                />
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search methods..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="flat">Flat Rate</SelectItem>
                  <SelectItem value="free">Free Shipping</SelectItem>
                  <SelectItem value="weight">Weight Based</SelectItem>
                  <SelectItem value="carrier">Carrier Rates</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <AddShippingMethodDialog />
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Method Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Zone</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "Standard Delivery",
                      type: "Flat Rate",
                      zone: "Cairo & Giza",
                      cost: "EGP 50",
                      status: "Active",
                    },
                    {
                      name: "Express Delivery",
                      type: "Flat Rate",
                      zone: "Cairo & Giza",
                      cost: "EGP 100",
                      status: "Active",
                    },
                    {
                      name: "Free Shipping (Orders over EGP 1000)",
                      type: "Free Shipping",
                      zone: "Cairo & Giza",
                      cost: "EGP 0",
                      status: "Active",
                    },
                    {
                      name: "Standard Delivery",
                      type: "Flat Rate",
                      zone: "Alexandria",
                      cost: "EGP 75",
                      status: "Active",
                    },
                    {
                      name: "Express Delivery",
                      type: "Flat Rate",
                      zone: "Alexandria",
                      cost: "EGP 150",
                      status: "Active",
                    },
                    {
                      name: "Weight-based Shipping",
                      type: "Weight Based",
                      zone: "Delta Region",
                      cost: "Variable",
                      status: "Active",
                    },
                    {
                      name: "Aramex Express",
                      type: "Carrier Rates",
                      zone: "Upper Egypt",
                      cost: "Calculated",
                      status: "Active",
                    },
                  ]
                    .filter((method) => {
                      // Filter by type
                      if (
                        typeFilter !== "all" &&
                        !method.type
                          .toLowerCase()
                          .includes(typeFilter.toLowerCase())
                      ) {
                        return false;
                      }
                      // Filter by search term
                      if (
                        searchTerm &&
                        !method.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) &&
                        !method.zone
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ) {
                        return false;
                      }
                      return true;
                    })
                    .map((method, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {method.name}
                        </TableCell>
                        <TableCell>{method.type}</TableCell>
                        <TableCell>{method.zone}</TableCell>
                        <TableCell>{method.cost}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              method.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {method.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <EditShippingMethodDialog method={method} />
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="carriers" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search carriers..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <ConnectCarrierDialog />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Aramex",
                logo: "https://images.unsplash.com/photo-1622644896903-351a3ff1b826?w=200&q=80",
                status: "Connected",
                description:
                  "Express delivery services across Egypt and internationally",
                deliveryTime: "1-3 business days",
                trackingAvailable: true,
              },
              {
                name: "Egypt Post",
                logo: "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=200&q=80",
                status: "Connected",
                description:
                  "National postal service with coverage across all of Egypt",
                deliveryTime: "3-7 business days",
                trackingAvailable: true,
              },
              {
                name: "Bosta",
                logo: "https://images.unsplash.com/photo-1633174524827-db00a6b7bc74?w=200&q=80",
                status: "Not Connected",
                description:
                  "Local courier service specializing in e-commerce deliveries",
                deliveryTime: "1-4 business days",
                trackingAvailable: true,
              },
              {
                name: "R2S (Ready to Ship)",
                logo: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=200&q=80",
                status: "Not Connected",
                description:
                  "Specialized in last-mile delivery for online retailers",
                deliveryTime: "1-3 business days",
                trackingAvailable: true,
              },
              {
                name: "Fetchr",
                logo: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=200&q=80",
                status: "Not Connected",
                description:
                  "Technology-driven delivery service with GPS tracking",
                deliveryTime: "2-4 business days",
                trackingAvailable: true,
              },
              {
                name: "DHL",
                logo: "https://images.unsplash.com/photo-1626447852999-4c9f6e2cccf1?w=200&q=80",
                status: "Connected",
                description:
                  "International shipping and express delivery services",
                deliveryTime: "1-5 business days",
                trackingAvailable: true,
              },
            ]
              .filter((carrier) => {
                // Filter by search term
                if (
                  searchTerm &&
                  !carrier.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) &&
                  !carrier.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return false;
                }
                return true;
              })
              .map((carrier, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md overflow-hidden bg-muted">
                          <img
                            src={carrier.logo}
                            alt={carrier.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <CardTitle>{carrier.name}</CardTitle>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          carrier.status === "Connected"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {carrier.status}
                      </Badge>
                    </div>
                    <CardDescription>{carrier.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>Delivery Time: {carrier.deliveryTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {carrier.trackingAvailable ? (
                            <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                          ) : (
                            <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                          )}
                          <span>
                            {carrier.trackingAvailable
                              ? "Tracking Available"
                              : "No Tracking"}
                          </span>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex justify-between">
                        {carrier.status === "Connected" ? (
                          <Button variant="outline" size="sm" asChild>
                            <ConfigureCarrierDialog carrier={carrier} />
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" asChild>
                            <ConnectCarrierDialog carrier={carrier} />
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Globe className="mr-2 h-4 w-4" /> Visit Website
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 gap-6 mb-6">
            <ShippingRatesCalculator />
          </div>

          <div className="grid grid-cols-1 gap-6 mb-6">
            <ShippingReportsCard />
          </div>

          <div className="grid grid-cols-1 gap-6 mb-6">
            <BulkShippingManager />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>General Shipping Settings</CardTitle>
                <CardDescription>
                  Configure default shipping options and behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Shipping Calculation
                  </label>
                  <Select defaultValue="checkout">
                    <SelectTrigger>
                      <SelectValue placeholder="Select when to calculate shipping" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cart">Calculate in cart</SelectItem>
                      <SelectItem value="checkout">
                        Calculate at checkout
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    When to calculate shipping rates for customers
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Shipping Address Format
                  </label>
                  <Select defaultValue="egypt">
                    <SelectTrigger>
                      <SelectValue placeholder="Select address format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="egypt">Egypt Format</SelectItem>
                      <SelectItem value="international">
                        International Format
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Format for collecting shipping addresses
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Default Shipping Zone
                  </label>
                  <Select defaultValue="cairo">
                    <SelectTrigger>
                      <SelectValue placeholder="Select default zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cairo">Cairo & Giza</SelectItem>
                      <SelectItem value="alexandria">Alexandria</SelectItem>
                      <SelectItem value="delta">Delta Region</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Default zone when customer location cannot be determined
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping Restrictions</CardTitle>
                <CardDescription>
                  Set up shipping restrictions and special handling requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Restricted Locations
                  </label>
                  <Select defaultValue="none">
                    <SelectTrigger>
                      <SelectValue placeholder="Select restricted locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Restrictions</SelectItem>
                      <SelectItem value="custom">
                        Custom Restrictions
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Locations where you don't ship products
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Oversized Products Handling
                  </label>
                  <Select defaultValue="surcharge">
                    <SelectTrigger>
                      <SelectValue placeholder="Select handling method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="surcharge">Apply Surcharge</SelectItem>
                      <SelectItem value="quote">Request Quote</SelectItem>
                      <SelectItem value="restrict">
                        Restrict Shipping
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    How to handle shipping for oversized products
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Special Handling Products
                  </label>
                  <Button variant="outline" size="sm" className="w-full">
                    <Package className="mr-2 h-4 w-4" /> Manage Special Handling
                    Products
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Products that require special shipping arrangements
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping Labels & Packaging</CardTitle>
                <CardDescription>
                  Configure shipping label printing and packaging options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Label Format</label>
                  <Select defaultValue="pdf">
                    <SelectTrigger>
                      <SelectValue placeholder="Select label format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="zpl">ZPL (Zebra Printers)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Format for printing shipping labels
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Default Package Dimensions
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <Input placeholder="Length" />
                      <p className="text-xs text-muted-foreground mt-1">cm</p>
                    </div>
                    <div>
                      <Input placeholder="Width" />
                      <p className="text-xs text-muted-foreground mt-1">cm</p>
                    </div>
                    <div>
                      <Input placeholder="Height" />
                      <p className="text-xs text-muted-foreground mt-1">cm</p>
                    </div>
                    <div>
                      <Input placeholder="Weight" />
                      <p className="text-xs text-muted-foreground mt-1">kg</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Packaging Options
                  </label>
                  <Button variant="outline" size="sm" className="w-full">
                    <Package className="mr-2 h-4 w-4" /> Manage Packaging
                    Options
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Configure available packaging types and materials
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping Insurance & Tracking</CardTitle>
                <CardDescription>
                  Configure insurance options and tracking notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Shipping Insurance
                  </label>
                  <Select defaultValue="optional">
                    <SelectTrigger>
                      <SelectValue placeholder="Select insurance option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Insurance</SelectItem>
                      <SelectItem value="optional">
                        Optional Insurance
                      </SelectItem>
                      <SelectItem value="required">
                        Required Insurance
                      </SelectItem>
                      <SelectItem value="included">
                        Included in Shipping Cost
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2 mt-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Insurance Rate: 2% of order value
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Tracking Notifications
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="email"
                        className="rounded"
                        checked
                      />
                      <label htmlFor="email" className="text-sm">
                        Email Notifications
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="sms" className="rounded" />
                      <label htmlFor="sms" className="text-sm">
                        SMS Notifications
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="app"
                        className="rounded"
                        checked
                      />
                      <label htmlFor="app" className="text-sm">
                        In-App Notifications
                      </label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Signature Confirmation
                  </label>
                  <Select defaultValue="value">
                    <SelectTrigger>
                      <SelectValue placeholder="Select when to require signature" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Never Required</SelectItem>
                      <SelectItem value="value">
                        For Orders Over EGP 2,000
                      </SelectItem>
                      <SelectItem value="always">Always Required</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2 mt-2">
                    <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Adds security for high-value shipments
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button>Save Settings</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShippingPage;
