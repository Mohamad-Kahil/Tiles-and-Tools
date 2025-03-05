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
  Edit,
  Trash2,
  Globe,
  Calendar,
  User,
  FileText,
  Layout,
  Image as ImageIcon,
  Eye,
} from "lucide-react";

// Mock content data
const mockContent = {
  page1: {
    id: "page1",
    title: "Home Page",
    type: "Page",
    slug: "/",
    status: "Published",
    author: "Admin",
    lastUpdated: "2023-08-15T14:30:00Z",
    createdAt: "2023-01-10T09:15:00Z",
    language: "English",
    hasArabic: true,
    arabicTitle: "الصفحة الرئيسية",
    content: `<div class="hero-section">
  <h1>Welcome to DecorEgypt</h1>
  <p>Your premier destination for home decoration and finishing products in Egypt.</p>
  <a href="/products" class="cta-button">Shop Now</a>
</div>

<div class="featured-categories">
  <div class="category">
    <img src="/images/flooring.jpg" alt="Flooring" />
    <h2>Flooring</h2>
    <p>Discover our premium flooring solutions.</p>
    <a href="/category/flooring">View Collection</a>
  </div>
  <div class="category">
    <img src="/images/lighting.jpg" alt="Lighting" />
    <h2>Lighting</h2>
    <p>Illuminate your space with our lighting collection.</p>
    <a href="/category/lighting">View Collection</a>
  </div>
  <div class="category">
    <img src="/images/wall-products.jpg" alt="Wall Products" />
    <h2>Wall Products</h2>
    <p>Transform your walls with our premium products.</p>
    <a href="/category/wall-products">View Collection</a>
  </div>
</div>`,
    arabicContent: `<div class="hero-section">
  <h1>مرحبًا بكم في ديكور مصر</h1>
  <p>وجهتك المميزة لمنتجات الديكور المنزلي ومواد التشطيب في مصر.</p>
  <a href="/products" class="cta-button">تسوق الآن</a>
</div>

<div class="featured-categories">
  <div class="category">
    <img src="/images/flooring.jpg" alt="الأرضيات" />
    <h2>الأرضيات</h2>
    <p>اكتشف حلول الأرضيات المميزة لدينا.</p>
    <a href="/category/flooring">عرض المجموعة</a>
  </div>
  <div class="category">
    <img src="/images/lighting.jpg" alt="الإضاءة" />
    <h2>الإضاءة</h2>
    <p>أضئ مساحتك مع مجموعة الإضاءة لدينا.</p>
    <a href="/category/lighting">عرض المجموعة</a>
  </div>
  <div class="category">
    <img src="/images/wall-products.jpg" alt="منتجات الحوائط" />
    <h2>منتجات الحوائط</h2>
    <p>حول جدرانك مع منتجاتنا المميزة.</p>
    <a href="/category/wall-products">عرض المجموعة</a>
  </div>
</div>`,
    featuredImage:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    metaTitle: "DecorEgypt - Home Decoration & Finishing Products",
    metaDescription:
      "Your premier destination for home decoration and finishing products in Egypt. Browse our collections of flooring, lighting, wall products, and more.",
    metaKeywords:
      "home decor, egypt, flooring, lighting, wall products, interior design",
    viewCount: 12500,
    revisions: [
      {
        date: "2023-08-15T14:30:00Z",
        author: "Admin",
        note: "Updated hero section content and images",
      },
      {
        date: "2023-06-22T11:15:00Z",
        author: "Admin",
        note: "Added new featured categories section",
      },
      {
        date: "2023-03-10T09:45:00Z",
        author: "Admin",
        note: "Initial page creation",
      },
    ],
  },
  blog1: {
    id: "blog1",
    title: "Top 10 Flooring Trends for 2023",
    type: "Blog Post",
    slug: "/blog/flooring-trends-2023",
    status: "Published",
    author: "Sarah Ahmed",
    lastUpdated: "2023-08-10T11:30:00Z",
    createdAt: "2023-08-05T09:20:00Z",
    language: "English",
    hasArabic: false,
    content: `<h1>Top 10 Flooring Trends for 2023</h1>
<p>As we move through 2023, new flooring trends are emerging that combine aesthetics, durability, and sustainability. Here are the top 10 flooring trends we're seeing this year:</p>

<h2>1. Sustainable Materials</h2>
<p>Eco-friendly options like bamboo, cork, and reclaimed wood are gaining popularity as homeowners become more environmentally conscious.</p>

<h2>2. Luxury Vinyl Tile (LVT)</h2>
<p>LVT continues to dominate the market with its durability, water resistance, and ability to mimic natural materials like wood and stone.</p>

<h2>3. Large Format Tiles</h2>
<p>Bigger tiles with fewer grout lines create a seamless look and make spaces appear larger.</p>

<h2>4. Marble Flooring</h2>
<p>Luxurious marble floors are making a comeback, especially in entryways and bathrooms.</p>

<h2>5. Herringbone Patterns</h2>
<p>This classic pattern is being applied to various materials, from hardwood to porcelain tiles.</p>

<h2>6. Terrazzo</h2>
<p>This versatile material with embedded chips of marble, quartz, or glass is seeing a resurgence in modern homes.</p>

<h2>7. Bleached Woods</h2>
<p>Light, whitewashed wood floors create an airy, Scandinavian feel that brightens up spaces.</p>

<h2>8. Textured Surfaces</h2>
<p>From hand-scraped hardwood to textured tiles, floors with tactile interest are in high demand.</p>

<h2>9. Bold Geometric Patterns</h2>
<p>Statement floors with hexagons, chevrons, and other geometric patterns add visual interest to any room.</p>

<h2>10. Mixed Materials</h2>
<p>Combining different flooring types in the same space creates visual boundaries and adds character.</p>

<p>When choosing new flooring for your home, consider not just the trends but also your lifestyle, maintenance preferences, and the overall design of your space.</p>`,
    excerpt:
      "Discover the latest flooring trends of 2023, from sustainable materials to bold geometric patterns that are transforming homes across Egypt.",
    featuredImage:
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80",
    metaTitle: "Top 10 Flooring Trends for 2023 | DecorEgypt Blog",
    metaDescription:
      "Explore the latest flooring trends of 2023, including sustainable materials, luxury vinyl tile, large format tiles, and more.",
    metaKeywords:
      "flooring trends, 2023, sustainable flooring, luxury vinyl tile, marble floors, herringbone pattern",
    viewCount: 3250,
    revisions: [
      {
        date: "2023-08-10T11:30:00Z",
        author: "Sarah Ahmed",
        note: "Updated with new images and fixed typos",
      },
      {
        date: "2023-08-05T09:20:00Z",
        author: "Sarah Ahmed",
        note: "Initial post creation",
      },
    ],
  },
  block1: {
    id: "block1",
    title: "Homepage Hero Banner",
    type: "Content Block",
    status: "Published",
    author: "Admin",
    lastUpdated: "2023-08-12T13:45:00Z",
    createdAt: "2023-07-20T10:15:00Z",
    language: "English",
    hasArabic: true,
    arabicTitle: "بانر الصفحة الرئيسية",
    content: `<div class="hero-banner">
  <h1>Transform Your Space</h1>
  <p>Discover premium home decoration and finishing products</p>
  <a href="/products" class="btn-primary">Shop Now</a>
</div>`,
    arabicContent: `<div class="hero-banner">
  <h1>حوّل مساحتك</h1>
  <p>اكتشف منتجات الديكور المنزلي ومواد التشطيب المميزة</p>
  <a href="/products" class="btn-primary">تسوق الآن</a>
</div>`,
    featuredImage:
      "https://images.unsplash.com/photo-1618219944342-824e40a13285?w=800&q=80",
    revisions: [
      {
        date: "2023-08-12T13:45:00Z",
        author: "Admin",
        note: "Updated banner text and button styling",
      },
      {
        date: "2023-07-20T10:15:00Z",
        author: "Admin",
        note: "Initial block creation",
      },
    ],
  },
};

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

