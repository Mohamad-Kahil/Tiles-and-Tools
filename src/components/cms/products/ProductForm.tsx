import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, X, Plus, Trash2 } from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  sku: z.string().min(1, { message: "SKU is required" }),
  category: z.string({
    required_error: "Please select a category",
  }),
  subcategory: z.string({
    required_error: "Please select a subcategory",
  }),
  price: z.coerce
    .number()
    .min(0.01, { message: "Price must be greater than 0" }),
  compareAtPrice: z.coerce.number().optional(),
  costPrice: z.coerce.number().optional(),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters",
  }),
  shortDescription: z.string().optional(),
  stock: z.coerce.number().int().min(0),
  weight: z.coerce.number().optional(),
  dimensions: z.object({
    length: z.coerce.number().optional(),
    width: z.coerce.number().optional(),
    height: z.coerce.number().optional(),
  }),
  status: z.string(),
  featured: z.boolean().default(false),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [activeTab, setActiveTab] = useState("basic");
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  // Default values for the form
  const defaultValues: Partial<FormValues> = {
    name: "",
    sku: "",
    category: "",
    subcategory: "",
    price: 0,
    compareAtPrice: undefined,
    costPrice: undefined,
    description: "",
    shortDescription: "",
    stock: 0,
    weight: undefined,
    dimensions: {
      length: undefined,
      width: undefined,
      height: undefined,
    },
    status: "draft",
    featured: false,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  };

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", {
      ...data,
      mainImage,
      galleryImages,
    });
    // In a real app, you would send this data to your backend
    navigate("/cms/products");
  };

  // Handle main image upload
  const handleMainImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMainImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle gallery image upload
  const handleGalleryImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setGalleryImages((prev) => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Remove main image
  const removeMainImage = () => {
    setMainImage(null);
  };

  // Remove gallery image
  const removeGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Categories and subcategories mapping
  const categories = [
    {
      value: "flooring",
      label: "Flooring",
      subcategories: [
        { value: "ceramic", label: "Ceramic Tiles" },
        { value: "porcelain", label: "Porcelain Tiles" },
        { value: "marble", label: "Marble" },
        { value: "wood", label: "Wood" },
        { value: "vinyl", label: "Vinyl" },
      ],
    },
    {
      value: "wall_products",
      label: "Wall Products",
      subcategories: [
        { value: "paint", label: "Paint" },
        { value: "wallpaper", label: "Wallpaper" },
        { value: "wall_tiles", label: "Wall Tiles" },
        { value: "panels", label: "Decorative Panels" },
      ],
    },
    {
      value: "lighting",
      label: "Lighting",
      subcategories: [
        { value: "ceiling", label: "Ceiling Lights" },
        { value: "pendant", label: "Pendant Lights" },
        { value: "wall_lights", label: "Wall Lights" },
        { value: "floor_lamps", label: "Floor Lamps" },
        { value: "table_lamps", label: "Table Lamps" },
      ],
    },
    {
      value: "decor",
      label: "Decor",
      subcategories: [
        { value: "vases", label: "Vases" },
        { value: "mirrors", label: "Mirrors" },
        { value: "art", label: "Wall Art" },
        { value: "cushions", label: "Cushions" },
        { value: "rugs", label: "Rugs" },
      ],
    },
    {
      value: "furniture",
      label: "Furniture",
      subcategories: [
        { value: "living_room", label: "Living Room" },
        { value: "bedroom", label: "Bedroom" },
        { value: "dining", label: "Dining" },
        { value: "office", label: "Office" },
        { value: "outdoor", label: "Outdoor" },
      ],
    },
  ];

  // Get subcategories based on selected category
  const getSubcategories = () => {
    const selectedCategory = form.watch("category");
    const category = categories.find((cat) => cat.value === selectedCategory);
    return category?.subcategories || [];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/cms/products")}>
            Cancel
          </Button>
          <Button type="submit" form="product-form">
            {isEditMode ? "Update" : "Save"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="inventory">Inventory & Shipping</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form
            id="product-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-6"
          >
            <TabsContent value="basic" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU (Stock Keeping Unit)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter SKU" {...field} />
                        </FormControl>
                        <FormDescription>
                          A unique identifier for your product
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              form.setValue("subcategory", "");
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem
                                  key={category.value}
                                  value={category.value}
                                >
                                  {category.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subcategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subcategory</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={!form.watch("category")}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select subcategory" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {getSubcategories().map((subcategory) => (
                                <SelectItem
                                  key={subcategory.value}
                                  value={subcategory.value}
                                >
                                  {subcategory.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Only active products are visible on the store
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Featured Product</FormLabel>
                          <FormDescription>
                            Featured products are displayed prominently on the
                            homepage
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief description for product listings"
                            className="resize-none h-20"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          A brief summary shown in product listings (optional)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Detailed product description"
                            className="resize-none h-40"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Detailed description shown on the product page
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="bg-muted/30 p-6 rounded-md">
                <h3 className="text-lg font-medium mb-4">Pricing</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Selling Price (EGP)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Current selling price</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="compareAtPrice"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Compare At Price (EGP)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            value={value || ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              onChange(val ? Number(val) : undefined);
                            }}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Original price for showing discounts
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="costPrice"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Cost Price (EGP)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            value={value || ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              onChange(val ? Number(val) : undefined);
                            }}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Your cost (not shown to customers)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="images" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Main Product Image */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Main Product Image</h3>
                  <Separator />

                  {mainImage ? (
                    <div className="relative">
                      <img
                        src={mainImage}
                        alt="Main product image"
                        className="w-full h-auto rounded-md border"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8"
                        onClick={removeMainImage}
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
                      <p className="text-xs text-muted-foreground">
                        Recommended size: 1200 x 1200 pixels (1:1 ratio)
                      </p>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="main-image-upload"
                        onChange={handleMainImageUpload}
                      />
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() =>
                          document.getElementById("main-image-upload")?.click()
                        }
                      >
                        Select Image
                      </Button>
                    </div>
                  )}
                </div>

                {/* Gallery Images */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Gallery Images</h3>
                  <Separator />

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {galleryImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md border"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6"
                          onClick={() => removeGalleryImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}

                    <div className="border border-dashed rounded-md flex flex-col items-center justify-center p-4 h-32">
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        id="gallery-image-upload"
                        onChange={handleGalleryImageUpload}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-full w-full flex flex-col gap-2"
                        onClick={() =>
                          document
                            .getElementById("gallery-image-upload")
                            ?.click()
                        }
                      >
                        <Plus className="h-6 w-6 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Add Image
                        </span>
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    You can add up to 8 gallery images
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Inventory */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Inventory</h3>
                  <Separator />

                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            step="1"
                            placeholder="0"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Current available quantity
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Shipping */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Shipping</h3>
                  <Separator />

                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Weight (kg)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            value={value || ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              onChange(val ? Number(val) : undefined);
                            }}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Product weight in kilograms
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="dimensions.length"
                      render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel>Length (cm)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              placeholder="0.0"
                              value={value || ""}
                              onChange={(e) => {
                                const val = e.target.value;
                                onChange(val ? Number(val) : undefined);
                              }}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dimensions.width"
                      render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel>Width (cm)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              placeholder="0.0"
                              value={value || ""}
                              onChange={(e) => {
                                const val = e.target.value;
                                onChange(val ? Number(val) : undefined);
                              }}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dimensions.height"
                      render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel>Height (cm)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              placeholder="0.0"
                              value={value || ""}
                              onChange={(e) => {
                                const val = e.target.value;
                                onChange(val ? Number(val) : undefined);
                              }}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Search Engine Optimization
                </h3>
                <Separator />

                <FormField
                  control={form.control}
                  name="metaTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="SEO title (leave blank to use product name)"
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
                        Appears in search engine results (recommended 150-160
                        characters)
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
                        Comma-separated keywords (less important for modern SEO)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default ProductForm;
