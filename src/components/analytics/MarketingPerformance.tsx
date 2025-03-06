import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  BarChart2,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Tag,
  Mail,
  Share2,
  Search,
  Megaphone,
  Truck,
} from "lucide-react";

interface MarketingPerformanceProps {
  className?: string;
}

const MarketingPerformance: React.FC<MarketingPerformanceProps> = ({
  className = "",
}) => {
  // Mock data
  const marketingData = {
    campaigns: [
      {
        name: "Summer Sale",
        impressions: 45000,
        clicks: 3200,
        conversions: 320,
        revenue: 128000,
      },
      {
        name: "New Collection",
        impressions: 32000,
        clicks: 2100,
        conversions: 185,
        revenue: 92500,
      },
      {
        name: "Flash Deals",
        impressions: 28000,
        clicks: 1800,
        conversions: 210,
        revenue: 84000,
      },
      {
        name: "Holiday Special",
        impressions: 38000,
        clicks: 2600,
        conversions: 280,
        revenue: 112000,
      },
    ],
    channels: [
      { name: "Email Marketing", percentage: 32, performance: 8.5 },
      { name: "Social Media", percentage: 28, performance: 6.2 },
      { name: "Search Ads", percentage: 22, performance: 7.8 },
      { name: "Display Ads", percentage: 12, performance: 4.5 },
      { name: "Affiliate", percentage: 6, performance: 5.3 },
    ],
    promotions: [
      { code: "SUMMER25", usage: 320, revenue: 128000 },
      { code: "WELCOME15", usage: 185, revenue: 55500 },
      { code: "FLASH50", usage: 98, revenue: 49000 },
      { code: "FREESHIP", usage: 210, revenue: 84000 },
    ],
  };

  // Animation states
  const [activeTab, setActiveTab] = useState("campaigns");
  const [channelWidths, setChannelWidths] = useState<number[]>(
    new Array(marketingData.channels.length).fill(0),
  );
  const [campaignData, setCampaignData] = useState<{
    impressions: number[];
    clicks: number[];
    conversions: number[];
  }>({
    impressions: new Array(marketingData.campaigns.length).fill(0),
    clicks: new Array(marketingData.campaigns.length).fill(0),
    conversions: new Array(marketingData.campaigns.length).fill(0),
  });

  // Format price
  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "EGP",
    });
  };

  // Animate data when tab changes
  useEffect(() => {
    // Reset animations
    setChannelWidths(new Array(marketingData.channels.length).fill(0));
    setCampaignData({
      impressions: new Array(marketingData.campaigns.length).fill(0),
      clicks: new Array(marketingData.campaigns.length).fill(0),
      conversions: new Array(marketingData.campaigns.length).fill(0),
    });

    // Start animations based on active tab
    setTimeout(() => {
      if (activeTab === "channels") {
        setChannelWidths(marketingData.channels.map((ch) => ch.percentage));
      }

      if (activeTab === "campaigns") {
        // Get max values for scaling
        const maxImpressions = Math.max(
          ...marketingData.campaigns.map((c) => c.impressions),
        );
        const maxClicks = Math.max(
          ...marketingData.campaigns.map((c) => c.clicks),
        );
        const maxConversions = Math.max(
          ...marketingData.campaigns.map((c) => c.conversions),
        );

        setCampaignData({
          impressions: marketingData.campaigns.map(
            (c) => (c.impressions / maxImpressions) * 100,
          ),
          clicks: marketingData.campaigns.map(
            (c) => (c.clicks / maxClicks) * 100,
          ),
          conversions: marketingData.campaigns.map(
            (c) => (c.conversions / maxConversions) * 100,
          ),
        });
      }
    }, 100);
  }, [activeTab]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Marketing Performance</CardTitle>
        <CardDescription>
          Analyze your marketing campaigns and channels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="promotions">Promotions</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted/50 p-4 rounded-md">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Megaphone className="h-4 w-4" />
                  <span>Total Impressions</span>
                </div>
                <div className="text-2xl font-bold">
                  {marketingData.campaigns
                    .reduce((sum, c) => sum + c.impressions, 0)
                    .toLocaleString()}
                </div>
                <div className="flex items-center text-green-600 text-sm mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>12.5% increase</span>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-md">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Conversion Rate</span>
                </div>
                <div className="text-2xl font-bold">
                  {(
                    (marketingData.campaigns.reduce(
                      (sum, c) => sum + c.conversions,
                      0,
                    ) /
                      marketingData.campaigns.reduce(
                        (sum, c) => sum + c.clicks,
                        0,
                      )) *
                    100
                  ).toFixed(2)}
                  %
                </div>
                <div className="flex items-center text-green-600 text-sm mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>2.3% increase</span>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-md">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <BarChart2 className="h-4 w-4" />
                  <span>Total Revenue</span>
                </div>
                <div className="text-2xl font-bold">
                  {formatPrice(
                    marketingData.campaigns.reduce(
                      (sum, c) => sum + c.revenue,
                      0,
                    ),
                  )}
                </div>
                <div className="flex items-center text-green-600 text-sm mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>15.8% increase</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-4">Campaign Performance</h3>
              <div className="space-y-6">
                {marketingData.campaigns.map((campaign, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-medium">{campaign.name}</h4>
                        <div className="text-sm text-muted-foreground">
                          Revenue: {formatPrice(campaign.revenue)}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800"
                      >
                        Active
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Impressions
                          </span>
                          <span>{campaign.impressions.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-blue-500 rounded-full h-2 transition-all duration-1000 ease-out"
                            style={{
                              width: `${campaignData.impressions[index]}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Clicks</span>
                          <span>{campaign.clicks.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-green-500 rounded-full h-2 transition-all duration-1000 ease-out"
                            style={{ width: `${campaignData.clicks[index]}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Conversions
                          </span>
                          <span>{campaign.conversions.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-purple-500 rounded-full h-2 transition-all duration-1000 ease-out"
                            style={{
                              width: `${campaignData.conversions[index]}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="channels" className="pt-6 space-y-6">
            <div>
              <h3 className="font-medium mb-4">Marketing Channels</h3>
              <div className="space-y-4">
                {marketingData.channels.map((channel, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        {channel.name === "Email Marketing" ? (
                          <Mail className="h-4 w-4 text-blue-500" />
                        ) : channel.name === "Social Media" ? (
                          <Share2 className="h-4 w-4 text-purple-500" />
                        ) : channel.name === "Search Ads" ? (
                          <Search className="h-4 w-4 text-green-500" />
                        ) : channel.name === "Display Ads" ? (
                          <Megaphone className="h-4 w-4 text-orange-500" />
                        ) : (
                          <Tag className="h-4 w-4 text-red-500" />
                        )}
                        <span className="font-medium">{channel.name}</span>
                      </div>
                      <Badge variant="outline" className="text-primary">
                        {channel.performance > 7
                          ? "High"
                          : channel.performance > 5
                            ? "Medium"
                            : "Low"}{" "}
                        ROI
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Revenue Contribution
                        </span>
                        <span>{channel.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className={`rounded-full h-2 transition-all duration-1000 ease-out ${
                            channel.name === "Email Marketing"
                              ? "bg-blue-500"
                              : channel.name === "Social Media"
                                ? "bg-purple-500"
                                : channel.name === "Search Ads"
                                  ? "bg-green-500"
                                  : channel.name === "Display Ads"
                                    ? "bg-orange-500"
                                    : "bg-red-500"
                          }`}
                          style={{ width: `${channelWidths[index]}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="promotions" className="pt-6 space-y-6">
            <div>
              <h3 className="font-medium mb-4">Promotion Performance</h3>
              <div className="space-y-4">
                {marketingData.promotions.map((promo, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          <Tag className="h-4 w-4 text-primary" />
                          <code className="bg-muted px-2 py-0.5 rounded text-sm">
                            {promo.code}
                          </code>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Used {promo.usage} times
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {formatPrice(promo.revenue)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Revenue Generated
                        </div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="text-sm mb-1 flex justify-between">
                        <span className="text-muted-foreground">
                          Conversion Rate
                        </span>
                        <span>
                          {Math.round(
                            (promo.usage / (promo.usage * 3.5)) * 100,
                          )}
                          %
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary rounded-full h-2 transition-all duration-1000 ease-out"
                          style={{
                            width: `${Math.round((promo.usage / (promo.usage * 3.5)) * 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="text-sm mb-1 flex justify-between">
                        <span className="text-muted-foreground">
                          Avg. Order Value
                        </span>
                        <span>{formatPrice(promo.revenue / promo.usage)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MarketingPerformance;
