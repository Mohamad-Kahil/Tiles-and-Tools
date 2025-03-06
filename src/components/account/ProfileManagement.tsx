import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  User,
  CreditCard,
  MapPin,
  Bell,
  Lock,
  Shield,
} from "lucide-react";

const ProfileManagement = () => {
  const [activeTab, setActiveTab] = useState("personal");

  // Mock user data
  const user = {
    name: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    phone: "+20 123 456 7890",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
    memberSince: "January 2023",
    addresses: [
      {
        id: "addr1",
        type: "Home",
        default: true,
        street: "123 Nile View Apartments",
        city: "Cairo",
        state: "Cairo Governorate",
        postalCode: "12345",
        country: "Egypt",
      },
      {
        id: "addr2",
        type: "Work",
        default: false,
        street: "456 Business Tower, Downtown",
        city: "Cairo",
        state: "Cairo Governorate",
        postalCode: "12345",
        country: "Egypt",
      },
    ],
    paymentMethods: [
      {
        id: "pm1",
        type: "Credit Card",
        default: true,
        cardType: "Visa",
        lastFour: "4242",
        expiryDate: "05/25",
      },
      {
        id: "pm2",
        type: "Credit Card",
        default: false,
        cardType: "Mastercard",
        lastFour: "8765",
        expiryDate: "09/24",
      },
    ],
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Sidebar */}
        <div className="w-full md:w-64 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Member since {user.memberSince}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="hidden md:block">
            <div className="font-medium mb-2">Account Settings</div>
            <nav className="flex flex-col space-y-1">
              <Button
                variant={activeTab === "personal" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("personal")}
              >
                <User className="mr-2 h-4 w-4" />
                Personal Info
              </Button>
              <Button
                variant={activeTab === "addresses" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("addresses")}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Addresses
              </Button>
              <Button
                variant={activeTab === "payment" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("payment")}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Payment Methods
              </Button>
              <Button
                variant={activeTab === "notifications" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button
                variant={activeTab === "security" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("security")}
              >
                <Lock className="mr-2 h-4 w-4" />
                Security
              </Button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="md:hidden mb-6"
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Personal Information */}
          {activeTab === "personal" && (
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" defaultValue={user.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user.email}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue={user.phone} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Preferred Language</Label>
                      <select
                        id="language"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue="en"
                      >
                        <option value="en">English</option>
                        <option value="ar">Arabic</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">About Me (Optional)</Label>
                    <textarea
                      id="bio"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us a bit about yourself"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          )}

          {/* Addresses */}
          {activeTab === "addresses" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle>Your Addresses</CardTitle>
                  <CardDescription>
                    Manage your shipping and billing addresses
                  </CardDescription>
                </div>
                <Button size="sm">Add New Address</Button>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {user.addresses.map((address) => (
                    <div
                      key={address.id}
                      className="border rounded-lg p-4 relative"
                    >
                      {address.default && (
                        <Badge className="absolute top-4 right-4 bg-primary">
                          Default
                        </Badge>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{address.type}</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p>{address.street}</p>
                        <p>
                          {address.city}, {address.state} {address.postalCode}
                        </p>
                        <p>{address.country}</p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        {!address.default && (
                          <Button variant="outline" size="sm">
                            Set as Default
                          </Button>
                        )}
                        {!address.default && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Methods */}
          {activeTab === "payment" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>
                    Manage your saved payment methods
                  </CardDescription>
                </div>
                <Button size="sm">Add Payment Method</Button>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {user.paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="border rounded-lg p-4 relative"
                    >
                      {method.default && (
                        <Badge className="absolute top-4 right-4 bg-primary">
                          Default
                        </Badge>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{method.cardType}</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p>•••• •••• •••• {method.lastFour}</p>
                        <p>Expires {method.expiryDate}</p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        {!method.default && (
                          <Button variant="outline" size="sm">
                            Set as Default
                          </Button>
                        )}
                        {!method.default && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how you receive notifications and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Order Updates</div>
                      <div className="text-sm text-muted-foreground">
                        Receive notifications about your order status
                      </div>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Promotions and Offers</div>
                      <div className="text-sm text-muted-foreground">
                        Receive emails about new promotions and special offers
                      </div>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Product Recommendations</div>
                      <div className="text-sm text-muted-foreground">
                        Receive personalized product recommendations
                      </div>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Account Activity</div>
                      <div className="text-sm text-muted-foreground">
                        Receive notifications about account activity and
                        security
                      </div>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and privacy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Change Password
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">
                          Current Password
                        </Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          placeholder="Enter your current password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="Enter your new password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your new password"
                        />
                      </div>
                      <Button className="mt-2">Update Password</Button>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Two-Factor Authentication
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Enable 2FA</div>
                        <div className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </div>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Account Actions
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 border border-red-200 rounded-md bg-red-50">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-red-700">
                              Delete Account
                            </h4>
                            <p className="text-sm text-red-600 mt-1">
                              Permanently delete your account and all associated
                              data. This action cannot be undone.
                            </p>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="mt-4"
                            >
                              Delete Account
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
