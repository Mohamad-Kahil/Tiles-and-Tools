import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  Edit,
  Trash,
  MoreVertical,
  Tag,
  Calendar,
  Percent,
  Clock,
  CheckCircle,
  XCircle,
  BarChart2,
  Copy,
  ShoppingBag,
} from "lucide-react";
import PromotionBanner from "@/components/promotions/PromotionBanner";
import CouponCode from "@/components/promotions/CouponCode";

const PromotionsPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock promotions data
  const promotions = [
    {
      id: "promo1",
      title: "Summer Sale",
      code: "SUMMER25",
      type: "percentage",
      value: 25,
      minPurchase: 1000,
      startDate: "2023-07-01T00:00:00Z",
      endDate: "2023-09-30T23:59:59Z",
      status: "active",
      usageCount: 156,
      usageLimit: 500,
    },
    {
      id: "promo2",
      title: "New Customer Discount",
      code: "WELCOME15",
      type: "percentage",
      value: 15,
      minPurchase: 500,
      startDate: "2023-01-01T00:00:00Z",
      endDate: "2023-12-31T23:59:59Z",
      status: "active",
      usageCount: 278,
      usageLimit: 1000,
    },
    {
      id: "promo3",
      title: "Free Shipping",
      code: "FREESHIP",
      type: "shipping",
      value: 0,
      minPurchase: 1500,
      startDate: "2023-08-15T00:00:00Z",
      endDate: "2023-09-15T23:59:59Z",
      status: "active",
      usageCount: 89,
      usageLimit: 300,
    },
    {
      id: "promo4",
      title: "Flash Sale",
      code: "FLASH50",
      type: "percentage",
      value: 50,
      minPurchase: 2000,
      startDate: "2023-08-25T00:00:00Z",
      endDate: "2023-08-27T23:59:59Z",
      status: "expired",
      usageCount: 124,
      usageLimit: 200,
    },
    {
      id: "promo5",
      title: "Holiday Special",
      code: "HOLIDAY100",
      type: "fixed",
      value: 100,
      minPurchase: 1000,
      startDate: "2023-12-01T00:00:00Z",
      endDate: "2023-12-31T23:59:59Z",
      status: "scheduled",
      usageCount: 0,
      usageLimit: 500,
    },
  ];

  // Filter promotions based on active tab and search term
  const filteredPromotions = promotions.filter((promo) => {
    const matchesTab = activeTab === "all" || promo.status === activeTab;
    const matchesSearch =
      promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format promotion value
  const formatPromotionValue = (type: string, value: number) => {
    if (type === "percentage") {
      return `${value}% off`;
    } else if (type === "fixed") {
      return `EGP ${value} off`;
    } else if (type === "shipping") {
      return "Free Shipping";
    }
    return `${value}`;
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Example Promotion Banner */}
      <PromotionBanner
        promotion={{
          id: "banner1",
          title: "Summer Sale! 25% Off Everything",
          description:
            "Use code SUMMER25 at checkout. Minimum purchase of EGP 1,000 required.",
          code: "SUMMER25",
          expiresAt: "2023-09-30T23:59:59Z",
          backgroundColor: "bg-primary",
          textColor: "text-primary-foreground",
          dismissible: true,
        }}
        className="mb-8 rounded-md"
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Promotions</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Promotion
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Active Promotions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {promotions.filter((p) => p.status === "active").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Scheduled Promotions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {promotions.filter((p) => p.status === "scheduled").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Total Redemptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {promotions.reduce((sum, promo) => sum + promo.usageCount, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Manage Promotions</CardTitle>
              <CardDescription>
                Create and manage promotional offers and discount codes
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs
                defaultValue="active"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <div className="px-6 pt-2 pb-4 border-b">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="active">Active</TabsTrigger>
                      <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                      <TabsTrigger value="expired">Expired</TabsTrigger>
                    </TabsList>

                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search promotions..."
                        className="pl-8 w-full sm:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <TabsContent value="all" className="m-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Promotion</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Discount</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Usage</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPromotions.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            className="text-center py-8 text-muted-foreground"
                          >
                            No promotions found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredPromotions.map((promo) => (
                          <TableRow key={promo.id}>
                            <TableCell className="font-medium">
                              {promo.title}
                            </TableCell>
                            <TableCell>
                              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                                {promo.code}
                              </code>
                            </TableCell>
                            <TableCell>
                              {formatPromotionValue(promo.type, promo.value)}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-xs">
                                  {formatDate(promo.startDate)} -{" "}
                                  {formatDate(promo.endDate)}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={getStatusBadgeColor(promo.status)}
                              >
                                {promo.status.charAt(0).toUpperCase() +
                                  promo.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="text-xs">
                                {promo.usageCount} / {promo.usageLimit}
                              </div>
                              <div className="w-16 h-1.5 bg-muted rounded-full mt-1">
                                <div
                                  className="h-1.5 bg-primary rounded-full"
                                  style={{
                                    width: `${(promo.usageCount / promo.usageLimit) * 100}%`,
                                  }}
                                ></div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Copy className="mr-2 h-4 w-4" /> Duplicate
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <BarChart2 className="mr-2 h-4 w-4" /> View
                                    Analytics
                                  </DropdownMenuItem>
                                  {promo.status === "active" ? (
                                    <DropdownMenuItem>
                                      <XCircle className="mr-2 h-4 w-4" />{" "}
                                      Deactivate
                                    </DropdownMenuItem>
                                  ) : promo.status === "scheduled" ? (
                                    <DropdownMenuItem>
                                      <CheckCircle className="mr-2 h-4 w-4" />{" "}
                                      Activate Now
                                    </DropdownMenuItem>
                                  ) : null}
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="active" className="m-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Promotion</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Discount</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Usage</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPromotions.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            className="text-center py-8 text-muted-foreground"
                          >
                            No active promotions found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredPromotions.map((promo) => (
                          <TableRow key={promo.id}>
                            <TableCell className="font-medium">
                              {promo.title}
                            </TableCell>
                            <TableCell>
                              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                                {promo.code}
                              </code>
                            </TableCell>
                            <TableCell>
                              {formatPromotionValue(promo.type, promo.value)}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-xs">
                                  {formatDate(promo.startDate)} -{" "}
                                  {formatDate(promo.endDate)}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={getStatusBadgeColor(promo.status)}
                              >
                                {promo.status.charAt(0).toUpperCase() +
                                  promo.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="text-xs">
                                {promo.usageCount} / {promo.usageLimit}
                              </div>
                              <div className="w-16 h-1.5 bg-muted rounded-full mt-1">
                                <div
                                  className="h-1.5 bg-primary rounded-full"
                                  style={{
                                    width: `${(promo.usageCount / promo.usageLimit) * 100}%`,
                                  }}
                                ></div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Copy className="mr-2 h-4 w-4" /> Duplicate
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <BarChart2 className="mr-2 h-4 w-4" /> View
                                    Analytics
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <XCircle className="mr-2 h-4 w-4" />{" "}
                                    Deactivate
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="scheduled" className="m-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Promotion</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Discount</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPromotions.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            className="text-center py-8 text-muted-foreground"
                          >
                            No scheduled promotions found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredPromotions.map((promo) => (
                          <TableRow key={promo.id}>
                            <TableCell className="font-medium">
                              {promo.title}
                            </TableCell>
                            <TableCell>
                              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                                {promo.code}
                              </code>
                            </TableCell>
                            <TableCell>
                              {formatPromotionValue(promo.type, promo.value)}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-xs">
                                  {formatDate(promo.startDate)} -{" "}
                                  {formatDate(promo.endDate)}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={getStatusBadgeColor(promo.status)}
                              >
                                {promo.status.charAt(0).toUpperCase() +
                                  promo.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Copy className="mr-2 h-4 w-4" /> Duplicate
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <CheckCircle className="mr-2 h-4 w-4" />{" "}
                                    Activate Now
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="expired" className="m-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Promotion</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Discount</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Usage</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPromotions.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            className="text-center py-8 text-muted-foreground"
                          >
                            No expired promotions found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredPromotions.map((promo) => (
                          <TableRow key={promo.id}>
                            <TableCell className="font-medium">
                              {promo.title}
                            </TableCell>
                            <TableCell>
                              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                                {promo.code}
                              </code>
                            </TableCell>
                            <TableCell>
                              {formatPromotionValue(promo.type, promo.value)}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-xs">
                                  {formatDate(promo.startDate)} -{" "}
                                  {formatDate(promo.endDate)}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={getStatusBadgeColor(promo.status)}
                              >
                                {promo.status.charAt(0).toUpperCase() +
                                  promo.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="text-xs">
                                {promo.usageCount} / {promo.usageLimit}
                              </div>
                              <div className="w-16 h-1.5 bg-muted rounded-full mt-1">
                                <div
                                  className="h-1.5 bg-primary rounded-full"
                                  style={{
                                    width: `${(promo.usageCount / promo.usageLimit) * 100}%`,
                                  }}
                                ></div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Copy className="mr-2 h-4 w-4" /> Duplicate
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <BarChart2 className="mr-2 h-4 w-4" /> View
                                    Analytics
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Promotion Types</CardTitle>
              <CardDescription>
                Different ways to offer discounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-md">
                  <Percent className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Percentage Discount</h3>
                  <p className="text-sm text-muted-foreground">
                    Offer a percentage off the total order value
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-md">
                  <Tag className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Fixed Amount Discount</h3>
                  <p className="text-sm text-muted-foreground">
                    Offer a fixed amount off the total order value
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-md">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Free Shipping</h3>
                  <p className="text-sm text-muted-foreground">
                    Offer free shipping on orders that meet certain criteria
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Coupon</CardTitle>
              <CardDescription>
                Share this coupon with your customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CouponCode
                code="SUMMER25"
                discount="25% off your entire order"
                expiresAt="2023-09-30T23:59:59Z"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Promotion Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-medium">Create urgency</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Set a clear expiration date to encourage customers to act
                  quickly
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary" />
                  <span className="font-medium">Memorable codes</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use simple, memorable coupon codes that are easy to remember
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4 text-primary" />
                  <span className="font-medium">Track performance</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Regularly review promotion analytics to optimize your strategy
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PromotionsPage;
