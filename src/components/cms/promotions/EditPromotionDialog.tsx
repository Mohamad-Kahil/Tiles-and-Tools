import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Percent, Tag, Gift } from "lucide-react";
import ProductSelectorDialog from "./ProductSelectorDialog";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  description: z.string().optional(),
  discountType: z.enum(["percentage", "fixed", "bogo"]),
  value: z.string().min(1, { message: "Value is required" }),
  code: z.string().optional(),
  minPurchase: z.string().optional(),
  usageLimit: z.string().optional(),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
  status: z.enum(["active", "scheduled", "inactive"]),
  applyToAll: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface EditPromotionDialogProps {
  children?: React.ReactNode;
  promotionType: "discount" | "coupon" | "campaign";
  promotion: {
    name: string;
    description?: string;
    type: string;
    value: string;
    code?: string;
    minPurchase?: string;
    usageLimit?: string;
    startDate: string;
    endDate: string;
    status: string;
  };
}

const EditPromotionDialog = ({
  children,
  promotionType,
  promotion,
}: EditPromotionDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const [productSelectorOpen, setProductSelectorOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  // Convert dates to the format expected by the date input
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: promotion.name,
      description: promotion.description || "",
      discountType: (promotion.type.toLowerCase() === "percentage"
        ? "percentage"
        : promotion.type.toLowerCase() === "fixed amount"
          ? "fixed"
          : "bogo") as "percentage" | "fixed" | "bogo",
      value: promotion.value.replace(/[^0-9]/g, ""),
      code: promotion.code || "",
      minPurchase: promotion.minPurchase?.replace(/[^0-9]/g, "") || "",
      usageLimit: promotion.usageLimit?.split("/")[1] || "",
      startDate: formatDate(promotion.startDate),
      endDate: formatDate(promotion.endDate),
      status: promotion.status.toLowerCase() as
        | "active"
        | "scheduled"
        | "inactive",
      applyToAll: true,
    },
  });

  const watchDiscountType = form.watch("discountType");

  function onSubmit(values: FormValues) {
    console.log(values);
    // In a real application, you would send this data to your backend
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4 mr-2" /> Edit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>
            Edit{" "}
            {promotionType === "discount"
              ? "Discount"
              : promotionType === "coupon"
                ? "Coupon"
                : "Campaign"}
          </DialogTitle>
          <DialogDescription>
            Update the details of this {promotionType}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="rules">Rules</TabsTrigger>
                <TabsTrigger value="scope">Scope</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
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
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="rules" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="discountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select discount type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="percentage">
                            <div className="flex items-center">
                              <Percent className="mr-2 h-4 w-4 text-blue-500" />
                              <span>Percentage</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="fixed">
                            <div className="flex items-center">
                              <Tag className="mr-2 h-4 w-4 text-green-500" />
                              <span>Fixed Amount</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="bogo">
                            <div className="flex items-center">
                              <Gift className="mr-2 h-4 w-4 text-purple-500" />
                              <span>Buy X Get Y</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {watchDiscountType === "percentage"
                          ? "Percentage Off"
                          : watchDiscountType === "fixed"
                            ? "Amount Off"
                            : "Buy X Get Y"}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          {watchDiscountType === "percentage" && (
                            <span className="mr-2 text-muted-foreground">
                              %
                            </span>
                          )}
                          {watchDiscountType === "fixed" && (
                            <span className="mr-2 text-muted-foreground">
                              EGP
                            </span>
                          )}
                          <Input {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {promotionType === "coupon" && (
                  <>
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Coupon Code</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="minPurchase"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum Purchase</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <span className="mr-2 text-muted-foreground">
                                  EGP
                                </span>
                                <Input {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="usageLimit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Usage Limit</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}
              </TabsContent>

              <TabsContent value="scope" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="applyToAll"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Apply to all products</FormLabel>
                        <FormDescription>
                          This promotion will apply to all products in your
                          store
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {!form.watch("applyToAll") && (
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Select Categories</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Flooring",
                          "Lighting",
                          "Wall Products",
                          "Furniture",
                          "Decor",
                          "Bathroom",
                        ].map((category) => (
                          <div
                            key={category}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox id={`category-${category}`} />
                            <label
                              htmlFor={`category-${category}`}
                              className="text-sm"
                            >
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Select Products</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        You can select specific products to apply this promotion
                        to
                      </p>
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          type="button"
                          size="sm"
                          onClick={() => setProductSelectorOpen(true)}
                        >
                          Select Products
                        </Button>
                        {selectedProducts.length > 0 && (
                          <div className="text-sm">
                            <span className="font-medium">
                              {selectedProducts.length}
                            </span>{" "}
                            products selected
                          </div>
                        )}
                      </div>
                      <ProductSelectorDialog
                        open={productSelectorOpen}
                        onOpenChange={setProductSelectorOpen}
                        onProductsSelected={(products) => {
                          setSelectedProducts(products);
                          console.log("Selected products:", products);
                        }}
                      />
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPromotionDialog;
