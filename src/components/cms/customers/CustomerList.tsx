import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MoreVertical,
  Eye,
  Edit,
  Mail,
  ShoppingBag,
  UserPlus,
  Download,
} from "lucide-react";

// Mock customer data
const mockCustomers = [
  {
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
  },
  {
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
  },
  {
    id: "cust3",
    name: "Laila Mahmoud",
    email: "laila.mahmoud@example.com",
    phone: "+20 123 456 7892",
    status: "Active",
    totalOrders: 12,
    totalSpent: 18599.99,
    lastOrderDate: "2023-08-13T16:45:00Z",
    dateJoined: "2022-11-05T14:20:00Z",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laila",
  },
  {
    id: "cust4",
    name: "Mohamed Ali",
    email: "mohamed.ali@example.com",
    phone: "+20 123 456 7893",
    status: "Inactive",
    totalOrders: 3,
    totalSpent: 4299.75,
    lastOrderDate: "2023-05-12T09:20:00Z",
    dateJoined: "2023-03-18T10:45:00Z",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamed",
  },
  {
    id: "cust5",
    name: "Sara Ahmed",
    email: "sara.ahmed@example.com",
    phone: "+20 123 456 7894",
    status: "Active",
    totalOrders: 7,
    totalSpent: 9899.99,
    lastOrderDate: "2023-08-11T13:10:00Z",
    dateJoined: "2023-01-30T16:15:00Z",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
  },
  {
    id: "cust6",
    name: "Khaled Ibrahim",
    email: "khaled.ibrahim@example.com",
    phone: "+20 123 456 7895",
    status: "Active",
    totalOrders: 10,
    totalSpent: 15799.5,
    lastOrderDate: "2023-08-10T11:30:00Z",
    dateJoined: "2022-12-15T09:30:00Z",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khaled",
  },
];

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Filter customers based on search term and filters
  const filteredCustomers = mockCustomers
    .filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" ||
        customer.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "orders":
          return b.totalOrders - a.totalOrders;
        case "spent":
          return b.totalSpent - a.totalSpent;
        case "recent":
          return (
            new Date(b.lastOrderDate).getTime() -
            new Date(a.lastOrderDate).getTime()
          );
        case "joined":
          return (
            new Date(b.dateJoined).getTime() - new Date(a.dateJoined).getTime()
          );
        default:
          return 0;
      }
    });

  // Format price with English locale
  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search customers..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="orders">Total Orders</SelectItem>
              <SelectItem value="spent">Total Spent</SelectItem>
              <SelectItem value="recent">Recent Order</SelectItem>
              <SelectItem value="joined">Date Joined</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button className="w-full sm:w-auto" variant="outline" asChild>
            <Link to="/cms/customers/export">
              <Download className="mr-2 h-4 w-4" /> Export
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="/cms/customers/new">
              <UserPlus className="mr-2 h-4 w-4" /> Add Customer
            </Link>
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No customers found
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-muted">
                        <img
                          src={customer.avatar}
                          alt={customer.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Joined {formatDate(customer.dateJoined)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm">{customer.email}</span>
                      </div>
                      <div className="text-sm">{customer.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        customer.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell>{formatPrice(customer.totalSpent)}</TableCell>
                  <TableCell>{formatDate(customer.lastOrderDate)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/cms/customers/${customer.id}`}>
                            <Eye className="mr-2 h-4 w-4" /> View Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/cms/customers/${customer.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/cms/customers/${customer.id}/orders`}>
                            <ShoppingBag className="mr-2 h-4 w-4" /> View Orders
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/cms/customers/${customer.id}/email`}>
                            <Mail className="mr-2 h-4 w-4" /> Send Email
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomerList;
