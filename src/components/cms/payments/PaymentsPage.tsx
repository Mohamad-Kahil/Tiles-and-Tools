import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  CreditCard,
  Wallet,
  DollarSign,
  Settings,
  MoreVertical,
  Edit,
  Trash,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart2,
  ArrowUpDown,
  Banknote,
  Landmark,
  Smartphone,
} from "lucide-react";
import AddPaymentMethodDialog from "./AddPaymentMethodDialog";
import EditPaymentMethodDialog from "./EditPaymentMethodDialog";
import PaymentSettingsDialog from "./PaymentSettingsDialog";
import ConnectGatewayDialog from "./ConnectGatewayDialog";
import TransactionDetailsDialog from "./TransactionDetailsDialog";

// Mock payment methods data
const mockPaymentMethods = [
  {
    id: "pm1",
    name: "Credit Card",
    provider: "Stripe",
    status: "active",
    isDefault: true,
    supportedCards: ["visa", "mastercard", "amex"],
    processingFee: "2.9% + EGP 1.00",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    id: "pm2",
    name: "Cash on Delivery",
    provider: "Internal",
    status: "active",
    isDefault: false,
    supportedCards: [],
    processingFee: "EGP 0.00",
    icon: <Banknote className="h-5 w-5" />,
  },
  {
    id: "pm3",
    name: "Bank Transfer",
    provider: "Manual",
    status: "active",
    isDefault: false,
    supportedCards: [],
    processingFee: "EGP 0.00",
    icon: <Landmark className="h-5 w-5" />,
  },
  {
    id: "pm4",
    name: "Fawry",
    provider: "Fawry",
    status: "inactive",
    isDefault: false,
    supportedCards: [],
    processingFee: "2.0%",
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    id: "pm5",
    name: "PayPal",
    provider: "PayPal",
    status: "inactive",
    isDefault: false,
    supportedCards: ["visa", "mastercard", "amex"],
    processingFee: "3.9% + EGP 1.50",
    icon: <Wallet className="h-5 w-5" />,
  },
];

// Mock transactions data
const mockTransactions = [
  {
    id: "txn1",
    orderId: "ORD-2023-1001",
    customer: "Ahmed Hassan",
    amount: 3499.97,
    method: "Credit Card",
    status: "completed",
    date: "2023-08-15T14:35:00Z",
    gatewayReference: "ch_1NjK8dJHs7h8Xd9s8H7d6F5g",
  },
  {
    id: "txn2",
    orderId: "ORD-2023-1002",
    customer: "Nour El-Din",
    amount: 1899.5,
    method: "Cash on Delivery",
    status: "pending",
    date: "2023-08-14T10:15:00Z",
    gatewayReference: null,
  },
  {
    id: "txn3",
    orderId: "ORD-2023-1003",
    customer: "Laila Mahmoud",
    amount: 5299.99,
    method: "Credit Card",
    status: "completed",
    date: "2023-08-13T16:45:00Z",
    gatewayReference: "ch_1NjH7cJHs7h8Xd9s8H7d6F5g",
  },
  {
    id: "txn4",
    orderId: "ORD-2023-1004",
    customer: "Mohamed Ali",
    amount: 2499.75,
    method: "Bank Transfer",
    status: "pending",
    date: "2023-08-12T09:20:00Z",
    gatewayReference: null,
  },
  {
    id: "txn5",
    orderId: "ORD-2023-1005",
    customer: "Sara Ahmed",
    amount: 1299.99,
    method: "Credit Card",
    status: "failed",
    date: "2023-08-11T13:10:00Z",
    gatewayReference: "ch_1NjF5bJHs7h8Xd9s8H7d6F5g",
  },
  {
    id: "txn6",
    orderId: "ORD-2023-1006",
    customer: "Khaled Ibrahim",
    amount: 4799.5,
    method: "Credit Card",
    status: "refunded",
    date: "2023-08-10T11:30:00Z",
    gatewayReference: "ch_1NjD4aJHs7h8Xd9s8H7d6F5g",
  },
];