// Get content type icon
const getContentTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "page":
      return <Layout className="h-5 w-5 text-blue-500" />;
    case "blog post":
      return <FileText className="h-5 w-5 text-green-500" />;
    case "content block":
      return <ImageIcon className="h-5 w-5 text-purple-500" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

// Get status badge color
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "published":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "draft":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "archived":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    default:
      return "";
  }
};

const ContentDetail = () => {
  const { id } = useParams();
  const content = mockContent[id] || null;

  if (!content) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Content Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The content you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/cms/content">Back to Content</Link>
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
              <Link to="/cms/content">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Content
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight">
              {content.title}
            </h2>
            <Badge
              variant="secondary"
              className={getStatusColor(content.status)}
            >
              {content.status}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground mt-1">
            {getContentTypeIcon(content.type)}
            <span>{content.type}</span>
            {content.slug && (
              <span className="font-mono text-xs ml-2">{content.slug}</span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {content.slug && (
            <Button variant="outline" asChild>
              <a href={content.slug} target="_blank" rel="noopener noreferrer">
                <Eye className="mr-2 h-4 w-4" /> View Live
              </a>
            </Button>
          )}
          <Button variant="outline" asChild>
            <Link to={`/cms/content/${content.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Link>
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="html">HTML</TabsTrigger>
              {content.hasArabic && (
                <TabsTrigger value="arabic">Arabic</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="preview" className="space-y-6 pt-4">
              {content.featuredImage && (
                <div className="border rounded-md overflow-hidden mb-6">
                  <img
                    src={content.featuredImage}
                    alt={content.title}
                    className="w-full h-auto"
                  />
                </div>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Content Preview</CardTitle>
                  <CardDescription>
                    How the content appears on the website
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <div
                      dangerouslySetInnerHTML={{ __html: content.content }}
                    />
                  </div>
                </CardContent>
              </Card>

              {content.type === "Blog Post" && content.excerpt && (
                <Card>
                  <CardHeader>
                    <CardTitle>Excerpt</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{content.excerpt}</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="html" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>HTML Source</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-md overflow-auto text-xs font-mono">
                    {content.content}
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>

            {content.hasArabic && (
              <TabsContent value="arabic" className="space-y-6 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Arabic Content Preview</CardTitle>
                    <CardDescription>{content.arabicTitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none" dir="rtl">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: content.arabicContent,
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Arabic HTML Source</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre
                      className="bg-muted p-4 rounded-md overflow-auto text-xs font-mono text-right"
                      dir="rtl"
                    >
                      {content.arabicContent}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Revision History</CardTitle>
              <CardDescription>Previous versions and changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {content.revisions.map((revision, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between pb-4 border-b last:border-0 last:pb-0"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {formatDate(revision.date)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(revision.date).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{revision.author}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {revision.note}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Restore
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Status
                </div>
                <Badge
                  variant="secondary"
                  className={getStatusColor(content.status)}
                >
                  {content.status}
                </Badge>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Type
                </div>
                <div className="flex items-center gap-2">
                  {getContentTypeIcon(content.type)}
                  <span>{content.type}</span>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Author
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{content.author}</span>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Languages
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>English</span>
                  {content.hasArabic && (
                    <Badge variant="outline" className="ml-1 text-xs">
                      + Arabic
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Created / Updated
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Created: {formatDate(content.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Updated: {formatDate(content.lastUpdated)}</span>
                  </div>
                </div>
              </div>

              {content.viewCount && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Page Views
                  </div>
                  <div className="text-xl font-bold">
                    {content.viewCount.toLocaleString()}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {(content.type === "Page" || content.type === "Blog Post") && (
            <Card>
              <CardHeader>
                <CardTitle>SEO Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {content.metaTitle && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Meta Title
                    </div>
                    <div className="text-sm">{content.metaTitle}</div>
                  </div>
                )}

                {content.metaDescription && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Meta Description
                    </div>
                    <div className="text-sm">{content.metaDescription}</div>
                  </div>
                )}

                {content.metaKeywords && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Meta Keywords
                    </div>
                    <div className="text-sm">{content.metaKeywords}</div>
                  </div>
                )}

                {content.slug && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      URL Slug
                    </div>
                    <div className="text-sm font-mono">{content.slug}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

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
                <Link to={`/cms/content/${content.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Content
                </Link>
              </Button>
              {content.slug && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <a
                    href={content.slug}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Eye className="mr-2 h-4 w-4" /> View Live
                  </a>
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete Content
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContentDetail;
