import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BarChart2,
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
} from "lucide-react";

interface AnalyticsDialogProps {
  children?: React.ReactNode;
  promotionName: string;
  promotionType: "discount" | "coupon" | "campaign";
}

const AnalyticsDialog = ({
  children,
  promotionName,
  promotionType,
}: AnalyticsDialogProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="ghost" size="sm">
            <BarChart2 className="h-4 w-4 mr-2" /> Analytics
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Analytics for "{promotionName}"</DialogTitle>
          <DialogDescription>
            Performance metrics and insights for this {promotionType}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Revenue
                  </p>
                  <h3 className="text-2xl font-bold mt-1">EGP 45,780</h3>
                  <div className="flex items-center mt-1 text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-xs">+12.5% from average</span>
                  </div>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Orders
                  </p>
                  <h3 className="text-2xl font-bold mt-1">124</h3>
                  <div className="flex items-center mt-1 text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-xs">+8.2% from average</span>
                  </div>
                </div>
                <div className="bg-orange-100 p-2 rounded-full">
                  <ShoppingCart className="h-5 w-5 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Customers
                  </p>
                  <h3 className="text-2xl font-bold mt-1">98</h3>
                  <div className="flex items-center mt-1 text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-xs">+5.3% new customers</span>
                  </div>
                </div>
                <div className="bg-purple-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Performance Over Time</CardTitle>
            <CardDescription>
              Daily revenue and orders during the promotion period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center border rounded-md bg-muted/20">
              <div className="text-center">
                <BarChart2 className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">
                  Performance chart will appear here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>
                Best-selling products with this promotion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Luxury Marble Flooring Tile",
                    sales: 32,
                    revenue: "EGP 33,280",
                  },
                  {
                    name: "Premium Ceramic Floor Tile",
                    sales: 28,
                    revenue: "EGP 20,160",
                  },
                  {
                    name: "Engineered Hardwood Flooring",
                    sales: 21,
                    revenue: "EGP 25,200",
                  },
                  {
                    name: "Porcelain Floor Tile",
                    sales: 18,
                    revenue: "EGP 14,400",
                  },
                ].map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {product.sales} orders
                      </div>
                    </div>
                    <div className="font-medium">{product.revenue}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Insights</CardTitle>
              <CardDescription>Who's using this promotion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Customer Type
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>New Customers (35%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Returning (65%)</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Average Order Value
                  </div>
                  <div className="text-xl font-bold">EGP 369.20</div>
                  <div className="text-sm text-muted-foreground">
                    +12% compared to store average
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Top Locations
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Cairo</span>
                      <span>42%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Alexandria</span>
                      <span>28%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Giza</span>
                      <span>15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnalyticsDialog;
