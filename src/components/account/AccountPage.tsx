import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Package, CreditCard, LogOut, Edit, Trash2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";

const AccountPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  // Mock user data
  const userData = {
    name: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    phone: "+20 123 456 7890",
    addresses: [
      {
        id: "addr1",
        type: "Home",
        address: "123 Tahrir Square",
        city: "Cairo",
        governorate: "Cairo",
        postalCode: "11511",
        isDefault: true,
      },
      {
        id: "addr2",
        type: "Work",
        address: "456 Maadi Street",
        city: "Cairo",
        governorate: "Cairo",
        postalCode: "11728",
        isDefault: false,
      },
    ],
    orders: [
      {
        id: "ORD-12345",
        date: "2023-10-15",
        total: 2499.99,
        status: "Delivered",
        items: 3,
      },
      {
        id: "ORD-12346",
        date: "2023-11-02",
        total: 1899.5,
        status: "Processing",
        items: 2,
      },
      {
        id: "ORD-12347",
        date: "2023-11-10",
        total: 3299.75,
        status: "Shipped",
        items: 4,
      },
    ],
    paymentMethods: [
      {
        id: "pm1",
        type: "Credit Card",
        lastFour: "4242",
        expiryDate: "05/25",
        isDefault: true,
      },
      {
        id: "pm2",
        type: "Debit Card",
        lastFour: "8765",
        expiryDate: "09/24",
        isDefault: false,
      },
    ],
  };

  // Format price
  const formatPrice = (price: number) => {
    return price.toLocaleString("ar-EG", {
      style: "currency",
      currency: "EGP",
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-6">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-card rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-medium">{userData.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {userData.email}
                  </p>
                </div>
              </div>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                orientation="vertical"
                className="w-full"
              >
                <TabsList className="flex flex-col h-auto bg-transparent space-y-1 p-0">
                  <TabsTrigger
                    value="profile"
                    className="justify-start px-3 py-2 h-auto data-[state=active]:bg-muted"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="orders"
                    className="justify-start px-3 py-2 h-auto data-[state=active]:bg-muted"
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </TabsTrigger>
                  <TabsTrigger
                    value="payment"
                    className="justify-start px-3 py-2 h-auto data-[state=active]:bg-muted"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payment Methods
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Separator className="my-4" />

              <Button
                variant="outline"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <TabsContent value="profile" className="mt-0 space-y-6">
              <div className="bg-card rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-medium mb-4">
                  Personal Information
                </h2>
                <Separator className="mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={userData.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue={userData.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue={userData.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value="********" />
                  </div>
                </div>

                <Button className="mt-6">Save Changes</Button>
              </div>

              <div className="bg-card rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-medium">Addresses</h2>
                  <Button variant="outline" size="sm">
                    Add New Address
                  </Button>
                </div>
                <Separator className="mb-6" />

                <div className="space-y-4">
                  {userData.addresses.map((address) => (
                    <div
                      key={address.id}
                      className="border rounded-md p-4 relative"
                    >
                      {address.isDefault && (
                        <Badge className="absolute top-4 right-4">
                          Default
                        </Badge>
                      )}
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{address.type}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {address.address}, {address.city},{" "}
                            {address.governorate}
                            {address.postalCode && `, ${address.postalCode}`}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      {!address.isDefault && (
                        <Button
                          variant="link"
                          className="mt-2 h-auto p-0 text-sm"
                        >
                          Set as default
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="orders" className="mt-0">
              <div className="bg-card rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-medium mb-4">Order History</h2>
                <Separator className="mb-6" />

                <div className="space-y-4">
                  {userData.orders.map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/account/orders/${order.id}`)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{order.id}</h3>
                            <Badge
                              variant="secondary"
                              className={`ml-2 ${getStatusColor(order.status)}`}
                            >
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Date(order.date).toLocaleDateString()} •{" "}
                            {order.items} {order.items === 1 ? "item" : "items"}
                          </p>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                          <span className="font-bold">
                            {formatPrice(order.total)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-auto sm:ml-0"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="payment" className="mt-0">
              <div className="bg-card rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-medium">Payment Methods</h2>
                  <Button variant="outline" size="sm">
                    Add New Card
                  </Button>
                </div>
                <Separator className="mb-6" />

                <div className="space-y-4">
                  {userData.paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="border rounded-md p-4 relative"
                    >
                      {method.isDefault && (
                        <Badge className="absolute top-4 right-4">
                          Default
                        </Badge>
                      )}
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="h-10 w-16 bg-gray-100 rounded flex items-center justify-center mr-4">
                            {method.type === "Credit Card" ? (
                              <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png"
                                alt="Mastercard"
                                className="h-6 w-auto"
                              />
                            ) : (
                              <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png"
                                alt="Visa"
                                className="h-6 w-auto"
                              />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{method.type}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              **** **** **** {method.lastFour} • Expires{" "}
                              {method.expiryDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      {!method.isDefault && (
                        <Button
                          variant="link"
                          className="mt-2 h-auto p-0 text-sm"
                        >
                          Set as default
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccountPage;
