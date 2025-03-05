import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  BarChart2,
  Image,
  Package,
  ShoppingCart,
  Users,
  ArrowRight,
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Active Advertisements",
      value: "12",
      icon: <Image className="h-5 w-5 text-blue-500" />,
      link: "/cms/advertisements",
    },
    {
      title: "Total Products",
      value: "248",
      icon: <Package className="h-5 w-5 text-green-500" />,
      link: "/cms/products",
      disabled: false,
    },
    {
      title: "Orders Today",
      value: "18",
      icon: <ShoppingCart className="h-5 w-5 text-orange-500" />,
      link: "/cms/orders",
      disabled: true,
    },
    {
      title: "Active Customers",
      value: "1,254",
      icon: <Users className="h-5 w-5 text-purple-500" />,
      link: "/cms/customers",
      disabled: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <Button
                variant="link"
                className="p-0 h-auto text-sm"
                asChild
                disabled={stat.disabled}
              >
                <Link to={stat.disabled ? "#" : stat.link}>
                  View details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Advertisement Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
              <div className="text-center">
                <BarChart2 className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">
                  Analytics charts will appear here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "New advertisement created",
                  target: "Summer Sale Hero Banner",
                  time: "2 hours ago",
                },
                {
                  action: "Advertisement updated",
                  target: "Category Banner - Flooring",
                  time: "5 hours ago",
                },
                {
                  action: "Advertisement scheduled",
                  target: "New Arrivals Promotion",
                  time: "Yesterday",
                },
                {
                  action: "Advertisement ended",
                  target: "Spring Collection",
                  time: "2 days ago",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b last:border-0 pb-2 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.target}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
