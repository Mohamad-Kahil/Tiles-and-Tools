import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Eye, Calendar, User, ArrowLeft } from "lucide-react";

interface ArticleDetailViewProps {
  article: {
    id: string;
    title: string;
    category: string;
    status: string;
    content: string;
    excerpt: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    views: number;
    tags: string[];
  };
  onBack: () => void;
}

const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  onBack,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Articles
        </Button>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{article.title}</h2>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{article.category}</Badge>
            <Badge
              variant="outline"
              className={
                article.status === "Published"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }
            >
              {article.status}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" /> Preview
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Article Content</CardTitle>
              <CardDescription>
                The main content of the knowledge base article
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Article Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Excerpt
                </div>
                <p>{article.excerpt}</p>
              </div>

              <Separator />

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Tags
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Author
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{article.author}</span>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Status
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      article.status === "Published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {article.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Created
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{article.createdAt}</span>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Last Updated
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{article.updatedAt}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Article Analytics</CardTitle>
              <CardDescription>
                Performance metrics for this article
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 border rounded-md">
                  <div className="text-sm text-muted-foreground mb-1">
                    Total Views
                  </div>
                  <div className="text-2xl font-bold">{article.views}</div>
                </div>

                <div className="p-4 border rounded-md">
                  <div className="text-sm text-muted-foreground mb-1">
                    Helpful Rating
                  </div>
                  <div className="text-2xl font-bold">87%</div>
                </div>

                <div className="p-4 border rounded-md">
                  <div className="text-sm text-muted-foreground mb-1">
                    Search Appearances
                  </div>
                  <div className="text-2xl font-bold">245</div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-2">Related Support Tickets</h4>
                <div className="text-muted-foreground text-center p-4 border rounded-md">
                  No support tickets have referenced this article yet
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArticleDetailView;
