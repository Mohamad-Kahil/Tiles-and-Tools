import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Upload,
  X,
  Globe,
  FileText,
  Layout,
  Image as ImageIcon,
} from "lucide-react";

// Form schema
const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  type: z.string(),
  slug: z.string().optional(),
  content: z.string().min(1, { message: "Content is required" }),
  excerpt: z.string().optional(),
  status: z.string(),
  featuredImage: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  hasArabicVersion: z.boolean().default(false),
  arabicTitle: z.string().optional(),
  arabicContent: z.string().optional(),
  arabicExcerpt: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ContentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [activeTab, setActiveTab] = useState("english");
  const [contentType, setContentType] = useState("page");
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);

  // Default values for the form
  const defaultValues: Partial<FormValues> = {
    title: "",
    type: "page",
    slug: "",
    content: "",
    excerpt: "",
    status: "draft",
    featuredImage: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    hasArabicVersion: false,
    arabicTitle: "",
    arabicContent: "",
    arabicExcerpt: "",
  };

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Watch for content type changes
  const watchContentType = form.watch("type");
  if (watchContentType !== contentType) {
    setContentType(watchContentType);
  }

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", {
      ...data,
      featuredImage,
    });
    // In a real app, you would send this data to your backend
    navigate("/cms/content");
  };

  // Handle featured image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFeaturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove featured image
  const removeImage = () => {
    setFeaturedImage(null);
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">
          {isEditMode ? "Edit Content" : "Add New Content"}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/cms/content")}>
            Cancel
          </Button>
          <Button type="submit" form="content-form">
            {isEditMode ? "Update" : "Save"}
          </Button>
        </div>
      </div>

      <Separator />

      <Form {...form}>
        <form
          id="content-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-4">
                      <TabsTrigger
                        value="english"
                        className="flex items-center gap-2"
                      >
                        <Globe className="h-4 w-4" />
                        English
                      </TabsTrigger>
                      <TabsTrigger
                        value="arabic"
                        className="flex items-center gap-2"
                        disabled={!form.watch("hasArabicVersion")}
                      >
                        <Globe className="h-4 w-4" />
                        Arabic
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="english" className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {(contentType === "page" ||
                        contentType === "blog post") && (
                        <FormField
                          control={form.control}
                          name="slug"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Slug</FormLabel>
                              <FormControl>
                                <div className="flex items-center">
                                  <span className="text-muted-foreground mr-2">
                                    /
                                  </span>
                                  <Input placeholder="page-slug" {...field} />
                                </div>
                              </FormControl>
                              <FormDescription>
                                The URL path for this content (e.g., "about-us"
                                for /about-us)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter content here..."
                                className="min-h-[300px] font-mono"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              HTML content is supported
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {contentType === "blog post" && (
                        <FormField
                          control={form.control}
                          name="excerpt"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Excerpt</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Brief summary of the post..."
                                  className="h-24"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                A short summary displayed in blog listings
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </TabsContent>

                    <TabsContent value="arabic" className="space-y-4">
                      <FormField
                        control={form.control}
                        name="arabicTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Arabic Title</FormLabel>
                            <FormControl>
                              <Input placeholder="أدخل العنوان" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="arabicContent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Arabic Content</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="أدخل المحتوى هنا..."
                                className="min-h-[300px] font-mono text-right"
                                dir="rtl"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              HTML content is supported
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {contentType === "blog post" && (
                        <FormField
                          control={form.control}
                          name="arabicExcerpt"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Arabic Excerpt</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="ملخص موجز للمقال..."
                                  className="h-24 text-right"
                                  dir="rtl"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                A short summary displayed in blog listings
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {(contentType === "page" || contentType === "blog post") && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">SEO Settings</h3>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="metaTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="SEO title (leave blank to use content title)"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Appears in browser tab and search results
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="metaDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Brief description for search engines"
                                className="resize-none h-20"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Appears in search engine results (recommended
                              150-160 characters)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="metaKeywords"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Keywords</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="keyword1, keyword2, keyword3"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Comma-separated keywords (less important for
                              modern SEO)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Content Settings</h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select content type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem
                                value="page"
                                className="flex items-center"
                              >
                                <div className="flex items-center gap-2">
                                  <Layout className="h-4 w-4 text-blue-500" />
                                  <span>Page</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="blog post">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-green-500" />
                                  <span>Blog Post</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="content block">
                                <div className="flex items-center gap-2">
                                  <ImageIcon className="h-4 w-4 text-purple-500" />
                                  <span>Content Block</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            {contentType === "page" &&
                              "A full page with its own URL"}
                            {contentType === "blog post" &&
                              "An article in the blog section"}
                            {contentType === "content block" &&
                              "Reusable content for various pages"}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">
                                Published
                              </SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Only published content is visible on the site
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hasArabicVersion"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Create Arabic Version</FormLabel>
                            <FormDescription>
                              Enable to create an Arabic translation of this
                              content
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {(contentType === "page" || contentType === "blog post") && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Featured Image</h3>
                    {featuredImage ? (
                      <div className="relative">
                        <img
                          src={featuredImage}
                          alt="Featured image"
                          className="w-full h-auto rounded-md border"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border border-dashed rounded-md p-8 text-center">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Drag and drop an image, or click to browse
                        </p>
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="featured-image-upload"
                          onChange={handleImageUpload}
                        />
                        <Button
                          variant="outline"
                          className="mt-2"
                          onClick={() =>
                            document
                              .getElementById("featured-image-upload")
                              ?.click()
                          }
                        >
                          Select Image
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContentForm;
