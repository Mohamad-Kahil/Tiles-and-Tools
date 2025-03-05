import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Bell,
  Shield,
  Database,
  Save,
} from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Store Settings</h2>
        <Button>
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="localization">Localization</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Store Information</CardTitle>
                <CardDescription>
                  Basic information about your store
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input id="store-name" defaultValue="DecorEgypt" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-url">Store URL</Label>
                    <Input
                      id="store-url"
                      defaultValue="https://decoregypt.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="store-description">Store Description</Label>
                  <Textarea
                    id="store-description"
                    defaultValue="Your premier destination for home decoration and finishing products in Egypt."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input
                      id="admin-email"
                      defaultValue="admin@decoregypt.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="support-email">Support Email</Label>
                    <Input
                      id="support-email"
                      defaultValue="support@decoregypt.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  How customers can reach your business
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input id="phone" defaultValue="+20 2 1234 5678" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input id="email" defaultValue="info@decoregypt.com" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="flex items-start">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground mt-2" />
                    <Textarea
                      id="address"
                      defaultValue="123 Cairo Business Plaza\nCairo, Egypt 12345"
                      className="min-h-[80px]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-hours">Business Hours</Label>
                  <Textarea
                    id="business-hours"
                    defaultValue="Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed"
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
                <CardDescription>
                  Connect your store to social platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      defaultValue="https://facebook.com/decoregypt"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      defaultValue="https://instagram.com/decoregypt"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      defaultValue="https://twitter.com/decoregypt"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="youtube">YouTube</Label>
                    <Input
                      id="youtube"
                      defaultValue="https://youtube.com/decoregypt"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Localization Settings */}
          <TabsContent value="localization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Regional Settings</CardTitle>
                <CardDescription>
                  Configure region-specific settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-country">Default Country</Label>
                    <Select defaultValue="egypt">
                      <SelectTrigger id="default-country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="egypt">Egypt</SelectItem>
                        <SelectItem value="saudi-arabia">
                          Saudi Arabia
                        </SelectItem>
                        <SelectItem value="uae">
                          United Arab Emirates
                        </SelectItem>
                        <SelectItem value="kuwait">Kuwait</SelectItem>
                        <SelectItem value="qatar">Qatar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="cairo">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cairo">
                          Africa/Cairo (GMT+2)
                        </SelectItem>
                        <SelectItem value="riyadh">
                          Asia/Riyadh (GMT+3)
                        </SelectItem>
                        <SelectItem value="dubai">
                          Asia/Dubai (GMT+4)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select defaultValue="egp">
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="egp">
                          Egyptian Pound (EGP)
                        </SelectItem>
                        <SelectItem value="sar">Saudi Riyal (SAR)</SelectItem>
                        <SelectItem value="aed">UAE Dirham (AED)</SelectItem>
                        <SelectItem value="usd">US Dollar (USD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select defaultValue="dd-mm-yyyy">
                      <SelectTrigger id="date-format">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                        <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Language Settings</CardTitle>
                <CardDescription>
                  Configure multilingual support
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="default-language">Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="default-language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">
                        <div className="flex items-center">
                          <Globe className="mr-2 h-4 w-4" />
                          English
                        </div>
                      </SelectItem>
                      <SelectItem value="ar">
                        <div className="flex items-center">
                          <Globe className="mr-2 h-4 w-4" />
                          Arabic (العربية)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Enabled Languages</Label>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between border p-3 rounded-md">
                      <div className="flex items-center">
                        <Globe className="mr-2 h-4 w-4" />
                        <span>English</span>
                        <Badge variant="outline" className="ml-2">
                          Default
                        </Badge>
                      </div>
                      <Switch checked={true} disabled />
                    </div>
                    <div className="flex items-center justify-between border p-3 rounded-md">
                      <div className="flex items-center">
                        <Globe className="mr-2 h-4 w-4" />
                        <span>Arabic (العربية)</span>
                      </div>
                      <Switch checked={true} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="auto-translate" />
                  <Label htmlFor="auto-translate">
                    Enable automatic translation for missing content
                  </Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Configure available payment options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <div>
                        <div className="font-medium">Credit/Debit Cards</div>
                        <div className="text-sm text-muted-foreground">
                          Accept Visa, Mastercard, and American Express
                        </div>
                      </div>
                    </div>
                    <Switch checked={true} />
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center">
                      <Truck className="mr-2 h-4 w-4" />
                      <div>
                        <div className="font-medium">Cash on Delivery</div>
                        <div className="text-sm text-muted-foreground">
                          Accept cash payments upon delivery
                        </div>
                      </div>
                    </div>
                    <Switch checked={true} />
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <div>
                        <div className="font-medium">Fawry</div>
                        <div className="text-sm text-muted-foreground">
                          Accept payments via Fawry service
                        </div>
                      </div>
                    </div>
                    <Switch checked={true} />
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <div>
                        <div className="font-medium">Bank Transfer</div>
                        <div className="text-sm text-muted-foreground">
                          Accept direct bank transfers
                        </div>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="payment-instructions">
                    Payment Instructions
                  </Label>
                  <Textarea
                    id="payment-instructions"
                    defaultValue="Payment is due at the time of purchase. For Cash on Delivery orders, please have the exact amount ready."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Currency Settings</CardTitle>
                <CardDescription>
                  Configure how prices are displayed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price-format">Price Format</Label>
                    <Select defaultValue="symbol-before">
                      <SelectTrigger id="price-format">
                        <SelectValue placeholder="Select price format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="symbol-before">
                          EGP 1,234.56
                        </SelectItem>
                        <SelectItem value="symbol-after">
                          1,234.56 EGP
                        </SelectItem>
                        <SelectItem value="code-before">
                          EGP 1,234.56
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="thousand-separator">
                      Thousand Separator
                    </Label>
                    <Select defaultValue="comma">
                      <SelectTrigger id="thousand-separator">
                        <SelectValue placeholder="Select separator" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comma">Comma (1,234.56)</SelectItem>
                        <SelectItem value="period">
                          Period (1.234,56)
                        </SelectItem>
                        <SelectItem value="space">Space (1 234.56)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="show-currency-code" checked={true} />
                  <Label htmlFor="show-currency-code">
                    Show currency code instead of symbol
                  </Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shipping Settings */}
          <TabsContent value="shipping" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Methods</CardTitle>
                <CardDescription>
                  Configure available shipping options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center">
                      <Truck className="mr-2 h-4 w-4" />
                      <div>
                        <div className="font-medium">Standard Delivery</div>
                        <div className="text-sm text-muted-foreground">
                          3-5 business days
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="font-medium">EGP 100.00</div>
                      <Switch checked={true} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center">
                      <Truck className="mr-2 h-4 w-4" />
                      <div>
                        <div className="font-medium">Express Delivery</div>
                        <div className="text-sm text-muted-foreground">
                          1-2 business days
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="font-medium">EGP 200.00</div>
                      <Switch checked={true} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center">
                      <Truck className="mr-2 h-4 w-4" />
                      <div>
                        <div className="font-medium">Store Pickup</div>
                        <div className="text-sm text-muted-foreground">
                          Collect from our Cairo store
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="font-medium">Free</div>
                      <Switch checked={true} />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="free-shipping-threshold">
                    Free Shipping Threshold
                  </Label>
                  <div className="flex items-center">
                    <span className="mr-2 text-muted-foreground">EGP</span>
                    <Input id="free-shipping-threshold" defaultValue="5000" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Orders above this amount qualify for free standard shipping
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping Zones</CardTitle>
                <CardDescription>
                  Configure shipping rates by region
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <div className="font-medium">Cairo & Giza</div>
                      <div className="text-sm text-muted-foreground">
                        Standard: EGP 50 | Express: EGP 100
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <div className="font-medium">Alexandria</div>
                      <div className="text-sm text-muted-foreground">
                        Standard: EGP 75 | Express: EGP 150
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>

                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                      <div className="font-medium">Other Governorates</div>
                      <div className="text-sm text-muted-foreground">
                        Standard: EGP 100 | Express: EGP 200
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Add Shipping Zone
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Configure email and system notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bell className="mr-2 h-4 w-4" />
                      <Label htmlFor="order-notifications">
                        Order notifications
                      </Label>
                    </div>
                    <Switch id="order-notifications" checked={true} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bell className="mr-2 h-4 w-4" />
                      <Label htmlFor="inventory-notifications">
                        Low inventory alerts
                      </Label>
                    </div>
                    <Switch id="inventory-notifications" checked={true} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bell className="mr-2 h-4 w-4" />
                      <Label htmlFor="customer-notifications">
                        Customer registration notifications
                      </Label>
                    </div>
                    <Switch id="customer-notifications" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bell className="mr-2 h-4 w-4" />
                      <Label htmlFor="review-notifications">
                        Product review notifications
                      </Label>
                    </div>
                    <Switch id="review-notifications" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure security options for your store
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="mr-2 h-4 w-4" />
                      <Label htmlFor="two-factor">
                        Require two-factor authentication for admin users
                      </Label>
                    </div>
                    <Switch id="two-factor" checked={true} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="mr-2 h-4 w-4" />
                      <Label htmlFor="password-expiry">
                        Password expiry (90 days)
                      </Label>
                    </div>
                    <Switch id="password-expiry" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="mr-2 h-4 w-4" />
                      <Label htmlFor="ip-restriction">
                        IP address restriction
                      </Label>
                    </div>
                    <Switch id="ip-restriction" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-timeout">
                    Admin Session Timeout (minutes)
                  </Label>
                  <Input id="session-timeout" defaultValue="30" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Database & Maintenance</CardTitle>
                <CardDescription>
                  Database and system maintenance options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Database className="mr-2 h-4 w-4" />
                      <div>
                        <div className="font-medium">Automatic Backups</div>
                        <div className="text-sm text-muted-foreground">
                          Daily database backups
                        </div>
                      </div>
                    </div>
                    <Switch checked={true} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Database className="mr-2 h-4 w-4" />
                      <div>
                        <div className="font-medium">Maintenance Mode</div>
                        <div className="text-sm text-muted-foreground">
                          Temporarily disable the storefront
                        </div>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="flex justify-between gap-4">
                  <Button variant="outline" className="flex-1">
                    Backup Database
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Clear Cache
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
