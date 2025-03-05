import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Eye, MousePointer, Percent } from "lucide-react";

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
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&q=80",
    dailyStats: [
      { date: "2023-08-01", impressions: 420, clicks: 65, ctr: 15.48 },
      { date: "2023-08-02", impressions: 435, clicks: 62, ctr: 14.25 },
      { date: "2023-08-03", impressions: 410, clicks: 58, ctr: 14.15 },
      { date: "2023-08-04", impressions: 450, clicks: 72, ctr: 16.0 },
      { date: "2023-08-05", impressions: 445, clicks: 68, ctr: 15.28 },
      { date: "2023-08-06", impressions: 430, clicks: 63, ctr: 14.65 },
      { date: "2023-08-07", impressions: 425, clicks: 61, ctr: 14.35 },
    ],
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
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=300&q=80",
    dailyStats: [
      { date: "2023-08-01", impressions: 310, clicks: 42, ctr: 13.55 },
      { date: "2023-08-02", impressions: 325, clicks: 45, ctr: 13.85 },
      { date: "2023-08-03", impressions: 315, clicks: 43, ctr: 13.65 },
      { date: "2023-08-04", impressions: 330, clicks: 48, ctr: 14.55 },
      { date: "2023-08-05", impressions: 320, clicks: 44, ctr: 13.75 },
      { date: "2023-08-06", impressions: 335, clicks: 49, ctr: 14.63 },
      { date: "2023-08-07", impressions: 328, clicks: 47, ctr: 14.33 },
    ],
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
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=300&q=80",
    dailyStats: [],
  },
};

const AdvertisementAnalytics = () => {
  const { id } = useParams();
  const ad = mockAds[id] || null;
  const [timeRange, setTimeRange] = React.useState("7days");

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="-ml-2">
              <Link to={`/cms/advertisements/${ad.id}`}>
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Details
              </Link>
            </Button>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            Analytics: {ad.title}
          </h2>
        </div>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="alltime">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {ad.status === "Scheduled" ? (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-blue-800">
          <h3 className="font-medium mb-1">This advertisement is scheduled</h3>
          <p className="text-sm">
            Analytics data will be available once the advertisement becomes
            active on {new Date(ad.startDate).toLocaleDateString()}.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>Impressions</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {ad.impressions.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  +5.2% from previous period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MousePointer className="h-4 w-4" />
                    <span>Clicks</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {ad.clicks.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  +3.8% from previous period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Percent className="h-4 w-4" />
                    <span>Click-Through Rate</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ad.ctr}%</div>
                <p className="text-xs text-muted-foreground">
                  -0.3% from previous period
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different analytics views */}
          <Tabs defaultValue="performance">
            <TabsList>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
              <TabsTrigger value="devices">Devices</TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Over Time</CardTitle>
                  <CardDescription>
                    Daily impressions, clicks, and CTR for the selected period
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
                    <div className="text-center">
                      <p className="text-muted-foreground">
                        Chart visualization would appear here
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Showing data for{" "}
                        {timeRange === "7days"
                          ? "the last 7 days"
                          : timeRange === "30days"
                            ? "the last 30 days"
                            : timeRange === "90days"
                              ? "the last 90 days"
                              : "all time"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Daily Breakdown</CardTitle>
                  <CardDescription>
                    Detailed daily performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left p-3 font-medium">Date</th>
                          <th className="text-right p-3 font-medium">
                            Impressions
                          </th>
                          <th className="text-right p-3 font-medium">Clicks</th>
                          <th className="text-right p-3 font-medium">CTR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ad.dailyStats.length > 0 ? (
                          ad.dailyStats.map((day, index) => (
                            <tr key={index} className="border-t">
                              <td className="p-3">
                                {new Date(day.date).toLocaleDateString()}
                              </td>
                              <td className="p-3 text-right">
                                {day.impressions.toLocaleString()}
                              </td>
                              <td className="p-3 text-right">
                                {day.clicks.toLocaleString()}
                              </td>
                              <td className="p-3 text-right">{day.ctr}%</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={4}
                              className="p-4 text-center text-muted-foreground"
                            >
                              No daily data available for this period
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="demographics" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Audience Demographics</CardTitle>
                  <CardDescription>
                    Age, gender, and location breakdown of users who interacted
                    with this advertisement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
                    <div className="text-center">
                      <p className="text-muted-foreground">
                        Demographics data visualization would appear here
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        This feature will be available in a future update
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="devices" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Device & Browser Analytics</CardTitle>
                  <CardDescription>
                    Breakdown of devices, browsers, and operating systems
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
                    <div className="text-center">
                      <p className="text-muted-foreground">
                        Device analytics visualization would appear here
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        This feature will be available in a future update
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default AdvertisementAnalytics;
