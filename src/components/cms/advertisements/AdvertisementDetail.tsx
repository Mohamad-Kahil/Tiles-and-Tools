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
import {
  Edit,
  Trash2,
  BarChart2,
  Calendar,
  Link as LinkIcon,
  Eye,
  MousePointer,
  Percent,
} from "lucide-react";

// Mock advertisement data
const mockAds = {
  ad1: {
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
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    link: "https://example.com/summer-sale",
    description:
      "Promotional banner for our summer sale featuring discounts on all flooring products.",
  },
  ad2: {
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
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80",
    link: "https://example.com/flooring-collection",
    description:
      "Banner showcasing our premium flooring collection with special financing options.",
  },
  ad3: {
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
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80",
    link: "https://example.com/lighting-promotion",
    description:
      "Upcoming promotion for our new lighting collection with 20% off all pendant lights.",
  },
};

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

const AdvertisementDetail = () => {
  const { id } = useParams();
  const ad = mockAds[id] || null;

  if (!ad) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Advertisement Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The advertisement you're looking for doesn't exist or has been
          removed.
        </p>
        <Button asChild>
          <Link to="/cms/advertisements">Back to Advertisements</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">{ad.title}</h2>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/cms/advertisements">Back</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to={`/cms/advertisements/${ad.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Link>
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Advertisement Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Advertisement Preview</CardTitle>
              <CardDescription>
                How the advertisement appears on the website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <img src={ad.image} alt={ad.title} className="w-full h-auto" />
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Analytics data for this advertisement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-muted/30 p-4 rounded-md">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Eye className="h-4 w-4" />
                    <span>Impressions</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {ad.impressions.toLocaleString()}
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-md">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MousePointer className="h-4 w-4" />
                    <span>Clicks</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {ad.clicks.toLocaleString()}
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-md">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Percent className="h-4 w-4" />
                    <span>CTR</span>
                  </div>
                  <div className="text-2xl font-bold">{ad.ctr}%</div>
                </div>
              </div>

              <div className="mt-6">
                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/cms/advertisements/${ad.id}/analytics`}>
                    <BarChart2 className="mr-2 h-4 w-4" /> View Detailed
                    Analytics
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Advertisement Details */}
          <Card>
            <CardHeader>
              <CardTitle>Advertisement Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Status
                </div>
                <Badge
                  variant="secondary"
                  className={getStatusColor(ad.status)}
                >
                  {ad.status}
                </Badge>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Location
                </div>
                <div>{ad.location}</div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Duration
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {new Date(ad.startDate).toLocaleDateString()} to{" "}
                    {new Date(ad.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Destination URL
                </div>
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={ad.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline truncate"
                  >
                    {ad.link}
                  </a>
                </div>
              </div>

              {ad.description && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Description
                  </div>
                  <p className="text-sm">{ad.description}</p>
                </div>
              )}
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
                <Link to={`/cms/advertisements/${ad.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Advertisement
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link to={`/cms/advertisements/${ad.id}/analytics`}>
                  <BarChart2 className="mr-2 h-4 w-4" /> View Analytics
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete Advertisement
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementDetail;
