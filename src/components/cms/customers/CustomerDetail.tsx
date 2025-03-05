import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  ShoppingBag,
  CreditCard,
  Heart,
  BarChart2,
  User,
} from "lucide-react";

// Mock customer data
const mockCustomers = {
  cust1: {
    id: "cust1",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    phone: "+20 123 456 7890",
    status: "Active",
    totalOrders: 8,
    totalSpent: 12499.97,
    lastOrderDate: "2023-08-15T14:30:00Z",
    dateJoined: "2023-01-10T09:15:00Z",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
    address: {
      street: "123 Nile View Apartments",
      city: "Cairo",
      state: "Cairo Governorate",
      postalCode: "12345",
      country: "Egypt",
    },
    orders: [
      {
        id: "ORD-2023-1001",
        date: "2023-08-15T14:30:00Z",
        status: "Delivered",
        total: 3499.97,
        items: 5,
      },
      {
        id: "ORD-2023-0985",
        date: "2023-07-22T10:15:00Z",
        status: "Delivered",
        total: 1899.5,
        items: 3,
      },
      {
        id: "ORD-2023-0872",
        date: "2023-06-10T16:45:00Z",
        status: "Delivered",
        total: 2499.75,
        items: 4,
      },
    ],
    wishlist: [
      {
        id: "prod1",
        name: "Luxury Marble Flooring Tile",
        price: 1299.99,
        image:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&q=80",
      },
      {
        id: "prod3",
        name: "Modern Pendant Light Fixture",
        price: 899.99,
        image:
          "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=300&q=80",
      },
    ],
    notes:
      "Prefers delivery in the afternoon. Interested in kitchen renovation products.",
    tags: ["VIP", "Interior Designer", "Repeat Customer"],
  },
  cust2: {
    id: "cust2",
    name: "Nour El-Din",
    email: "nour.eldin@example.com",
    phone: "+20 123 456 7891",
    status: "Active",
    totalOrders: 5,
    totalSpent: 8799.5,
    lastOrderDate: "2023-08-14T10:15:00Z",
    dateJoined: "2023-02-22T11:30:00Z",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nour",
    address: {
      street: "456 Alexandria Corniche",
      city: "Alexandria",
      state: "Alexandria Governorate",
      postalCode: "23456",
      country: "Egypt",
    },
    orders: [
      {
        id: "ORD-2023-1002",
        date: "2023-08-14T10:15:00Z",
        status: "Processing",
        total: 1899.5,
        items: 2,
      },
      {
        id: "ORD-2023-0950",
        date: "2023-07-05T14:30:00Z",
        status: "Delivered",
        total: 2499.75,
        items: 3,
      },
    ],
    wishlist: [
      {
        id: "prod5",
        name: "Engineered Hardwood Flooring",
        price: 1599.99,
        image:
          "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=300&q=80",
      },
    ],
    notes:
      "Prefers to be contacted by email. Interested in bathroom renovation.",
    tags: ["Architect", "Wholesale"],
  },
};

// Format price
const formatPrice = (price: number) => {
  return price.toLocaleString("ar-EG", {
    style: "currency",
    currency: "EGP",
  });
};

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

// Get status badge color
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "inactive":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    case "delivered":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "processing":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "shipped":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    default:
      return "";
  }
};

