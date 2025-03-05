import React from "react";
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
import { RefreshCw, Plus, Minus } from "lucide-react";

const formSchema = z.object({
  adjustmentType: z.enum(["add", "remove"]),
  quantity: z.string().min(1, { message: "Quantity is required" }),
  reason: z.enum([
    "purchase",
    "return",
    "damage",
    "loss",
    "correction",
    "other",
  ]),
  notes: z.string().optional(),
  locationFrom: z.string().optional(),
  locationTo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface StockAdjustmentDialogProps {
  children?: React.ReactNode;
  product?: {
    id: string;
    name: string;
    currentStock: number;
  };
}

const StockAdjustmentDialog = ({
  children,
  product = {
    id: "SKU-001",
    name: "Luxury Marble Flooring Tile",
    currentStock: 124,
  },
}: StockAdjustmentDialogProps) => {
  const [open, setOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adjustmentType: "add",
      quantity: "",
      reason: "purchase",
      notes: "",
      locationFrom: "",
      locationTo: "",
    },
  });

  const watchAdjustmentType = form.watch("adjustmentType");
  const watchReason = form.watch("reason");

  function onSubmit(values: FormValues) {
    console.log(values);
    // In a real application, you would send this data to your backend
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" /> Adjust Stock
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Stock Adjustment</DialogTitle>
          <DialogDescription>
            Adjust inventory levels for {product.name} (SKU: {product.id})
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="p-4 border rounded-md bg-muted/20">
              <div className="text-sm text-muted-foreground mb-1">
                Current Stock
              </div>
              <div className="text-2xl font-bold">
                {product.currentStock} units
              </div>
            </div>

            <FormField
              control={form.control}
              name="adjustmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adjustment Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select adjustment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="add">
                        <div className="flex items-center">
                          <Plus className="mr-2 h-4 w-4 text-green-500" />
                          <span>Add Stock</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="remove">
                        <div className="flex items-center">
                          <Minus className="mr-2 h-4 w-4 text-red-500" />
                          <span>Remove Stock</span>
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
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter quantity"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {watchAdjustmentType === "add"
                      ? "Number of units to add to inventory"
                      : "Number of units to remove from inventory"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {watchAdjustmentType === "add" ? (
                        <>
                          <SelectItem value="purchase">New Purchase</SelectItem>
                          <SelectItem value="return">
                            Customer Return
                          </SelectItem>
                          <SelectItem value="correction">
                            Inventory Correction
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="damage">
                            Damaged/Defective
                          </SelectItem>
                          <SelectItem value="loss">Lost/Stolen</SelectItem>
                          <SelectItem value="correction">
                            Inventory Correction
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchReason === "other" && (
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please provide details about this adjustment"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {watchAdjustmentType === "add" && (
              <FormField
                control={form.control}
                name="locationTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="main">Main Warehouse</SelectItem>
                        <SelectItem value="cairo">Cairo Store</SelectItem>
                        <SelectItem value="alexandria">
                          Alexandria Store
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Where the stock will be added
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {watchAdjustmentType === "remove" && (
              <FormField
                control={form.control}
                name="locationFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="main">Main Warehouse</SelectItem>
                        <SelectItem value="cairo">Cairo Store</SelectItem>
                        <SelectItem value="alexandria">
                          Alexandria Store
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Where the stock will be removed from
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {watchAdjustmentType === "add" ? "Add Stock" : "Remove Stock"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default StockAdjustmentDialog;
