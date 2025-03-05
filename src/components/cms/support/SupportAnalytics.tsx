import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  BarChart2,
  PieChart,
  LineChart,
} from "lucide-react";

const SupportAnalytics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Support Performance</CardTitle>
            <CardDescription>
              Key metrics and trends for customer support
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="p-4 border rounded-md">
                <div className="text-sm text-muted-foreground mb-1">
                  Average Response Time
                </div>
                <div className="text-2xl font-bold">2.5 hours</div>
                <div className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 mr-1" /> 15% improvement
                </div>
              </div>
              <div className="p-4 border rounded-md">
                <div className="text-sm text-muted-foreground mb-1">
                  Resolution Rate
                </div>
                <div className="text-2xl font-bold">92%</div>
                <div className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> 5% improvement
                </div>
              </div>
              <div className="p-4 border rounded-md">
                <div className="text-sm text-muted-foreground mb-1">
                  Customer Satisfaction
                </div>
                <div className="text-2xl font-bold">4.7/5</div>
                <div className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> 0.3 improvement
                </div>
              </div>
            </div>

            <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
              <div className="text-center">
                <BarChart2 className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">
                  Support metrics chart will appear here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Ticket Analytics</CardTitle>
            <CardDescription>
              Breakdown of support tickets by category and status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-4">Tickets by Category</h4>
                <div className="space-y-4">
                  {[
                    { category: "Order Issues", count: 45, percentage: 30 },
                    {
                      category: "Product Questions",
                      count: 38,
                      percentage: 25,
                    },
                    {
                      category: "Shipping & Delivery",
                      count: 30,
                      percentage: 20,
                    },
                    {
                      category: "Returns & Refunds",
                      count: 23,
                      percentage: 15,
                    },
                    {
                      category: "Account & Billing",
                      count: 15,
                      percentage: 10,
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <div className="min-w-[100px] flex items-center justify-between">
                        <span className="text-sm">{item.category}</span>
                        <span className="text-sm font-medium">
                          {item.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Tickets by Status</h4>
                <div className="h-[200px] flex items-center justify-center border rounded-md bg-muted/20">
                  <div className="text-center">
                    <PieChart className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      Status distribution chart will appear here
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm">Open (35%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm">Pending (25%)</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Resolved (30%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                      <span className="text-sm">Closed (10%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Support Team</CardTitle>
            <CardDescription>Agent performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Sarah Ahmed",
                  role: "Support Lead",
                  tickets: 45,
                  resolution: "95%",
                  satisfaction: 4.9,
                },
                {
                  name: "Mohamed Khalid",
                  role: "Senior Agent",
                  tickets: 38,
                  resolution: "92%",
                  satisfaction: 4.7,
                },
                {
                  name: "Nour Hassan",
                  role: "Support Agent",
                  tickets: 32,
                  resolution: "88%",
                  satisfaction: 4.6,
                },
              ].map((agent, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-md"
                >
                  <div>
                    <div className="font-medium">{agent.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {agent.role}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{agent.tickets} tickets</div>
                    <div className="text-xs text-muted-foreground">
                      {agent.resolution} resolution • {agent.satisfaction}/5
                      rating
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Issues</CardTitle>
            <CardDescription>
              Frequently reported customer problems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { issue: "Delivery delays", count: 28, trend: "increasing" },
                {
                  issue: "Product quality concerns",
                  count: 22,
                  trend: "stable",
                },
                {
                  issue: "Website navigation problems",
                  count: 17,
                  trend: "decreasing",
                },
                {
                  issue: "Payment processing errors",
                  count: 15,
                  trend: "stable",
                },
                {
                  issue: "Missing items in orders",
                  count: 12,
                  trend: "decreasing",
                },
              ].map((issue, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="text-sm">{issue.issue}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{issue.count}</Badge>
                    {issue.trend === "increasing" ? (
                      <TrendingUp className="h-4 w-4 text-red-500" />
                    ) : issue.trend === "decreasing" ? (
                      <TrendingDown className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response Time</CardTitle>
            <CardDescription>Average time to first response</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border rounded-md bg-muted/20">
              <div className="text-center">
                <LineChart className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">
                  Response time trend will appear here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupportAnalytics;
