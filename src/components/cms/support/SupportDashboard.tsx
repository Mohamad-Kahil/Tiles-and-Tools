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
import TicketDetailView from "./TicketDetailView";
import KnowledgeBaseManager from "./KnowledgeBaseManager";
import ArticleDetailView from "./ArticleDetailView";
import SupportAnalytics from "./SupportAnalytics";
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
  const [activeArticle, setActiveArticle] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("tickets");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Customer Support</h2>
        <NewTicketDialog />
      </div>

      <Tabs
        defaultValue="tickets"
        value={activeTab}
        onValueChange={setActiveTab}
      >
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
                  <CardContent className="p-6">
                    <TicketDetailView
                      ticket={{
                        id: "TKT-2023-1001",
                        subject: "Order delivery delay",
                        status: "Open",
                        priority: "High",
                        customer: {
                          name: "Ahmed Hassan",
                          email: "ahmed.hassan@example.com",
                          phone: "+20 123 456 7890",
                          avatar:
                            "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
                          since: "Jan 10, 2023",
                        },
                        order: {
                          id: "ORD-2023-1001",
                          date: "August 15, 2023",
                          items: "Luxury Marble Flooring Tile (x20)",
                          expectedDelivery: "August 22, 2023",
                        },
                        messages: [
                          {
                            sender: "Ahmed Hassan",
                            senderType: "customer",
                            avatar:
                              "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
                            time: "Today, 10:23 AM",
                            content:
                              "Hello, I placed an order (#ORD-2023-1001) on August 15th for some flooring tiles, and it was supposed to be delivered yesterday. I haven't received any updates on the delivery status. Could you please check what's happening with my order?",
                            note: "Submitted via website",
                          },
                          {
                            sender: "Support Agent",
                            senderType: "agent",
                            avatar:
                              "https://api.dicebear.com/7.x/avataaars/svg?seed=Support",
                            time: "Today, 11:05 AM",
                            content:
                              "Hello Ahmed, thank you for reaching out. I apologize for the delay with your order. I've checked your order status and there seems to be a slight delay with the delivery service. I've contacted our logistics team and they've assured me that your order will be delivered tomorrow. I'll personally follow up to ensure it arrives on time.\n\nWould you like me to arrange a specific delivery time that works best for you?",
                            note: "Internal note: Delivery delay due to inventory restock",
                          },
                        ],
                      }}
                    />
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
          {activeArticle ? (
            <ArticleDetailView
              article={{
                id: "kb-1",
                title: "How to track your order",
                category: "Orders & Shipping",
                status: "Published",
                content: `<h1>How to Track Your Order</h1>
                <p>Tracking your order with DecorEgypt is easy. Follow these simple steps to stay updated on your purchase:</p>
                
                <h2>Method 1: Using Your Account</h2>
                <ol>
                  <li>Log in to your DecorEgypt account</li>
                  <li>Navigate to "My Orders" in your account dashboard</li>
                  <li>Find your order in the list and click "View Details"</li>
                  <li>The current status and tracking information will be displayed</li>
                </ol>
                
                <h2>Method 2: Using Your Order Confirmation Email</h2>
                <ol>
                  <li>Open the order confirmation email you received when placing your order</li>
                  <li>Click on the "Track Order" button or link</li>
                  <li>You'll be directed to a page showing your order status</li>
                </ol>
                
                <h2>Method 3: Guest Order Tracking</h2>
                <ol>
                  <li>Visit our website and click on "Track Order" in the footer</li>
                  <li>Enter your order number and the email address used for the order</li>
                  <li>Click "Track" to see your order status</li>
                </ol>
                
                <h2>Understanding Order Statuses</h2>
                <ul>
                  <li><strong>Order Placed</strong>: We've received your order</li>
                  <li><strong>Processing</strong>: Your order is being prepared</li>
                  <li><strong>Shipped</strong>: Your order is on its way</li>
                  <li><strong>Out for Delivery</strong>: Your order will be delivered today</li>
                  <li><strong>Delivered</strong>: Your order has been delivered</li>
                </ul>
                
                <p>If you have any questions about your order, please <a href="/contact">contact our customer support team</a>.</p>`,
                excerpt:
                  "Learn how to easily track your DecorEgypt orders using your account, order confirmation email, or as a guest.",
                author: "Support Team",
                createdAt: "August 10, 2023",
                updatedAt: "August 15, 2023",
                views: 1245,
                tags: ["orders", "shipping", "tracking", "delivery"],
              }}
              onBack={() => setActiveArticle(null)}
            />
          ) : (
            <KnowledgeBaseManager onArticleSelect={setActiveArticle} />
          )}
        </TabsContent>

        <TabsContent value="reports" className="space-y-6 pt-4">
          <SupportAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportDashboard;
