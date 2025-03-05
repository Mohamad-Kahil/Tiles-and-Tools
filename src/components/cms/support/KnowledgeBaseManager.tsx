import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  ArrowLeft,
  ArrowRight,
  Package,
  ShoppingCart,
  RefreshCw,
  User,
  HelpCircle,
} from "lucide-react";
import NewArticleDialog from "./NewArticleDialog";

interface KnowledgeBaseManagerProps {
  onArticleSelect?: (articleId: string) => void;
}

const KnowledgeBaseManager: React.FC<KnowledgeBaseManagerProps> = ({
  onArticleSelect,
}) => {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const articles = [
    {
      id: "kb-1",
      title: "How to track your order",
      category: "Orders & Shipping",
      views: 1245,
      lastUpdated: "2 days ago",
      status: "Published",
    },
    {
      id: "kb-2",
      title: "Return policy and process",
      category: "Returns & Refunds",
      views: 987,
      lastUpdated: "1 week ago",
      status: "Published",
    },
    {
      id: "kb-3",
      title: "Product care and maintenance guide",
      category: "Products",
      views: 756,
      lastUpdated: "2 weeks ago",
      status: "Published",
    },
    {
      id: "kb-4",
      title: "Payment methods and billing information",
      category: "Account & Billing",
      views: 543,
      lastUpdated: "3 weeks ago",
      status: "Published",
    },
    {
      id: "kb-5",
      title: "Installation services and scheduling",
      category: "Products",
      views: 432,
      lastUpdated: "1 month ago",
      status: "Draft",
    },
  ];

  const categories = [
    {
      name: "Orders & Shipping",
      articles: 12,
      icon: <ShoppingCart className="h-4 w-4" />,
    },
    {
      name: "Products",
      articles: 18,
      icon: <Package className="h-4 w-4" />,
    },
    {
      name: "Returns & Refunds",
      articles: 8,
      icon: <RefreshCw className="h-4 w-4" />,
    },
    {
      name: "Account & Billing",
      articles: 10,
      icon: <User className="h-4 w-4" />,
    },
    {
      name: "Installation & Services",
      articles: 6,
      icon: <HelpCircle className="h-4 w-4" />,
    },
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      categoryFilter === "all" ||
      article.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Knowledge Base Articles</CardTitle>
            <CardDescription>
              Manage and organize support articles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <NewArticleDialog />
            </div>

            <div className="border rounded-md">
              <div className="p-3 border-b bg-muted/50 flex justify-between items-center">
                <h3 className="font-medium">Articles</h3>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-[130px] h-8">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="orders & shipping">
                      Orders & Shipping
                    </SelectItem>
                    <SelectItem value="products">Products</SelectItem>
                    <SelectItem value="returns & refunds">
                      Returns & Refunds
                    </SelectItem>
                    <SelectItem value="account & billing">
                      Account & Billing
                    </SelectItem>
                    <SelectItem value="installation & services">
                      Installation & Services
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="divide-y">
                {filteredArticles.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    No articles found matching your criteria
                  </div>
                ) : (
                  filteredArticles.map((article) => (
                    <div
                      key={article.id}
                      className="p-3 hover:bg-muted/50 cursor-pointer"
                      onClick={() => onArticleSelect?.(article.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{article.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {article.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {article.views} views
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
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
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        Last updated: {article.lastUpdated}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-3 border-t flex justify-between items-center">
                <Button variant="outline" size="sm" disabled>
                  <ArrowLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                <span className="text-sm">Page 1 of 1</span>
                <Button variant="outline" size="sm" disabled>
                  Next <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Organize your knowledge base</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 cursor-pointer"
                  onClick={() => setCategoryFilter(category.name.toLowerCase())}
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      {category.icon}
                    </div>
                    <span>{category.name}</span>
                  </div>
                  <Badge variant="outline">{category.articles} articles</Badge>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4">
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Articles</CardTitle>
            <CardDescription>Most viewed support content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {articles
                .sort((a, b) => b.views - a.views)
                .slice(0, 5)
                .map((article, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 rounded-md"
                    onClick={() => onArticleSelect?.(article.id)}
                  >
                    <div className="text-sm font-medium">{article.title}</div>
                    <Badge variant="outline">{article.views} views</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KnowledgeBaseManager;
