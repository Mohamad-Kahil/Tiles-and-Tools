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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Truck } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Method name is required" }),
  type: z.enum(["flat", "free", "weight", "carrier"]),
  zone: z.string().min(1, { message: "Shipping zone is required" }),
  cost: z.string().optional(),
  minOrderValue: z.string().optional(),
  status: z.enum(["active", "inactive"]),
});

type FormValues = z.infer<typeof formSchema>;

interface AddShippingMethodDialogProps {
  children?: React.ReactNode;
}

const AddShippingMethodDialog = ({
  children,
}: AddShippingMethodDialogProps) => {
  const [open, setOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "flat",
      zone: "",
      cost: "",
      minOrderValue: "",
      status: "active",
    },
  });

  const watchType = form.watch("type");

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
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Shipping Method
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Shipping Method</DialogTitle>
          <DialogDescription>
            Create a new shipping method for your customers.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Method Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Standard Delivery" {...field} />
                  </FormControl>
                  <FormDescription>
                    A descriptive name for this shipping method
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Method Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="flat">Flat Rate</SelectItem>
                        <SelectItem value="free">Free Shipping</SelectItem>
                        <SelectItem value="weight">Weight Based</SelectItem>
                        <SelectItem value="carrier">Carrier Rates</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping Zone</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select zone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cairo_giza">Cairo & Giza</SelectItem>
                        <SelectItem value="alexandria">Alexandria</SelectItem>
                        <SelectItem value="delta">Delta Region</SelectItem>
                        <SelectItem value="upper_egypt">Upper Egypt</SelectItem>
                        <SelectItem value="red_sea">Red Sea</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {watchType !== "free" && watchType !== "carrier" && (
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping Cost</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <span className="mr-2 text-muted-foreground">EGP</span>
                        <Input
                          type="text"
                          placeholder={
                            watchType === "weight" ? "10 per kg" : "50"
                          }
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      {watchType === "weight"
                        ? "Enter the cost per kg or provide a formula"
                        : "Enter the fixed shipping cost"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {watchType === "free" && (
              <FormField
                control={form.control}
                name="minOrderValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Order Value</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <span className="mr-2 text-muted-foreground">EGP</span>
                        <Input type="text" placeholder="1000" {...field} />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Minimum order value required for free shipping (leave
                      empty for no minimum)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {watchType === "carrier" && (
              <FormField
                control={form.control}
                name="type"
                render={() => (
                  <FormItem>
                    <FormLabel>Carrier</FormLabel>
                    <Select defaultValue="aramex">
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select carrier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="aramex">Aramex</SelectItem>
                        <SelectItem value="egypt_post">Egypt Post</SelectItem>
                        <SelectItem value="dhl">DHL</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the carrier to calculate shipping rates
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value === "active"}
                      onCheckedChange={(checked) => {
                        field.onChange(checked ? "active" : "inactive");
                      }}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Active</FormLabel>
                    <FormDescription>
                      Enable this shipping method immediately
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Method</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddShippingMethodDialog;
