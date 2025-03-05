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
  Tag,
  Calendar,
  Percent,
  Gift,
  MoreVertical,
  Edit,
  Copy,
  Trash,
  Eye,
  BarChart2,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import CreatePromotionDialog from "./CreatePromotionDialog";
import EditPromotionDialog from "./EditPromotionDialog";
import ViewProductsDialog from "./ViewProductsDialog";
import AnalyticsDialog from "./AnalyticsDialog";

const PromotionsPage = () => {
  const [activeTab, setActiveTab] = useState("discounts");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Promotions & Discounts
        </h2>
        <CreatePromotionDialog />
      </div>

      <Tabs
        defaultValue="discounts"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="discounts">Discounts</TabsTrigger>
          <TabsTrigger value="coupons">Coupons</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        </TabsList>

        <TabsContent value="discounts" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search discounts..."
                  className="pl-8"
                />
              </div>

              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                  <SelectItem value="bogo">Buy One Get One</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Discount Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Applies To</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "Summer Sale",
                      type: "Percentage",
                      value: "20%",
                      appliesTo: "All Products",
                      status: "Active",
                      startDate: "2023-06-01",
                      endDate: "2023-08-31",
                    },
                    {
                      name: "Flooring Discount",
                      type: "Percentage",
                      value: "15%",
                      appliesTo: "Flooring Category",
                      status: "Active",
                      startDate: "2023-07-15",
                      endDate: "2023-09-15",
                    },
                    {
                      name: "Lighting Special",
                      type: "Fixed Amount",
                      value: "EGP 500",
                      appliesTo: "Lighting Category",
                      status: "Scheduled",
                      startDate: "2023-09-01",
                      endDate: "2023-10-31",
                    },
                    {
                      name: "Buy 2 Get 1 Free Tiles",
                      type: "BOGO",
                      value: "Buy 2 Get 1",
                      appliesTo: "Selected Tiles",
                      status: "Active",
                      startDate: "2023-08-01",
                      endDate: "2023-08-31",
                    },
                    {
                      name: "Spring Collection",
                      type: "Percentage",
                      value: "25%",
                      appliesTo: "Spring Collection",
                      status: "Expired",
                      startDate: "2023-03-01",
                      endDate: "2023-05-31",
                    },
                  ].map((discount, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {discount.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {discount.type === "Percentage" ? (
                            <Percent className="h-4 w-4 text-blue-500" />
                          ) : discount.type === "Fixed Amount" ? (
                            <Tag className="h-4 w-4 text-green-500" />
                          ) : (
                            <Gift className="h-4 w-4 text-purple-500" />
                          )}
                          <span>{discount.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{discount.value}</TableCell>
                      <TableCell>{discount.appliesTo}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            discount.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : discount.status === "Scheduled"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                          }
                        >
                          {discount.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm">
                            {new Date(discount.startDate).toLocaleDateString()}{" "}
                            - {new Date(discount.endDate).toLocaleDateString()}
                          </span>
                        </div>
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
                              <EditPromotionDialog
                                promotionType="discount"
                                promotion={{
                                  name: discount.name,
                                  description: "",
                                  type: discount.type,
                                  value: discount.value,
                                  startDate: discount.startDate,
                                  endDate: discount.endDate,
                                  status: discount.status,
                                }}
                              />
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" /> Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <ViewProductsDialog
                                promotionName={discount.name}
                              />
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <AnalyticsDialog
                                promotionName={discount.name}
                                promotionType="discount"
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

        <TabsContent value="coupons" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search coupons..."
                  className="pl-8"
                />
              </div>

              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Coupon Code</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Minimum Purchase</TableHead>
                    <TableHead>Usage / Limit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      code: "SUMMER20",
                      discount: "20% off",
                      minPurchase: "EGP 1,000",
                      usage: "145/500",
                      status: "Active",
                      expiry: "2023-08-31",
                    },
                    {
                      code: "WELCOME10",
                      discount: "10% off",
                      minPurchase: "EGP 500",
                      usage: "278/1000",
                      status: "Active",
                      expiry: "No expiry",
                    },
                    {
                      code: "FREESHIP",
                      discount: "Free Shipping",
                      minPurchase: "EGP 2,000",
                      usage: "89/200",
                      status: "Active",
                      expiry: "2023-09-15",
                    },
                    {
                      code: "FALL25",
                      discount: "25% off",
                      minPurchase: "EGP 1,500",
                      usage: "0/300",
                      status: "Scheduled",
                      expiry: "2023-12-31",
                    },
                    {
                      code: "SPRING15",
                      discount: "15% off",
                      minPurchase: "EGP 800",
                      usage: "432/500",
                      status: "Expired",
                      expiry: "2023-05-31",
                    },
                  ].map((coupon, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-mono font-medium">
                          {coupon.code}
                        </div>
                      </TableCell>
                      <TableCell>{coupon.discount}</TableCell>
                      <TableCell>{coupon.minPurchase}</TableCell>
                      <TableCell>{coupon.usage}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            coupon.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : coupon.status === "Scheduled"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                          }
                        >
                          {coupon.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm">
                            {coupon.expiry === "No expiry"
                              ? "No expiry"
                              : new Date(coupon.expiry).toLocaleDateString()}
                          </span>
                        </div>
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
                              <EditPromotionDialog
                                promotionType="coupon"
                                promotion={{
                                  name: coupon.code,
                                  description: "",
                                  type: "percentage",
                                  value: coupon.discount,
                                  code: coupon.code,
                                  minPurchase: coupon.minPurchase,
                                  usageLimit: coupon.usage,
                                  startDate: new Date().toISOString(),
                                  endDate:
                                    coupon.expiry === "No expiry"
                                      ? new Date(2099, 11, 31).toISOString()
                                      : coupon.expiry,
                                  status: coupon.status,
                                }}
                              />
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" /> Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <AnalyticsDialog
                                promotionName={coupon.code}
                                promotionType="coupon"
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

        <TabsContent value="campaigns" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search campaigns..."
                  className="pl-8"
                />
              </div>

              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Summer Sale 2023",
                description:
                  "Seasonal promotion with discounts across all categories",
                status: "Active",
                startDate: "2023-06-01",
                endDate: "2023-08-31",
                discounts: 12,
                coupons: 3,
                revenue: "EGP 245,780",
              },
              {
                name: "Back to School",
                description:
                  "Special offers on home office and study room items",
                status: "Upcoming",
                startDate: "2023-09-01",
                endDate: "2023-09-30",
                discounts: 8,
                coupons: 2,
                revenue: "EGP 0",
              },
              {
                name: "Ramadan Collection",
                description: "Exclusive discounts for Ramadan home decoration",
                status: "Completed",
                startDate: "2023-03-15",
                endDate: "2023-04-15",
                discounts: 15,
                coupons: 5,
                revenue: "EGP 378,950",
              },
              {
                name: "New Year Sale",
                description:
                  "Start the new year with special home renovation deals",
                status: "Upcoming",
                startDate: "2023-12-15",
                endDate: "2024-01-15",
                discounts: 10,
                coupons: 4,
                revenue: "EGP 0",
              },
              {
                name: "Flash Sale Weekend",
                description:
                  "48-hour special discounts on selected premium items",
                status: "Upcoming",
                startDate: "2023-08-26",
                endDate: "2023-08-27",
                discounts: 6,
                coupons: 1,
                revenue: "EGP 0",
              },
              {
                name: "Spring Collection Launch",
                description:
                  "Introducing new spring items with special pricing",
                status: "Completed",
                startDate: "2023-03-01",
                endDate: "2023-05-31",
                discounts: 9,
                coupons: 2,
                revenue: "EGP 156,780",
              },
            ].map((campaign, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{campaign.name}</CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        campaign.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : campaign.status === "Upcoming"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {campaign.status}
                    </Badge>
                  </div>
                  <CardDescription>{campaign.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>
                          {new Date(campaign.startDate).toLocaleDateString()} -{" "}
                          {new Date(campaign.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        {campaign.status === "Active" ? (
                          <span className="text-green-600 flex items-center">
                            <CheckCircle className="h-3.5 w-3.5 mr-1" /> In
                            progress
                          </span>
                        ) : campaign.status === "Upcoming" ? (
                          <span className="text-blue-600 flex items-center">
                            <AlertCircle className="h-3.5 w-3.5 mr-1" /> Starts
                            soon
                          </span>
                        ) : (
                          <span className="text-gray-600 flex items-center">
                            <XCircle className="h-3.5 w-3.5 mr-1" /> Ended
                          </span>
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Discounts
                        </div>
                        <div className="font-medium">{campaign.discounts}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Coupons
                        </div>
                        <div className="font-medium">{campaign.coupons}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Revenue
                        </div>
                        <div className="font-medium">{campaign.revenue}</div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <ViewProductsDialog promotionName={campaign.name} />
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <EditPromotionDialog
                          promotionType="campaign"
                          promotion={{
                            name: campaign.name,
                            description: campaign.description,
                            type: "percentage",
                            value: "20%",
                            startDate: campaign.startDate,
                            endDate: campaign.endDate,
                            status: campaign.status,
                          }}
                        />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromotionsPage;