const CustomerDetail = () => {
  const { id } = useParams();
  const customer = mockCustomers[id] || null;

  if (!customer) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Customer Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The customer you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/cms/customers">Back to Customers</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="-ml-2">
              <Link to="/cms/customers">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Customers
              </Link>
            </Button>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">{customer.name}</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link to={`/cms/customers/${customer.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" /> Edit Customer
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to={`/cms/customers/${customer.id}/email`}>
              <Mail className="mr-2 h-4 w-4" /> Send Email
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Badge variant="secondary" className={getStatusColor(customer.status)}>
          {customer.status}
        </Badge>
        <span className="text-muted-foreground">
          Customer since {formatDate(customer.dateJoined)}
        </span>
      </div>

      <Separator />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Customer Profile */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-20 w-20 rounded-full overflow-hidden bg-muted">
                      <img
                        src={customer.avatar}
                        alt={customer.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{customer.name}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Address</h4>
                      <div className="space-y-1 text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5" />
                          <div>
                            <div>{customer.address.street}</div>
                            <div>
                              {customer.address.city}, {customer.address.state}{" "}
                              {customer.address.postalCode}
                            </div>
                            <div>{customer.address.country}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Account Details</h4>
                      <div className="space-y-2 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Joined on {formatDate(customer.dateJoined)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ShoppingBag className="h-4 w-4" />
                          <span>{customer.totalOrders} total orders</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span>
                            Total spent: {formatPrice(customer.totalSpent)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {customer.notes && (
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Notes</h4>
                      <p className="text-muted-foreground">{customer.notes}</p>
                    </div>
                  )}

                  {customer.tags && customer.tags.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {customer.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>
                    The customer's most recent purchases
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customer.orders.length > 0 ? (
                      <div className="border rounded-md overflow-hidden">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-muted/50">
                              <th className="text-left p-3 font-medium">
                                Order ID
                              </th>
                              <th className="text-left p-3 font-medium">
                                Date
                              </th>
                              <th className="text-left p-3 font-medium">
                                Status
                              </th>
                              <th className="text-left p-3 font-medium">
                                Items
                              </th>
                              <th className="text-right p-3 font-medium">
                                Total
                              </th>
                              <th className="w-[80px]"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {customer.orders.map((order, index) => (
                              <tr key={index} className="border-t">
                                <td className="p-3 font-medium">{order.id}</td>
                                <td className="p-3">
                                  {formatDate(order.date)}
                                </td>
                                <td className="p-3">
                                  <Badge
                                    variant="secondary"
                                    className={getStatusColor(order.status)}
                                  >
                                    {order.status}
                                  </Badge>
                                </td>
                                <td className="p-3">{order.items} items</td>
                                <td className="p-3 text-right">
                                  {formatPrice(order.total)}
                                </td>
                                <td className="p-3 text-right">
                                  <Button variant="ghost" size="sm" asChild>
                                    <Link to={`/cms/orders/${order.id}`}>
                                      View
                                    </Link>
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        No orders found for this customer
                      </div>
                    )}

                    {customer.orders.length > 0 && (
                      <Button variant="outline" className="w-full" asChild>
                        <Link to={`/cms/customers/${customer.id}/orders`}>
                          View All Orders
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Customer Stats */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">
                      Total Orders
                    </div>
                    <div className="text-3xl font-bold">
                      {customer.totalOrders}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">
                      Total Spent
                    </div>
                    <div className="text-3xl font-bold text-primary">
                      {formatPrice(customer.totalSpent)}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">
                      Average Order Value
                    </div>
                    <div className="text-3xl font-bold">
                      {formatPrice(customer.totalSpent / customer.totalOrders)}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">
                      Last Order
                    </div>
                    <div>
                      <div className="font-medium">
                        {formatDate(customer.lastOrderDate)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {Math.floor(
                          (new Date().getTime() -
                            new Date(customer.lastOrderDate).getTime()) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        days ago
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">
                      Customer Since
                    </div>
                    <div>
                      <div className="font-medium">
                        {formatDate(customer.dateJoined)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {Math.floor(
                          (new Date().getTime() -
                            new Date(customer.dateJoined).getTime()) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        days
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to={`/cms/customers/${customer.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" /> Edit Customer
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to={`/cms/customers/${customer.id}/orders`}>
                      <ShoppingBag className="mr-2 h-4 w-4" /> View Orders
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to={`/cms/customers/${customer.id}/email`}>
                      <Mail className="mr-2 h-4 w-4" /> Send Email
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                Complete order history for {customer.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {customer.orders.length > 0 ? (
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 font-medium">Order ID</th>
                        <th className="text-left p-3 font-medium">Date</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-left p-3 font-medium">Items</th>
                        <th className="text-right p-3 font-medium">Total</th>
                        <th className="w-[80px]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {customer.orders.map((order, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-3 font-medium">{order.id}</td>
                          <td className="p-3">{formatDate(order.date)}</td>
                          <td className="p-3">
                            <Badge
                              variant="secondary"
                              className={getStatusColor(order.status)}
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td className="p-3">{order.items} items</td>
                          <td className="p-3 text-right">
                            {formatPrice(order.total)}
                          </td>
                          <td className="p-3 text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/cms/orders/${order.id}`}>View</Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No orders found for this customer
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Analytics</CardTitle>
              <CardDescription>Order patterns and statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
                <div className="text-center">
                  <BarChart2 className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    Order analytics visualization would appear here
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    This feature will be available in a future update
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wishlist" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Wishlist Items</CardTitle>
              <CardDescription>
                Products saved to {customer.name}'s wishlist
              </CardDescription>
            </CardHeader>
            <CardContent>
              {customer.wishlist && customer.wishlist.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {customer.wishlist.map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-md overflow-hidden"
                    >
                      <div className="h-40 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium mb-1 line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-primary font-bold mb-3">
                          {formatPrice(item.price)}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                            className="flex-1"
                          >
                            <Link to={`/cms/products/${item.id}`}>View</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No wishlist items found for this customer
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Products</CardTitle>
              <CardDescription>
                Products this customer might be interested in based on their
                browsing and purchase history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
                <div className="text-center">
                  <Heart className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    Product recommendations would appear here
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    This feature will be available in a future update
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Activity</CardTitle>
              <CardDescription>Recent actions and interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-0">
                {/* Sample activity timeline */}
                {[
                  {
                    type: "order",
                    action: "Placed an order",
                    detail: `Order #${customer.orders[0]?.id || "ORD-2023-1001"} for ${formatPrice(customer.orders[0]?.total || 3499.97)}`,
                    date: customer.orders[0]?.date || "2023-08-15T14:30:00Z",
                    icon: <ShoppingBag className="h-5 w-5 text-primary" />,
                  },
                  {
                    type: "wishlist",
                    action: "Added item to wishlist",
                    detail:
                      customer.wishlist[0]?.name ||
                      "Luxury Marble Flooring Tile",
                    date: "2023-08-10T09:15:00Z",
                    icon: <Heart className="h-5 w-5 text-primary" />,
                  },
                  {
                    type: "account",
                    action: "Updated account information",
                    detail: "Changed phone number",
                    date: "2023-07-22T16:45:00Z",
                    icon: <User className="h-5 w-5 text-primary" />,
                  },
                  {
                    type: "order",
                    action: "Placed an order",
                    detail: `Order #${customer.orders[1]?.id || "ORD-2023-0985"} for ${formatPrice(customer.orders[1]?.total || 1899.5)}`,
                    date: customer.orders[1]?.date || "2023-07-22T10:15:00Z",
                    icon: <ShoppingBag className="h-5 w-5 text-primary" />,
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex gap-4 pb-8 relative">
                    {/* Timeline connector */}
                    {index < 3 && (
                      <div className="absolute left-[19px] top-7 bottom-0 w-0.5 bg-muted-foreground/20"></div>
                    )}

                    {/* Status icon */}
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 z-10">
                      {activity.icon}
                    </div>

                    {/* Event details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <h4 className="font-medium">{activity.action}</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {formatDate(activity.date)}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <Button variant="outline">Load More Activity</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerDetail;
