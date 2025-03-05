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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NewTicketDialog from "./NewTicketDialog";
import NewArticleDialog from "./NewArticleDialog";
import {
  MessageSquare,
  Search,
  Filter,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  User,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  ArrowLeft,
  BarChart2,
  RefreshCw,
  ShoppingCart,
  Truck,
  Package,
  PieChart,
  TrendingUp,
  TrendingDown,
  LineChart,
} from "lucide-react";

const SupportDashboard = () => {
  const [activeTicket, setActiveTicket] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Customer Support</h2>
        <NewTicketDialog />
      </div>

      <Tabs defaultValue="tickets">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-6 pt-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Ticket List */}
            <div className="md:w-1/3 space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search tickets..."
                    className="pl-8"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              <div className="border rounded-md">
                <div className="p-3 border-b bg-muted/50">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Recent Tickets</h3>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[130px] h-8">
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Tickets</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="divide-y max-h-[600px] overflow-y-auto">
                  {[
                    {
                      id: "ticket-1",
                      customer: "Ahmed Hassan",
                      subject: "Order delivery delay",
                      status: "Open",
                      priority: "High",
                      time: "2 hours ago",
                      avatar:
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
                    },
                    {
                      id: "ticket-2",
                      customer: "Laila Mahmoud",
                      subject: "Wrong product received",
                      status: "Pending",
                      priority: "Medium",
                      time: "5 hours ago",
                      avatar:
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=Laila",
                    },
                    {
                      id: "ticket-3",
                      customer: "Mohamed Ali",
                      subject: "Refund request for damaged item",
                      status: "Open",
                      priority: "High",
                      time: "Yesterday",
                      avatar:
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamed",
                    },
                    {
                      id: "ticket-4",
                      customer: "Sara Ahmed",
                      subject: "Question about product specifications",
                      status: "Pending",
                      priority: "Low",
                      time: "2 days ago",
                      avatar:
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
                    },
                    {
                      id: "ticket-5",
                      customer: "Khaled Ibrahim",
                      subject: "Installation service inquiry",
                      status: "Resolved",
                      priority: "Medium",
                      time: "3 days ago",
                      avatar:
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=Khaled",
                    },
                  ].map((ticket) => (
                    <div
                      key={ticket.id}
                      className={`p-3 hover:bg-muted/50 cursor-pointer ${activeTicket === ticket.id ? "bg-muted/50" : ""}`}
                      onClick={() => setActiveTicket(ticket.id)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={ticket.avatar}
                              alt={ticket.customer}
                            />
                            <AvatarFallback>
                              {ticket.customer.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium line-clamp-1">
                              {ticket.subject}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {ticket.customer}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs ${ticket.status === "Open" ? "bg-blue-100 text-blue-800" : ticket.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                        >
                          {ticket.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="outline" className="text-xs">
                          {ticket.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {ticket.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Ticket Detail */}
            <div className="md:w-2/3">
              {activeTicket ? (
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Order delivery delay</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className="bg-blue-100 text-blue-800"
                          >
                            Open
                          </Badge>
                          <Badge variant="outline">High Priority</Badge>
                          <span className="text-xs">Ticket #TKT-2023-1001</span>
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Assign
                        </Button>
                        <Select defaultValue="open">
                          <SelectTrigger className="w-[130px] h-9">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4 mb-6">
                      <Avatar>
                        <AvatarImage
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed"
                          alt="Ahmed Hassan"
                        />
                        <AvatarFallback>AH</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="font-medium">Ahmed Hassan</h4>
                        <div className="text-sm text-muted-foreground flex items-center gap-4">
                          <span className="flex items-center">
                            <Mail className="h-3.5 w-3.5 mr-1" />{" "}
                            ahmed.hassan@example.com
                          </span>
                          <span className="flex items-center">
                            <Phone className="h-3.5 w-3.5 mr-1" /> +20 123 456
                            7890
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" /> Customer
                          since Jan 10, 2023
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-start gap-4">
                          <Avatar className="mt-0.5">
                            <AvatarImage
                              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed"
                              alt="Ahmed Hassan"
                            />
                            <AvatarFallback>AH</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="bg-muted p-4 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">
                                  Ahmed Hassan
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  Today, 10:23 AM
                                </span>
                              </div>
                              <p className="text-sm">
                                Hello, I placed an order (#ORD-2023-1001) on
                                August 15th for some flooring tiles, and it was
                                supposed to be delivered yesterday. I haven't
                                received any updates on the delivery status.
                                Could you please check what's happening with my
                                order?
                              </p>
                              <div className="mt-2 p-2 bg-background rounded border">
                                <div className="text-xs text-muted-foreground mb-1">
                                  Order #ORD-2023-1001
                                </div>
                                <div className="text-sm font-medium">
                                  Luxury Marble Flooring Tile (x20)
                                </div>
                                <div className="text-xs">
                                  Ordered: August 15, 2023
                                </div>
                                <div className="text-xs">
                                  Expected Delivery: August 22, 2023
                                </div>
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Submitted via website
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <Avatar className="mt-0.5">
                            <AvatarImage
                              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Support"
                              alt="Support Agent"
                            />
                            <AvatarFallback>SA</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="bg-primary/10 p-4 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">
                                  Support Agent
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  Today, 11:05 AM
                                </span>
                              </div>
                              <p className="text-sm">
                                Hello Ahmed, thank you for reaching out. I
                                apologize for the delay with your order. I've
                                checked your order status and there seems to be
                                a slight delay with the delivery service. I've
                                contacted our logistics team and they've assured
                                me that your order will be delivered tomorrow.
                                I'll personally follow up to ensure it arrives
                                on time.
                              </p>
                              <p className="text-sm mt-2">
                                Would you like me to arrange a specific delivery
                                time that works best for you?
                              </p>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Internal note: Delivery delay due to inventory
                              restock
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Textarea
                          placeholder="Type your reply here..."
                          className="min-h-[120px]"
                        />
                        <div className="flex justify-between">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Add Note
                            </Button>
                            <Button variant="outline" size="sm">
                              Attach File
                            </Button>
                          </div>
                          <Button>Send Reply</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="h-full flex items-center justify-center border rounded-md bg-muted/20 p-12">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No Ticket Selected
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Select a ticket from the list to view details and respond
                    </p>
                    <NewTicketDialog>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create New Ticket
                      </Button>
                    </NewTicketDialog>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Knowledge Base Articles</CardTitle>
                  <CardDescription>
                    Manage and organize support articles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search articles..."
                        className="pl-8"
                      />
                    </div>
                    <NewArticleDialog />
                  </div>

                  <div className="border rounded-md">
                    <div className="p-3 border-b bg-muted/50 flex justify-between items-center">
                      <h3 className="font-medium">Recent Articles</h3>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[130px] h-8">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="orders">
                            Orders & Shipping
                          </SelectItem>
                          <SelectItem value="products">Products</SelectItem>
                          <SelectItem value="returns">
                            Returns & Refunds
                          </SelectItem>
                          <SelectItem value="account">
                            Account & Billing
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="divide-y">
                      {[
                        {
                          id: "kb-1",
                          title: "How to track your order",
                          category: "Orders & Shipping",
                          views: 1245,
                          lastUpdated: "2 days ago",
                          status: "Published",
                        },
                        {
                          id: "kb-2",
                          title: "Return policy and process",
                          category: "Returns & Refunds",
                          views: 987,
                          lastUpdated: "1 week ago",
                          status: "Published",
                        },
                        {
                          id: "kb-3",
                          title: "Product care and maintenance guide",
                          category: "Products",
                          views: 756,
                          lastUpdated: "2 weeks ago",
                          status: "Published",
                        },
                        {
                          id: "kb-4",
                          title: "Payment methods and billing information",
                          category: "Account & Billing",
                          views: 543,
                          lastUpdated: "3 weeks ago",
                          status: "Published",
                        },
                        {
                          id: "kb-5",
                          title: "Installation services and scheduling",
                          category: "Products",
                          views: 432,
                          lastUpdated: "1 month ago",
                          status: "Draft",
                        },
                      ].map((article) => (
                        <div key={article.id} className="p-3 hover:bg-muted/50">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{article.title}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {article.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {article.views} views
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={
                                  article.status === "Published"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {article.status}
                              </Badge>
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-2">
                            Last updated: {article.lastUpdated}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 border-t flex justify-between items-center">
                      <Button variant="outline" size="sm" disabled>
                        <ArrowLeft className="h-4 w-4 mr-1" /> Previous
                      </Button>
                      <span className="text-sm">Page 1 of 3</span>
                      <Button variant="outline" size="sm">
                        Next <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                  <CardDescription>
                    Organize your knowledge base
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Orders & Shipping",
                        articles: 12,
                        icon: <ShoppingCart className="h-4 w-4" />,
                      },
                      {
                        name: "Products",
                        articles: 18,
                        icon: <Package className="h-4 w-4" />,
                      },
                      {
                        name: "Returns & Refunds",
                        articles: 8,
                        icon: <RefreshCw className="h-4 w-4" />,
                      },
                      {
                        name: "Account & Billing",
                        articles: 10,
                        icon: <User className="h-4 w-4" />,
                      },
                      {
                        name: "Installation & Services",
                        articles: 6,
                        icon: <HelpCircle className="h-4 w-4" />,
                      },
                    ].map((category, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 p-2 rounded-full">
                            {category.icon}
                          </div>
                          <span>{category.name}</span>
                        </div>
                        <Badge variant="outline">
                          {category.articles} articles
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full mt-4">
                    <Plus className="mr-2 h-4 w-4" /> Add Category
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Popular Articles</CardTitle>
                  <CardDescription>Most viewed support content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "How to track your order", views: 1245 },
                      { title: "Return policy and process", views: 987 },
                      {
                        title: "Product care and maintenance guide",
                        views: 756,
                      },
                      {
                        title: "Payment methods and billing information",
                        views: 543,
                      },
                      {
                        title: "Shipping times and delivery options",
                        views: 489,
                      },
                    ].map((article, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="text-sm font-medium">
                          {article.title}
                        </div>
                        <Badge variant="outline">{article.views} views</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6 pt-4">
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
                        <TrendingDown className="h-3 w-3 mr-1" /> 15%
                        improvement
                      </div>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="text-sm text-muted-foreground mb-1">
                        Resolution Rate
                      </div>
                      <div className="text-2xl font-bold">92%</div>
                      <div className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingDown className="h-3 w-3 mr-1" /> 5% improvement
                      </div>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="text-sm text-muted-foreground mb-1">
                        Customer Satisfaction
                      </div>
                      <div className="text-2xl font-bold">4.7/5</div>
                      <div className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingDown className="h-3 w-3 mr-1" /> 0.3
                        improvement
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
                          {
                            category: "Order Issues",
                            count: 45,
                            percentage: 30,
                          },
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
                        avatar:
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
                      },
                      {
                        name: "Mohamed Khalid",
                        role: "Senior Agent",
                        tickets: 38,
                        resolution: "92%",
                        satisfaction: 4.7,
                        avatar:
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamed",
                      },
                      {
                        name: "Nour Hassan",
                        role: "Support Agent",
                        tickets: 32,
                        resolution: "88%",
                        satisfaction: 4.6,
                        avatar:
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=Nour",
                      },
                    ].map((agent, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-md"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={agent.avatar} alt={agent.name} />
                            <AvatarFallback>
                              {agent.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{agent.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {agent.role}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">{agent.tickets} tickets</div>
                          <div className="text-xs text-muted-foreground">
                            {agent.resolution} resolution • {agent.satisfaction}
                            /5 rating
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
                      {
                        issue: "Delivery delays",
                        count: 28,
                        trend: "increasing",
                      },
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
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="text-sm">{issue.issue}</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{issue.count}</Badge>
                          {issue.trend === "increasing" ? (
                            <TrendingUp className="h-4 w-4 text-red-500" />
                          ) : issue.trend === "decreasing" ? (
                            <TrendingDown className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
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
                  <CardDescription>
                    Average time to first response
                  </CardDescription>
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportDashboard;
