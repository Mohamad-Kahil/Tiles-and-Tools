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
  Trash2,
  Plus,
  FileText,
  Layout,
  Image as ImageIcon,
  Globe,
} from "lucide-react";

// Mock content data
const mockContent = [
  {
    id: "page1",
    title: "Home Page",
    type: "Page",
    slug: "/",
    status: "Published",
    author: "Admin",
    lastUpdated: "2023-08-15T14:30:00Z",
    language: "English",
    hasArabic: true,
  },
  {
    id: "page2",
    title: "About Us",
    type: "Page",
    slug: "/about",
    status: "Published",
    author: "Admin",
    lastUpdated: "2023-07-22T10:15:00Z",
    language: "English",
    hasArabic: true,
  },
  {
    id: "page3",
    title: "Contact Us",
    type: "Page",
    slug: "/contact",
    status: "Published",
    author: "Admin",
    lastUpdated: "2023-06-10T16:45:00Z",
    language: "English",
    hasArabic: true,
  },
  {
    id: "blog1",
    title: "Top 10 Flooring Trends for 2023",
    type: "Blog Post",
    slug: "/blog/flooring-trends-2023",
    status: "Published",
    author: "Sarah Ahmed",
    lastUpdated: "2023-08-10T11:30:00Z",
    language: "English",
    hasArabic: false,
  },
  {
    id: "blog2",
    title: "How to Choose the Perfect Lighting for Your Home",
    type: "Blog Post",
    slug: "/blog/perfect-lighting-guide",
    status: "Draft",
    author: "Mohamed Ali",
    lastUpdated: "2023-08-05T09:20:00Z",
    language: "English",
    hasArabic: false,
  },
  {
    id: "block1",
    title: "Homepage Hero Banner",
    type: "Content Block",
    slug: null,
    status: "Published",
    author: "Admin",
    lastUpdated: "2023-08-12T13:45:00Z",
    language: "English",
    hasArabic: true,
  },
  {
    id: "block2",
    title: "Footer Contact Information",
    type: "Content Block",
    slug: null,
    status: "Published",
    author: "Admin",
    lastUpdated: "2023-07-15T15:30:00Z",
    language: "English",
    hasArabic: true,
  },
];

const ContentList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");

  // Filter content based on search term and filters
  const filteredContent = mockContent.filter((content) => {
    const matchesSearch = content.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === "all" ||
      content.type.toLowerCase() === typeFilter.toLowerCase();

    const matchesStatus =
      statusFilter === "all" ||
      content.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesLanguage =
      languageFilter === "all" ||
      (languageFilter === "english" && content.language === "English") ||
      (languageFilter === "arabic" && content.hasArabic);

    return matchesSearch && matchesType && matchesStatus && matchesLanguage;
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Get content type icon
  const getContentTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "page":
        return <Layout className="h-4 w-4 text-blue-500" />;
      case "blog post":
        return <FileText className="h-4 w-4 text-green-500" />;
      case "content block":
        return <ImageIcon className="h-4 w-4 text-purple-500" />;
      default:
        return <FileText className="h-4 w-4" />;
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search content..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Content Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="page">Pages</SelectItem>
              <SelectItem value="blog post">Blog Posts</SelectItem>
              <SelectItem value="content block">Content Blocks</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <Select value={languageFilter} onValueChange={setLanguageFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="arabic">Arabic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button className="w-full sm:w-auto" asChild>
            <Link to="/cms/content/new">
              <Plus className="mr-2 h-4 w-4" /> Add Content
            </Link>
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Slug/ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContent.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No content found
                </TableCell>
              </TableRow>
            ) : (
              filteredContent.map((content) => (
                <TableRow key={content.id}>
                  <TableCell>
                    <div className="font-medium">{content.title}</div>
                    <div className="text-xs text-muted-foreground">
                      By {content.author}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getContentTypeIcon(content.type)}
                      <span>{content.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {content.slug ? (
                      <div className="font-mono text-xs">{content.slug}</div>
                    ) : (
                      <div className="text-xs text-muted-foreground">
                        Content Block ID: {content.id}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(content.status)}
                    >
                      {content.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span>English</span>
                      {content.hasArabic && (
                        <Badge variant="outline" className="ml-1 text-xs">
                          + Arabic
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>{formatDate(content.lastUpdated)}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(content.lastUpdated).toLocaleTimeString()}
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
                          <Link to={`/cms/content/${content.id}`}>
                            <Eye className="mr-2 h-4 w-4" /> View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/cms/content/${content.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        {content.slug && (
                          <DropdownMenuItem
                            onClick={() => {
                              window.open(content.slug, "_blank");
                            }}
                          >
                            <Globe className="mr-2 h-4 w-4" /> View Live
                          </DropdownMenuItem>
                        )}
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

export default ContentList;
