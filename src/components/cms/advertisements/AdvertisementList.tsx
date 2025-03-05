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
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  BarChart2,
} from "lucide-react";

// Mock advertisement data
const mockAds = [
  {
    id: "ad1",
    title: "Summer Sale Banner",
    location: "Hero Section",
    status: "Active",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    impressions: 12540,
    clicks: 1876,
    ctr: 14.96,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&q=80",
  },
  {
    id: "ad2",
    title: "Flooring Collection",
    location: "Category Page",
    status: "Active",
    startDate: "2023-05-15",
    endDate: "2023-12-31",
    impressions: 8765,
    clicks: 1243,
    ctr: 14.18,
    image:
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=300&q=80",
  },
  {
    id: "ad3",
    title: "Lighting Promotion",
    location: "Product Detail Page",
    status: "Scheduled",
    startDate: "2023-09-01",
    endDate: "2023-10-31",
    impressions: 0,
    clicks: 0,
    ctr: 0,
    image:
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=300&q=80",
  },
  {
    id: "ad4",
    title: "Free Shipping Banner",
    location: "Cart Page",
    status: "Inactive",
    startDate: "2023-04-01",
    endDate: "2023-05-31",
    impressions: 5432,
    clicks: 876,
    ctr: 16.13,
    image:
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=300&q=80",
  },
  {
    id: "ad5",
    title: "New Arrivals",
    location: "Hero Section",
    status: "Active",
    startDate: "2023-07-01",
    endDate: "2023-09-30",
    impressions: 9876,
    clicks: 1432,
    ctr: 14.5,
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=300&q=80",
  },
];

const AdvertisementList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  // Filter advertisements based on search term and filters
  const filteredAds = mockAds.filter((ad) => {
    const matchesSearch = ad.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      ad.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesLocation =
      locationFilter === "all" ||
      ad.location.toLowerCase() === locationFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesLocation;
  });

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "scheduled":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "inactive":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      case "ended":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search advertisements..."
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
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="ended">Ended</SelectItem>
            </SelectContent>
          </Select>

          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="hero section">Hero Section</SelectItem>
              <SelectItem value="category page">Category Page</SelectItem>
              <SelectItem value="product detail page">
                Product Detail Page
              </SelectItem>
              <SelectItem value="cart page">Cart Page</SelectItem>
              <SelectItem value="checkout page">Checkout Page</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full sm:w-auto" asChild>
          <Link to="/cms/advertisements/new">
            <Plus className="mr-2 h-4 w-4" /> New Advertisement
          </Link>
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Advertisement</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">Performance</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAds.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No advertisements found
                </TableCell>
              </TableRow>
            ) : (
              filteredAds.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded overflow-hidden bg-muted">
                        <img
                          src={ad.image}
                          alt={ad.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{ad.title}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {ad.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{ad.location}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(ad.status)}
                    >
                      {ad.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>
                        Start: {new Date(ad.startDate).toLocaleDateString()}
                      </div>
                      <div>
                        End: {new Date(ad.endDate).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="text-sm">
                      <div>{ad.impressions.toLocaleString()} impressions</div>
                      <div>{ad.clicks.toLocaleString()} clicks</div>
                      <div className="font-medium">{ad.ctr}% CTR</div>
                    </div>
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
                        <DropdownMenuItem asChild>
                          <Link to={`/cms/advertisements/${ad.id}`}>
                            <Eye className="mr-2 h-4 w-4" /> View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/cms/advertisements/${ad.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/cms/advertisements/${ad.id}/analytics`}>
                            <BarChart2 className="mr-2 h-4 w-4" /> Analytics
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
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

export default AdvertisementList;
