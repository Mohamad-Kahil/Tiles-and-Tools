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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, CreditCard } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Method name is required" }),
  provider: z.string().min(1, { message: "Provider is required" }),
  processingFee: z.string().optional(),
  status: z.enum(["active", "inactive"]),
  isDefault: z.boolean().default(false),
  supportedCards: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AddPaymentMethodDialog = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      provider: "",
      processingFee: "",
      status: "active",
      isDefault: false,
      supportedCards: [],
    },
  });

  function onSubmit(values: FormValues) {
    // In a real app, you would send this data to your backend
    console.log("Creating payment method:", values);
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Payment Method
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
          <DialogDescription>
            Create a new payment method for your customers
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
                    <Input placeholder="e.g., Credit Card" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name displayed to customers during checkout
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provider</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Stripe">Stripe</SelectItem>
                      <SelectItem value="PayPal">PayPal</SelectItem>
                      <SelectItem value="Fawry">Fawry</SelectItem>
                      <SelectItem value="Accept">Accept</SelectItem>
                      <SelectItem value="Manual">Manual Processing</SelectItem>
                      <SelectItem value="Internal">
                        Internal (e.g., Cash on Delivery)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The payment service provider that processes this payment
                    method
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="processingFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Processing Fee</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 2.9% + EGP 1.00" {...field} />
                  </FormControl>
                  <FormDescription>
                    The fee charged for processing this payment method
                    (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Active methods are available during checkout
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="supportedCards"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Supported Cards</FormLabel>
                      <FormDescription>
                        Select the card types this method accepts
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {["visa", "mastercard", "amex", "discover"].map(
                        (card) => (
                          <FormField
                            key={card}
                            control={form.control}
                            name="supportedCards"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={card}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(card)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              card,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== card,
                                              ),
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {card.charAt(0).toUpperCase() +
                                      card.slice(1)}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ),
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Set as default payment method</FormLabel>
                    <FormDescription>
                      This will be pre-selected during checkout
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

export default AddPaymentMethodDialog;