// Mock payment gateways
const mockPaymentGateways = [
  {
    id: "gateway1",
    name: "Stripe",
    status: "connected",
    supportedMethods: ["Credit Card"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
  },
  {
    id: "gateway2",
    name: "PayPal",
    status: "disconnected",
    supportedMethods: ["Credit Card", "PayPal Wallet"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png",
  },
  {
    id: "gateway3",
    name: "Fawry",
    status: "disconnected",
    supportedMethods: ["Fawry Pay", "Credit Card"],
    logo: "https://fawry.com/wp-content/themes/fawry/imgs/fawry-logo.png",
  },
  {
    id: "gateway4",
    name: "Accept",
    status: "disconnected",
    supportedMethods: ["Credit Card", "Kiosk", "Mobile Wallet"],
    logo: "https://accept.paymobsolutions.com/images/logo-black.svg",
  },
];

const PaymentsPage = () => {
  const [activeTab, setActiveTab] = useState("methods");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isTransactionDetailsOpen, setIsTransactionDetailsOpen] =
    useState(false);

  // Filter payment methods based on search term and status
  const filteredPaymentMethods = mockPaymentMethods.filter((method) => {
    const matchesSearch = method.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || method.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter transactions based on search term
  const filteredTransactions = mockTransactions.filter((transaction) => {
    return (
      transaction.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.method.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Get status badge color for payment methods
  const getMethodStatusBadgeColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "";
    }
  };

  // Get status badge color for transactions
  const getTransactionStatusBadgeColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-blue-100 text-blue-800";
      default:
        return "";
    }
  };

  // Format price
  const formatPrice = (price) => {
    return price.toLocaleString("ar-EG", {
      style: "currency",
      currency: "EGP",
    });
  };

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsTransactionDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Payment Gateways</h2>
        <div className="flex gap-2">
          <PaymentSettingsDialog />
          {activeTab === "methods" && <AddPaymentMethodDialog />}
        </div>
      </div>

      <Tabs
        defaultValue="methods"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="methods" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Payment Methods</span>
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>Transactions</span>
          </TabsTrigger>
          <TabsTrigger value="gateways" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Gateways</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-4 mb-6">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={
                activeTab === "methods"
                  ? "Search payment methods..."
                  : activeTab === "transactions"
                    ? "Search transactions..."
                    : "Search gateways..."
              }
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Payment Methods Tab */}
        <TabsContent value="methods" className="space-y-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Method</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Processing Fee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPaymentMethods.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-4 text-muted-foreground"
                      >
                        No payment methods found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPaymentMethods.map((method) => (
                      <TableRow key={method.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-md">
                              {method.icon}
                            </div>
                            <div className="font-medium">{method.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{method.provider}</TableCell>
                        <TableCell>{method.processingFee}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getMethodStatusBadgeColor(method.status)}
                          >
                            {method.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {method.isDefault ? (
                            <Badge
                              variant="outline"
                              className="bg-blue-100 text-blue-800"
                            >
                              Default
                            </Badge>
                          ) : (
                            "-"
                          )}
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
                              <EditPaymentMethodDialog method={method}>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                              </EditPaymentMethodDialog>
                              {!method.isDefault && (
                                <DropdownMenuItem>
                                  <CheckCircle className="mr-2 h-4 w-4" /> Set
                                  as Default
                                </DropdownMenuItem>
                              )}
                              {method.status === "active" ? (
                                <DropdownMenuItem>
                                  <XCircle className="mr-2 h-4 w-4" />{" "}
                                  Deactivate
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>
                                  <CheckCircle className="mr-2 h-4 w-4" />{" "}
                                  Activate
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method Settings</CardTitle>
              <CardDescription>
                Configure how payment methods are displayed to customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Display Options</h3>
                  <p className="text-sm text-muted-foreground">
                    Control how payment methods appear during checkout
                  </p>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Show payment method icons</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Display processing fees</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Payment method order</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Security Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure security options for payment processing
                  </p>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Enable 3D Secure</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Fraud detection settings</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Payment verification</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Transactions
                    </p>
                    <h3 className="text-2xl font-bold mt-1">156</h3>
                    <div className="flex items-center mt-1 text-green-600">
                      <ArrowUpDown className="h-4 w-4 mr-1" />
                      <span className="text-xs">+12% this month</span>
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
                      Total Revenue
                    </p>
                    <h3 className="text-2xl font-bold mt-1">EGP 45,892</h3>
                    <div className="flex items-center mt-1 text-green-600">
                      <ArrowUpDown className="h-4 w-4 mr-1" />
                      <span className="text-xs">+8% this month</span>
                    </div>
                  </div>
                  <div className="bg-green-100 p-2 rounded-full">
                    <BarChart2 className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Pending Payments
                    </p>
                    <h3 className="text-2xl font-bold mt-1">12</h3>
                    <div className="flex items-center mt-1 text-yellow-600">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      <span className="text-xs">Needs attention</span>
                    </div>
                  </div>
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Failed Transactions
                    </p>
                    <h3 className="text-2xl font-bold mt-1">5</h3>
                    <div className="flex items-center mt-1 text-red-600">
                      <XCircle className="h-4 w-4 mr-1" />
                      <span className="text-xs">-2 from last week</span>
                    </div>
                  </div>
                  <div className="bg-red-100 p-2 rounded-full">
                    <XCircle className="h-5 w-5 text-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center py-4 text-muted-foreground"
                      >
                        No transactions found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-mono text-xs">
                          {transaction.id}
                        </TableCell>
                        <TableCell>{transaction.orderId}</TableCell>
                        <TableCell>{transaction.customer}</TableCell>
                        <TableCell>{formatPrice(transaction.amount)}</TableCell>
                        <TableCell>{transaction.method}</TableCell>
                        <TableCell>
                          {new Date(transaction.date).toLocaleDateString()}{" "}
                          {new Date(transaction.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getTransactionStatusBadgeColor(
                              transaction.status,
                            )}
                          >
                            {transaction.status.charAt(0).toUpperCase() +
                              transaction.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewTransaction(transaction)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gateways Tab */}
        <TabsContent value="gateways" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockPaymentGateways.map((gateway) => (
              <Card key={gateway.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="h-12 flex items-center">
                    <img
                      src={gateway.logo}
                      alt={gateway.name}
                      className="h-8 max-w-[120px] object-contain"
                    />
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Status</span>
                      <Badge
                        variant="outline"
                        className={
                          gateway.status === "connected"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {gateway.status === "connected"
                          ? "Connected"
                          : "Disconnected"}
                      </Badge>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Supported Methods:</span>
                      <div className="mt-1 space-y-1">
                        {gateway.supportedMethods.map((method, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                            <span>{method}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <ConnectGatewayDialog gateway={gateway}>
                    <Button
                      variant={
                        gateway.status === "connected" ? "outline" : "default"
                      }
                      className="w-full"
                    >
                      {gateway.status === "connected" ? "Configure" : "Connect"}
                    </Button>
                  </ConnectGatewayDialog>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payment Gateway Integration Guide</CardTitle>
              <CardDescription>
                Follow these steps to integrate payment gateways with your store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      1
                    </span>
                    <span>Choose a Payment Gateway</span>
                  </h3>
                  <p className="text-sm text-muted-foreground ml-8">
                    Select a payment gateway that supports your region and
                    offers the features you need. Consider fees, supported
                    payment methods, and integration complexity.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      2
                    </span>
                    <span>Create an Account</span>
                  </h3>
                  <p className="text-sm text-muted-foreground ml-8">
                    Sign up for an account with the payment gateway provider.
                    You'll need to provide business information and complete
                    verification steps.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      3
                    </span>
                    <span>Get API Keys</span>
                  </h3>
                  <p className="text-sm text-muted-foreground ml-8">
                    Obtain API keys from your gateway dashboard. You'll need
                    these to connect the gateway to your store.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      4
                    </span>
                    <span>Connect and Configure</span>
                  </h3>
                  <p className="text-sm text-muted-foreground ml-8">
                    Use the Connect button above to enter your API keys and
                    configure settings. Test the integration thoroughly before
                    going live.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transaction Details Dialog */}
      {selectedTransaction && (
        <TransactionDetailsDialog
          transaction={selectedTransaction}
          open={isTransactionDetailsOpen}
          onOpenChange={setIsTransactionDetailsOpen}
        />
      )}
    </div>
  );
};

export default PaymentsPage;
