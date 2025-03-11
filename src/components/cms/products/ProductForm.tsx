import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, X, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
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
import { useToast } from "@/components/ui/use-toast";

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  category_id: z.string({
    required_error: "Please select a category",
  }),
  price: z.coerce
    .number()
    .min(0.01, { message: "Price must be greater than 0" }),
  compare_at_price: z.coerce.number().optional(),
  cost_price: z.coerce.number().optional(),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters",
  }),
  short_description: z.string().optional(),
  inventory_quantity: z.coerce.number().int().min(0),
  weight: z.coerce.number().optional(),
  dimensions: z.object({
    length: z.coerce.number().optional(),
    width: z.coerce.number().optional(),
    height: z.coerce.number().optional(),
  }),
  is_active: z.boolean().default(true),
  is_featured: z.boolean().default(false),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  meta_keywords: z.string().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = !!id;
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      category_id: "",
      price: 0,
      compare_at_price: undefined,
      cost_price: undefined,
      description: "",
      short_description: "",
      inventory_quantity: 0,
      weight: undefined,
      dimensions: {
        length: undefined,
        width: undefined,
        height: undefined,
      },
      is_active: true,
      is_featured: false,
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
      sku: "",
      barcode: "",
    },
  });

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name")
        .order("name");

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load categories",
      });
    }
  };

  // Fetch product data if in edit mode
  const fetchProduct = async (productId) => {
    try {
      setLoading(true);
      // First fetch the product
      const { data, error } = await supabase
        .from("products")
        .select("*, category:categories(id, name)")
        .eq("id", productId)
        .single();

      if (error) throw error;
      if (!data) throw new Error("Product not found");

      // Then fetch product images
      const { data: imageData, error: imageError } = await supabase
        .from("product_images")
        .select("*")
        .eq("product_id", productId);

      if (imageError) throw imageError;

      // Set form values
      form.reset({
        name: data.name,
        slug: data.slug,
        category_id: data.category_id || "",
        price: data.price,
        compare_at_price: data.compare_at_price || undefined,
        cost_price: data.cost_price || undefined,
        description: data.description || "",
        short_description: data.short_description || "",
        inventory_quantity: data.inventory_quantity || 0,
        weight: data.weight || undefined,
        dimensions: {
          length: data.dimensions?.length || undefined,
          width: data.dimensions?.width || undefined,
          height: data.dimensions?.height || undefined,
        },
        is_active: data.is_active !== undefined ? data.is_active : true,
        is_featured: data.is_featured !== undefined ? data.is_featured : false,
        meta_title: data.meta_title || "",
        meta_description: data.meta_description || "",
        meta_keywords: data.meta_keywords || "",
        sku: data.sku || "",
        barcode: data.barcode || "",
      });

      // Set existing images
      if (imageData && imageData.length > 0) {
        setExistingImages(imageData);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load product",
      });
      navigate("/cms/products");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      // Prepare data for submission
      const productData = {
        ...data,
        // Ensure dimensions is properly formatted as JSON
        dimensions: {
          length: data.dimensions.length || null,
          width: data.dimensions.width || null,
          height: data.dimensions.height || null,
        },
        // Ensure inventory fields are properly set
        inventory_quantity: data.inventory_quantity || 0,
        weight: data.weight || null,
        // Ensure SEO fields are properly set
        meta_title: data.meta_title || null,
        meta_description: data.meta_description || null,
        meta_keywords: data.meta_keywords || null,
        sku: data.sku || null,
        barcode: data.barcode || null,
      };

      console.log("Submitting product data:", productData);

      // Create or update product
      let productId = id;
      if (isEditMode) {
        // Update existing product
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", id);

        if (error) {
          console.error("Error updating product:", error);
          throw error;
        }
      } else {
        // Create new product
        const { data: newProduct, error } = await supabase
          .from("products")
          .insert(productData)
          .select()
          .single();

        if (error) {
          console.error("Error creating product:", error);
          throw error;
        }
        productId = newProduct.id;
      }

      // Handle image uploads
      if (mainImage) {
        console.log("Uploading main image:", mainImage.name);
        // Upload main image to Supabase Storage
        const mainImageFile = mainImage;
        const mainImageName = `${Date.now()}-${mainImageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("product-images") // This is the bucket name in Supabase Storage
          .upload(mainImageName, mainImageFile);

        if (uploadError) {
          console.error("Error uploading main image:", uploadError);
          throw uploadError;
        }

        // Get public URL for the uploaded image
        const { data: publicUrlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(mainImageName);

        console.log("Main image URL:", publicUrlData.publicUrl);

        // Add image reference to product_images table in the database
        const { error: insertError } = await supabase
          .from("product_images")
          .insert({
            product_id: productId,
            url: publicUrlData.publicUrl,
            is_primary: true,
          });

        if (insertError) {
          console.error("Error inserting main image record:", insertError);
          throw insertError;
        }
      }

      // Upload gallery images one by one
      for (const image of galleryImages) {
        console.log("Uploading gallery image:", image.name);
        // Create a unique name for the image
        const imageName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}-${image.name}`;

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(imageName, image);

        if (uploadError) {
          console.error("Error uploading gallery image:", uploadError);
          throw uploadError;
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(imageName);

        console.log("Gallery image URL:", publicUrlData.publicUrl);

        // Add to product_images table in the database
        const { error: insertError } = await supabase
          .from("product_images")
          .insert({
            product_id: productId,
            url: publicUrlData.publicUrl,
            is_primary: false,
          });

        if (insertError) {
          console.error("Error inserting gallery image record:", insertError);
          throw insertError;
        }
      }

      toast({
        title: isEditMode ? "Product updated" : "Product created",
        description: isEditMode
          ? "Your product has been updated successfully."
          : "Your product has been created successfully.",
      });

      navigate("/cms/products");
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${isEditMode ? "update" : "create"} product`,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle main image upload
  const handleMainImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // Prevent default behavior
    event.preventDefault();
    event.stopPropagation();

    // Get the file
    const file = event.target.files?.[0];
    if (file) {
      // Store the file in state for later upload
      setMainImage(file);
    }

    // Reset the input value to allow selecting the same file again
    event.target.value = "";
  };

  // Handle gallery image upload
  const handleGalleryImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // Prevent default behavior
    event.preventDefault();
    event.stopPropagation();

    // Get the files
    const files = event.target.files;
    if (files && files.length > 0) {
      // Store the files in state for later upload
      setGalleryImages((prev) => [...prev, ...Array.from(files)]);
    }

    // Reset the input value to allow selecting the same files again
    event.target.value = "";
  };

  // Remove main image
  const removeMainImage = () => {
    setMainImage(null);
  };

  // Remove gallery image
  const removeGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove existing image
  const removeExistingImage = async (imageId: string) => {
    try {
      const { error } = await supabase
        .from("product_images")
        .delete()
        .eq("id", imageId);

      if (error) throw error;

      setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
      toast({
        title: "Image removed",
        description: "Image has been removed successfully",
      });
    } catch (error) {
      console.error("Error removing image:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove image",
      });
    }
  };

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Check for duplicate parameter
  useEffect(() => {
    const fetchDuplicateProduct = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const duplicateId = urlParams.get("duplicate");

      if (duplicateId) {
        try {
          setLoading(true);
          const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("id", duplicateId)
            .single();

          if (error) throw error;
          if (!data) throw new Error("Product not found");

          // Clear the ID to create a new product
          const duplicatedData = { ...data };
          delete duplicatedData.id;
          duplicatedData.name = `${duplicatedData.name} (Copy)`;
          duplicatedData.slug = `${duplicatedData.slug}-copy`;

          // Set form values
          form.reset(duplicatedData);

          // Fetch product images to duplicate them later
          const { data: imageData } = await supabase
            .from("product_images")
            .select("*")
            .eq("product_id", duplicateId);

          if (imageData && imageData.length > 0) {
            setExistingImages(imageData);
          }
        } catch (error) {
          console.error("Error fetching product to duplicate:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load product for duplication",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    // Fetch initial data
    const initializeForm = async () => {
      await fetchCategories();
      if (isEditMode) {
        await fetchProduct(id);
      } else {
        await fetchDuplicateProduct();
      }
    };

    initializeForm();
  }, [isEditMode, id]);

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
          <Button type="submit" form="product-form" disabled={loading}>
            {loading ? (
              <>
                <span className="animate-spin mr-2">⟳</span>
                {isEditMode ? "Updating..." : "Saving..."}
              </>
            ) : isEditMode ? (
              "Update"
            ) : (
              "Save"
            )}
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
                          <Input
                            placeholder="Enter product name"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              // Auto-generate slug if empty
                              if (!form.getValues("slug")) {
                                form.setValue(
                                  "slug",
                                  generateSlug(e.target.value),
                                );
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="product-slug" {...field} />
                        </FormControl>
                        <FormDescription>
                          Used in the URL. Auto-generated from name if left
                          empty.
                        </FormDescription>
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
                      name="category_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
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
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.name}
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
                      name="is_active"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Active Product</FormLabel>
                            <FormDescription>
                              Active products are visible on the store
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="is_featured"
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
                    name="short_description"
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
                    name="compare_at_price"
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
                    name="cost_price"
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
                        src={URL.createObjectURL(mainImage)}
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
                  ) : existingImages.find((img) => img.is_primary) ? (
                    <div className="relative">
                      <img
                        src={existingImages.find((img) => img.is_primary).url}
                        alt="Main product image"
                        className="w-full h-auto rounded-md border"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8"
                        onClick={() =>
                          removeExistingImage(
                            existingImages.find((img) => img.is_primary).id,
                          )
                        }
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
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const input = document.getElementById(
                            "main-image-upload",
                          ) as HTMLInputElement;
                          if (input) {
                            input.value = ""; // Clear any previous selection
                            input.click();
                          }
                        }}
                        type="button"
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
                    {/* Existing gallery images */}
                    {existingImages
                      .filter((img) => !img.is_primary)
                      .map((image) => (
                        <div key={image.id} className="relative">
                          <img
                            src={image.url}
                            alt={`Gallery image`}
                            className="w-full h-32 object-cover rounded-md border"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6"
                            onClick={() => removeExistingImage(image.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}

                    {/* New gallery images */}
                    {galleryImages.map((image, index) => (
                      <div key={`new-${index}`} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`New gallery image ${index + 1}`}
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
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-full w-full flex flex-col gap-2"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const input = document.getElementById(
                            "gallery-image-upload",
                          ) as HTMLInputElement;
                          if (input) {
                            input.value = ""; // Clear any previous selection
                            input.click();
                          }
                        }}
                        type="button"
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
                    name="inventory_quantity"
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

                  <FormField
                    control={form.control}
                    name="barcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Barcode (ISBN, UPC, GTIN, etc.)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter barcode" {...field} />
                        </FormControl>
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
                              // Explicitly set the weight value in the form
                              form.setValue(
                                "weight",
                                val ? Number(val) : undefined,
                              );
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
                                // Update the dimensions object in form data
                                const currentDimensions =
                                  form.getValues("dimensions");
                                form.setValue("dimensions", {
                                  ...currentDimensions,
                                  length: val ? Number(val) : undefined,
                                });
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
                                // Update the dimensions object in form data
                                const currentDimensions =
                                  form.getValues("dimensions");
                                form.setValue("dimensions", {
                                  ...currentDimensions,
                                  width: val ? Number(val) : undefined,
                                });
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
                                // Update the dimensions object in form data
                                const currentDimensions =
                                  form.getValues("dimensions");
                                form.setValue("dimensions", {
                                  ...currentDimensions,
                                  height: val ? Number(val) : undefined,
                                });
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
                  name="meta_title"
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
                  name="meta_description"
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
                  name="meta_keywords"
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
